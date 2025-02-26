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
import AsyncStorage from '@react-native-async-storage/async-storage';

// Token ve ID'yi kaydetmek için bir fonksiyon
const saveUserData = async (token, _id) => {
  try {
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userId', _id);
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};
export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const loginData = {
      studentNumber: studentNumber, // Öğrenci numarası
      password: password, // Şifre
    };
  
    console.log('Giriş denemesi yapılıyor...', loginData); // İstek verisini kontrol et
  
    try {
      const response = await fetch('http://localhost:3000/api/users/auth', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      const contentType = response.headers.get('Content-Type'); // İçeriğin türünü kontrol et
      console.log('Content-Type:', contentType);
  
      // Gelen cevabın json halini al
      const responseText = await response.text();
      console.log('Raw Response:', responseText); // Json yanıtı ekrana yazdır
  
      if (!contentType || !contentType.includes('application/json')) {
        Alert.alert('Hata', 'Beklenmeyen bir yanıt alındı. Lütfen sunucu yanıtını kontrol edin.');
        return;
      }
  
      // Gelen yanıtı JSON olarak parse etmeye çalış
      let responseData;
      try {
        
        responseData = JSON.parse(responseText);
        
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
        Alert.alert('Hata', `Sunucudan beklenmeyen yanıt alındı:\n${responseText}`);
        return;
      }
  
      console.log('Parsed Response:', responseData); // JSON çevrildikten sonra ekrana yazdır
  
      if (response.status === 200) {
        const { token, _id } = responseData; // Gelen yanıtın içeriğine göre düzenleyin
        await saveUserData(token, _id); // Token ve ID'yi kaydet
        Alert.alert('Başarılı', 'Giriş başarılı!', [
          { text: 'Tamam', onPress: () => navigation.navigate('HomePage') },
        ]);
      } else {
        Alert.alert('Hata', responseData.message || 'E-mail veya şifre yanlış!');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Hata', 'Sunucuya bağlanırken bir hata oluştu.');
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
            <TextInput value={studentNumber} onChangeText={(text)=>setStudentNumber(text.toLowerCase())} autoCapitalize='none' className='border-b-2 border-b-white w-[300]  px-3 py-2 text-xl text-[#fff]' placeholder="Öğrenci No" placeholderTextColor="gray"  />
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