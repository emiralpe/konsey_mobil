import { Image, StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';

const { width: screenWidth } = Dimensions.get('window');

export default function SliderItem({ item }) {
  return (
    <View style={styles.itemContainer} class>
      <Image style={styles.image} source={item.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 360,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});