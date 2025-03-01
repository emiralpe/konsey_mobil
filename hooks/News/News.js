import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import foto from '../../assets/foto.jpg';
export default function News() {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            console.log('fetchNews function called');
            const token = await AsyncStorage.getItem('userToken');
            console.log('Token:', token);
            if (!token) {
                console.error('Token not found');
                return;
            }
            try {
                const response = await fetch('http://localhost:3000/api/news/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error('Error fetching news:', errorData);
                    return;
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                const newsWithLikes = data.map(news => ({ ...news, liked: false, scale: new Animated.Value(1) }));
                setNewsData(newsWithLikes);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchNews();
    }, []);

    const handleLikePress = (index) => {
        const updatedNewsData = [...newsData];
        const newsItem = updatedNewsData[index];

        Animated.sequence([
            Animated.timing(newsItem.scale, {
                toValue: 1.2,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(newsItem.scale, {
                toValue: 1,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(newsItem.scale, {
                toValue: 1.1,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(newsItem.scale, {
                toValue: 1,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
        newsItem.liked = !newsItem.liked;
        setNewsData(updatedNewsData);
    };

    return (
        <ScrollView>
            <View className='justify-center items-center mt-4'>
                {newsData.map((news, index) => (
                    <View key={index} className='w-[95%] mt-5 h-72 shadow bg-[#fff] rounded-xl'>
                        <Image source={foto} className='w-full h-40 rounded-xl' />
                        <View>
                            <Text className='text-[#24428a] border-b border-[gray] text-2xl font-[Bold] px-5 py-5 mt-2'>{news.title}</Text>
                            <View className='mt-2 mx-3 flex-row justify-between items-center'>
                                <TouchableOpacity onPress={() => handleLikePress(index)}>
                                    <Animated.View style={{ transform: [{ scale: news.scale }] }}>
                                        <AntDesign
                                            name={news.liked ? 'like1' : 'like2'}
                                            size={27}
                                            color={news.liked ? '#24428a' : '#24428a'}
                                        />
                                    </Animated.View>
                                </TouchableOpacity>
                                <TouchableOpacity className='flex-row'>
                                    <EvilIcons name="share-google" size={36} color="#24428a" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({});