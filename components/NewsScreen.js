import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import News from '../hooks/News/News';
import { useNavigation } from '@react-navigation/native';
export default function NewsScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView>
        <View className='flex-row items-center justify-between'>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
        <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Haberler</Text>
        <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
      </View>
      <News/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})