
// QuestionDetails: Viser et spørgsmål, alle kommentarer og giver mulighed for at tilføje/upvote/downvote kommentarer
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { rtdb } from "../database/firebase";
import { ref, onValue, push, update } from "firebase/database";
import { GlobalStyle as GS } from "../styles/GlobalStyle";
import firebase from "../database/firebase";
import { useUser } from "../UserContext";



export default function QuestionDetails({ navigation, route }) {
    // Hent id og spørgsmål fra navigation params
    const { id, question } = route?.params ?? {};
    // State til kommentarer og inputfelt for ny kommentar
    const [comment, setComment] = useState([]);
    const [newComment, setNewComment] = useState("");
    // Hent aktiv bruger fra global context
    const { activeUser } = useUser();

    // useEffect: Lyt til kommentarer for det aktuelle spørgsmål i Firebase
    useEffect(() => {
        if (!id) return;
        // Reference til comments for det aktuelle spørgsmål
        const questionRef = ref(rtdb, `questions/${id}/comments`);
        // Lyt til ændringer og opdater state
        const unsubscribe = onValue(questionRef, (snap) => {
            const data = snap.val();
            if (data) {
                // Gem både nøgle og data for hver kommentar
                setComment(Object.entries(data).map(([key, value]) => ({ id: key, ...value })));
            } else {
                setComment([]);
            }
        });
        // Ryd op ved unmount
        return unsubscribe;
    }, [id]);

    // Funktion til at tilføje en ny kommentar
    async function addComment() {
        // Valider at kommentaren ikke er tom
        if (!newComment.trim()) {
            Alert.alert("Fejl", "Kommentaren kan ikke være tom.");
            return;
        }
        try {
            // Reference til comments for spørgsmålet
            const questionRef = ref(rtdb, `questions/${id}/comments`);
            // Opretter en ny kommentar-node
            const newCommentRef = push(questionRef);
            // Gemmer kommentar, upvote/downvote og bruger
            await update(newCommentRef, {
                comment: newComment,
                upvote: 0,
                downvote: 0,
                user: activeUser.name
            });
            // Nulstil inputfelt
            setNewComment("");            
        } catch (error) {
            Alert.alert("Fejl", "Noget gik galt, prøv igen.");
            console.error(error);            
        }
    }

    // Funktion til at upvote en kommentar
    // Funktion til at upvote en kommentar
    // Bruger kan kun stemme én gang pr. kommentar (tjekkes via votes)
    async function upvoteComment(commentId) {
        if (!id || !commentId) return;
        try {
            const commentObj = comment.find(comment => comment.id === commentId);
            // Tjek om bruger allerede har stemt (votes er et objekt med brugernavne)
            if (commentObj.votes && commentObj.votes[activeUser.name]) {
                Alert.alert("Du har allerede stemt på denne kommentar.");
                return;
            }
            const currentUpvote = typeof commentObj.upvote === "number" ? commentObj.upvote : 0;
            const commentRef = ref(rtdb, `questions/${id}/comments/${commentId}`);
            // Opdaterer upvote og votes (votes holder styr på hvem der har stemt og hvordan)
            await update(commentRef, {
                upvote: currentUpvote + 1,
                votes: {
                    ...(commentObj.votes || {}),
                    [activeUser.name]: "upvote" // Gemmer at denne bruger har stemt upvote
                }
            });
        } catch (error) {
            Alert.alert("Fejl", "Noget gik galt, prøv igen.");
        }
    }

    // Funktion til at downvote en kommentar
    // Bruger kan kun stemme én gang pr. kommentar (tjekkes via votes)
    async function downvoteComment(commentId) {
        if (!id || !commentId) return;
        try {
            const commentObj = comment.find(comment => comment.id === commentId);
            // Tjek om bruger allerede har stemt
            if (commentObj.votes && commentObj.votes[activeUser.name]) {
                Alert.alert("Du har allerede stemt på denne kommentar.");
                return;
            }
            const currentDownvote = typeof commentObj.downvote === "number" ? commentObj.downvote : 0;
            const commentRef = ref(rtdb, `questions/${id}/comments/${commentId}`);
            // Opdaterer downvote og votes (votes holder styr på hvem der har stemt og hvordan)
            await update(commentRef, {
                downvote: currentDownvote + 1,
                votes: {
                    ...(commentObj.votes || {}),
                    [activeUser.name]: "downvote" // Gemmer at denne bruger har stemt downvote
                }
            });
        } catch (error) {
            Alert.alert("Fejl", "Noget gik galt, prøv igen.");
        }
    }

    // Hvis spørgsmålet ikke findes, vis fejlbesked
    if (!question) {
        return (
            <SafeAreaView style={GS.container}>
                <TouchableOpacity style={GS.tilbageButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#A3A3A3" />
                </TouchableOpacity>
                <View style={GS.card}>
                    <Text style={GS.homeTitle}>Spørgsmål ikke fundet</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Render: Viser spørgsmål, kommentarer og formular til ny kommentar
    return (
        <SafeAreaView style={GS.container}>
            <View style={GS.centerScreen}>
                {/* Tilbage-knap */}
                <TouchableOpacity style={GS.tilbageButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#A3A3A3" />
                </TouchableOpacity>
                <View style={GS.width}>
                    <ScrollView contentContainerStyle={GS.scrollContent}>
                        {/* Viser selve spørgsmålet */}
                        <View style={GS.card}>
                            <Text style={GS.homeTitle}>{question.title}</Text>
                            <Text style={{ ...GS.text, color: "#A3A3A3", marginBottom: 8 }}>Spørgsmål af: {question.user}</Text>
                            <Text style={GS.text}>{question.question}</Text>
                        </View>
                        {/* Viser alle kommentarer */}
                        <View style={GS.card}>
                            <Text style={GS.label}>Kommentarer</Text>
                            {comment.length === 0 ? (
                                <Text style={GS.text}>Ingen kommentarer endnu.</Text>
                            ) : (
                                comment.map((comment, index) => (
                                    <View key={comment.id} style={GS.commentBox}>
                                        <Text style={{ ...GS.text, color: "#A3A3A3", marginBottom: 4 }}>Kommentar af: {comment.user}</Text>
                                        <Text style={GS.text}>{comment.comment}</Text>
                                        {/* Upvote/downvote knapper for hver kommentar */}
                                        <View style={GS.commentActions}>
                                            <TouchableOpacity style={GS.likeButton} onPress={() => upvoteComment(comment.id)}>
                                                <Ionicons name="thumbs-up-outline" style={GS.likeIcon} />
                                                <Text style={GS.commentCount}>{typeof comment.upvote === 'number' ? comment.upvote : 0}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={GS.dislikeButton} onPress={() => downvoteComment(comment.id)}>
                                                <Ionicons name="thumbs-down-outline" style={GS.dislikeIcon} />
                                                <Text style={GS.commentCount}>{typeof comment.downvote === 'number' ? comment.downvote : 0}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            )}
                        </View>
                        {/* Formular til at tilføje ny kommentar */}
                        <View style={GS.card}>
                            <Text style={GS.label}>Tilføj kommentar</Text>
                            <TextInput
                                style={GS.input}
                                placeholder="Skriv din kommentar"
                                placeholderTextColor="#A3A3A3"
                                value={newComment}
                                onChangeText={setNewComment}
                                multiline
                            />
                            <TouchableOpacity style={GS.button} onPress={addComment}>
                                <Text style={GS.buttonText}>Tilføj kommentar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

