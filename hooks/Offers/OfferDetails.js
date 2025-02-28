import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, TextInput, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OfferDetails({ route }) {
  const { offerId } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        if (!offerId) {
          throw new Error('Offer ID is undefined');
        }

        console.log(`Fetching offer details for ID: ${offerId}`);
        const response = await fetch(`http://192.168.0.210:3000/api/student-preferences/get/offer/${offerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Error response:', errorData);
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOffer(data);
      } catch (error) {
        console.error('Error fetching offer details:', error);
        ToastAndroid.show("Teklif alınamadı!", ToastAndroid.SHORT);
      }
    };

    fetchOfferDetails();
  }, [offerId]);

  const fetchCode = async () => {
    try {
      if (!offerId) {
        throw new Error('Offer ID is undefined');
      }

      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token bulunamadı');
      }

      const response = await fetch('http://192.168.0.210:3000/api/student-preferences/post/offer/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ offerId }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        if (errorData.includes('Zaten bir kod oluşturmuşsunuz')) {
          // Eğer zaten bir kod oluşturulmuşsa, mevcut kodu al
          fetchGeneratedCode(offerId);
        } else {
          console.error('Error response:', errorData);
          throw new Error('Network response was not ok');
        }
      } else {
        const data = await response.json();
        const codeId = data.code; // Assuming the response contains a codeId
        fetchGeneratedCode(codeId);
      }
    } catch (error) {
      console.error('Error fetching code:', error);
      ToastAndroid.show("Kod alınamadı!", ToastAndroid.SHORT);
    }
  };
  
  const fetchGeneratedCode = async (codeId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token bulunamadı');
      }

      const response = await fetch(`http://192.168.0.210:3000/api/student-preferences/get/offer/code/${codeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setGeneratedCode(data.code);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching generated code:', error);
      ToastAndroid.show("Kod alınamadı!", ToastAndroid.SHORT);
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(generatedCode);
    ToastAndroid.show("Kopyalandı!", ToastAndroid.SHORT);
  };

  if (!offer) {
    return (
      <SafeAreaView className='flex-1 bg-white'>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-row items-center justify-between p-4'>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
        <Text className='mx-5 text-[#24428a] text-3xl font-bold'>Öğrenci Tercihi</Text>
        <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View className='items-center my-4'>
          <Text className='text-2xl font-bold text-red-600'>{offer.title}</Text>
          <Text className='text-lg font-semibold text-gray-700' style={styles.textPadding}>
            <Text className='text-lg font-semibold text-[#24428a]'>{offer.description}</Text>
          </Text>
        </View>

        <View className='flex-row space-x-2 my-2' style={styles.textPadding}>
          <Text className='bg-orange-400 text-orange-700 px-2 py-1 rounded'>{offer.tag}</Text>
        </View>

        <View className='mt-4' style={styles.textPadding}>
          <Text className='text-lg font-semibold text-[#24428a]'>Kampanya Koşulları</Text>
          <Text className='text-gray-700 font-bold mt-2'>• Bartın Üniversitesi öğrencisi olmak.</Text>
          <Text className='text-gray-700 font-bold'>• Öğrenci Konseyi mobil uygulamasına üye olmak.</Text>
          <Text className='text-gray-700 font-bold'>• Mağazadan teslim alımlarda geçerlidir.</Text>
          <Text className='text-gray-700 font-bold'>• Tüm işlemlerde geçerlidir.</Text>
          <Text className='text-gray-700 font-bold'>• Kampanyadan 1 ay içinde yalnızca 2 kere faydalanabilirsiniz.</Text>
          <Text className='text-gray-700 font-bold'>• Taksitli ödemelerde kampanya iptal edilir ve hakkınızdan düşer.</Text>
          <Text className='text-gray-700 font-bold'>• Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          <Text className='text-gray-700 font-bold'>• Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          <Text className='text-gray-700 font-bold'>• Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
          <Text className='text-gray-700 font-bold'>• Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
          <Text className='text-gray-700 font-bold'>• Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          <Text className='text-gray-700 font-bold'>• Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          <Text className='text-gray-700 font-bold'>• Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
          <Text className='text-gray-700 font-bold'>• Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
          <Text className='text-gray-700 font-bold'>• Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>

        <View className='mt-4' style={styles.textPadding}>
          <Text className='text-lg font-semibold text-[#24428a]'>Kampanya Geçerlilik Tarihi</Text>
          <Text className='text-gray-700'>Kampanya 31 Aralık 2025 tarihine kadar geçerlidir.</Text>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={fetchCode} style={styles.button}>
        <Text className='text-white font-bold text-lg'>Şifre Al</Text>
      </TouchableOpacity>

      {/* Pop-up Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fırsat Şifreniz</Text>
            <Text style={styles.modalSubtitle}>Kampanyaya katılımınız sağlanmıştır.</Text>
            {generatedCode ? <QRCode value={generatedCode} size={150} /> : null}
            <View style={styles.inputContainer}>
              <TextInput value={generatedCode} style={styles.input} editable={false} />
              <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                <Feather name="copy" size={24} color="#24428a" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 100,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2AB8E7',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 25,
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#24428a',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 5,
  },
  copyButton: {
    padding: 5,
  },
  closeButton: {
    backgroundColor: '#2AB8E7',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textPadding: {
    paddingLeft: 10,
  },
});