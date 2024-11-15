import { ActivityIndicator, Alert, FlatList, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Modal, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AntDesign, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadAttendance = ({ route }) => {

  const [base64EncodedPdf, setBase64EncodedPdf] = useState('');
  // or useState('')
  const [takenPhotos, setTakenPhotos] = useState([]);
  const pdfUri = route?.params?.pdfUri || 'No PDF URI available';
  const navigation = useNavigation();
  const [focusedTextInputIndex, setFocusedTextInputIndex] = useState(-1);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [data, setData] = useState([]);
  const [selectedPhotoURIs, setSelectedPhotoURIs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  

  useEffect(() => {
    if (route.params && route.params.selectedImages) {
      console.log("SELECTED IMAGES..............>>>>", route.params.selectedImages); // Check if images are passed
      setTakenPhotos(route.params.selectedImages);
    }
  }, [route.params]);



  useEffect(() => {
    // console.log('Route:', route);
    // console.log('Taken Photos:', takenPhotos);
    fetchData();
  }, [route.params, takenPhotos]);

  useEffect(() => {
    retrievePhotosFromAsyncStorage();
  }, []);

  const retrievePhotosFromAsyncStorage = async () => {
    try {
      const storedPhotosJson = await AsyncStorage.getItem('takenPhotos');
      if (storedPhotosJson) {
        const storedPhotos = JSON.parse(storedPhotosJson);
        setTakenPhotos(storedPhotos);
      }
    } catch (error) {
      console.error('Error retrieving photos from AsyncStorage:', error);
    }
  };

  const toggleSelectPhoto = (photoUri) => {
    // console.log('Selected Photo URIs before toggle:', selectedPhotoURIs);

    if (!photoUri) {
      console.error('Invalid photo URI:', photoUri);
      return;
    }

    if (selectedPhotoURIs.includes(photoUri)) {
      // If the photo is already selected, remove it from the selection
      setSelectedPhotoURIs(selectedPhotoURIs.filter((uri) => uri !== photoUri));
    } else {
      // If the photo is not selected, add it to the selection
      setSelectedPhotoURIs([...selectedPhotoURIs, photoUri]);
    }

    // console.log('Selected Photo URIs after toggle:', selectedPhotoURIs);
  };

  // const deletePhoto = async (photoUri) => {

  //   try {
  //     // Create a new array of takenPhotos excluding the photo to delete
  //     const updatedPhotos = takenPhotos.filter((photo) => photo.uri !== photoUri);
  //     setTakenPhotos(updatedPhotos);

  //     // If the deleted photo was selected, update selectedPhotoURIs
  //     if (selectedPhotoURIs.includes(photoUri)) {

  //       setSelectedPhotoURIs(selectedPhotoURIs.filter((uri) => uri !== photoUri));

  //     }

  //     // Save the updated photos array to AsyncStorage
  //     await AsyncStorage.setItem('savedPhotos', JSON.stringify(updatedPhotos));


  //   } catch (error) {
  //     console.error('Error deleting photo:', error);
  //     // Handle error
  //   }
  // };

  useEffect(() => {
    savePhotosToAsyncStorage();

    fetchData();
  }, [takenPhotos]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://solochoicez.nayatel.net:8006/api/Attendance/GetStaff');
  //     setData(response.data); // Assuming the response is an array of data
  //     // console.log(response.data)
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://solochoicez.nayatel.net:8006/api/Attendance/GetStaff');
      setData(response.data); // Set the fetched data to the state
    } catch (error) {
       console.error('Error fetching data:', error);
      Alert.alert('Error fetching data');
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  const [textInputValues, setTextInputValues] = useState(Array(data.length).fill(''));
  const [textInputValues1, setTextInputValues1] = useState(Array(data.length).fill(''));

  const handleTextInputChange1 = (index, text) => {
    const newValues = [...textInputValues1];
    newValues[index] = text;
    setTextInputValues1(newValues);
  };
  const handleTextInputChange = (index, text) => {
    const enteredNumber = parseInt(text, 10);
    const numericValue = +text;

    // Validate if the entered value is a number and meets both sets of conditions
    if (
      !isNaN(enteredNumber) &&
      enteredNumber >= 0 &&
      enteredNumber <= 31 &&
      !isNaN(numericValue) &&
      numericValue >= 0 &&
      numericValue <= 100
    ) {
      // Update the state with the valid value
      const updatedValues = [...textInputValues];
      updatedValues[index] = text;
      setTextInputValues(updatedValues);
    } else {
      // If the entered value doesn't meet the conditions, update the state with an empty string
      const updatedValues = [...textInputValues];
      updatedValues[index] = "";
      setTextInputValues(updatedValues);
      Alert.alert("Please enter the value between 0 to 31");
    }
  };
  const handleUpload = () => {
    navigation.navigate("CameraScreen")
    setIsFileUploaded(true)
  };
  const convertImageToBase64 = async (imageUri) => {
    try {
      const imageInfo = await FileSystem.getInfoAsync(imageUri);

      if (!imageInfo.exists) {
        console.error('Image does not exist:', imageUri);
        return null;
      }

      const { base64 } = await ImageManipulator.manipulateAsync(imageUri, [], {
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      });

      console.log('Image converted to base64 successfully.');
      return base64;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  // const submitToServer = async () => {
  //   try {
  //     if (textInputValues.some((value) => value === '')) {
  //       console.log('TextInputValues:', textInputValues);
  //       Alert.alert('Oops', 'Please fill in all the Present Days');
  //       return;
  //     }
  //     // Check if images are selected
  //     if (selectedPhotoURIs.length === 0) {
  //       Alert.alert('Alert', 'Please select Photos and fill all days');
  //       return; // Exit the function if no images are selected
  //     }
  //     // Convert selected photos to base64 strings
  //     setLoading(true); ``
  //     const base64Images = await Promise.all(selectedPhotoURIs.map(async (photoUri) => {
  //       const base64Image = await convertImageToBase64(photoUri);
  //       return base64Image; // Only return the base64 string
  //     }));

  //     // Prepare data for the flatlist items
  //     const flatlistData = data.map((item, index) => ({
  //       id: item.id,
  //       name: item.name,
  //       noOfPresents: textInputValues[index] !== '' ? parseInt(textInputValues[index], 10) : null,
  //     }));
  //     console.log('Flatlist Data:', flatlistData);
  //     flatlistData.forEach((item, index) => {
  //       // console.log(Item ${index + 1} - ID: ${item.id}, Name: ${item.name}, Value: ${item.value});
  //     });
  //     // Your API endpoint
  //     const apiUrl = 'http://solochoicez.nayatel.net:8006/api/Attendance/UploadMonthlyAttendance';

  //     // Your API payload
  //     const payload = {
  //       DocumnentBase64List: base64Images,
  //       StaffAttendances: flatlistData,

  //     };
  //     console.log('Flatlist Data:', flatlistData);
  //     // Make the API call
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     // Handle the response as needed
  //     const responseText = await response.text();
  //     console.log('Raw Response Text:', responseText);

  //     // Check for specific conditions in the raw response text
  //     if (response.ok) {
  //       if (responseText.includes('Attendance Already Uploaded')) {

  //         console.log('Attendance Already Uploaded');
  //         Alert.alert("Attendance Already Uploaded");
  //         return;
  //         // Handle the scenario where attendance is already uploaded
  //         // console.log('Attendance Already Uploaded');

  //         // Display a message to the user or take appropriate action
  //       }
  //       // Otherwise, the request was successful
  //      // Otherwise, the request was successful
  //      console.log('Data submitted successfully!');
  //      Alert.alert("Attendance Submitted successfully");


  //     } else {
  //       // If the response status is not okay, log the error
  //        console.error('Error submitting data to server:', responseText);
  //       Alert.alert("Attendance Already Exist")

  //     }
  //   } catch (error) {
  //     console.error('Error submitting data to server:', error);
  //     Alert.alert("Error submitting data", error)

  //   } finally {
  //     // Set loading state back to false
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // Save taken photos to AsyncStorage when the component mounts or when takenPhotos change
  //   savePhotosToAsyncStorage();
  // }, [takenPhotos]);

  const submitToServer = async () => {
    try {
      // Check if all input fields are filled
      if (textInputValues.some((value) => value === '')) {
        console.log('TextInputValues:', textInputValues);
        Alert.alert('Oops', 'Please fill in all the Present Days');
        return;
      }
  
      // Check if images are selected
      if (selectedPhotoURIs.length === 0) {
        Alert.alert('Alert', 'Please select Photos and fill all days');
        return; // Exit the function if no images are selected
      }
  
      // Convert selected photos to base64 strings
      setLoading2(true);
      const base64Images = await Promise.all(
        selectedPhotoURIs.map(async (photoUri) => {
          const base64Image = await convertImageToBase64(photoUri);
          return base64Image; // Only return the base64 string
        })
      );
  
      // Prepare data for the flatlist items
      const flatlistData = data.map((item, index) => ({
        id: item.id,
        name: item.name,
        noOfPresents: textInputValues[index] !== '' ? parseInt(textInputValues[index], 10) : null,
      }));
      console.log('Flatlist Data:', flatlistData);
  
      // Your API endpoint
      const apiUrl = 'http://solochoicez.nayatel.net:8006/api/Attendance/UploadMonthlyAttendance';
  
      // Prepare payload
      const payload = {
        DocumnentBase64List: base64Images,
        StaffAttendances: flatlistData,
      };
  
      // Make the API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      // Handle the response
      const responseText = await response.text();
      console.log('Raw Response Text:', responseText);
  
      // Check if the response indicates that attendance has already been uploaded
      if (response.ok) {
        if (responseText.includes('Attendance Already Uploaded')) {
          console.log('Attendance Already Uploaded');
          Alert.alert("Attendance Already Uploaded");
          return;
        } else {
          // If the data was submitted successfully
          console.log('Data submitted successfully!');
          Alert.alert("Attendance Submitted successfully");
        }
      } else {
        // Handle API error response
        // console.error('Error submitting data to server:', responseText);
        Alert.alert("Attendance Already Uploaded.");
      }
    } catch (error) {
      console.error('Error submitting data to server:', error);
      Alert.alert("Error submitting data", error.message);
    } finally {
      // Set loading state back to false
      setLoading2(false);
    }
  };
  

  const savePhotosToAsyncStorage = async () => {
    try {
      // Convert takenPhotos to a JSON string
      const photosJson = JSON.stringify(takenPhotos);

      // Save the JSON string in AsyncStorage
      await AsyncStorage.setItem('takenPhotos', photosJson);

      console.log('Taken photos saved to AsyncStorage:', takenPhotos);
    } catch (error) {
      console.error('Error saving taken photos to AsyncStorage:', error);
    }
  };

  // Function to navigate to the CameraScreen
  const openCamera = () => {
    navigation.navigate('CameraScreen');
  };

  const deletePhoto = (uri) => {
    // Filter out the photo to be deleted
    const updatedPhotos = takenPhotos.filter((photo) => photo !== uri);
    console.log("Deleted Photo URI:", uri);
    console.log("Updated Photos:", updatedPhotos);
    setTakenPhotos(updatedPhotos);
  };
  

  return (

    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={{ width: "100%", height: "100%", alignSelf: "center",top:"3%"}}>
        <View style={{ width: "100%", height: 80, top:"3%" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center"}}>Upload Attendance</Text>
        </View>

        <View style={{ width: "100%", height: "100%", backgroundColor: "#F2F2F2", borderTopLeftRadius: 35, borderTopRightRadius: 35 }}>
          <View style={{ alignSelf:"center", width:"90%",height:"8%", flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{ left:"5%",  top:"20%", flexDirection:"row", width: "36%", height: "60%", justifyContent:"space-evenly", alignItems: "center" }}>
              <Text style={{ color: "#010101", fontWeight: "500" }}>S.NO</Text>
              <Text style={{ color: "#010101", fontWeight: "500" }}>Name</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center",right:"7%"}}>
              <Text style={{ color: "#010101", fontWeight: "500" }}>Present Days</Text>
            </View>
            
          </View>

          <View style={{ width: "100%", height: "54%"}}>

          {loading ? (
              <ActivityIndicator size="large" color="red" />
            ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (

                <View style={{ justifyContent:"space-between", flexDirection: "row", height: 80, width: "90%", alignSelf: "center", marginTop: 10, marginBottom: 10, borderRadius: 15, backgroundColor: "#fff" }}>
                 
                 
                  <View style={{ width: "60%",  flexDirection:"row", height: 60, justifyContent: "space-evenly", alignItems: "center", marginTop: 12 }}>
                    <Text style={{ color: "#010101", fontWeight: "bold", fontSize: 20, }}>{index + 1}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "500", color:"gray" }}>{item.name}</Text>
                  </View>
                  {/* <View style={{ width: 210, height: 70, marginLeft: 10, justifyContent: "center", marginTop: 9 }}>
                    <Text style={{ fontSize: 16, fontWeight: "500", color:"gray" }}>{item.name}</Text>
                  </View> */}
                  <View style={{ width: "40%", height: 70, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: "1%" }}>
                    <TextInput
                      style={{ borderWidth: 1, width: 100, height: 50, borderRadius: 10, borderColor: focusedTextInputIndex === index ? "red" : "white", paddingHorizontal: 40, backgroundColor: "#F6F6F6", }}
                      placeholder=''
                      keyboardType='numeric'
                      value={textInputValues[index]}
                      onChangeText={(text) => handleTextInputChange(index, text)}
                      maxLength={2}
                      onFocus={() => setFocusedTextInputIndex(index)}
                      onBlur={() => setFocusedTextInputIndex(-1)}
                    />

                  </View>
                </View>
              )}
            />

             )} 

          </View>

          <View style={{ width: "100%", height: "15%", backgroundColor: "#fff"}}>
            {takenPhotos.length > 0 ? (
              // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              //   {takenPhotos.map((photo, index) => (

              //     <TouchableOpacity
              //       key={index}
              //       onPress={() => toggleSelectPhoto(photo.uri)}>

              //       <Image
              //         key={index}
              //         // source={{ uri: photo.uri }}
              //         source={{ uri: photo }}

              //         style={{
              //           width: 100, height: 100, marginLeft: 20, marginTop: 15, borderRadius: 10, borderWidth: selectedPhotoURIs.includes(photo.uri) ? 2 : 0,
              //           borderColor: selectedPhotoURIs.includes(photo.uri) ? 'red' : 'transparent',
              //           backgroundColor: 'lightgray', // Temporary background to check rendering
              //           resizeMode: 'cover', 
              //         }}
              //       />
              //       <TouchableOpacity onPress={() => deletePhoto(photo.uri)} style={{ position: "absolute", width: 20, height: 20, justifyContent: "center", alignItems: "center", marginTop: 7, marginLeft: 105, backgroundColor: "red", borderRadius: 20 }}>
              //         <Entypo name="cross" size={20} color="white" />
              //       </TouchableOpacity>
              //     </TouchableOpacity>
              //   ))}
              //   <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")} style={{ width: 100, height: 100, marginLeft: 20, marginTop: 15, borderRadius: 10, backgroundColor: "lightgray", alignItems: "center", justifyContent: "center" }}>
              //     <Entypo name="camera" size={34} color="black" />
              //   </TouchableOpacity>
              // </ScrollView>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {takenPhotos.map((photo, index) => {
                  console.log("Photo URI:", photo); // Debug log to check the URI

                  return (
                    <TouchableOpacity key={index} onPress={() => toggleSelectPhoto(photo)}>
                      <Image
                        key={index}
                        source={{ uri: photo }}
                        style={{
                          width: 100,
                          height: 100,
                          marginLeft: 20,
                          marginTop: 15,
                          borderRadius: 10,
                          borderWidth: selectedPhotoURIs.includes(photo) ? 2 : 0,
                          borderColor: selectedPhotoURIs.includes(photo) ? 'red' : 'transparent',
                          backgroundColor: 'lightgray',
                          resizeMode: 'cover',
                        }}
                      />
                      <TouchableOpacity
                       onPress={() => deletePhoto(photo)}
                        style={{
                          position: "absolute",
                          width: 20,
                          height: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 7,
                          marginLeft: 105,
                          backgroundColor: "red",
                          borderRadius: 20,
                        }}
                      >
                        <Entypo name="cross" size={20} color="white" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  onPress={() => navigation.navigate("CameraScreen")}
                  style={{
                    width: 100,
                    height: 100,
                    marginLeft: 9,
                    marginTop: 15,
                    borderRadius: 10,
                    backgroundColor: "lightgray",
                    alignItems: "center",
                    justifyContent: "center",
                    right:"1%"
                  }}
                >
                  <Entypo name="camera" size={34} color="black" />
                </TouchableOpacity>
              </ScrollView>

            ) : (
              //  <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>


              //    <Text style={{ fontSize: 15, fontWeight: "500" }}>No Photos Available</Text>

              //  </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                {/* TouchableOpacity to trigger the camera opening */}
                <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")} style={{ marginRight: 15, padding: 6 }}>
                  {/* Replace the icon with an image */}
                  <Image
                    source={require('../assets/camera.jpeg')} // Local image path
                    style={{ width: 35, height: 30 }} // Adjust the size of the image
                  />
                </TouchableOpacity>

                {/* Text to show when no photos are available */}
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  No Photos Available
                </Text>
              </View>
            )}

          </View>
          <View style={{ width: '100%', height: 188, backgroundColor: '#F2F2F2', alignItems: 'center' }}>
            {/* Conditionally render the buttons based on isFileUploaded */}
            {isFileUploaded ? (
              <TouchableOpacity
                style={{
                  width: '85%',
                  height: 60,
                  backgroundColor: '#EC1110',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                   top: "3%",
                }}
                onPress={submitToServer}
              >
                <View style={{ flexDirection: 'row' }}>
                  {loading2 ? <ActivityIndicator color="white" /> :
                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 14 }}>SUBMIT</Text>}
                  <AntDesign style={{ marginLeft: 5, marginTop: 2 }} name="arrowright" size={20} color="white" />
                </View>
              </TouchableOpacity>


            ) : (
              <TouchableOpacity
                onPress={handleUpload}
                // disabled={!isUploadButtonGreen}
                style={{
                  width: '85%',
                  height: 60,
                  backgroundColor: '#EC1110',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                   top: "3%",
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'white', fontWeight: '900', fontSize: 14 }}>UPLOAD</Text>
                  <Ionicons style={{ marginLeft: 5 }} name="attach" size={20} color="white" />
                </View>
              </TouchableOpacity>
            )}

          </View>
        </View>
      </View>
    </View>

  )
}

export default UploadAttendance

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 375,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    width: '30%', // Adjust as needed
    marginBottom: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  }



})



////////////////////////////////////////////////////////////////








