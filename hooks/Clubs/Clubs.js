import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function Clubs() {
    const navigation = useNavigation();
    return (

        <View>
            <View className='flex-row items-center justify-between'>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
                <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>Kulüpler</Text>
                <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
            </View>

            <View className='flex-row mt-10 items-center justify-between'>
                <Text className='text-[#24428a] text-xl ml-5 font-[Bold]'>Üyesi olduğun kulüpler</Text>
                <Text className='text-[#2AB8E7] text-xl mr-5 font-[Bold]'>Tümü</Text>
            </View>
            <View className='items-center'>
                <TouchableOpacity onPress={() => navigation.navigate("ClubDetails")}>

                    <View className='w-[90%] col-span-12 shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                        <Image className=' ml-2 col-span-3 rounded-full w-24 h-24' source={require('../../assets/oklogo.png')} />
                        <View className='flex-1' flexShrink>
                            <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-xl font-[Semibold] ml-2'>Yönetim Bilişim Sistemleri Kulübü</Text>
                            <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>

                <View className='w-[90%]  col-span-12 shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                    <Image className=' ml-2 col-span-3 rounded-full w-24 h-24' source={require('../../assets/oklogo.png')} />
                    <View className='flex-1' flexShrink>
                        <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-xl font-[Semibold] ml-2'>Yönetim Bilişim Sistemleri Kulübü</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm </Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>

                <View className='w-[90%] shadow col-span-12 items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                    <Image className=' ml-2 col-span-3 rounded-full w-24 h-24' source={require('../../assets/oklogo.png')} />
                    <View className='flex-1' flexShrink>
                        <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-xl font-[Semibold] ml-2'>Yönetim Bilişim Sistemleri Kulübü</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm </Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
            <View className='flex-row mt-10 items-center justify-between'>
                <Text className='text-[#24428a] text-xl ml-5 font-[Bold]'>İlgini çekebilecek kulüpler</Text>
                <Text className='text-[#2AB8E7] text-xl mr-5 font-[Bold]'>Tümü</Text>
            </View>
            <View className='items-center'>
                <TouchableOpacity onPress={() => navigation.navigate("ClubDetails2")}>

                <View className='w-[90%] shadow col-span-12 items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                    <Image className=' ml-2 col-span-3 rounded-full w-24 h-24' source={require('../../assets/oklogo.png')} />
                    <View className='flex-1' flexShrink>
                        <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-xl font-[Semibold] ml-2'>Yönetim Bilişim Sistemleri Kulübü</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm </Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>

                <View className='w-[90%] shadow col-span-12 items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                    <Image className=' ml-2 col-span-3 rounded-full w-24 h-24' source={require('../../assets/oklogo.png')} />
                    <View className='flex-1' flexShrink>
                        <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-xl font-[Semibold] ml-2'>Yönetim Bilişim Sistemleri Kulübü</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm </Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>

                <View className='w-[90%] shadow col-span-12 items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                    <Image className=' ml-2 col-span-3 rounded-full w-24 h-24' source={require('../../assets/oklogo.png')} />
                    <View className='flex-1' flexShrink>
                        <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-xl font-[Semibold] ml-2'>Yönetim Bilişim Sistemleri Kulübü</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm Selamun Selamun Aletküm aleyküm </Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})