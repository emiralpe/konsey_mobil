import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, Feather, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ClubDetailsButtons from '../hooks/ClubDetails/Buttons/ClubDetailsButtons.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
export default function ClubDetailsScreen({ route }) {
  const { clubId } = route.params;
  const navigation = useNavigation();
  const [clubDetails, setClubDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(null);
  const [socialMedia, setSocialMedia] = useState({});
  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Kullanıcı Token'ını al
        const response = await fetch(`http://localhost:3000/api/clubs/get/${clubId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Token'ı ekle
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setClubDetails(data);
          setRating(data.rating);
          setSocialMedia(data.socialMedia[0]);
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
        <Text className=''>{clubDetails.description}</Text>
      </View>
      <View className='border-b border-[gray]'>
        <View className='flex-row items-center justify-between mt-3 mx-10 mb-2 '>
          <View className='flex-row items-center'>
            <FontAwesome name="star" size={36} color="orange" />
            <Text className='ml-2 font-[Bold] text-2xl'>{rating}</Text>
          </View>
          <View className='flex-row items-center'>
            <TouchableOpacity onPress={() => socialMedia.instagram && Linking.openURL(socialMedia.instagram)}>
              <AntDesign className='mr-3' name="instagram" size={28} color="purple" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => socialMedia.twitter && Linking.openURL(socialMedia.twitter)}>
              <FontAwesome6 className='mr-3' name="x-twitter" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => socialMedia.facebook && Linking.openURL(socialMedia.facebook)}>
              <FontAwesome5  className='mr-3' name="facebook-f" size={22} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => socialMedia.whatsapp && Linking.openURL(socialMedia.whatsapp)}>
              <FontAwesome name="whatsapp" size={28} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ClubDetailsButtons clubId={clubId} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});