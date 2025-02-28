import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { SelectList } from 'react-native-dropdown-select-list';

export default function EventJoinScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const data = [
    { key: '3', value: 'Etkinlik 3' },
    { key: '3', value: 'Etkinlik 3' },
    { key: '3', value: 'Etkinlik 3' },
    { key: '3', value: 'Öğöğöğöğ 3' },
    { key: '3', value: 'Etkinlik 3' },
    { key: '3', value: 'Etkinlik 3' },
    { key: '3', value: 'Etkinlik 3' },
  ];

  return (
    <SafeAreaView>
      <View className='flex-row items-center justify-between'>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
        <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Etkinlik Giriş</Text>
        <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
      </View>
      <View className='justify-center items-center mt-32'>
        <View className='w-[90%] p-5 mt-5 h-96 border rounded-xl'>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            placeholder='Etkinlik Seç'
            boxStyles={{ borderColor: '#24428a', borderWidth: 1, borderRadius: 10, backgroundColor: 'white' }}
            inputStyles={{ color: '#24428a' }}
            dropdownStyles={{ position: 'absolute', top: 50, left: 0, right: 0, backgroundColor: 'white', borderColor: '#24428a', zIndex: 1000 }}
            dropdownItemStyles={{ color: '#24428a' }}
          />
          <View className='justify-center items-center mt-14'>
            <TouchableOpacity className='bg-[#2AB8E7] px-10 py-4 rounded-xl items-center justify-center'>
              <Text className='text-[#fff] font-[Bold] text-xl'>QR ile tara</Text>
            </TouchableOpacity>
            <Text className='font-[Bold] text-xl text-[#24428a]'>Ya da</Text>
            <TouchableOpacity className='bg-[#2AB8E7] px-10 py-4 rounded-xl items-center justify-center'>
              <Text className='text-[#fff] font-[Bold] text-xl'>Kod ile doğrula</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}