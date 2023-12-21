import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

  const viewScaleValue = useRef(new Animated.Value(5)).current;
  const logoScaleValue = useRef(new Animated.Value(0.5)).current;

  const navigation = useNavigation();

  useEffect(() => {
    const zoomOut = () => {
      Animated.timing(viewScaleValue, {
        toValue: 1, // Change this value for the desired scale when zoomed out
        duration: 1000, // Adjust the duration as needed
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {

        zoomIn()

      });
    };
    // Trigger the zoom-out animation when the component mounts

    const zoomIn = () => {
      Animated.timing(logoScaleValue, {
        toValue: 1.2, // Change this value for the desired scale when zoomed in
        duration: 500, // Adjust the duration as needed
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    };

    zoomOut();
  }, [viewScaleValue, logoScaleValue]);

  useEffect(() => {
    setTimeout(() => {
      // Navigate to the next screen after 3 seconds (3000ms)
      navigation.navigate('login');
    }, 3000);
  }, []);


  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: 900 }}>

          <Image source={require("../assets/pattern.png")} style={{ width: "100%", height: "100%" }} />

        <Animated.View style={{ transform: [{ rotate: '-36.674deg' }, { scale: viewScaleValue }], position: "absolute", width: 695, height: 282, backgroundColor: "white", borderRadius: 71, marginTop: 320, flexShrink: 0, right: -135 }}>
        </Animated.View>

        <View style={{ position: "absolute", width: 240, height: 181, alignSelf: "center", marginTop: 370 }}>
          <Animated.Image source={require("../assets/Layer_1.jpg")} style={{ transform: [{ scale: logoScaleValue }], width: 210, height: 140, alignSelf: "center",marginTop: 15 }} />
        </View>
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EC1110"
  }

})