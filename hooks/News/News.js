import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function News() {
    const [scale] = useState(new Animated.Value(1));
    const [liked, setLiked] = useState(false);

    const handleLikePress = () => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1.2,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1.1,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 150,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();

        setLiked(!liked);
    };

    return (
        <ScrollView>
            <View className='justify-center items-center mt-4'>
                <View className='w-[95%] mt-5 h-72 shadow bg-[#fff] rounded-xl'>
                    <Image source={require('../../assets/foto.jpg')} className='w-full h-40 rounded-xl' />
                    <View>
                        <Text className='text-[#24428a] border-b border-[gray] text-2xl font-[Bold] px-5 py-5 mt-2'>Haber Başlığı</Text>
                        <View className='mt-2 mx-3 flex-row justify-between items-center'>
                            <TouchableOpacity onPress={handleLikePress}>
                                <Animated.View style={{ transform: [{ scale }] }}>
                                    <AntDesign
                                        name={liked ? 'like1' : 'like2'}
                                        size={27}
                                        color={liked ? '#24428a' : '#24428a'}
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                            <TouchableOpacity className='flex-row'>
                                <EvilIcons name="share-google" size={36} color="#24428a" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {[...Array(3)].map((_, index) => (
                    <View key={index} className='w-[95%] mt-5 h-72 shadow bg-[#fff] rounded-xl'>
                        <Image source={require('../../assets/foto.jpg')} className='w-full h-40 rounded-xl' />
                        <View>
                            <Text className='text-[#24428a] border-b border-[gray] text-2xl font-[Bold] px-5 py-5 mt-2'>Haber Başlığı</Text>
                            <View className='flex-row justify-between'>
                                <Text className='text-[#24428a] text-lg ml-5 mt-2'>Beğen</Text>
                                <Text className='text-[#24428a] text-lg mr-5 mt-2'>Paylaş</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});