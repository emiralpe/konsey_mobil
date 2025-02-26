import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, search, } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function Events() {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const navigation = useNavigation();
    const searchFilter = (text) => {
        setSearch(text);
        if (text) {
          const newData = data.filter(item => {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredData(newData);
        } else {
          setFilteredData(data);
        }
      };
    return (
        <SafeAreaView>
            <View className='flex-row items-center justify-between'>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
                <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>Etkinlikler</Text>
                <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
            </View>
            <View className='width-full mt-5'>
                 <View className='flex-row items-center mt-10 mx-6'>
                        <TextInput
                          value={search}
                          placeholder='Arama'
                          className='bg-[#fff] justify-center items-center text-lg shadow w-[60%] pl-12 h-12 rounded-xl'
                          onChangeText={(text) => searchFilter(text)}
                        />
                        <AntDesign name="search1" size={28} className='absolute ml-2' color="#24428a" />
                        <TouchableOpacity className='flex-row items-center justify-end ml-16'>
                          <Text className='text-[#2AB8E7] text-2xl font-[Bold]'>Filtrele</Text>
                        </TouchableOpacity>
                      </View>
                
                <TouchableOpacity>

                <View className='w-[90%] m-auto col-span-12 shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                    <View className='flex-1' flexShrink>
                        <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-lg font-[Semibold] ml-2'>Tanışma ve Kulüp tanıtma etkinliği</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Düzenleyen: YBS Kulübü</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Tarih: 7 Ocak 2024 Saat 13.00</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>

                <View className='w-[90%] m-auto col-span-12 shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                    <View className='flex-1' flexShrink>
                        <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-lg font-[Semibold] ml-2'>Dümen etkinliği</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Düzenleyen: YBS Kulübü</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Tarih: 7 Ocak 2024 Saat 13.00</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>

                <View className='w-[90%] m-auto col-span-12 shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                    <View className='flex-1' flexShrink>
                        <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-lg font-[Semibold] ml-2'>Tanışma ve Kulüp tanıtma etkinliği</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Düzenleyen: YBS Kulübü</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Tarih: 7 Ocak 2024 Saat 13.00</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>

                <View className='w-[90%] m-auto col-span-12 shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                    <View className='flex-1' flexShrink>
                        <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-lg font-[Semibold] ml-2'>Tanışma ve Kulüp tanıtma etkinliği</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Düzenleyen: YBS Kulübü</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' className=' text-base ml-2'>Tarih: 7 Ocak 2024 Saat 13.00</Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})