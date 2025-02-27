import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Socials from '../hooks/ClubDetails/SocialMedia/Socials.js';
import ClubDetailsButtons2 from '../hooks/ClubDetails/Buttons/ClubDetailsButtons2.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ClubDetailsScreen2({route}) {
  const { clubId } = route.params;
  const navigation = useNavigation();
  const [clubDetails, setClubDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Kullanıcı Token'ını al
        const response = await fetch(`http://192.168.0.210:3000/api/clubs/get/${clubId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Token'ı ekle
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setClubDetails(data);
        } else {
          console.error('Error fetching club details:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [clubId]);
  if (loading) {
    return (
      <SafeAreaView className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#2AB8E7" />
      </SafeAreaView>
    );
  }

  if (!clubDetails) {
    return (
      <SafeAreaView>
        <Text>Kulüp detayları yüklenemedi.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <View className='flex-row items-center justify-between'>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
        <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>Kulüp Detay</Text>
        <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
      </View>
      <View className='flex-row items-center justify-center w-full px-24 mt-5'>
        <Image source={{ uri: clubDetails.imageUrl }} className='w-36 h-36 mr-3' />
        <Text className='text-2xl font-[Bold] text-[#244282] ml-3 text-center'>{clubDetails.name}</Text>
      </View>
      <View className='flex-row items-center justify-center w-full px-7 mt-5'>
        <Text className='text-center'>{clubDetails.description}</Text>
      </View>
      <Socials />
      <ClubDetailsButtons2 />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})