import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, Modal, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function EventJoinScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [facing, setFacing] = useState('back'); // Kamera yönünü kontrol etmek için

  const [permission, requestPermission] = useCameraPermissions(); // Kamera izinlerini aldık

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('userToken');

        if (!userId || !token) {
          console.error('User ID veya Token bulunamadı');
          return;
        }

        const response = await fetch(`http://localhost:3000/api/events/login/events/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Error fetching events:', errorData);
          return;
        }

        const data = await response.json();
        const formattedData = data.map(event => ({ key: event._id, value: event.title }));
        setEvents(formattedData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Kamera izinlerini kontrol etme
  if (!permission) {
    // Kamera izinleri yükleniyor
    return <ActivityIndicator size="large" color="#2AB8E7" />;
  }

  if (!permission.granted) {
    // Kamera izinleri verilmemiş
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </SafeAreaView>
    );
  }

  const generateVerificationCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setVerificationCode(code);
    setModalVisible(true);
  };

  const toggleCameraFacing = () => {
    setFacing(facing === 'back' ? 'front' : 'back');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2AB8E7" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className='flex-row items-center justify-between'>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
        <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Etkinlik Giriş</Text>
        <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
      </View>
      <View className='justify-center items-center mt-32'>
        <View className='w-[90%] p-5 mt-5 h-96 border rounded-xl'>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={events}
            save="value"
            placeholder='Etkinlik Seç'
            boxStyles={{ borderColor: '#24428a', borderWidth: 1, borderRadius: 10, backgroundColor: 'white' }}
            inputStyles={{ color: '#24428a' }}
            dropdownStyles={{ position: 'absolute', top: 50, left: 0, right: 0, backgroundColor: 'white', borderColor: '#24428a', zIndex: 1000 }}
            dropdownItemStyles={{ color: '#24428a' }}
          />
          <View className='justify-center items-center mt-14'>
            <TouchableOpacity onPress={() => setCameraVisible(true)} className='bg-[#2AB8E7] px-10 py-4 rounded-xl items-center justify-center'>
              <Text className='text-[#fff] font-[Bold] text-xl'>QR ile tara</Text>
            </TouchableOpacity>
            <Text className='font-[Bold] text-xl text-[#24428a]'>Ya da</Text>
            <TouchableOpacity onPress={generateVerificationCode} className='bg-[#2AB8E7] px-10 py-4 rounded-xl items-center justify-center'>
              <Text className='text-[#fff] font-[Bold] text-xl'>Kod ile doğrula</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {cameraVisible && (
        <CameraView
          style={{ flex: 1 }}
          type={facing}
          onBarCodeScanned={({ type, data }) => {
            setCameraVisible(false);
            Alert.alert('QR Kodu Tarandı', `Type: ${type}\nData: ${data}`);
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Doğrulama Kodu</Text>
            <Text style={styles.verificationCode}>{verificationCode}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2AB8E7',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  verificationCode: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});