import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function AllClubsScreen() {
    const navigation = useNavigation();
    const [userClubs, setUserClubs] = useState([]); 
    
    const fetchUserClubs = async (setUserClubs) => {
        try {
          const userId = await AsyncStorage.getItem('userId'); // Kullanıcı ID'sini al
          const token = await AsyncStorage.getItem('userToken'); // Kullanıcı Token'ını al
      
          if (!userId || !token) {
            console.error('User ID veya Token bulunamadı');
            return;
          }
      
          const response = await fetch(`http://localhost:3000/api/clubs/get/home-page/${userId}`, {
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
              setUserClubs(data.clubs);
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
      useEffect(() => {
          fetchUserClubs(setUserClubs);
        }, []);
  return (
    <SafeAreaView>
        <View className='flex-row items-center justify-between'>
            <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
            <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>Kulüplerim</Text>
            <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
        </View>
        <View>
            {userClubs.map((club,key) => (
                <TouchableOpacity className='items-center' onPress={()=> navigation.navigate("ClubDetails", { clubId: club._id })} key={key}>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})