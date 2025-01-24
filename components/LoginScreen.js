import {
  StyleSheet, Text, View, Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const loginData = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch('http://localhost:3000/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      const text = await response.text();
      console.log('Response data:', text);
  
      if (response.status == 200) {
        Alert.alert('Başarılı', 'Giriş başarılı!', [
          { text: 'Tamam', onPress: () => navigation.navigate('HomePage') },
        ]);
      } else {
        Alert.alert('Hata', 'E-mail veya şifre yanlış!');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Hata', 'Bir sorun oluştu. Lütfen tekrar deneyiniz.');
    }
  };
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
          {/* <Text className='text-2xl ml-8 mb-3 text-[white]' style={{ fontFamily: "SemiBold" }}>Konsey Mobil'e Hoş Geldiniz</Text>
          <Text className='text-3xl ml-8 mb-3 text-[white]' style={{ fontFamily: "Bold" }}>Mert Dal</Text> */}
          <View className='flex-row mt-4 mx-auto w-[100%] justify-center'>
            <TextInput value={email} onChangeText={(text)=>setEmail(text.toLowerCase())} autoCapitalize='none' className='border-b-2 border-b-white w-[300]  px-3 py-2 text-xl text-[#fff]' placeholder="E-Mail" placeholderTextColor="gray"  />
          </View>
          <View className='flex-row mt-4 mx-auto w-[100%] justify-center'>
            <TextInput maxLength={6} value={password} onChangeText={setPassword} keyboardType='numeric' className='border-b-2 w-[270] border-b-white  px-3 py-2 text-xl text-[#fff]' placeholder="Şifre" placeholderTextColor="gray" secureTextEntry />
            <TouchableOpacity onPress={handleLogin} className='border-b-2  border-b-white pr-3 mt-1'>
            <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View className='flex-row mt-4'>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}