import React, { createContext, useState, useContext } from "react";

// Liste over "simulerede" brugere
const users = [
  { id: 1, name: "Bruger A" },
  { id: 2, name: "Bruger B" }
];

// Opretter en global context til brugerdata
const UserContext = createContext();

// Provider-komponent der holder styr på aktiv bruger og skift-funktion
export function UserProvider({ children }) {
  // State for den aktive bruger
  const [activeUser, setActiveUser] = useState(users[0]);

  // Funktion til at skifte mellem brugere
  const switchUser = () => {
    setActiveUser(u => u.id === 1 ? users[1] : users[0]);
  };

  // Gør context tilgængelig for hele appen
  return (
    <UserContext.Provider value={{ activeUser, switchUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook til nem adgang til brugerdata
export function useUser() {
  return useContext(UserContext);
}