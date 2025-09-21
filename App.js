
// Importer nødvendige moduler og komponenter
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { GlobalStyle as GS } from "./styles/GlobalStyle";
import AddQuestion from "./screens/AddQuestion";
import ViewQuestions from "./screens/ViewQuestions";
import QuestionDetails from "./screens/QuestionDetails";
import AppHeader from "./components/AppHeader";
import { UserProvider } from "./UserContext";


// Opret navigation stack
const Stack = createStackNavigator();


// StackNavigator definerer appens skærme og navigation
function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="View Questions" component={ViewQuestions} />
      <Stack.Screen name="Add Question" component={AddQuestion} />
      <Stack.Screen name="Question Detail" component={QuestionDetails} />
    </Stack.Navigator>
  );
}


// HomeScreen viser forsiden med tre knapper
function HomeScreen({ navigation }) {
  // Liste over knapper og deres funktioner
  const buttons = [
    {
      key: "1",
      label: "Chat forum",
      onPress: () => navigation.navigate("View Questions"),
    },
    {
      key: "2",
      label: "Lær om investering",
      onPress: () => alert("Knap 2 funktion"),
    },
    {
      key: "3",
      label: "Spil investeringsspillet",
      onPress: () => alert("Knap 3 funktion"),
    },
  ];

  // Layout for forsiden
  return (
    <View style={GS.container}>
      <View style={GS.homeWrapper}>
        <View style={GS.card}>
          <Text style={GS.homeTitle}>Invest Lab</Text>
          <FlatList
            data={buttons}
            renderItem={({ item }) => (
              <TouchableOpacity style={GS.button} onPress={item.onPress}>
                <Text style={GS.buttonText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      </View>
    </View>
  );
}


// App root: Wrapper med UserProvider og SafeAreaProvider
export default function App() {
  return (
    <UserProvider>
      <SafeAreaProvider style={{ backgroundColor: "#181A20" }}>
        {/* Global header med brugerinfo */}
        <AppHeader />
        {/* Navigation mellem skærme */}
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}