import { StyleSheet, Text, View, Image,ScrollView } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '../hooks/HomePage/Slider';
import Buttons from '../hooks/HomePage/Buttons';
import Calendar from '../hooks/HomePage/Calendar';

export default function HomePageScreen() {
  return (
    <ScrollView >
        <View className='m-5 mt-14 items-center justify-between flex-row'>
            <Image className='rounded-full  w-28 h-28' source={require("../assets/oklogo.png")}/>
            <Ionicons className='mx-5' name="notifications-outline" size={40} color="#24428a" />
        </View>
        <Text className='text-2xl ml-5 font-[Bold]' >Günaydın, Mert.</Text>
        <Slider/>
        <Calendar/>
        <Buttons/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})