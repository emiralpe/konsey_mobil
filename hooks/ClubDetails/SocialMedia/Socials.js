import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
export default function Socials({ clubId }) {
  const [rating, setRating] = useState(null);
  const [socialMedia, setSocialMedia] = useState({});
  const [loading, setLoading] = useState(true);

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
            console.log(data.rating);
            console.log(data.socialMedia[0]);
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
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#2AB8E7" />
      </View>
    );
  }

  return (
    <View>
      <View className='border-b border-[gray]'>
        <View className='flex-row items-center justify-between mt-3 mx-10 mb-2 '>
          <View className='flex-row items-center'>
            <FontAwesome name="star" size={36} color="orange" />
            <Text className='ml-2 font-[Bold] text-2xl'>{rating}</Text>
          </View>
          <View className='flex-row items-center'>
            <TouchableOpacity onPress={() => socialMedia.instagram && Linking.openURL(socialMedia.instagram)}>
              <AntDesign className='mr-2' name="instagram" size={28} color="purple" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => socialMedia.whatsapp && Linking.openURL(socialMedia.whatsapp)}>
              <FontAwesome className='mr-2' name="whatsapp" size={28} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => socialMedia.twitter && Linking.openURL(socialMedia.twitter)}>
              <FontAwesome6 className='mr-2' name="x-twitter" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => socialMedia.facebook && Linking.openURL(socialMedia.facebook)}>
              <FontAwesome5 name="facebook-f" size={22} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});