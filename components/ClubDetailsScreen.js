import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Socials from '../hooks/ClubDetails/SocialMedia/Socials.js';
import ClubDetailsButtons from '../hooks/ClubDetails/Buttons/ClubDetailsButtons.js';

export default function ClubDetailsScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView>
            <View className='flex-row items-center justify-between'>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
                <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>Kulüp Detay</Text>
                <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
            </View>
            <View className='flex-row items-center justify-center w-full px-24 mt-5'>
                <Image source={require('../assets/barulogo.png')} className='w-36 h-36 mr-3'/>
                <Text className='text-2xl font-[Bold] text-[#244282] ml-3 text-center'>Yönetim Bilişim Sistemleri Kulübü</Text>
            </View>
            <View className='flex-row items-center justify-center w-full px-7 mt-5'>
            <Text className='text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            </View>
            <Socials/>
            <ClubDetailsButtons/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})