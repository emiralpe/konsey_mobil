import {
  StyleSheet, Text, View, Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <ImageBackground
        source={require("../assets/loginbgimage.png")}
        style={{ width: "100%", height: "100%" }}

      >
        <View className='absolute w-full h-full bg-black opacity-60' />
        <View className='flex-row justify-between mt-16 mx-5'>

          <Image className='rounded-full w-[120] h-[120]' source={require('../assets/oklogo.png')} />
          <Image className='w-[120] h-[120]' source={require('../assets/barulogo.png')} />
        </View>
        <View className='w-full h-full flex-1  justify-center mb-40'>
          <Text className='text-2xl ml-8 mb-3 text-[white]' style={{ fontFamily: "SemiBold" }}>Konsey Mobil'e Hoş Geldiniz</Text>
          <Text className='text-3xl ml-8 mb-3 text-[white]' style={{ fontFamily: "Bold" }}>Mert Dal</Text>
          <View className='flex-row mt-4 mx-auto justify-center'>
            <TextInput maxLength={6} keyboardType='numeric' className='border-b-2 border-b-white w-[300] px-3 py-2 text-xl text-[#fff]' placeholder="Şifre" placeholderTextColor="gray" secureTextEntry />
            <AntDesign onPress={()=>navigation.navigate("HomePage")} className='border-b-2 border-b-white pr-3 mt-1' name="arrowright" size={24} color="white" />
          </View>
          <View className='flex-row mt-4'>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({})