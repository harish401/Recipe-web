import React from 'react'

export default function Explore() {
  return (
    <div>Explore</div>
  )
}


// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { Card, Chip, IconButton, Tooltip, Button, Avatar, ActivityIndicator } from 'react-native-paper';
// import { MaterialIcons } from '@expo/vector-icons';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import * as ImagePicker from 'expo-image-picker';
// import recipesData from './prompt.json';
// import { ThemeContext } from '../context/ThemeContext';

// const ChatScreen = () => {
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState([]);
//   const [response, setResponse] = useState('');
//   const [recipes, setRecipes] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [typingComplete, setTypingComplete] = useState(false);
//   const outputRef = useRef(null);
//   const [editMode, setEditMode] = useState(false);
//   const [originalInput, setOriginalInput] = useState('');
//   const navigation = useNavigation();
//   const abortControllerRef = useRef(null);
//   const user = useSelector((state) => state.user.user);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [imageResponse, setImageResponse] = useState('');
//   const [typeResponses, setTypedResponse] = useState('');
//   useEffect(() => {
//     if (outputRef.current) {
//       outputRef.current.scrollToEnd({ animated: true });
//     }
//   }, [output]);

//   useEffect(() => {
//     fetchRecipes();
//   }, []);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('beforeRemove', () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//     });

//     return unsubscribe;
//   }, [navigation]);

//   const fetchRecipes = () => {
//     try {
//       setRecipes(recipesData); // Use the imported JSON data directly
//       generateSuggestions(recipesData); // Assuming this is a custom function
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     }
//   };

//   const generateSuggestions = (recipes) => {
//     const allWords = recipes.flatMap(recipe => recipe.title.split(' '));
//     const uniqueWords = Array.from(new Set(allWords)); // Remove duplicates
//     setSuggestions(uniqueWords);
//   };

//   const handleInputChange = (text) => {
//     setInput(text);
//   };

//   const handleSubmit = async () => {
//     if (input.trim() === '') return;

//     setLoading(true);
//     const userAvatar = user ? user.firstName[0] : '👤'; // Use user's first name initial as avatar
//     setOutput((prevOutput) => [...prevOutput, { type: 'question', text: input, avatar: userAvatar }]);
//     setOriginalInput(input); // Save the original input
//     fetchGroqCompletion(input);
//     setInput('');
//   };

//   const fetchGroqCompletion = async (message) => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }

//     abortControllerRef.current = new AbortController();

//     try {
//       const response = await axios.get(`https://recipe-api-1-a5qq.onrender.com/groq/chat-completion?message=${message}`, {
//         signal: abortControllerRef.current.signal,
//       });
//       const data = response.data; // Assuming the API response is in JSON format
//       typeResponse(data);
//     } catch (error) {
//       if (error.name === 'AbortError') {
//         console.log('Request aborted');
//       } else {
//         console.error('Error fetching Groq completion:', error);
//         typeResponse(`Error: Could not fetch response.`);
//       }
//     } finally {
//       setLoading(false); // Stop the loading indicator
//     }
//   };

//   const typeResponse = (text) => {
//     let currentText = '';
//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < text.length) {
//         currentText += text[index];
//         setResponse(currentText);
//         index++;
//       } else {
//         clearInterval(interval);
//         setTypingComplete(true);
//         const botAvatar = require('../../assets/splash.png'); // Use bot's image as avatar
//         setOutput((prevOutput) => [...prevOutput, { type: 'answer', text: currentText, avatar: botAvatar }]);
//         setResponse(''); // Clear the response state after adding it to the output
//       }
//     }, 4);
//   };

//   const handleSuggestionClick = (word) => {
//     setInput((prev) => `${prev} ${word}`.trim());
//   };

//   const shuffleArray = (array) => {
//     let shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   };

//   const [displayedSuggestions, setDisplayedSuggestions] = useState([]);

//   useEffect(() => {
//     if (suggestions.length > 0) {
//       const shuffled = shuffleArray(suggestions);
//       const sliced = shuffled.slice(0, 10);
//       setDisplayedSuggestions(sliced);
//     }
//   }, [suggestions]);

//   const handleRegenerate = () => {
//     fetchGroqCompletion(originalInput);
//   };

//   const handleEdit = () => {
//     setEditMode(true);
//     setInput(originalInput);
//   };

//   const renderResponse = (text) => {
//     const lines = text.split('\n');
//     return lines.map((line, index) => {
//       if (line.startsWith('**')) {
//         return (
//           <Text key={index} style={styles.boldText}>
//             {line.replace(/\*\*/g, '')}
//           </Text>
//         );
//       } else if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.')) {
//         return (
//           <Text key={index} style={styles.listText}>
//             {line}
//           </Text>
//         );
//       } else {
//         return (
//           <Text key={index} style={styles.answerText}>
//             {line}
//           </Text>
//         );
//       }
//     });
//   };

//   const { theme } = useContext(ThemeContext);

//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     // Request permission to access media library
//     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
//     if (permissionResult.granted === false) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }

//     // Open the image picker
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       // Set the image URI to state
//       setImage(result.assets[0].uri);
//     }
//   };
//   const openCamera = async () => {
//     // Ask the user for the permission to access the camera
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
//     if (permissionResult.granted === false) {
//       alert("You've refused to allow this appp to access your camera!");
//       return;
//     }
    
//     const result = await ImagePicker.launchCameraAsync();
    
//     // Explore the result
//     console.log(result);
    
//     if (!result.cancelled) {
//         setImage(result.assets[0].uri);
//       console.log(result.uri);
//     }
// }
//   const [uploading, setUploading] = useState(false);
//   const handleImageUpload = async () => {
//     if (image) {
//       let uriParts = image.split('.');
//       let fileType = uriParts[uriParts.length - 1];

//       // Create a form data object
//       const formData = new FormData();
//       formData.append('image', {
//         uri: image,  // Image URI
//         name: `photo.${fileType}`,  // Dynamic name
//         type: `image/${fileType}`,  // Image type
//       });

//       // Set up request options
//       const requestOptions = {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       };
//       setUploading(true);
//       try {
//         const response = await fetch('http://recipe-api-1-a5qq.onrender.com/groq/image-recognition', requestOptions);
//         const result = await response.json();
//         setImageResponse(result);
//         typeResponsevalue(result); 
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         setImageResponse('Error: Could not process the image.');
//       }
//       finally {
//         setUploading(false);
//       }
//     } else {
//       console.error("No image selected");
//     }
//   };
//   const typeResponsevalue = (response) => {
//     let description = response.description || '';
//     let recipe = response.recipe || '';

//     let fullText = `Description: ${description}\nRecipe: ${recipe}`;
//     let index = 0;
//     setTypedResponse(''); // Reset typed response

//     const typeInterval = setInterval(() => {
//       if (index < fullText.length) {
//         setTypedResponse((prev) => prev + fullText[index]);
//         index++;
//       } else {
//         clearInterval(typeInterval);
//       }
//     }, 3); // Adjust speed as needed
//   };
//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <View style={styles.tabsContainer}>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
//           onPress={() => setActiveTab('chat')}
//         >
//           <Text style={styles.tabText}>Ask with RecipeHub</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'image' && styles.activeTab]}
//           onPress={() => setActiveTab('image')}
//         >
//           <Text style={styles.tabText}>Send Pic and Get Recipe</Text>
//         </TouchableOpacity>
//       </View>

//       {activeTab === 'chat' ? (
//         <>
//           <Text style={[styles.title, { color: theme.text }]}>Chat with Recipe Bot</Text>

//           {/* Suggestion Chips */}
//           <View style={styles.suggestionsContainer}>
//             {displayedSuggestions.map((word, index) => (
//               <Tooltip key={index} title={`Click to add "${word}" to the input`}>
//                 <Chip
//                   mode="outlined"
//                   onPress={() => handleSuggestionClick(word)}
//                   style={styles.chip}
//                 >
//                   {word}
//                 </Chip>
//               </Tooltip>
//             ))}
//           </View>

//           <ScrollView ref={outputRef} style={[styles.outputContainer, { backgroundColor: theme.surface }]}>
//             {output.map((item, index) => (
//               <View key={index} style={item.type === 'question' ? styles.questionContainer : styles.answerContainer}>
//                 {item.type === 'question' ? (
//                   <Avatar.Text size={32} label={item.avatar} />
//                 ) : (
//                   <Avatar.Image size={32} source={item.avatar} />
//                 )}
//                 <Text style={[item.type === 'question' ? styles.questionText : styles.answerText, { color: theme.text }]}>
//                   {renderResponse(item.text)}
//                 </Text>
//               </View>
//             ))}
//             {response && typingComplete && (
//               <View style={styles.answerContainer}>
//                 <Avatar.Image size={32} source={require('../../assets/splash.png')} />
//                 <Text style={[styles.answerText, { color: theme.text }]}>{renderResponse(response)}</Text>
//               </View>
//             )}
//           </ScrollView>

//           <TextInput
//             style={[styles.input, { color: theme.text }]}
//             value={input}
//             placeholderTextColor={theme.text}
//             onChangeText={handleInputChange}
//             placeholder="Type your message here..."
//           />
//           <View style={styles.buttonContainer}>
//             <Button
//               style={{ marginTop: 5, borderRadius: 10, backgroundColor: 'tomato' }}
//               mode="contained"
//               onPress={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? 'Loading...' : 'Send'}
//             </Button>
//             {typingComplete && (
//               <View style={styles.iconContainer}>
//                 <IconButton icon="refresh" onPress={handleRegenerate} />
//                 <IconButton icon="pencil" onPress={handleEdit} />
//               </View>
//             )}
//           </View>
//         </>
//       ) : (
//         <>
//           <Text style={[styles.title, { color: theme.text }]}>Send Pic and Get Recipe</Text>
//           {!image && <View  style={{ width: 390, height: 240,resizeMode:'cover',marginTop:10,borderRadius:10,backgroundColor:'#e5e5e5' }} />}
//           {image && <Image source={{ uri: image }} style={{ width: 390, height: 240,resizeMode:'cover',marginTop:10,borderRadius:10 }} />}
//          <View style={{flexDirection:'row',padding:10}}>
//          {image &&(
//           <Button
//             style={{ marginTop: 5, borderRadius: 10, backgroundColor: 'tomato',position:'absolute',bottom:170,left:150 }}
//             mode="contained"
//             onPress={handleImageUpload}
//           >

//            {!uploading ? 'Click to Upload ' : 'please wait ...'} 
//           </Button>
//       )}
//           <Button
//             style={{ marginTop: 5,marginLeft:5, borderRadius: 10, backgroundColor: 'tomato', }}
//             mode="contained"
//             onPress={pickImage}
//           >
//            Pick an image from gallery
//           </Button>
//           <Button
//             style={{ marginTop: 5,marginLeft:5, borderRadius: 10, backgroundColor: 'tomato', }}
//             mode="contained"
//             onPress={openCamera}
//           >
//           Open cam
//           </Button>
//           </View>
//           {uploading && (
//             <View>
//         <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 20 }} />
//         <Text style={{color:'silver'}}>Generating...</Text>
//         </View>
//       )}

 
         
//           <ScrollView>
//           {typeResponses && (
//   <View style={styles.imageResponseContainer}>
//     <Text style={[styles.answerText, { color: theme.text }]}>
//       <Text style={styles.boldText}>Description:</Text> {typeResponses}
//     </Text>
//     {/* <Text style={[styles.answerText, { color: theme.text }]}>
//       <Text style={styles.boldText}>Recipe:</Text> {imageResponse.recipe}
//     </Text> */}
//   </View>
// )}
//           </ScrollView>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   tab: {
//     flex: 1,
//     padding: 10,
//     alignItems: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//   },
//   activeTab: {
//     borderBottomColor: 'tomato',
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   suggestionsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 16,
//   },
//   chip: {
//     margin: 4,
//   },
//   outputContainer: {
//     flex: 1,
//     width: '100%',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   questionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   answerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     paddingRight: 25,
//   },
//   questionText: {
//     fontFamily: 'Monaco, monospace',
//     fontSize: 14,
//     marginLeft: 8,
//   },
//   answerText: {
//     fontFamily: 'Monaco, monospace',
//     fontSize: 14,
//     marginLeft: 8,
//   },
//   boldText: {
//     fontFamily: 'Monaco, monospace',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   listText: {
//     fontFamily: 'Monaco, monospace',
//     fontSize: 14,
//     marginLeft: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     marginBottom: 16,
//     borderRadius: 8,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   imageResponseContainer: {
//     marginTop: 16,
//     padding: 16,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//   },
// });

// export default ChatScreen;
