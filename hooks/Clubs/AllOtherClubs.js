import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const fetchAllOtherClubs = async (setAllOtherClubs) => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('userToken');

    if (!userId || !token) {
      console.error('User ID veya Token bulunamadı');
      return;
    }

    const response = await fetch(`http://localhost:3000/api/clubs/get/all-oder-clubs/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.status);
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      if (response.ok) {
        setAllOtherClubs(data);
      } else {
        console.error('Error fetching all other clubs:', data.message);
      }
    } catch (jsonError) {
      console.error('JSON Parse Error:', jsonError);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default function AllOtherClubs() {
  const navigation = useNavigation();
  const [allOtherClubs, setAllOtherClubs] = useState([]);

  useEffect(() => {
    fetchAllOtherClubs(setAllOtherClubs);
  }, []);

  return (
    <SafeAreaView>

    <ScrollView>
      <View className='flex-row items-center justify-between'>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
        <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>Kulüpler</Text>
        <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
      </View>
      <View className='items-center'>
        {allOtherClubs.length > 0 ? (
            allOtherClubs.map((club, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate("ClubDetails2", { clubId: club._id })}>
              <View className='w-[90%] col-span-12 shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                <Image className='ml-2 col-span-3 rounded-full w-24 h-24' source={{ uri: club.imageUrl }} />
                <View className='flex-1' flexShrink>
                  <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-xl font-[Semibold] ml-2'>{club.name}</Text>
                  <Text numberOfLines={2} ellipsizeMode='tail' className='text-base ml-2'>{club.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
            <Text className='text-center text-base mt-4'>Kulüp bulunamadı.</Text>
        )}
      </View>
    </ScrollView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({});