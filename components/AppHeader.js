import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useUser } from "../UserContext";
import { GlobalStyle as GS } from "../styles/GlobalStyle";

// AppHeader viser den globale header med aktiv bruger og mulighed for at skifte bruger.
// Styling hentes fra GlobalStyle.js for at matche appens tema.
export default function AppHeader() {
  // Hent aktiv bruger og skift-funktion fra global context
  const { activeUser, switchUser } = useUser();
  return (
    <View style={GS.header}>
      {/* Wrapper med styling fra GlobalStyle.header */}
      <Text style={GS.headerText}>
        Bruger: {activeUser.name}
      </Text>
      <TouchableOpacity
        style={GS.headerButton}
        onPress={switchUser}
        activeOpacity={0.7}
      >
        {/* Tekst på knappen */}
        <Text style={GS.headerButtonText}>
          Skift bruger
        </Text>
      </TouchableOpacity>
    </View>
  );
}