import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { handleUrlParams } from "expo-router/build/fork/getStateFromPath-forks";
import { useNavigation } from "expo-router";

export default function ChatScreen() {

    const navigation = useNavigation();
      useEffect(() => {
        navigation.setOptions({ headerShown: false });
      }, [navigation]);
      
    const [messages, setMessages] = useState<{ id: number; text: string; sender: string; }[]>([]);
    const [message, setMessage] = useState("");   // Almacena el input del usuario

    const handleSendMessage = () => {
        if (message.trim() === "") return; // Evita mensajes vacíos
      
        // Mensaje del usuario
        const userMessage = { id: Date.now(), text: message, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setMessage(""); // Limpia el input
      
        // Simular respuesta del bot después de 1 segundo
        setTimeout(() => {
          const botMessage = { id: Date.now(), text: "Esta es una respuesta automática.", sender: "bot" };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
      };
      

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require("../assets/images/Frame.png")} style={styles.logo} />
      </View>

      {/* Lista de mensajes */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === "user" ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      />

      {/* Barra de entrada de texto */}
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Escribe un mensaje..."
        placeholderTextColor="#999"
        value={message}
        onChangeText={setMessage}
        returnKeyType="send"
        onSubmitEditing={handleSendMessage} // Ahora también responde automáticamente
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
        <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#343541", paddingBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  logo: { width: 24, height: 24, resizeMode: "contain" },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  userMessage: { backgroundColor: "#10A37F", alignSelf: "flex-end" },
  botMessage: { backgroundColor: "#444" },
  messageText: { color: "white" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c2d31",
    borderRadius: 30,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: { flex: 1, color: "white", paddingHorizontal: 10 },
  sendButton: { backgroundColor: "#10A37F", padding: 10, borderRadius: 20 },
});
