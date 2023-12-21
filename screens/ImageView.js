import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';


const ImageView = ({ route }) => {
  const { takenPhotos } = route.params;
  console.log('takenPhotos:', takenPhotos);
  return (
    <View style={styles.container}>
  
      <Swiper style={styles.wrapper} showsButtons={true} nextButton={<Text style={{fontSize:45, marginLeft:15, color:"white"}}>›</Text>} prevButton={<Text  style={{fontSize:45, marginRight:15, color:"white"}}>‹</Text>}>
        {takenPhotos.map((photo, index) => (
          <View key={index}>
            <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
 },
  wrapper: {},
  image: {
    width: '100%',
    height: '100%',
  },
});