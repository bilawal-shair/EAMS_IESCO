import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [lastPhoto, setLastPhoto] = useState(null);

  useEffect(() => {
    loadPhotosFromAsyncStorage();

    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const loadPhotosFromAsyncStorage = async () => {
    try {
      // Load previously saved photos from AsyncStorage
      const savedPhotosJson = await AsyncStorage.getItem('takenPhotos');
      
      if (savedPhotosJson) {
        const savedPhotos = JSON.parse(savedPhotosJson);
        setPhotos(savedPhotos);
      }
    } catch (error) {
      console.error('Error loading photos from AsyncStorage:', error);
    }
  };


  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      
      setPhotos([...photos, photo]);
      setLastPhoto(photo);
      Alert.alert('Success','Picture is taken successfully, You can take another Picture');

    }
  };

  
  const toggleSelectPhoto = (photoUri) => {
    if (selectedPhotos.includes(photoUri)) {
      setSelectedPhotos(selectedPhotos.filter((uri) => uri !== photoUri));
    } else {
      setSelectedPhotos([...selectedPhotos, photoUri]);
    }
  };
  
  const navigateToDisplayPictures = async () => {
    navigation.navigate('UploadAttendance', { takenPhotos: photos }); 
   
  };
  const handleImageViewPress = () => {
    navigation.navigate('View', { takenPhotos: photos });
  };
  return (
    <View style={{ flex: 1 }}>
      {hasPermission === null ? (
        <Text style={{ marginTop: 50, marginLeft: 40 }}>Requesting camera permission...</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <ExpoCamera
            ref={(ref) => setCamera(ref)}
            style={{ width: "100%", height: "85%" }}
            type={ExpoCamera.Constants.Type.back}
          />

          
          <View style={{flexDirection:"row", backgroundColor:"black", height:130}}>
          {photos.length > 0 ? (
              <TouchableOpacity onPress={navigateToDisplayPictures} style={{ width:50, height:50,marginTop: 40, marginLeft: 80, borderRadius: 60,}}>
                <Image source={{ uri: photos[photos.length - 1].uri }} style={{ flex: 1, borderRadius: 60, }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#7C7C7C',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 40,
                  marginLeft: 80,
                }}
              >
                <Foundation name="photo" size={24} color="white" />
              </TouchableOpacity>
            )}
        
        <View style={{width: 100, height: 100, backgroundColor:"white", borderRadius:60, justifyContent: 'center',alignSelf: "center",marginLeft:30}}>
      <View style={{ flexDirection: 'row', justifyContent: 'center',alignSelf: "center",  }}>
        <TouchableOpacity style={{ width: 90, height: 90,  borderRadius: 80, justifyContent: "center", alignItems: "center", backgroundColor: "black" }} onPress={takePicture}>
          <View style={{ width: 80, height: 80, backgroundColor: "white", borderRadius: 80, justifyContent: "center", alignItems: "center" }}>
          </View>
        </TouchableOpacity>
        </View>
       </View> 

       <TouchableOpacity onPress={handleImageViewPress} style={{width:50, height:50, backgroundColor:"#7C7C7C", borderRadius:20, justifyContent:"center", alignItems:"center", marginTop:40, marginLeft:30}}>
       <Ionicons name="md-eye-sharp" size={24} color="white" />
       </TouchableOpacity>
      </View>
        
        </View>
      )}
      
    </View>
  );
}

export default CameraScreen;
