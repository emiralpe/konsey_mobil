import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewsScreen() {
  const navigation = useNavigation();
  const [notices, setNotices] = useState([]);
  const [loadingNotices, setLoadingNotices] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch('http://localhost:3000/api/notices/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        if (response.ok) {
          setNotices(data);
        } else {
          console.error('Error fetching notices:', data.message);
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoadingNotices(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <ScrollView>

    <SafeAreaView>
      <View className='flex-row items-center justify-between'>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
        <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Duyurular</Text>
        <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
      </View>
      <View className='flex-col items-center justify-center'>
        <View className=' p-6 rounded-lg w-full'>
          {loadingNotices ? (
              <ActivityIndicator size="large" color="#2AB8E7" />
            ) : (
                notices.length > 0 ? (
                    notices.map((notice, index) => (
                        <View key={index} className='mb-4 border border-gray-300 rounded-lg p-4'>
                  <Text className='text-base font-[Bold]'>{notice.title}</Text>
                  <Text className='text-sm'>{notice.description}</Text>
                </View>
              ))
            ) : (
                <Text>Duyuru bulunamadı.</Text>
            )
        )}
        </View>
      </View>
    </SafeAreaView>
        </ScrollView>
  );
}

const styles = StyleSheet.create({});