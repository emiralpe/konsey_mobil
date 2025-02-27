import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { FontAwesome, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
export default function ClubDetailsButtons() {
  return (
    <View className='flex-row flex-wrap justify-between mx-5 mt-10'>
      <TouchableOpacity onPress={()=> navigation.navigate('Clubs')} className='flex-row mt-5 items-center  bg-[#24428a] rounded-lg w-50 py-4'>
      <FontAwesome6 className='ml-3' name="people-roof" size={24} color="white" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Yönetim Ekibi</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Clubs')} className='flex-row mt-5 items-center  bg-[#24428a] rounded-lg w-50 py-4'>
      <FontAwesome className='ml-3' name="newspaper-o" size={24} color="white" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Kulüp Koşulları</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Clubs')} className='flex-row mt-5 items-center  bg-[#24428a] rounded-lg w-50 py-4'>
      <FontAwesome className='ml-3' name="support" size={24} color="#fff" />   
      <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Yardım</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Clubs')} className='flex-row mt-5 items-center  bg-[green] rounded-lg w-50 py-4'>
      <Entypo className='ml-3' name="check" size={24} color="white" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Kulübe Üye Ol</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})