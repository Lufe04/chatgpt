import React, { useEffect, useState } from "react";
import {View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { APIResponse } from '@/interfaces/Responses';
import { Message } from "@/interfaces/AppInterfaces";

export default function ChatScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState("Explain how AI works");
    // Boolean -> is
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([] as Message[]);
    // La variable, set de la variable

    // 1. ListMessages
    // 2. Add scroll
    // 3. Add input
    // 4. who is the sender?

    const getResponse = async () => {
        try {
            setIsLoading(true);
            // Axios
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCFPEdbkbO_90iTylK8KrsOtQzKSVCxiNE", {
                method: "POST",
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{ "text": message }]
                    }]
                })
            });
            const data: APIResponse = await response.json();
            console.log({ data });
            setMessage(data?.candidates[0]?.content?.parts[0]?.text)
        } catch (error) {
            console.log("Error:", { error })
        } finally {
            setIsLoading(false);
        }
    }


  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
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
          renderItem={({ Message }) => (
            <View style={[styles.messageContainer, Message.sender_by === "user" ? styles.userMessage : styles.botMessage]}>
              <Text style={styles.messageText}>{Message.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.messageList}
          keyboardShouldPersistTaps="handled"
        />

        <View style={{ flex: 1}}> { isLoading ? <Text>Esta cargando...</Text> : <Text>{message}</Text>} </View>

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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c2d31",
    borderRadius: 30,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15, // Esto hace que siempre esté al fondo
  },
  input: { flex: 1, color: "white", paddingHorizontal: 10 },
  sendButton: { backgroundColor: "#10A37F", padding: 10, borderRadius: 20 },
});
function setKeyboardVisible(arg0: boolean): void {
    throw new Error("Function not implemented.");
}

