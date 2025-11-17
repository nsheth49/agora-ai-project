// import React from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// // @ts-ignore: no type declarations for react-native-vector-icons submodules
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// const AIChatScreen = () => {
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>AGORA AI</Text>
//       </View>

//       {/* Main Content */}
//       <View style={styles.main}>
//         <Text style={styles.subtitle}>Conversation with Agora will appear here…</Text>
//       </View>

//       {/* Chat Input Row */}
//       <View style={styles.inputRow}>
//         <TouchableOpacity style={styles.plusButton}>
//           <AntDesign name="plus" size={24} color="#120c00" />
//         </TouchableOpacity>
//         <TextInput
//           style={styles.input}
//           placeholder="Ask anything"
//           placeholderTextColor="#444"
//         />
//         <TouchableOpacity style={styles.micButton}>
//             {/* <AntDesign name="sound" size={24} color="#120c00" /> */}
//             <MaterialIcons name="mic" size={24} color="#120c00" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, backgroundColor: '#fff',
//   },
//   header: {
//     backgroundColor: '#ffe22a',
//     paddingTop: 40,
//     paddingBottom: 12,
//     alignItems: 'center',
//     borderBottomLeftRadius: 16,
//     borderBottomRightRadius: 16,
//   },
//   title: {
//     fontSize: 24, fontWeight: 'bold', color: '#120c00',
//   },
//   main: {
//     flex: 1, justifyContent: 'center', alignItems: 'center',
//   },
//   subtitle: {
//     fontSize: 18, color: '#6e6e6e', fontWeight: '400',
//   },
//   inputRow: {
//     flexDirection: 'row', alignItems: 'center',
//     padding: 12, borderTopWidth: 1, borderColor: '#eee',
//     backgroundColor: '#eee', marginHorizontal: 8,
//     borderRadius: 32, marginBottom: 16,
//   },
//   plusButton: {
//     backgroundColor: '#fff',
//     borderRadius: 24, padding: 8, marginRight: 8,
//   },
//   micButton: {
//     backgroundColor: '#fff',
//     borderRadius: 24, padding: 8, marginLeft: 8,
//   },
//   input: {
//     flex: 1, backgroundColor: '#fff',
//     borderRadius: 16, paddingVertical: 8, paddingHorizontal: 16,
//     fontSize: 16, color: '#120c00',
//   },
// });

// export default AIChatScreen;
