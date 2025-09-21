
// ViewQuestions viser listen af spørgsmål fra Firebase og giver adgang til at tilføje og vælge spørgsmål.
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { rtdb } from "../database/firebase";
import { ref, onValue } from "firebase/database";
import { GlobalStyle as GS } from "../styles/GlobalStyle";
import firebase from "../database/firebase";

export default function ViewQuestions({ navigation }) {
    // State til at holde alle spørgsmål hentet fra Firebase
    const [questions, setQuestions] = useState(null);

    // useEffect: Henter spørgsmål fra Firebase Realtime Database ved mount
    useEffect(() => {
        // Opretter reference til 'questions' noden i databasen
        const questionsRef = ref(rtdb, 'questions');
        // Lytter til ændringer i 'questions' og opdaterer state
        const unsubscribe = onValue(questionsRef, (snap) => {
            const data = snap.val();
            setQuestions(data || {})
        });
        // Rydder op ved unmount
        return unsubscribe;
    }, []);

    // Hvis spørgsmål ikke er hentet endnu, vises loading
    if (!questions) {
        return (
            <SafeAreaView style={GS.container}>
                <Text style={GS.text}>Loading...</Text>
            </SafeAreaView>
        );
    }

    // Udtræk id'er og spørgsmål fra objektet
    const ids = Object.keys(questions);

    // Hvis der ikke er nogen spørgsmål, vis besked og knap til at tilføje
    if (ids.length === 0) {
        return (
            <SafeAreaView style={GS.container}>
                <Text style={GS.text}>Ingen spørgsmål fundet.</Text>
                <View>
                    <TouchableOpacity style={GS.addButton} onPress={addQuestion}>
                        <Ionicons name="add" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Navigerer til detaljer for valgt spørgsmål
    function chooseQuestion(id) {
        const question = questions[id];
        navigation.navigate('Question Detail', { id, question });
    }

    // Navigerer til skærmen for at tilføje et nyt spørgsmål
    function addQuestion() {
        navigation.navigate('Add Question');
    }

    // Hovedrender: Viser liste af spørgsmål, tilbage-knap og tilføj-knap
    return (
        <SafeAreaView style={GS.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Tilbage-knap til forrige skærm */}
                <View>
                    <TouchableOpacity style={GS.tilbageButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#A3A3A3" />
                    </TouchableOpacity>
                </View>

                {/* Knap til at tilføje nyt spørgsmål */}
                <View>
                    <TouchableOpacity style={GS.addButton} onPress={addQuestion}>
                        <Ionicons name="add" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Liste af spørgsmål, hvert spørgsmål kan vælges */}
                <View style={GS.questionsList}>
                    {ids.map((id) => (
                        <TouchableOpacity key={id} style={GS.card} onPress={() => chooseQuestion(id)}>
                            <Text style={GS.text}>{questions[id].title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}