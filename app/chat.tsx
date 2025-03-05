import React, { useEffect, useState } from "react";
import {View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { Message } from "@/interfaces/AppInterfaces";
import { APIResponse } from "@/interfaces/Responses";

export default function ChatScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const getResponse = async () => {
    if (!message.trim()) return;

    // Agregar mensaje del usuario a la lista
    const userMessage: Message = {
      text: message,
      sender_by: "Me",
      date: new Date(),
      state: "viewed",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCFPEdbkbO_90iTylK8KrsOtQzKSVCxiNE",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage.text }] }],
          }),
        }
      );

      const data: APIResponse = await response.json();
      const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      // Agregar respuesta del bot a la lista
      const botMessage: Message = {
        text: botResponse,
        sender_by: "bot",
        date: new Date(),
        state: "received",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "position"}>
        {/* Barra superior */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.navigate("/capabilities")}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Image source={require("../assets/images/Vector.png")} style={styles.logo} />
        </View>

        {/* Contenedor de mensajes */}
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={[styles.messageContainer, item.sender_by === "Me" ? styles.userMessage : styles.botMessage]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.messageList}
          keyboardShouldPersistTaps="handled"
        />

        {isLoading && <Text style={styles.loadingText}>Cargando...</Text>}

        {/* Caja de entrada */}
        <View style={[styles.inputContainer, isKeyboardVisible && { marginBottom: 10 }]}>
          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            returnKeyType="send"
            onSubmitEditing={getResponse}
          />
          <TouchableOpacity style={styles.sendButton} onPress={getResponse}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#343541" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: "11%",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  logo: { width: 24, height: 24, resizeMode: "contain" },
  messageList: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
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
  loadingText: {
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c2d31",
    borderRadius: 30,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  input: { flex: 1, color: "white", paddingHorizontal: 10 },
  sendButton: { backgroundColor: "#10A37F", padding: 10, borderRadius: 20 },
});
