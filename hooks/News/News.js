import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'

export default function News() {
    return (
        <ScrollView>
        <View className='justify-center items-center  mt-4 '>
            <View className='w-[95%] mt-5 h-72 shadow bg-[#fff] rounded-xl'>
                <Image source={require('../../assets/foto.jpg')} className='w-full h-40 rounded-xl' />
                <View>
                    <Text className='text-[#24428a] border-b border-[gray] text-2xl font-[Bold] px-5 py-5 mt-2'>Haber Başlığı</Text>
                    <View className='flex-row justify-between'>
                        <Text className='text-[#24428a] text-lg ml-5 mt-2'>Beğen</Text>
                        <Text className='text-[#24428a] text-lg mr-5 mt-2'>Paylaş</Text>
                    </View>
                </View>
            </View>
            <View className='w-[95%] mt-5 h-72 shadow bg-[#fff] rounded-xl'>
                <Image source={require('../../assets/foto.jpg')} className='w-full h-40 rounded-xl' />
                <View>
                    <Text className='text-[#24428a] border-b border-[gray] text-2xl font-[Bold] px-5 py-5 mt-2'>Haber Başlığı</Text>
                    <View className='flex-row justify-between'>
                        <Text className='text-[#24428a] text-lg ml-5 mt-2'>Beğen</Text>
                        <Text className='text-[#24428a] text-lg mr-5 mt-2'>Paylaş</Text>
                    </View>
                </View>
            </View>
            <View className='w-[95%] mt-5 h-72 shadow bg-[#fff] rounded-xl'>
                <Image source={require('../../assets/foto.jpg')} className='w-full h-40 rounded-xl' />
                <View>
                    <Text className='text-[#24428a] border-b border-[gray] text-2xl font-[Bold] px-5 py-5 mt-2'>Haber Başlığı</Text>
                    <View className='flex-row justify-between'>
                        <Text className='text-[#24428a] text-lg ml-5 mt-2'>Beğen</Text>
                        <Text className='text-[#24428a] text-lg mr-5 mt-2'>Paylaş</Text>
                    </View>
                </View>
            </View>
            <View className='w-[95%] mt-5 mb-10 h-72 shadow bg-[#fff] rounded-xl'>
                <Image source={require('../../assets/foto.jpg')} className='w-full h-40 rounded-xl' />
                <View>
                    <Text className='text-[#24428a] border-b border-[gray] text-2xl font-[Bold] px-5 py-5 mt-2'>Haber Başlığı</Text>
                    <View className='flex-row justify-between'>
                        <Text className='text-[#24428a] text-lg ml-5 mt-2'>Beğen</Text>
                        <Text className='text-[#24428a] text-lg mr-5 mt-2'>Paylaş</Text>
                    </View>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})