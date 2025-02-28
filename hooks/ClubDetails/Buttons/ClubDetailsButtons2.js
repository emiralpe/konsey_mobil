import { Modal, StyleSheet, Text, View, ActivityIndicator, TextInput, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { FontAwesome, Ionicons, FontAwesome6, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SelectList } from 'react-native-dropdown-select-list';

export default function ClubDetailsButtons2({ clubId }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [conditionsModalVisible, setConditionsModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [managementTeam, setManagementTeam] = useState([]);
  const [clubRules, setClubRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRules, setLoadingRules] = useState(true);
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const isMounted = useRef(true);
  const subjectOptions = [
    { key: '1', value: 'Konu 1' },
    { key: '2', value: 'Konu 2' },
    { key: '3', value: 'Konu 3' },
  ];

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchManagementTeam = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Kullanıcı Token'ını al
        const response = await fetch(`http://localhost:3000/api/clubs/get/management-team/${clubId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Token'ı ekle
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          if (isMounted.current) {
            setManagementTeam(data);
          }
        } else {
          console.error('Error fetching management team:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    if (modalVisible) {
      fetchManagementTeam();
    }
  }, [modalVisible, clubId]);

  useEffect(() => {
    const fetchClubRules = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Kullanıcı Token'ını al
        const response = await fetch(`http://localhost:3000/api/clubs/get/club-rules/${clubId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Token'ı ekle
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          if (isMounted.current) {
            setClubRules(data);
          }
        } else {
          console.error('Error fetching club rules:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        if (isMounted.current) {
          setLoadingRules(false);
        }
      }
    };

    if (conditionsModalVisible) {
      fetchClubRules();
    }
  }, [conditionsModalVisible, clubId]);

  const handleSend = async () => {
    try {
      const user = await AsyncStorage.getItem('userId'); // Kullanıcı ID'sini al
      const token = await AsyncStorage.getItem('userToken'); // Kullanıcı Token'ını al
      const response = await fetch('http://localhost:3000/api/clubs/post/contact', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Token'ı ekle
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          club: clubId,
          user: user, // Kullanıcı ID'sini buraya ekleyin
          subject: subject.value,
          title,
          message,
          status: true,
          generatedDate: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Başarılı', 'Mesajınız gönderildi.');
        setHelpModalVisible(false);
      } else {
        console.error('Error sending message:', data.message);
        Alert.alert('Hata', 'Mesaj gönderilemedi.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Hata', 'Mesaj gönderilemedi.');
    }
  };

  const handleApply = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log(token)
      const response = await fetch('http://localhost:3000/api/applications/post/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clubId
        }),
      });

      const data = await response.text();
      console.log(data)
      if (response.ok) {
        Alert.alert('Başarılı', 'Kulübe üye olma isteğiniz gönderildi.');
      } else {
        console.error('Error applying to club:', data);
        Alert.alert('Hata', `${data}`);
      }
    } catch (error) {
      console.error('Error applying to club:', error);
      Alert.alert('Hata', `${error}`);
    } finally {
      setApplyModalVisible(false);
    }
  };

  return (
    <View className='flex-row flex-wrap justify-between mx-5 mt-10'>
      <TouchableOpacity onPress={() => setModalVisible(true)} className='flex-row mt-5 items-center bg-[#24428a] rounded-lg w-50 py-4'>
        <FontAwesome6 className='ml-3' name="people-roof" size={24} color="white" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Yönetim Ekibi</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-black bg-opacity-50'>
          <View className='bg-white p-6 rounded-lg w-80'>
            <Text className='text-lg font-[Bold] mb-4'>Yönetim Ekibi</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#2AB8E7" />
            ) : (
              managementTeam.length > 0 ? (
                managementTeam.map((member, index) => (
                  <View key={index} className='mb-4'>
                    <Text className='text-base font-[Bold]'>{member.name}</Text>
                    <Text className='text-sm'>{member.position}</Text>
                  </View>
                ))
              ) : (
                <Text>Yönetim ekibi bilgisi bulunamadı.</Text>
              )
            )}
            <TouchableOpacity
              className='mt-4 bg-[#24428a] rounded-lg py-2 px-4'
              onPress={() => setModalVisible(false)}
            >
              <Text className='text-white text-center'>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setConditionsModalVisible(true)} className='flex-row mt-5 items-center bg-[#24428a] rounded-lg w-50 py-4'>
        <FontAwesome className='ml-3' name="newspaper-o" size={24} color="white" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Kulüp Koşulları</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={conditionsModalVisible}
        onRequestClose={() => setConditionsModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-black bg-opacity-50'>
          <View className='bg-white p-6 rounded-lg w-80'>
            <Text className='text-lg font-[Bold] mb-4'>Kulüp Koşulları</Text>
            {loadingRules ? (
              <ActivityIndicator size="large" color="#2AB8E7" />
            ) : (
              clubRules.length > 0 ? (
                clubRules.map((rule, index) => (
                  <View key={index} className='mb-4'>
                    <Text className='text-base'>{rule.rule}</Text>
                  </View>
                ))
              ) : (
                <Text>Kulüp koşulları bilgisi bulunamadı.</Text>
              )
            )}
            <TouchableOpacity
              className='mt-4 bg-[#24428a] rounded-lg py-2 px-4'
              onPress={() => setConditionsModalVisible(false)}
            >
              <Text className='text-white text-center'>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setHelpModalVisible(true)} className='flex-row mt-5 items-center bg-[#24428a] rounded-lg w-50 py-4'>
        <FontAwesome className='ml-3' name="support" size={24} color="#fff" />   
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Yardım</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={helpModalVisible}
        onRequestClose={() => setHelpModalVisible(false)}
      >
        <View className='flex-1 bg-white bg-opacity-50'>
          <View className='bg-white p-6 rounded-lg w-full mt-20'>
            <View className='flex-row justify-between my-5'>
              <Text className=' text-[#24428a] text-3xl font-[Bold]'>Yardım</Text>
              <TouchableOpacity
                className=''
                onPress={() => setHelpModalVisible(false)}
                >
                <AntDesign className='' name="closecircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View className=' '>
            <SelectList
              setSelected={setSubject}
              data={subjectOptions}
              placeholder="Konu Seçin"
              placeholderTextColor='#d1d5db'
              boxStyles={{borderColor: '#d1d5db', borderRadius: 8, marginBottom: 12 }}
              dropdownStyles={{ borderColor: '#d1d5db', borderRadius: 8 ,marginBottom: 15,marginTop: -1}}
            />
            <TextInput
              placeholder="Başlık"
              value={title}
              onChangeText={setTitle}
              className=' border border-gray-300 rounded-lg p-4 mb-4'
            />
            <TextInput
              placeholder="Mesaj"
              value={message}
              onChangeText={setMessage}
              className='border border-gray-300 rounded-lg p-3 h-40 mb-4'
              multiline
            />
            </View>
            
            <TouchableOpacity
              className='mt-4 bg-[#24428a] rounded-lg py-4 px-8'
              onPress={handleSend}
            >
              <Text className='text-white text-xl font-[Bold] text-center'>Gönder</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        className='flex-row mt-5 items-center bg-[green] rounded-lg w-50 py-4'
        onPress={() => setApplyModalVisible(true)}
      >
        <Entypo className='ml-3' name="check" size={24} color="white" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Kulübe Üye Ol</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={applyModalVisible}
        onRequestClose={() => setApplyModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-white bg-opacity-50'>
          <View className='bg-white p-6 rounded-lg w-80'>
            <Text className='text-lg font-[Bold] mb-4'>Kulübe üye olmak istediğinizi onaylıyor musunuz?</Text>
            <View className='flex-row justify-around'>
              <TouchableOpacity
                className='bg-[green] rounded-lg py-2 px-4'
                onPress={handleApply}
              >
                <Text className='text-white text-center'>Evet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='bg-[#24428a] rounded-lg py-2 px-4'
                onPress={() => setApplyModalVisible(false)}
              >
                <Text className='text-white text-center'>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}