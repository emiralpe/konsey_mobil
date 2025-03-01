import { Modal, StyleSheet, Text, View, ActivityIndicator, TextInput, Alert, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { FontAwesome, Ionicons, FontAwesome6, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SelectList } from 'react-native-dropdown-select-list';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import MyLineChart from './Graphic';

const Tab = createMaterialTopTabNavigator();

export default function ClubDetailsButtons({ clubId }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [conditionsModalVisible, setConditionsModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [activity, setActivity] = useState(false)
  const [noticesModalVisible, setNoticesModalVisible] = useState(false);
  const [eventsModalVisible, setEventsModalVisible] = useState(false);
  const [managementTeam, setManagementTeam] = useState([]);
  const [clubRules, setClubRules] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRules, setLoadingRules] = useState(true);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingAttendedEvents, setLoadingAttendedEvents] = useState(true);
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [selectedTab, setSelectedTab] = useState('all'); // 'all' or 'joined'
  const [activityCount, setActivityCount] = useState(0);
  const [allEventsCount, setAllEventsCount] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const isMounted = useRef(true);
  const navigation = useNavigation();

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`http://localhost:3000/api/clubs/get/all-events/${clubId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        if (response.ok && isMounted.current) {
          setEvents(data);
        } else {
          console.error('Error fetching events:', data.message);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        if (isMounted.current) {
          setLoadingEvents(false);
        }
      }
    };

    if (eventsModalVisible && selectedTab === 'all') {
      fetchEvents();
    }
  }, [eventsModalVisible, selectedTab, clubId]);

  useEffect(() => {
    const fetchAttendedEvents = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`http://localhost:3000/api/clubs/get/attended-events/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok && isMounted.current) {
          setAttendedEvents(data);
        } else {
          console.error('Error fetching attended events:', data.message);
        }
      } catch (error) {
        console.error('Error fetching attended events:', error);
      } finally {
        if (isMounted.current) {
          setLoadingAttendedEvents(false);
        }
      }
    };

    if (eventsModalVisible && selectedTab === 'joined') {
      fetchAttendedEvents();
    }
  }, [eventsModalVisible, selectedTab]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Kullanıcı Token'ını al
        const response = await fetch(`http://localhost:3000/api/clubs/get/notices/${clubId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Token'ı ekle
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          if (isMounted.current) {
            setNotices(data);
          }
        } else {
          console.error('Error fetching notices:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        if (isMounted.current) {
          setLoadingNotices(false);
        }
      }
    };

    if (noticesModalVisible) {
      fetchNotices();
    }
  }, [noticesModalVisible, clubId]);
  useEffect(() => {
    const fetchActivityCount = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('userToken');
        
        const response = await fetch(`http://localhost:3000/api/clubs/get/activity/${clubId}/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok && isMounted.current) {
          setActivityCount(data.attendedEvents);
          setAllEventsCount(data.requiredEvents);
          setPercentage(data.attendancePercentage);
        } else {
          console.error('Error fetching activity count:', data.message);
        }
      } catch (error) {
        console.error('Error fetching activity count:', error);
      }
    };    fetchActivityCount();
  }, [clubId]);
  
  const handleSend = async () => {
    let valid = true;
    setTitleError('');
    setMessageError('');
  
    if (title.length < 3) {
      setTitleError('Başlık en az 3 karakter olmalıdır.');
      valid = false;
    }
  
    if (message.length < 10) {
      setMessageError('Mesaj en az 10 karakter olmalıdır.');
      valid = false;
    }
  
    if (!subject || !title || !message) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
  
    if (!valid) {
      return;
    }
  
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
          subject: subject?.value || 'Bilinmeyen Konu', // Eğer `subject.value` yoksa fallback değeri kullan
          title,
          message,
          status: true,
          generatedDate: new Date().toISOString(),
        }),
      });
  
      const responseText = await response.text();
      console.log(responseText);
  
      if (response.ok) {
        Alert.alert('Başarılı', 'Mesajınız gönderildi.');
        setHelpModalVisible(false);
        setSubject({ key: '', value: '' }); // Seçimi sıfırla
        setTitle('');
        setMessage('');
      } else {
        console.error('Error sending message:', responseText);
        Alert.alert('Hata', 'Mesaj gönderilemedi.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Hata', 'Mesaj gönderilemedi.');
    }
  };

  return (
    <ScrollView>
      <View className='flex-row flex-wrap justify-between mx-5 mt-10'>
        <TouchableOpacity onPress={() => setEventsModalVisible(true)} className='flex-row items-center bg-[#24428a] rounded-lg w-50 py-4'>
          <Feather className='ml-3' name="smartphone" size={24} color="#fff" />
          <Text className='text-[#fff] font-[Bold] text-base ml-3'>Etkinlikler</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={eventsModalVisible}
          onRequestClose={() => setEventsModalVisible(false)}
        >
          <View className='flex-1 justify-center items-center bg-white bg-opacity-50'>
            <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
              <View className='bg-white p-6 rounded-lg w-full'>
                <SafeAreaView></SafeAreaView>
                <View className='flex-1 flex-row pb-10'>
                    <TouchableOpacity
                      className=' rounded-lg '
                      onPress={() => setEventsModalVisible(false)}
                    >
                      <Ionicons name="arrow-back" size={32} color="#2AB8E7"/>
                    </TouchableOpacity>
                    <Text className='text-3xl ml-12 font-[Bold] text-[#24428a]'>Kulüp Etkinlikleri</Text>
                    <View></View>
                </View>
                
                <View className='flex-row justify-around mb-4'>
                  <TouchableOpacity onPress={() => setSelectedTab('all')} className={`${selectedTab === 'all' ? 'bg-white border-b border-blue-900' : 'bg-white'} py-2 px-4 rounded-lg`}>
                    <Text className='text-black'>Tüm Etkinlikler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedTab('joined')} className={`${selectedTab === 'joined' ? 'bg-white border-b border-blue-900' : 'bg-white'} py-2 px-4 rounded-lg`}>
                    <Text className='text-black'>Katıldığım Etkinlikler</Text>
                  </TouchableOpacity>
                </View>
                {selectedTab === 'all' ? (
                  loadingEvents ? (
                    <ActivityIndicator size="large" color="#2AB8E7" />
                  ) : (
                    events.length > 0 ? (
                      events.map((event, index) => (
                        <View key={index} className='mb-4 border border-gray-300 rounded-lg p-4'>
                          <Text className='text-xl text-[#2AB8E7] font-[Bold]'>{event.title}</Text>
                          <Text className='text-lg '>{event.description}</Text>
                          <View className='flex-row items-center'>
                          <Text className='font-[Bold]'>Tarih: </Text>
                          <Text style={{ color: event.textcolor }}>{event.statusOrDate}</Text>
                          </View>
                        </View>
                      ))
                    ) : (
                      <Text>Etkinlik bulunamadı.</Text>
                    )
                  )
                ) : (
                  loadingAttendedEvents ? (
                    <ActivityIndicator size="large" color="#2AB8E7" />
                  ) : (
                    attendedEvents.length > 0 ? (
                      attendedEvents.map((event, index) => (
                        <View key={index} className='mb-4 border border-gray-300 rounded-lg p-4'>
                          <Text className='text-base font-[Bold]'>{event.title}</Text>
                          <Text className='text-sm'>{event.description}</Text>
                        </View>
                      ))
                    ) : (
                      <Text>Etkinlik bulunamadı.</Text>
                    )
                  )
                )}
                
              </View>
            </ScrollView>
          </View>
        </Modal>
      <TouchableOpacity onPress={() => setNoticesModalVisible(true)} className='flex-row items-center bg-[#24428a] rounded-lg w-50 py-4'>
        <Ionicons className='ml-3' name="notifications-outline" size={24} color="#fff" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Duyurular</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={noticesModalVisible}
        onRequestClose={() => setNoticesModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-white bg-opacity-50'>
          <SafeAreaView></SafeAreaView>
          <ScrollView showsHorizontalScrollIndicator={false} className='w-full'>
          <View className='bg-white p-6 rounded-lg w-full'>
            <View className='flex-row justify-between mb-5 items-center'>
            <Text className='text-2xl text-[#24428a] font-[Bold] '>Duyurular</Text>
            <AntDesign  onPress={() => setNoticesModalVisible(false)} name="closecircleo" size={24} color="#2AB8E7" />
            </View>
            {loadingNotices ? (
              <ActivityIndicator size="large" color="#2AB8E7" />
            ) : (
              notices.length > 0 ? (
                notices.map((notice, index) => (
                  <View key={index} className='mb-4 border border-gray-300 rounded-lg p-4'>
                    <Text className='text-base font-[Bold]'>{notice.title}</Text>
                    <Text className='text-sm'>{notice.description}</Text>
                  </View>
                ))
              ) : (
                <Text>Duyuru bulunamadı.</Text>
              )
            )}
          </View>
          </ScrollView>
        </View>
        
      </Modal>
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
        <View className='flex-1 justify-center items-center bg-white bg-opacity-50'>
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
        <View className='flex-1 justify-center items-center bg-white bg-opacity-50'>
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
      <TouchableOpacity onPress={()=> setActivity(true)} className='flex-row mt-5 items-center  bg-[#24428a] rounded-lg w-50 py-4'>
        <FontAwesome className='ml-3' name="heartbeat" size={24} color="white" />
        <Text className='text-[#fff] font-[Bold] ml-3 text-base'>Aktiflik</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={activity}
        onRequestClose={() => setActivity(false)}
      >
      
        
        <View className='flex-1 items-center bg-white bg-opacity-0'>
          <View className='bg-white p-6 rounded-lg w-full '>
          <SafeAreaView></SafeAreaView>
          <View className='flex-row py-2 justify-between items-center'>
            <Text className='text-3xl font-[Bold]'>Aktiflik</Text>
            <TouchableOpacity
              className='rounded-lg px-4'
              onPress={() => setActivity(false)}
              >
              <AntDesign name="closecircleo" size={24} color="#2AB8E7" />
            </TouchableOpacity>
            </View>
            <View className='flex-row mt-5 justify-between items-center'>
              <TouchableOpacity className='bg-white w-32 h-32 items-center justify-center rounded-2xl shadow-xl'>
              <Text className='text-[#009213]'>Toplam Etkinlik</Text>
                <Text className='text-7xl font-[Bold] text-[#009213]'>{allEventsCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity className='bg-white w-32 h-32 items-center justify-center rounded-2xl shadow-xl'>
                <Text className='text-[#94314E]'>Katıldığım</Text>
                <Text className='text-7xl font-[Bold] text-[#94314E]'>{activityCount}</Text>
              
              </TouchableOpacity>
              <TouchableOpacity className='bg-white w-32 h-32 items-center justify-center rounded-2xl shadow-xl'>
                <Text className='text-[#b88d00]'>Aktifliğim</Text>
                <View className='flex-row items-center'>
                  <Text className='font-[Bold] text-[#b88d00] text-2xl'>%</Text>
                  <Text className='text-7xl font-[Bold] text-[#b88d00]'>{percentage}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className='px-10'>

            <MyLineChart clubId={clubId}/>
            </View>
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
              setSelected={(val) => setSubject(subjectOptions.find(option => option.key === val).value)}
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
            {titleError ? <Text style={{ color: 'red', fontSize: 12 }}>{titleError}</Text> : null}
            <TextInput
              placeholder="Mesaj"
              value={message}
              onChangeText={setMessage}
              className='border border-gray-300 rounded-lg p-3 h-40 mb-4'
              multiline
            />
            {messageError ? <Text style={{ color: 'red', fontSize: 12 }}>{messageError}</Text> : null}
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

      
    </View>
    </ScrollView>
  );
  
};

const styles = StyleSheet.create({});