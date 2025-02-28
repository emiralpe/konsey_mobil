import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import tailwind from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Okimer() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('Token bulunamadı');
        }

        const response = await fetch('http://192.168.0.210:3000/api/configurations/get/subjects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Error fetching subjects:', errorData);
          return;
        }

        const subjects = await response.json();
        const formattedData = subjects.map(subject => ({
          key: subject.id ? subject.id.toString() : '',
          value: subject.name ? subject.name : '',
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');
      if (!token || !userId) {
        throw new Error('Token veya kullanıcı ID bulunamadı');
      }

      const response = await fetch('http://192.168.0.210:3000/api/okimers/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          subject: selected,
          title: title,
          message: message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error sending message:', errorData);

        if (errorData.includes("Aktif bir okimer talebiniz bulunmaktadır")) {
          Alert.alert(
            "Uyarı!",
            "Aktif bir okimer talebiniz bulunmaktadır.",
            [{ text: "Tamam" }]
          );
        } else {
          ToastAndroid.show("Mesaj gönderilemedi!", ToastAndroid.SHORT);
        }
        return;
      }

      ToastAndroid.show("Mesaj başarıyla gönderildi!", ToastAndroid.SHORT);
      setTitle("");
      setMessage("");
      setSelected("");
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show("Mesaj gönderilemedi!", ToastAndroid.SHORT);
    }
  };

  return (
    <View>
      <View className='flex-row mt-20 items-center justify-between'>
        <AntDesign onPress={() => navigation.goBack("Support")} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
        <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>OKİMER</Text>
        <Feather name="home" className='mr-5' size={35} color="#2AB8E7" />
      </View>

      <View style={[tailwind`absolute top-40 right-7 left-7 p-6`, { 
        borderWidth: 2, 
        borderColor: 'white', 
        borderRadius: 20, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8, 
        backgroundColor: 'white'
      }]}>
        <SelectList 
          className='text-[#24428a] border-[#24428a]'
          setSelected={(val) => setSelected(val)} 
          data={data} 
          save="value"
          placeholder='Konu Seç'
          boxStyles={styles.selectBox} // SelectList kutusunun stili
          inputStyles={styles.selectInput} // SelectList giriş alanının stili
          dropdownStyles={styles.selectDropdown} // SelectList açılır menüsünün stili
          dropdownItemStyles={styles.selectDropdownItem} // SelectList açılır menü öğelerinin stili
        />
      
        <TextInput
          fontFamily="SemiBold"
          style={[tailwind`mt-4 mb-4 p-4 text-[#24428a] rounded-xl border-[0.2] border-[#24428a]`, { height: 50 }]}
          placeholder="Başlık"
          placeholderTextColor={'#24428a'}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          fontFamily="SemiBold"
          style={[tailwind`mb-4 p-4 text-[#24428a] rounded-xl border-[0.2] border-[#24428a]`, { height: 120, textAlignVertical: 'top' }]}
          multiline={true}
          numberOfLines={1}
          placeholder="Mesajınız"
          placeholderTextColor={'#24428a'}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={[tailwind`bg-[#2AB8E7] w-auto rounded-xl px-5 py-2 `]} onPress={handleSubmit}>
          <Text style={[tailwind`text-sm text-white text-center`, { fontFamily: "Semibold" }]}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectBox: {
    borderColor: '#24428a', 
    borderRadius: 15,
  },
  selectInput: {
    fontFamily: "Semibold",
    color: '#24428a',
  },
  selectDropdown: {
    borderColor: '#24428a',
  },
  selectDropdownItem: {
    borderColor: '#24428a',
  },
});