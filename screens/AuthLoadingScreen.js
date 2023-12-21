// AuthLoadingScreen.js
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const userLoggedIn = await AsyncStorage.getItem('USER_LOGGED_IN');

    // Assuming your authentication flag is stored in 'USER_LOGGED_IN'
    // You might want to replace this with your actual flag key
  
    if (userLoggedIn === 'true') {
      // User is logged in, navigate to the authenticated screen
      navigation.navigate('home');
    } else {
      // User is not logged in, navigate to the login screen
      navigation.navigate('splash');
    }
  };

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color="#EC1110" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLoadingScreen;
