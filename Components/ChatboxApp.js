import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Send message + auto bot reply
  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [userMessage, ...prev]);
    setInput("");

    // Bot reply
    setTimeout(() => {
      const botReplies = [
        "Hello Michael Vallecer! 👋",
        "How can I help you?",
        "Nice to meet you!",
        "That's interesting 🤔",
        "Can you tell me more?",
        "What's going on?",
        "Are you okay?",
        "I see, go on...",
      ];

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text:
          "🤖 Bot: " +
          botReplies[Math.floor(Math.random() * botReplies.length)],
        sender: "bot",
      };

      setMessages((prev) => [botMessage, ...prev]);
    }, 800);
  };

  // Render each message bubble
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === "user" ? { color: "white" } : { color: "black" },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <LinearGradient colors={["#89f7fe", "#66a6ff"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted // keeps messages at the bottom without flicker
          contentContainerStyle={styles.messages}
        />

        {/* Input */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#666"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  messages: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 10,
  },
  message: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 18,
    maxWidth: "75%",
  },
  userMessage: {
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#e4e6eb",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputBox: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "white",
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});