import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Modal, Animated, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '../hooks/HomePage/Slider';
import Buttons from '../hooks/HomePage/Buttons';
import Calendar from '../hooks/HomePage/Calendar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function HomePageScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        console.log(storedName);
        if (storedName) {
          setName(storedName);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18) {
      setGreeting('İyi Akşamlar');
    } else if (currentHour >= 12) {
      setGreeting('Tünaydın');
    } else if (currentHour >= 6) {
      setGreeting('Günaydın');
    } else {
      setGreeting('İyi Geceler');
    }
  }, []);

  const openModal = () => {
    setIsVisible(true);
    Animated.timing(slideAnim, {
      toValue: width / 3,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsVisible(false));
  };

  const [reviews, setReviews] = useState([
    { id: 1, title: 'Yeni bildirim', description: 'Yeni sürüm yayında haydi uygulamayı güncelle' },
    { id: 2, title: 'Yeni bildirim', description: 'Son giriş 26.12.2024 saat 19:05' },
  ]);

  return (
    <ScrollView>
      <View className='m-5 mt-14 items-center justify-between flex-row'>
        <Image className='rounded-full w-28 h-28' source={require("../assets/oklogo.png")} />
        <Ionicons onPress={openModal} className='mx-5' name="notifications-outline" size={40} color="#24428a" />
      </View>
      <Text className='text-2xl ml-5 font-[Bold]'>{greeting}, {name}.</Text>
      <Slider />
      <Calendar />
      <Buttons />
      <Modal transparent visible={isVisible}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View className='flex-1 bg-[rgba(0,0,0,0.5)]'>
            <TouchableWithoutFeedback>
              <Animated.View className='absolute top-0 bottom-0 w-[66.7%] bg-[#fff]' style={{ left: slideAnim }}>
                <View className='flex-row items-center justify-between mt-20 h-10'>
                  <Text className='text-3xl ml-4 font-[Bold] text-[#24428a]'>Bildirimler</Text>
                  <TouchableOpacity className='mr-4' onPress={closeModal}>
                    <MaterialIcons name="close" size={35} color="#2AB8E7" />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={reviews}
                  renderItem={({ item }) => (
                    <View className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
                      <Text className='text-[gray] text-lg p-2 font-[Bold]'>{item.description}</Text>
                    </View>
                  )}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});