import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
export default function Buttons() {
  const navigation = useNavigation();
  return (
    <View className='flex-row flex-wrap justify-between mx-5 mb-5'>
      <TouchableOpacity onPress={()=> navigation.navigate('Clubs')} className='flex-row items-center  bg-[#24428a] rounded-lg w-50 py-4'>
        <Fontisto className='ml-3' name="world" size={24} color="#fff" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Kulüpler</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Events')} className='flex-row items-center bg-[#24428a] rounded-lg w-50 py-4'>
        <Feather className='ml-3' name="smartphone" size={24} color="#fff" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Etkinlikler</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('EventJoin')} className='flex-row items-center mt-3 bg-[#24428a] rounded-lg w-50 py-4'>
        <Feather className='ml-3' name="list" size={24} color="#fff" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Etkinlik Giriş</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('News')} className='flex-row items-center mt-3 bg-[#24428a] rounded-lg w-50 py-4'>
        <Feather className='ml-3' name="book-open" size={24} color="#fff" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Haberler</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Company')} className='flex-row items-center mt-3 bg-[#24428a] rounded-lg w-50 py-4'>
      <MaterialCommunityIcons className='ml-3' name="sale" size={24} color="#fff" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Öğrenci Tercihi</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Notifications')} className='flex-row items-center mt-3 bg-[#24428a] rounded-lg w-50 py-4'>
      <Ionicons className='ml-3' name="notifications-outline" size={24} color="#fff" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Duyurular</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Account')} className='flex-row items-center mt-3 bg-[#24428a] rounded-lg w-50 py-4'>
      <MaterialIcons name="person-outline" className='ml-3' size={24} color="#fff" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Hesabım</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("Support")} className='flex-row items-center mt-3 bg-[#24428a] rounded-lg w-50 py-4'>
      <FontAwesome className='ml-3' name="support" size={24} color="#fff" />   
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Yardım</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Food')}>
        <View className='flex-row items-center mt-3 bg-[#24428a] rounded-lg w-50 py-4'>
        <Ionicons className='ml-3' name="fast-food-outline" size={24} color="#fff" />
          <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Yemek Listesi</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
})