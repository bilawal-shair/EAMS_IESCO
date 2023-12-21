import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
// import { useEffect, useState } from 'react';
// import * as Animatable from 'react-native-animatable';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import UploadAttendance from './screens/UploadAttendance';
import CameraScreen from './screens/CameraScreen';
import ImageView from './screens/ImageView';

import AuthLoadingScreen from './screens/AuthLoadingScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='authLoading' headerMode = {false}>
        <Stack.Screen name = "authLoading" component={AuthLoadingScreen} options={{headerShown:false}}/> 
        <Stack.Screen name = "splash" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "login" component={LoginScreen} options={{headerShown:false}}/>
         <Stack.Screen name = "home" component={HomeScreen} options={{headerShown:false}}/>
         <Stack.Screen name = "UploadAttendance" component={UploadAttendance} options={{headerShown:false}}/>
        <Stack.Screen name = "CameraScreen" component={CameraScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "View" component={ImageView} options={{headerShown:false}}/>  
     </Stack.Navigator>
   </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }

});
