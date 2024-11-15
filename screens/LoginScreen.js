import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, BackHandler, Alert, ActivityIndicator } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"

const LoginScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [check, setCheck] = useState(false);
  const [userName, SetUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckBoxPress = () => {
    setCheck(!check);
  };

  const handleLogin = async () => {

    try {
      // Check if any field is empty
      if (!userName || !password) {
        Alert.alert('Error!', 'Please enter both USername and password');
        return;
      }
      setIsLoading(true);
      // Your API endpoint
      const apiUrl = 'http://solochoicez.nayatel.net:8006/api/Account/Login';

      // Your request payload
      const data = {
        username: userName,
        password: password,
        rememberMe: check,
      };

      // Make a POST request using Axios
      const response = await axios.post(apiUrl, data);

      // Check the response for authentication status (customize as needed)
      if (response.status === 200) {
        // Assuming the API returns a success indicator

        // Save user information to AsyncStorage

        // Set a default value if userName is undefined

        await AsyncStorage.setItem('USERLOGIN', 'true');
        await AsyncStorage.setItem('USER', userName);
        await AsyncStorage.setItem('USER_LOGGED_IN', 'true');

        navigation.navigate("home")
        // Alert.alert('Success!', 'Login successful');
      } else if (response.status === 202) {
        Alert.alert('Error!', 'Invalid Code!');
      } else if (response.status === 203) {
        Alert.alert('Error!', 'Request Not Approved. Contact Administrator');
      } else {
        // Handle other status codes
        Alert.alert('Error!', 'Invalid Code!');
      }
    } catch (error) {
      // console.error('Login error:', error);

      Alert.alert('Error!', error.response?.data?.toString() || error.toString());
    }
  };
  const handleBackButton = () => {
    if (isFocused) {
      // Only handle back button on the home screen
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => {
              // You can add any additional cleanup logic before exiting
              BackHandler.exitApp(); // This will exit the app
            },
          },
        ],
      );

      return true; // Prevent default behavior
    }

    // If not on the home screen, allow the default behavior
    return false;
  };

  useEffect(() => {
    // Add event listener for hardware back button press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    // Clean up the event listener on component unmount
    return () => {
      backHandler.remove();
    };
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={{ width: "93%", height: "100%", alignSelf: "center", marginTop: 30}}>
        <View style={{ width: "100%", height: 200, }}>
          <Image style={{ width: 180, height: 120, alignSelf: "center", marginTop: 50 }} source={require('../assets/Layer_1.jpg')} />
        </View>

        <View style={{ width: "100%", height: 150, }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ marginTop: 50 }}>
              <Text style={{ fontSize: 24, fontWeight: "900", color: "black", }}>Login to</Text>
              <Text style={{ fontSize: 27, fontWeight: "900", color: "black", marginTop: 3 }}>EAMS</Text>
            </View>
            <Image style={{ width: 100, height: 100, alignSelf: "center", marginTop: 25 }} source={require('../assets/clock.png')} />
          </View>
        </View>

        <View style={{ width: "100%", height: 200,bottom:"1%"}}>
          <Text style={{ marginTop: 10, color: "#CAC9C9", marginBottom: 2 }}>Username</Text>
          <View style={{ height: 65, width: "100%", borderWidth: 1, borderColor: isEmailFocused ? "#B81716" : "#D6D6D6", borderRadius: 10 }}>
            <TextInput style={{ height: 65, width: "100%", borderRadius: 10, paddingHorizontal: 20, color: "#B81716" }}
              placeholder='Enter Your Username'
              placeholderTextColor={isEmailFocused ? "#B81716" : "#D6D6D6"}
              value={userName}
              onChangeText={(value) => SetUserName(value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>

          <Text style={{ marginTop: 10, color: "#CAC9C9", marginBottom: 2 }}>Password</Text>
          <View style={{ height: 65, width: "100%", borderWidth: 1, borderColor: isPasswordFocused ? "#B81716" : "#D6D6D6", borderRadius: 10 }}>
            <TextInput style={{ height: 65, width: "100%", borderRadius: 10, paddingHorizontal: 20, color: "#B81716" }}
              placeholder='Enter Your Password'
              placeholderTextColor={isPasswordFocused ? "#B81716" : "#D6D6D6"}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              value={password}
            />
          </View>
        </View>
        {/* <View style={{ width: "100%", height: 100 }}>

          <CheckBox
            title="Remember me"
            checked={check}
            onPress={handleCheckBoxPress}
            checkedColor="#B81716"
            textStyle={{ color: '#B81716', fontWeight: "bold" }}
            containerStyle={{ marginRight: 50 }}
          />

        </View> */}

        {/* onPress={handleLogin} */}

        <TouchableOpacity onPress={handleLogin} style={{ top:"6%", height: 65, width: "100%", backgroundColor: "#EC1110", borderWidth: 1, borderColor: "#D6D6D6", borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "900" }}>LOGIN</Text>
        </TouchableOpacity>


      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EC1110" />
        </View>
      )}
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
  },
})
