import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
export default function SupportScreen() {
    const navigation = useNavigation();
  return (
    <View className='w-full'>
          <View className='flex-row mt-20 items-center justify-between'>
             <AntDesign onPress={()=>navigation.goBack("HomePage")} name="arrowleft" className='ml-5' size={40} color="#2AB8E7"  />
            <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>Yardım</Text>
            <Feather name="home" className='mr-5' size={35} color="#2AB8E7"/>
          </View>
         <Text className='font-[Bold] text-[#24428a] text-3xl ml-5 mt-10 mb-5'>Sıkça Sorulan Sorular 😂</Text>
         <TouchableOpacity className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
          <Text className='text-[gray] text-lg  p-2 font-[Bold]'>Kulübe nasıl üye olabilirim?</Text>
          <Entypo className='absolute right-10' name="chevron-right" size={32} color="gray" />
         </TouchableOpacity>
         <TouchableOpacity className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
          <Text className='text-[gray] text-lg p-2 font-[Bold]'>Etkinlik bildirimlerini nasıl kapatabilirim?</Text>
          <Entypo className='absolute right-10' name="chevron-right" size={32} color="gray" />
         </TouchableOpacity>
         <TouchableOpacity className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
          <Text className='text-[gray] text-lg  p-2 font-[Bold]'>Bilgilerimi nasıl değiştirebilirim?</Text>
          <Entypo className='absolute right-10' name="chevron-right" size={32} color="gray" />
         </TouchableOpacity>
         <TouchableOpacity className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
          <Text className='text-[gray] text-lg  p-2 font-[Bold]'>Etkinlik girişinde kamera açılmıyor?</Text>
          <Entypo className='absolute right-10' name="chevron-right" size={32} color="gray" />
         </TouchableOpacity>
         <TouchableOpacity className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
          <Text className='text-[gray] text-lg p-2 font-[Bold]'>Giriş yaparken hata veriyor?</Text>
          <Entypo className='absolute right-10' name="chevron-right" size={32} color="gray" />
         </TouchableOpacity>
         <View className='w-full'>

      <TouchableOpacity onPress={()=>navigation.navigate("Okimer")} className='absolute right-0 m-5 bg-[#2AB8E7]  rounded-lg w-36 py-2 px-1'>
        <Text className='text-[#fff] font-bold text-center text-xl '>OKİMER</Text>
      </TouchableOpacity>
         </View>
    </View>
  )
}

const styles = StyleSheet.create({
})