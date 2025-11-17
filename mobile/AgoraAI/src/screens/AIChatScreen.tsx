/*
Author: Niket Sheth
*/

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator,
  Keyboard, ScrollView, Modal
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

const SUGGESTION_LIST = [
  "What's the new zoning law?",
  "Local recycling schedule?",
  "Climate Change",
  "Upcoming community events?",
  "Rules/laws"
];

const BACKEND_API_URL = 'http://10.0.2.2:5000/api/gemini';

const AIChatScreen = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState(SUGGESTION_LIST);

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

      const aiText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) {
        setMessages(prev => [...prev, { role: 'ai', content: aiText.trim() }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, there was a problem getting a response. Please try again.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Error contacting AI service. Please try again later.' }]);
    }
    setLoading(false);
  };

  const handleSend = () => {
    if (question.trim() && !loading) {
      getAIResponse(question);
    }
  };

  // Simulate refreshing suggestions
  const handleRefresh = () => {
    setSuggestions(prev => [...prev.slice(1), prev[0]]);
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
            <Text
              style={[
                msg.role === 'user' ? styles.userText : styles.aiText,
                { flexShrink: 1, flexWrap: 'wrap' }
              ]}
            >
              {msg.content}
            </Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="large" color="#FFD600" style={{ marginTop: 16 }} />}
      </ScrollView>
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.plusButton} disabled={loading} onPress={() => setShowSheet(true)}>
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
      {/* Sheet: Camera/Photos/Files/Etc */}
      <Modal
        visible={showSheet}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setShowSheet(false)}
      >
        <TouchableOpacity style={styles.sheetOverlay} activeOpacity={1} onPress={() => setShowSheet(false)} />
        <View style={styles.sheetContainer}>
          <View style={styles.sheetBar} />
          <View style={styles.sheetRows}>
            <TouchableOpacity style={styles.sheetIconBox}>
              <MaterialIcons name="photo-camera" size={38} color="#232323" />
              <Text style={styles.sheetIconLabel}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sheetIconBox}>
              <MaterialIcons name="photo-library" size={38} color="#232323" />
              <Text style={styles.sheetIconLabel}>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sheetIconBox}>
              <MaterialIcons name="insert-drive-file" size={38} color="#232323" />
              <Text style={styles.sheetIconLabel}>Files</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.sheetList]}>
            <TouchableOpacity
              style={styles.sheetListItem}
              onPress={() => {
                setShowSheet(false);
                setTimeout(() => setShowSuggestions(true), 350);
              }}
            >
              <MaterialIcons name="edit" size={22} color="#222" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.sheetListTitle}>Generation (beta)</Text>
                <Text style={styles.sheetListSub}>Auto create a question for me</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sheetListItem}
              onPress={() => {
                setShowSheet(false);
                setTimeout(() => setShowSuggestions(true), 350);
              }}
            >
              <MaterialIcons name="wb-sunny" size={22} color="#222" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.sheetListTitle}>Suggestions</Text>
                <Text style={styles.sheetListSub}>Generates a sample list of civics questions</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.sheetListItem}>
              <MaterialIcons name="settings" size={22} color="#222" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.sheetListTitle}>Customization</Text>
                <Text style={styles.sheetListSub}>Choose your preferences</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Suggestions Modal (matches your wireframe) */}
      <Modal
        visible={showSuggestions}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setShowSuggestions(false)}
      >
        <TouchableOpacity style={styles.sheetOverlay} activeOpacity={1} onPress={() => setShowSuggestions(false)} />
        <View style={styles.suggContainer}>
          <View style={styles.suggBar} />
          <View style={styles.suggInner}>
            <View style={styles.suggSearchRow}>
              <MaterialIcons name="search" size={22} color="#888" />
              <Text style={styles.suggSearchPlaceholder}>Search from the below...</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.tryAsking}>Try Asking..</Text>
              <TouchableOpacity style={styles.suggRefresh} onPress={handleRefresh}>
                <MaterialIcons name="refresh" size={26} color="#232323" />
              </TouchableOpacity>
            </View>
            <View style={styles.suggChipsWrap}>
              {suggestions.map((text, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.suggChip}
                  onPress={() => {
                    setShowSuggestions(false);
                    setTimeout(() => setQuestion(text), 200);
                  }}
                >
                  <Text style={styles.suggChipText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
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
  userText: { color: '#1976D2', fontSize: 16, flexShrink: 1, flexWrap: 'wrap' },
  aiText: { color: '#222', fontSize: 16, flexShrink: 1, flexWrap: 'wrap' },
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
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(40,30,30,0.17)',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 0,
    paddingTop: 10,
    paddingBottom: 11,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 9,
    shadowColor: '#111',
    shadowOpacity: 0.11,
    shadowRadius: 16,
  },
  sheetBar: {
    width: 67,
    height: 7,
    backgroundColor: '#eee',
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 22,
  },
  sheetRows: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 18,
    marginHorizontal: 0,
  },
  sheetIconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
    borderRadius: 24,
    width: 112,
    height: 112,
    marginHorizontal: 7,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 2
  },
  sheetIconLabel: {
    fontSize: 16,
    color: '#232323',
    fontWeight: '600',
    marginTop: 13,
  },
  sheetList: {
    marginHorizontal: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  sheetListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },
  sheetListTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  sheetListSub: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  // SUGGESTIONS SHEET
  suggContainer: {
    backgroundColor: "#f8f4fa",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingHorizontal: 0,
    paddingBottom: 21,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 10,
    shadowColor: '#222',
    shadowOpacity: 0.12,
    shadowRadius: 19,
  },
  suggBar: {
    width: 60,
    height: 6,
    backgroundColor: '#e7e3e3',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 9,
  },
  suggInner: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 10,
  },
  suggSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eae3ef',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 9,
    marginTop: 3,
  },
  suggSearchPlaceholder: {
    marginLeft: 12,
    color: "#888",
    fontSize: 17,
    fontWeight: "500",
    flex: 1,
  },
  tryAsking: {
    fontWeight: "bold",
    fontSize: 21,
    color: "#161417",
    marginBottom: 11,
    marginTop: 9,
  },
  suggRefresh: {
    marginRight: 7,
    marginTop: 2,
  },
  suggChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 6,
  },
  suggChip: {
    paddingVertical: 9,
    paddingHorizontal: 17,
    backgroundColor: "#e3e0e4",
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginRight: 8,
    marginBottom: 8,
  },
  suggChipText: {
    fontSize: 15,
    color: "#212121",
    fontWeight: "600",
  }
});

export default AIChatScreen;
