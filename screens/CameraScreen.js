

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
// import { Camera } from 'expo-camera'; // Import Camera directly
// import { FontAwesome } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const CameraScreen =  async() => {
//   const navigation = useNavigation();
//   const [hasPermission, setHasPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [photos, setPhotos] = useState([]);
//   const [selectedPhotos, setSelectedPhotos] = useState([]);

//   const { status } = await Camera.requestCameraPermissionsAsync();
//   if (status !== 'granted') {
//     Alert.alert('Permission Denied', 'Camera access is required.');
//     return;
//   }
  

//   const takePicture = async () => {
//     if (camera) {
//       const photo = await camera.takePictureAsync();
//       setPhotos([...photos, photo]);
//     }
//   };

//   const toggleSelectPhoto = (photoUri) => {
//     if (selectedPhotos.includes(photoUri)) {
//       setSelectedPhotos(selectedPhotos.filter((uri) => uri !== photoUri));
//     } else {
//       setSelectedPhotos([...selectedPhotos, photoUri]);
//     }
//   };

//   const navigateToDisplayPictures = () => {
//     navigation.navigate('PDF', { selectedPhotos });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {hasPermission === null ? (
//         <Text>Requesting camera permission...</Text>
//       ) : hasPermission === false ? (
//         <Text>No access to camera</Text>
//       ) : (
//         <View style={{ flex: 1 }}>
//           <Camera
//             ref={(ref) => setCamera(ref)}
//             style={{ width: '100%', height: '80%' }}
//             type={Camera.Constants.Type.back}
//           />
//           <ScrollView horizontal>
//             {photos.map((photo, index) => (
//               <TouchableOpacity key={index} onPress={() => toggleSelectPhoto(photo.uri)}>
//                 <Image
//                   source={{ uri: photo.uri }}
//                   style={{
//                     width: 100,
//                     height: 100,
//                     margin: 5,
//                     borderRadius: 10,
//                     borderWidth: selectedPhotos.includes(photo.uri) ? 2 : 0,
//                     borderColor: 'blue',
//                   }}
//                 />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       )}
//       <TouchableOpacity
//         onPress={navigateToDisplayPictures}
//         style={{
//           position: 'absolute',
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginTop: 30,
//           width: 100,
//           height: 80,
//           backgroundColor: 'red',
//           borderRadius: 10,
//           alignSelf: 'center',
//         }}
//       >
//         <Text>Display Photo</Text>
//       </TouchableOpacity>
//       <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', alignSelf: 'center', marginTop: '150%' }}>
//         <TouchableOpacity
//           style={{ width: 100, height: 100, backgroundColor: 'white', borderRadius: 80, justifyContent: 'center', alignItems: 'center' }}
//           onPress={takePicture}
//         >
//           <View style={{ width: 90, height: 90, backgroundColor: 'black', borderRadius: 80, justifyContent: 'center', alignItems: 'center' }}>
//             <FontAwesome name="camera" size={24} color="white" />
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CameraScreen;



////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
// import { Camera, CameraType } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';
// import { FontAwesome } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const CameraScreen = () => {
//   const navigation = useNavigation();
//   const [hasPermission, setHasPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [photos, setPhotos] = useState([]);
//   const [selectedPhotos, setSelectedPhotos] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
//       const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

//       if (cameraStatus === 'granted' && mediaStatus === 'granted') {
//         setHasPermission(true);
//       } else {
//         setHasPermission(false);
//         Alert.alert("Permission Denied", "You need to grant camera and media library permissions.");
//       }
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (camera) {
//       const photo = await camera.takePictureAsync();
//       setPhotos([...photos, photo]);
//     }
//   };

//   const toggleSelectPhoto = (photoUri) => {
//     if (selectedPhotos.includes(photoUri)) {
//       setSelectedPhotos(selectedPhotos.filter((uri) => uri !== photoUri));
//     } else {
//       setSelectedPhotos([...selectedPhotos, photoUri]);
//     }
//   };

//   const navigateToDisplayPictures = () => {
//     navigation.navigate('PDF', { selectedPhotos });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {hasPermission === null ? (
//         <Text style={{ marginTop: 50, marginLeft: 40 }}>Requesting camera permission...</Text>
//       ) : hasPermission === false ? (
//         <Text>No access to camera</Text>
//       ) : (
//         <View style={{ flex: 1 }}>
//           <Camera
//             ref={(ref) => setCamera(ref)}
//             style={{ width: '100%', height: '80%' }}
//             type={Camera.Constants.Type.back}

//           />
//           <ScrollView horizontal style={{ marginTop: 30 }}>
//             {photos.map((photo, index) => (
//               <TouchableOpacity key={index} onPress={() => toggleSelectPhoto(photo.uri)}>
//                 <Image
//                   source={{ uri: photo.uri }}
//                   style={{
//                     width: 100,
//                     height: 100,
//                     margin: 5,
//                     borderRadius: 10,
//                     borderWidth: selectedPhotos.includes(photo.uri) ? 2 : 0,
//                     borderColor: 'blue',
//                   }}
//                 />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//           <TouchableOpacity
//             onPress={navigateToDisplayPictures}
//             style={{ position: 'absolute', alignSelf: 'center', marginTop: '30%', backgroundColor: 'red', padding: 10, borderRadius: 10 }}
//           >
//             <Text style={{ color: 'white' }}>Display Photos</Text>
//           </TouchableOpacity>
//           <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
//             <TouchableOpacity onPress={takePicture} style={{ backgroundColor: 'white', borderRadius: 50, padding: 20 }}>
//               <FontAwesome name="camera" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// export default CameraScreen;



////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
// import { Camera } from 'expo-camera';

// import * as MediaLibrary from 'expo-media-library'; // Correct import

// export default function CameraScreen() {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [photoList, setPhotoList] = useState([]);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);

//   // Request Permissions
//   useEffect(() => {
//     const requestPermissions = async () => {
//       try {
//         // Request Camera Permission
//         const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
//         setHasCameraPermission(cameraStatus === 'granted');

//         // Request Media Library Permission
//         const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
//         setHasMediaLibraryPermission(mediaStatus === 'granted');
//       } catch (error) {
//         console.error('Error requesting permissions:', error);
//       }
//     };

//     requestPermissions();
//   }, []);

//   // Open Camera
//   const openCamera = () => {
//     setIsCameraOpen(true);
//   };

//   // Take Picture and Save to Gallery
//   const takePicture = async () => {
//     if (camera) {
//       const photo = await camera.takePictureAsync();
//       setPhotoList((prevPhotos) => [photo.uri, ...prevPhotos]);

//       if (hasMediaLibraryPermission) {
//         await MediaLibrary.saveToLibraryAsync(photo.uri);
//       }

//       setIsCameraOpen(false); // Close the camera after taking the picture
//     }
//   };

//   // Check permissions
//   if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
//     return <Text>Requesting permissions...</Text>;
//   }

//   if (!hasCameraPermission) {
//     return <Text>No access to camera</Text>;
//   }

//   if (!hasMediaLibraryPermission) {
//     return <Text>No access to media library</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {isCameraOpen ? (
//         <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
//           <View style={styles.buttonContainer}>
//             <Button title="Capture" onPress={takePicture} />
//           </View>
//         </Camera>
//       ) : (
//         <>
//           <Button title="Open Camera" onPress={openCamera} />
//           <FlatList
//             data={photoList}
//             renderItem={({ item }) => <Image source={{ uri: item }} style={styles.photo} />}
//             keyExtractor={(item, index) => index.toString()}
//           />
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   photo: {
//     width: 100,
//     height: 100,
//     margin: 5,
//   },
// });


////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
// import { FontAwesome } from '@expo/vector-icons';

// const CameraScreen = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   // Request camera permission
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   // Function to take a picture
//   const takePicture = async () => {
//     if (camera) {
//       const photo = await camera.takePictureAsync();
//       console.log(photo.uri);
//     }
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <Camera
//         ref={(ref) => setCamera(ref)}
//         style={{ flex: 1 }}
//         type={type}
//       />
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           bottom: 50,
//           alignSelf: 'center',
//           width: 70,
//           height: 70,
//           backgroundColor: 'white',
//           borderRadius: 35,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//         onPress={takePicture}
//       >
//         <FontAwesome name="camera" size={24} color="black" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CameraScreen;


// import React, { useState, useRef } from 'react';
// import { View, Button, Alert, Text, Image } from 'react-native';
// import { Camera } from 'expo-camera';

// export default function CameraApp() {
//   // State for camera and photo
//   const [hasPermission, setHasPermission] = useState(null);
//   const [photo, setPhoto] = useState(null);
//   const [startCamera, setStartCamera] = useState(false);

//   // Ref to access Camera instance
//   const cameraRef = useRef(null);

//   // Request Camera Permission
//   const requestCameraPermission = async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     if (status === 'granted') {
//       setHasPermission(true);
//       setStartCamera(true); // Start camera once permission is granted
//     } else {
//       setHasPermission(false);
//       Alert.alert('Access denied');
//     }
//   };

//   // Function to take picture
//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const photoData = await cameraRef.current.takePictureAsync();
//       setPhoto(photoData.uri); // Save the photo URI
//     }
//   };

//   // UI to render
//   return (
//     <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
//       {/* Button to start camera */}
//       {!startCamera ? (
//         <Button title="Start Camera" onPress={requestCameraPermission} />
//       ) : (
//         <Camera
//           style={{ flex: 1 }}
//           type={Camera.Constants.Type.back} // Access camera type through Constants
//           ref={cameraRef}
//         >
//           <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 50 }}>
//             <Button title="Take Picture" onPress={takePicture} />
//           </View>
//         </Camera>
//       )}

//       {/* Displaying the captured photo */}
//       {photo && (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>Photo Preview:</Text>
//           <Image source={{ uri: photo }} style={{ width: 300, height: 400 }} />
//         </View>
//       )}
//     </View>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Alert } from 'react-native';
// import { RNCamera } from 'react-native-camera';  // Import from react-native-camera
// import { FontAwesome } from '@expo/vector-icons';
// import * as MediaLibrary from 'expo-media-library';

// const CameraScreen = () => {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [photos, setPhotos] = useState([]);
//   const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back); // Correct camera type

//   useEffect(() => {
//     const getPermissions = async () => {
//       try {
//         // Requesting camera permission
//         const cameraStatus = await RNCamera.requestPermissionsAsync();
//         const mediaStatus = await MediaLibrary.requestPermissionsAsync();

//         if (cameraStatus.granted && mediaStatus.granted) {
//           setHasCameraPermission(true);
//         } else {
//           setHasCameraPermission(false);
//           Alert.alert('Permission Denied', 'Camera or media library permission denied.');
//         }
//       } catch (error) {
//         Alert.alert('Permission Error', 'Failed to request permissions....');
//       }
//     };

//     getPermissions();
//   }, []);

//   const takePicture = async () => {
//     if (camera) {
//       try {
//         const photo = await camera.takePictureAsync();
//         setPhotos([...photos, photo]);
//         Alert.alert('Success', 'Picture taken successfully.');
//       } catch (error) {
//         Alert.alert('Error', 'Failed to take picture.');
//       }
//     }
//   };

//   const toggleCameraType = () => {
//     setCameraType((prevType) =>
//       prevType === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
//     );
//   };

//   if (hasCameraPermission === null) {
//     return <Text>Requesting permissions...</Text>;
//   }

//   if (hasCameraPermission === false) {
//     return <Text>No access to camera or media library</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <RNCamera
//         ref={(ref) => setCamera(ref)}
//         style={{ flex: 1 }}
//         type={cameraType}
//       />

//       {/* Take Picture Button */}
//       <TouchableOpacity
//         onPress={takePicture}
//         style={{
//           position: 'absolute',
//           bottom: 100,
//           alignSelf: 'center',
//           width: 80,
//           height: 80,
//           borderRadius: 40,
//           backgroundColor: 'white',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <FontAwesome name="camera" size={24} color="black" />
//       </TouchableOpacity>

//       {/* Toggle Camera Type Button */}
//       <TouchableOpacity
//         onPress={toggleCameraType}
//         style={{
//           position: 'absolute',
//           top: 50,
//           right: 20,
//           width: 50,
//           height: 50,
//           borderRadius: 25,
//           backgroundColor: 'white',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <FontAwesome name="refresh" size={24} color="black" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CameraScreen;


//////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Alert } from 'react-native';
// import Camera from 'expo-camera';
// import { FontAwesome } from '@expo/vector-icons';
// import * as MediaLibrary from 'expo-media-library';

// const CameraScreen = () => {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [photos, setPhotos] = useState([]);
//   const [cameraType, setCameraType] = useState(Camera.Type.back); // Updated to Camera.Type

//   useEffect(() => {
//     const getPermissions = async () => {
//       try {
//         const cameraStatus = await Camera.requestCameraPermissionsAsync();
//         const mediaStatus = await MediaLibrary.requestPermissionsAsync();

//         if (cameraStatus.granted && mediaStatus.granted) {
//           setHasCameraPermission(true);
//         } else {
//           setHasCameraPermission(false);
//           Alert.alert('Permission Denied', 'Camera or media library permission denied.');
//         }
//       } catch (error) {
//         Alert.alert('Permission Error', 'Failed to request permissions.');
//       }
//     };

//     getPermissions();
//   }, []);

//   const takePicture = async () => {
//     if (camera) {
//       try {
//         const photo = await camera.takePictureAsync();
//         setPhotos([...photos, photo]);
//         Alert.alert('Success', 'Picture taken successfully.');
//       } catch (error) {
//         Alert.alert('Error', 'Failed to take picture.');
//       }
//     }
//   };

//   const toggleCameraType = () => {
//     setCameraType((prevType) =>
//       prevType === Camera.Type.back ? Camera.Type.front : Camera.Type.back
//     );
//   };

//   if (hasCameraPermission === null) {
//     return <Text>Requesting permissions...</Text>;
//   }

//   if (hasCameraPermission === false) {
//     return <Text>No access to camera or media library</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <Camera
//         ref={(ref) => setCamera(ref)}
//         style={{ flex: 1 }}
//         type={cameraType}
//       />

//       {/* Take Picture Button */}
//       <TouchableOpacity
//         onPress={takePicture}
//         style={{
//           position: 'absolute',
//           bottom: 100,
//           alignSelf: 'center',
//           width: 80,
//           height: 80,
//           borderRadius: 40,
//           backgroundColor: 'white',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <FontAwesome name="camera" size={24} color="black" />
//       </TouchableOpacity>

//       {/* Toggle Camera Type Button */}
//       <TouchableOpacity
//         onPress={toggleCameraType}
//         style={{
//           position: 'absolute',
//           top: 50,
//           right: 20,
//           width: 50,
//           height: 50,
//           borderRadius: 25,
//           backgroundColor: 'white',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <FontAwesome name="refresh" size={24} color="black" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CameraScreen;
/////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Alert } from 'react-native';
// import  Camera  from 'expo-camera'; // Correct import
// import * as MediaLibrary from 'expo-media-library';

// const CameraScreen = () => {
//   const [hasCameraPermission, setHasCameraPermission] = useState(false);
//   const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);
//   const [camera, setCamera] = useState(null);
//   const [photoUriList, setPhotoUriList] = useState([]);
//   const [isCameraReady, setIsCameraReady] = useState(false);

//   // Request permissions immediately when the component mounts
//   useEffect(() => {
//     (async () => {
//       console.log('Requesting camera and media library permissions...');

//       const cameraPermission = await Camera.requestCameraPermissionsAsync(); // Correct API usage
//       const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

//       console.log('Camera Permission Status:', cameraPermission.status);
//       console.log('Media Library Permission Status:', mediaLibraryPermission.status);

//       setHasCameraPermission(cameraPermission.status === 'granted');
//       setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');

//       // If the permissions are granted, take a picture
//       if (cameraPermission.status === 'granted' && mediaLibraryPermission.status === 'granted') {
//         console.log('Permissions granted, taking picture...');
//         takePicture();  // Take picture when the screen mounts
//       } else if (mediaLibraryPermission.status !== 'granted') {
//         Alert.alert(
//           "Permission Required",
//           "Media library permission not granted. Please enable it in settings.",
//           [{ text: "OK" }]
//         );
//       }
//     })();
//   }, []);

//   // Take picture and save to gallery
//   const takePicture = async () => {
//     if (camera && isCameraReady) {
//       const photo = await camera.takePictureAsync();
//       console.log('Captured Photo:', photo.uri); // Logs the URI of the captured photo

//       if (hasMediaLibraryPermission) {
//         const asset = await MediaLibrary.createAssetAsync(photo.uri);
//         console.log('Saved Photo URI:', asset.uri); // Logs the URI of the saved photo in the media library

//         setPhotoUriList((prevList) => {
//           const updatedList = [asset.uri, ...prevList];
//           console.log('Updated Photo URI List:', updatedList); // Logs the updated list of photo URIs
//           return updatedList;
//         });
//       }
//     }
//   };

//   // Render item in FlatList
//   const renderItem = ({ item }) => (
//     <Image source={{ uri: item }} style={styles.imageThumbnail} />
//   );

//   // Camera ready callback
//   const handleCameraReady = () => {
//     setIsCameraReady(true);
//     console.log('Camera is ready!'); // Logs when the camera is ready
//   };

//   // Check permissions and render camera view
//   if (!hasCameraPermission) {
//     return <Text>Camera permission not granted. Please enable it in settings.</Text>;
//   }

//   if (!hasMediaLibraryPermission) {
//     return <Text>Media library permission not granted. Please enable it in settings.</Text>;
//   }

//   console.log('Rendering CameraScreen');
//   console.log('hasCameraPermission:', hasCameraPermission);
//   console.log('hasMediaLibraryPermission:', hasMediaLibraryPermission);
//   console.log('photoUriList:', photoUriList);

//   return (
//     <View style={styles.container}>
//       {hasCameraPermission && (
//         <Camera
//           style={styles.camera}
//           ref={(ref) => setCamera(ref)}
//           onCameraReady={handleCameraReady}
//         />
//       )}
//       <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
//         <Text style={styles.buttonText}>Capture</Text>
//       </TouchableOpacity>
//       <FlatList
//         data={photoUriList}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={3}
//         onScroll={() => console.log('FlatList is scrolling')} // Optional log for FlatList scroll
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   captureButton: {
//     backgroundColor: '#2E3198',
//     padding: 15,
//     borderRadius: 10,
//     alignSelf: 'center',
//     margin: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   imageThumbnail: {
//     width: 100,
//     height: 100,
//     margin: 5,
//   },
// });

// export default CameraScreen;






//////////////important/////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';

// import { FontAwesome } from '@expo/vector-icons';

// const CamerScreen = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [cameraType, setCameraType] = useState(Camera.Constants?.Type?.back || 'back'); // Default to back camera

//   useEffect(() => {
//     const getCameraPermission = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       console.log('Camera permission status:', status);
//       setHasPermission(status === 'granted');
//     };

//     getCameraPermission();
//   }, []);

//   const takePicture = async () => {
//     if (camera) {
//       const photo = await camera.takePictureAsync();
//       console.log(photo.uri);
//     }
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   // Log Camera and Camera Constants to see if they are available
//   console.log('Camera:', Camera);
//   console.log('Camera Constants:', Camera.Constants);

//   // Ensure Camera Constants is available
//   if (!Camera.Constants || !Camera.Constants.Type) {
//     return <Text>Camera module is not available.</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       {hasPermission && cameraType ? (
//         <Camera
//           ref={(ref) => setCamera(ref)}
//           style={{ flex: 1 }}
//           type={cameraType} // Camera Type (back/front)
//         >
//           <TouchableOpacity
//             onPress={takePicture}
//             style={{
//               position: 'absolute',
//               bottom: 20,
//               alignSelf: 'center',
//               width: 80,
//               height: 80,
//               backgroundColor: 'white',
//               borderRadius: 40,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <FontAwesome name="camera" size={24} color="black" />
//           </TouchableOpacity>
//         </Camera>
//       ) : (
//         <Text>Loading Camera...</Text>
//       )}
//     </View>
//   );
// };

// export default CamerScreen;

///////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { StyleSheet ,Text, View, Button, Image} from 'react-native';
// import { Camera } from 'expo-camera';

// export default function App() {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [image, setImage] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
// useEffect(() => {
//     (async () => {
//       const cameraStatus = await Camera.requestPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === 'granted');
// })();
//   }, []);
// const takePicture = async () => {
//     if(camera){
//         const data = await camera.takePictureAsync(null)
//         setImage(data.uri);
//     }
//   }

//   if (hasCameraPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//    <View style={{ flex: 1}}>
//       <View style={styles.cameraContainer}>
//             <Camera 
//             ref={ref => setCamera(ref)}
//             style={styles.fixedRatio} 
//             type={type}
//             ratio={'1:1'} />
//       </View>
//       <Button
//             title="Flip Image"
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}>
//         </Button>
//        <Button title="Take Picture" onPress={() => takePicture()} />
//         {image && <Image source={{uri: image}} style={{flex:1}}/>}
//    </View>
//   );
// }
// const styles = StyleSheet.create({
//   cameraContainer: {
//       flex: 1,
//       flexDirection: 'row'
//   },
//   fixedRatio:{
//       flex: 1,
//       aspectRatio: 1
//   }
// })





// import React, { useState, useEffect } from 'react';
// import { View, FlatList, Image, Button, Alert, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function CameraScreen() {
//   const [images, setImages] = useState([]);  // Array to store selected images

//   // Request permission to access media library (gallery)
//   const requestPermissions = async () => {
//     if (Platform.OS !== 'web') {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//   };

//   // Request permissions when the app is loaded
//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   // Function to pick an image from the gallery
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,  // Only select images
//       allowsEditing: false,  // No need for editing in this case
//       quality: 1,  // Max quality of image
//     });

//     // Check if the user didn't cancel the image picker
//     if (!result.cancelled) {
//       // Add selected image URI to images state
//       setImages((prevImages) => [...prevImages, result.uri]);
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       {/* Button to trigger image picker */}
//       <Button title="Pick an image from gallery" onPress={pickImage} />

//       {/* FlatList to display selected images */}
//       <FlatList
//         data={images}
//         renderItem={({ item }) => (
//           <View style={{ marginBottom: 10 }}>
//             <Image
//               source={{ uri: item }}  // Image URI passed here
//               style={{ width: 100, height: 100, borderRadius: 10 }}
//             />
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// }



///////////////////////////////////////////////////////////


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { Camera } from 'expo-camera';
// import { StatusBar } from 'expo-status-bar';

// export default function CameraScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [startCamera, setStartCamera] = useState(false);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     const requestPermission = async () => {
//       // Call the permission request method correctly
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     };
//     requestPermission();
//   }, []);

//   const __startCamera = () => {
//     if (hasPermission) {
//       setStartCamera(true);
//     } else {
//       Alert.alert('Access denied', 'You need to grant camera permissions to use this feature.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {startCamera ? (
//         <Camera style={styles.camera} ref={cameraRef}>
//           <View style={styles.cameraContent}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => console.log('Take Picture!')}
//             >
//               <Text style={styles.buttonText}>Take Picture</Text>
//             </TouchableOpacity>
//           </View>
//         </Camera>
//       ) : (
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity onPress={__startCamera} style={styles.button}>
//             <Text style={styles.buttonText}>Start Camera</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
//   cameraContent: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     marginBottom: 30,
//     alignItems: 'center',
//   },
//   button: {
//     width: 130,
//     borderRadius: 4,
//     backgroundColor: '#14274e',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 40,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { View, Button, FlatList, Image, StyleSheet, TouchableOpacity,Text } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const STORAGE_KEY = '@stored_images';

// const CameraScreen = () => {
//   const [images, setImages] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const navigation = useNavigation();

//   // Function to pick an image
//   const pickImage = async () => {
//     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert('Permission to access gallery is required!');
//       return;
//     }

//     let pickerResult = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!pickerResult.canceled) {
//       const newImageUri = pickerResult.assets[0].uri;
//       const updatedImages = [...images, newImageUri];
//       setImages(updatedImages);
//       await storeImages(updatedImages);
//     }
//   };

//   // Store images in AsyncStorage
//   const storeImages = async (imagesArray) => {
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(imagesArray));
//     } catch (error) {
//       console.error('Failed to store images:', error);
//     }
//   };

//   // Retrieve stored images from AsyncStorage
//   const retrieveImages = async () => {
//     try {
//       const storedImages = await AsyncStorage.getItem(STORAGE_KEY);
//       if (storedImages) {
//         setImages(JSON.parse(storedImages));
//       }
//     } catch (error) {
//       console.error('Failed to retrieve images:', error);
//     }
//   };

//   // Remove an image from the list
//   const removeImage = async (uri) => {
//     const filteredImages = images.filter((item) => item !== uri);
//     setImages(filteredImages);
//     await storeImages(filteredImages);
//     setSelectedImages(selectedImages.filter((item) => item !== uri));
//   };

//   // Handle image selection for multiple images
//   const selectImage = (uri) => {
//     if (selectedImages.includes(uri)) {
//       setSelectedImages(selectedImages.filter((item) => item !== uri));
//     } else {
//       setSelectedImages([...selectedImages, uri]);
//     }
//   };

//   // Navigate to UploadAttendance screen with selected images
//   const goToUploadAttendance = () => {
//     navigation.navigate('UploadAttendance', { selectedImages });
//   };

  
  

//   // Assuming selectedImages contains an array of objects with image URL information


//   useEffect(() => {
//     retrieveImages();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageListContainer}>
//         <FlatList
//           data={images}
//           keyExtractor={(item, index) => index.toString()}
//           numColumns={3}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={[
//                 styles.imageContainer,
//                 selectedImages.includes(item) && styles.selectedImageBorder,
//               ]}
//               onPress={() => selectImage(item)}
//             >
//               <Image source={{ uri: item }} style={styles.image} />
//               <TouchableOpacity style={styles.removeIcon} onPress={() => removeImage(item)}>
//                 <Ionicons name="trash" size={20} color="red" />
//               </TouchableOpacity>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={pickImage}>
//           <Ionicons name="image-outline" size={20} color="#fff" />
//           <View style={{ marginLeft: 10 }}>
//             <Text style={styles.buttonText}>Pick Image</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button} onPress={goToUploadAttendance}>
//           <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
//           <View style={{ marginLeft: 10 }}>
//             <Text style={styles.buttonText}>Upload Images</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   imageListContainer: {
//     width: '90%',
//     height: '85%',
//     backgroundColor: '#fff',
//     alignSelf: 'center',
//     top:"5%",
//     borderRadius:10,
//     elevation:2
//   },
//   imageContainer: {
//     flex: 1,
//     margin: 5,
//     alignItems: 'center',
//     position: 'relative',
//   },
//   image: {
//     width: 115,
//     height: 100,
//     borderRadius: 8,
//   },
//   removeIcon: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 15,
//     padding: 2,
//   },
//   selectedImageBorder: {
//     borderWidth: 2,
//     borderColor: 'red', // Border color for selected images
//     borderRadius: 10
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 20,
//     top:"8%"
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor:"red",
//     borderRadius:10
//   },
//   buttonText:{
//     fontSize:12,
//     fontWeight:"600",
//     color:"#fff"
//   }


// });

// export default CameraScreen;

//////////////////////////////12345 Most Important///////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const STORAGE_KEY = '@stored_images';
const SELECTED_IMAGES_KEY = '@selected_images';

const CameraScreen = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();

  // Function to pick an image
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const newImageUri = pickerResult.assets[0].uri;
      const updatedImages = [...images, newImageUri];
      setImages(updatedImages);
      await storeImages(updatedImages);
    }
  };

  // Store images in AsyncStorage
  const storeImages = async (imagesArray) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(imagesArray));
    } catch (error) {
      console.error('Failed to store images:', error);
    }
  };

  // Store selected images in AsyncStorage
  const storeSelectedImages = async (selectedArray) => {
    try {
      await AsyncStorage.setItem(SELECTED_IMAGES_KEY, JSON.stringify(selectedArray));
    } catch (error) {
      console.error('Failed to store selected images:', error);
    }
  };

  // Retrieve stored images from AsyncStorage
  const retrieveImages = async () => {
    try {
      const storedImages = await AsyncStorage.getItem(STORAGE_KEY);
      const storedSelectedImages = await AsyncStorage.getItem(SELECTED_IMAGES_KEY);
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      }
      if (storedSelectedImages) {
        setSelectedImages(JSON.parse(storedSelectedImages));
      }
    } catch (error) {
      console.error('Failed to retrieve images:', error);
    }
  };

  // Remove an image from the list
  const removeImage = async (uri) => {
    const filteredImages = images.filter((item) => item !== uri);
    setImages(filteredImages);
    await storeImages(filteredImages);

    const filteredSelectedImages = selectedImages.filter((item) => item !== uri);
    setSelectedImages(filteredSelectedImages);
    await storeSelectedImages(filteredSelectedImages);
  };

  // Handle image selection for multiple images
  const selectImage = async (uri) => {
    let updatedSelectedImages;
    if (selectedImages.includes(uri)) {
      updatedSelectedImages = selectedImages.filter((item) => item !== uri);
    } else {
      updatedSelectedImages = [...selectedImages, uri];
    }
    setSelectedImages(updatedSelectedImages);
    await storeSelectedImages(updatedSelectedImages);
  };

  // Navigate to UploadAttendance screen with selected images
  const goToUploadAttendance = () => {
    navigation.navigate('UploadAttendance', { selectedImages });
  };

  useEffect(() => {
    retrieveImages();
  }, []);

  return (
    <View style={styles.container}>

      <Text style = {{fontSize:14,fontWeight:"bold",color:"black",textAlign:"center",top:"3%"}}>SELECT IMAGES</Text>
        
        <View style={styles.imageListContainer}>
          <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.imageContainer,
                selectedImages.includes(item) && styles.selectedImageBorder,
              ]}
              onPress={() => selectImage(item)}
            >
              <Image source={{ uri: item }} style={styles.image} />
              <TouchableOpacity style={styles.removeIcon} onPress={() => removeImage(item)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Ionicons name="image-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToUploadAttendance}>
          <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Upload Images</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageListContainer: {
    width: '90%',
    height: '85%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    top: '5%',
    borderRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 115,
    height: 100,
    borderRadius: 8,
   
  },
  removeIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 2,
  },
  selectedImageBorder: {
    width: '30%', // Using percentage width for responsiveness
  height: 'auto',
  aspectRatio: 115 / 100, // Maintain the aspect ratio
  borderRadius: 10,
  borderWidth: 2,
  borderColor: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    top: '4%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
});

 export default CameraScreen;

































































































































