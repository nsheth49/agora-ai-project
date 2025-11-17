import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore: no type declarations for react-native-vector-icons submodules
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

// const BACKEND_API_URL = 'http://localhost:5000/api/gemini'; // Use your backend address
const BACKEND_API_URL = 'http://10.0.2.2:5000/api/gemini'; // Use 10.0.2.2 for Android Emulator

const AIChatScreen = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const getAIResponse = async (userQuestion: string) => {
    if (!userQuestion.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: userQuestion }]);
    setQuestion('');
    setLoading(true);
    Keyboard.dismiss();

    try {
      const result = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuestion }),
      });
      const json = await result.json();
      console.log(json); // log backend response for debugging

      // Parse Gemini response from backend
      const aiText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) {
        setMessages(prev => [...prev, { role: 'ai', content: aiText.trim() }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, there was a problem getting a response. Please try again.' }]);
      }
    } catch (error) {
      console.log(error);
      setMessages(prev => [...prev, { role: 'ai', content: 'Error contacting AI service. Please try again later.' }]);
    }
    setLoading(false);
  };

  const handleSend = () => {
    if (question.trim() && !loading) {
      getAIResponse(question);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AGORA AI</Text>
      </View>
      <ScrollView
        style={styles.main}
        contentContainerStyle={{ paddingVertical: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 && <Text style={styles.subtitle}>Conversation with Agora will appear here…</Text>}
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.messageBubble,
              msg.role === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={msg.role === 'user' ? styles.userText : styles.aiText}>{msg.content}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="large" color="#FFD600" style={{ marginTop: 16 }} />}
      </ScrollView>
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.plusButton} disabled={loading}>
          <AntDesign name="plus" size={24} color="#120c00" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Ask anything"
          placeholderTextColor="#444"
          value={question}
          onChangeText={setQuestion}
          editable={!loading}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.micButton} disabled={loading}>
          <MaterialIcons name="mic" size={24} color="#120c00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} disabled={loading || !question.trim()} onPress={handleSend}>
          <AntDesign name="arrowright" size={24} color="#120c00" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#ffe22a',
    paddingTop: 40,
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#120c00' },
  main: { flex: 1, paddingHorizontal: 12 },
  subtitle: { fontSize: 18, color: '#6e6e6e', fontWeight: '400', alignSelf: 'center' },
  messageBubble: {
    padding: 12,
    marginVertical: 5,
    maxWidth: '85%',
    borderRadius: 18,
    alignSelf: 'flex-start',
    shadowColor: '#FFD600',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  userBubble: {
    backgroundColor: '#E3F2FD',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  aiBubble: {
    backgroundColor: '#FFFDE7',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  userText: { color: '#1976D2', fontSize: 16 },
  aiText: { color: '#222', fontSize: 16 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, borderTopWidth: 1, borderColor: '#eee',
    backgroundColor: '#eee', marginHorizontal: 8,
    borderRadius: 32, marginBottom: 16,
  },
  plusButton: {
    backgroundColor: '#fff',
    borderRadius: 24, padding: 8, marginRight: 8,
  },
  micButton: {
    backgroundColor: '#fff',
    borderRadius: 24, padding: 8, marginLeft: 8,
  },
  sendButton: {
    backgroundColor: '#ffe22a',
    borderRadius: 24, padding: 8, marginLeft: 8,
  },
  input: {
    flex: 1, backgroundColor: '#fff',
    borderRadius: 16, paddingVertical: 8, paddingHorizontal: 16,
    fontSize: 16, color: '#120c00',
  },
});

export default AIChatScreen;
