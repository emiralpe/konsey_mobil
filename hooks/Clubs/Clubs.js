import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Kullanıcının kulüplerini getiren fonksiyon
const fetchUserClubs = async (setUserClubs, setOtherClubs) => {
    try {
      const userId = await AsyncStorage.getItem('userId'); // Kullanıcı ID'sini al
      const token = await AsyncStorage.getItem('userToken'); // Kullanıcı Token'ını al
  
      if (!userId || !token) {
        console.error('User ID veya Token bulunamadı');
        return;
      }
  
      console.log('User ID:', userId);
      console.log('Token:', token);
  
      const response = await fetch(`http://192.168.0.210:3000/api/clubs/get/home-page/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Token'ı ekle
          'Content-Type': 'application/json',
        },
      });
  
      const text = await response.text(); // Yanıtı JSON yerine düz metin olarak al
      // API yanıtını terminale yazdır
  
      // JSON formatında olup olmadığını kontrol et
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          console.log(data.clubs);
          console.log(data.interesting);
          setUserClubs(data.clubs);
          setOtherClubs(data.interesting);
        } else {
          console.error('Error fetching clubs:', data.message);
        }
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
    
  };
  
export default function Clubs() {
    const navigation = useNavigation();
    const [userClubs, setUserClubs] = useState([]);   // Kullanıcının üye olduğu kulüpler
    const [otherClubs, setOtherClubs] = useState([]); // Kullanıcının üye olmadığı kulüpler
  useEffect(() => {
    fetchUserClubs(setUserClubs, setOtherClubs);
  }, []);
    console.log(userClubs);
    console.log(otherClubs);
    return (
        <View>
            <View className='flex-row items-center justify-between'>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
                <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>Kulüpler</Text>
                <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
            </View>

            <View className='flex-row mt-10 items-center justify-between'>
                <Text className='text-[#24428a] text-xl ml-5 font-[Bold]'>Üyesi olduğun kulüpler</Text>
                <Text className='text-[#2AB8E7] text-xl mr-5 font-[Bold]'>Tümü</Text>
            </View>
            <View className='items-center'>
            {userClubs.length === 0  ?  <Text className='text-[#2AB8E7] text-xl font-[Semibold] mt-10'>Üye olduğunuz kulüp bulunmamaktadır.</Text> : userClubs.slice(0, 3).map((club, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate("ClubDetails", { clubId: club._id })}>
            <View className='w-[90%] col-span-12 shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
              <Image className=' ml-2 col-span-3 rounded-full w-24 h-24' source={{ uri: club.imageUrl }} />
              <View className='flex-1' flexShrink>
                <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-xl font-[Semibold] ml-2'>{club.name}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>{club.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
            </View>
            <View className='flex-row mt-10 items-center justify-between'>
                <Text className='text-[#24428a] text-xl ml-5 font-[Bold]'>İlgini çekebilecek kulüpler</Text>
                <Text className='text-[#2AB8E7] text-xl mr-5 font-[Bold]'>Tümü</Text>
            </View>
            <View>
      <View className='items-center'>
        {otherClubs.slice(0, 3).map((club, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate("ClubDetails2", { clubId: club._id })}>
            <View className='w-[90%] col-span-12 shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
              <Image className=' ml-2 col-span-3 rounded-full w-24 h-24' source={{ uri: club.imageUrl }} />
              <View className='flex-1' flexShrink>
                <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-xl font-[Semibold] ml-2'>{club.name}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>{club.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
        </View>
    )
}

const styles = StyleSheet.create({})