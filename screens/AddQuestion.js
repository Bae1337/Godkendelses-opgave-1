
// AddQuestion: Skærm til at oprette et nyt spørgsmål og gemme det i Firebase
import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { rtdb } from "../database/firebase";
import { ref, push, update } from "firebase/database";
import { GlobalStyle as GS } from "../styles/GlobalStyle";
import firebase from "../database/firebase";
import { useUser } from "../UserContext";


export default function AddQuestion({ navigation }) {
    // Hent aktiv bruger fra global context
    const { activeUser } = useUser();

    // Initial state for et nyt spørgsmål
    const initialState = {
        user: activeUser.name, // Gemmer brugernavn sammen med spørgsmålet
        title: "",
        question: ""
    };

    // State til at holde inputværdier for spørgsmål
    const [question, setQuestion] = useState(initialState);

    // Funktion til at gemme et nyt spørgsmål i Firebase
    async function handleAddQuestion() {
        // Valider at titel og spørgsmål ikke er tomme
        if (question.title.trim() === "" || question.question.trim() === "") {
            Alert.alert("Validation Error", "Title og question må ikke være tomme.");
            return;
        }
        try {
            // Opret reference til 'questions' i databasen
            const questionRef = ref(rtdb, 'questions');
            // Opretter en ny node for spørgsmålet
            const newQuestionRef = push(questionRef);
            // Gemmer titel, spørgsmål og bruger
            await update(newQuestionRef, {
                title: question.title.trim(),
                question: question.question.trim(),
                user: question.user
            });
            // Nulstil formular
            setQuestion(initialState);
            navigation.goBack();
        } catch (error) {
            // Fejlbesked hvis gemning fejler
            Alert.alert("Error", "Kunne ikke gemme spørgsmålet.");
        }
    }

    // Render: Formular til at tilføje spørgsmål
    return (
        <SafeAreaView style={GS.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={GS.addFormWrapper}>
                    {/* Tilbage-knap */}
                    <TouchableOpacity style={GS.tilbageButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#A3A3A3" />
                    </TouchableOpacity>
                    <View style={GS.addFormular}>
                        {/* Titel for formularen */}
                        <Text style={GS.homeTitle}>Tilføj spørgsmål</Text>
                        {/* Inputfelt for titel */}
                        <TextInput
                            style={GS.input}
                            placeholder="Indtast titel"
                            placeholderTextColor="#A3A3A3"
                            value={question.title}
                            onChangeText={(text) => setQuestion({ ...question, title: text })}
                        />
                        {/* Label og input for selve spørgsmålet */}
                        <Text style={GS.label}>Spørgsmål</Text>
                        <TextInput
                            style={GS.input}
                            placeholder="Indtast spørgsmål"
                            placeholderTextColor="#A3A3A3"
                            value={question.question}
                            onChangeText={(text) => setQuestion({ ...question, question: text })}
                            multiline
                            numberOfLines={4}
                        />
                        {/* Knap til at gemme spørgsmålet */}
                        <TouchableOpacity style={GS.button} onPress={handleAddQuestion}>
                            <Text style={GS.buttonText}>Gem spørgsmål</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}