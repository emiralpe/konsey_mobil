import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

export default function Company() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();
  const data = [
    { key: '1', title: "Clean Cleaning'de geçerli net %20 indirim", description: 'Etkinlik 1 Açıklama', image: require('../../assets/foto.jpg') },
    { key: '2', title: "Barfit'de geçerli net %10 indirim", description: 'Etkinlik 1 Açıklama', image: require('../../assets/foto.jpg') },
    { key: '3', title: "ASG Katık'da geçerli net %20 indirim", description: 'Etkinlik 1 Açıklama', image: require('../../assets/foto.jpg') },
    { key: '4', title: "ASG Katık'da geçerli net %20 indirim", description: 'Etkinlik 1 Açıklama', image: require('../../assets/foto.jpg') },
    { key: '5', title: "ASG Katık'da geçerli net %20 indirim", description: 'Etkinlik 1 Açıklama', image: require('../../assets/foto.jpg') },
    { key: '6', title: "ASG Katık'da geçerli net %20 indirim", description: 'Etkinlik 1 Açıklama', image: require('../../assets/foto.jpg') },
  ];

  useEffect(() => {
    setFilteredData(data);
  }, []);

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
        <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Öğrenci Tercihi</Text>
        <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
      </View>
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
      <View>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View className='w-[90%] m-auto shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                <View className='flex-1'>
                  <View className='flex-row'>
                    <View className='flex-1 justify-center'>
                      <Text numberOfLines={2} ellipsizeMode='tail' className='text-[#2AB8E7] text-lg font-[Semibold] ml-2'>{item.title}</Text>
                      <Text ellipsizeMode='tail' className=' text-base ml-2'>{item.description}</Text>
                      <View className='w-20 items-center flex-row mt-1 ml-1 '>
                        <Text className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Sponsor</Text>
                        <Text className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Sponsor</Text>
                      </View>
                    </View>
                    <Image source={item.image} className='max-w-28 max-h-28 rounded-xl ml-2' />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});