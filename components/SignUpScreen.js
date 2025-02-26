import { Text, TextInput, Alert, View, ScrollView,Modal, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Interests from '../hooks/Interests/Interests';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import StepIndicator from '../hooks/StepIndicator/StepIndicator';
export default function SignUpScreen({ navigation }) {
  const [step, setStep] = useState(1); // Kayıt adımlarını takip eden state
  const [modalVisible, setModalVisible] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [birthday, setBirthday] = useState(""); // Başlangıç değeri olarak yeni bir Date nesnesi
  const [studentNumber, setStudentNumber] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [interests, setSelectedInterests] = useState([]);
  const [showPassword, setshowPassword] = useState(true)
  const [confirmPassword, setshowsecondPassword] = useState(true)
  const [isChecked, setChecked] = useState(false);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null)
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleInput = (text) => {
    // Sadece sayıları al
    const cleaned = text.replace(/\D/g, ''); // Tüm rakam olmayan karakterleri temizle

    // Maskeleme formatını uygula: DD-MM-YYYY
    let masked = cleaned;

    if (masked.length >= 3 && masked.length <= 4) {
      masked = masked.replace(/(\d{2})(\d{1})/, '$1-$2'); // 2 rakam + 1 rakam = DD-M
    } else if (masked.length >= 5 && masked.length <= 6) {
      masked = masked.replace(/(\d{2})(\d{2})(\d{1})/, '$1-$2-$3'); // 2 rakam + 2 rakam + 1 rakam = DD-MM-
    } else if (masked.length >= 7 && masked.length <= 8) {
      masked = masked.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3'); // 2 rakam + 2 rakam + 4 rakam = DD-MM-YYYY
    }

    // Sadece 10 karaktere kadar sınırlı olsun (DD-MM-YYYY)
    masked = masked.slice(0, 10);

    setBirthday(masked);
  };




  const validateForm = () => {
    if (!name) {
      Alert.alert('Hata', 'Lütfen adınızı girin.');
      return false;
    }
    if (!surname) {
      Alert.alert('Hata', 'Lütfen soyadınızı girin.');
      return false;
    }
    if (!birthday) {
      Alert.alert('Hata', 'Lütfen doğum tarihinizi girin.');
      return false;
    }
    if (!studentNumber) {
      Alert.alert('Hata', 'Lütfen öğrenci numaranızı girin.');
      return false;
    }
    if (!phoneNumber) {
      Alert.alert('Hata', 'Lütfen telefon numaranızı girin.');
      return false;
    }
    if (!email) {
      Alert.alert('Hata', 'Lütfen e-posta adresinizi girin.');
      return false;
    }
    if (!address) {
      Alert.alert('Hata', 'Lütfen ikametgah adresinizi girin.');
      return false;
    }
    if (!password) {
      Alert.alert('Hata', 'Lütfen şifrenizi girin.');
      return false;
    }
    if (password !== password2) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor.');
      return false;
    }
    if (!isChecked) {
      Alert.alert('Hata', 'Lütfen gizlilik sözleşmesini kabul edin.');
      return false;
    }
    return true;
  };

  const convertToISO8601 = (dateString) => {
    try {
      const [day, month, year] = dateString.split("-");
      if (!day || !month || !year || year.length !== 4) throw new Error();

      const dateObj = new Date(`${year}-${month}-${day}`);

      if (isNaN(dateObj)) throw new Error();

      return dateObj.toISOString();
    } catch {
      return null;
    }
  };
  const isoBirthday = birthday ? convertToISO8601(birthday) : null;

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }
    const signUpData = {
      name,
      surname,
      password,
      birthday: isoBirthday,
      studentNumber,
      phoneNumber,
      email,
      address,
      interests,
    };

    // Döngüsel referansları kontrol et ve kaldır
    const removeCircularReferences = (obj) => {
      const seen = new WeakSet();
      const traverse = (value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
          for (const key in value) {
            value[key] = traverse(value[key]);
          }
        }
        return value;
      };
      return traverse(obj);
      
    };

    const sanitizedData = removeCircularReferences(signUpData);

    try {
      const response = await fetch('http://localhost:3000/api/users/post', { // localhost yerine IP adresi kullanın
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });
      const text = await response.text(); // Yanıtı ham metin olarak al
      console.log(text)
      const data = JSON.parse(text); // JSON'a dönüştürmeyi dene
      console.log(data)
      if (response.ok) {
        Alert.alert('Kayıt başarılı!', 'Başarıyla kayıt oldunuz.', [
          {
            text: 'Tamam',
            onPress: () => setTimeout(() => navigation.replace('Login'), 500),
          },
        ]);
        
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };


  return (
    <SafeAreaView >
      <KeyboardAvoidingView >
        <ScrollView  contentContainerStyle={{ paddingBottom: 35 }}>
        <Modal  visible={modalVisible} animationType="slide" transparent={true}>
            <View className="flex-1 justify-center items-center bg-[#D9D9D9] opacity-100">
              <View className="bg-white p-6 rounded-2xl w-[80%]">
                <StepIndicator currentStep={step} />
                {step === 1 && (
                  <View>
                    <Text className="text-2xl text-[#24428a] ml-4">Adınız</Text>
                    <TextInput  value={name} onChangeText={setName} className="border border-[#24428a] p-3 mx-4 my-2 rounded-xl" />
                    <Text className="text-2xl text-[#24428a] ml-4">Soyadınız</Text>
                    <TextInput value={surname} onChangeText={setSurname} className="border border-[#24428a] p-3 mx-4 my-2 rounded-xl" />
                    <Text className="text-2xl text-[#24428a] ml-4">Doğum Tarihiniz</Text>
                    <TextInput
            value={birthday}
            maxLength={10}
            onChangeText={handleInput}
            className="border border-[#24428a] p-3 mx-4 my-2 rounded-xl"
            placeholder="DD-MM-YYYY" // Kullanıcıya format ipucu verilmesi için
          />
                    <Text className="text-2xl text-[#24428a] ml-4">Öğrenci Numaranız</Text>
                    <TextInput maxLength={11} value={studentNumber} onChangeText={setStudentNumber} className="border border-[#24428a] p-3 mx-4 my-2 rounded-xl" />
                    <TouchableOpacity onPress={nextStep} className="bg-[#24428a] p-3 rounded-full mx-4 mt-4">
                      <Text className="text-white text-center text-lg">İleri</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {step === 2 && (
                  <View>
                    <Text className="text-2xl text-[#24428a] ml-4">Telefon Numaranız</Text>
                    <TextInput placeholder='(501)-000-00-00' maxLength={10} value={phoneNumber} onChangeText={setPhoneNumber} className="border border-[#24428a] p-3 mx-4 my-2 rounded-xl" />
                    <Text className="text-2xl text-[#24428a] ml-4">E-posta Adresiniz</Text>
                    <TextInput value={email} onChangeText={(text) => setEmail(text.toLowerCase())} className="border border-[#24428a] p-3 mx-4 my-2 rounded-xl" />
                    <Text className="text-2xl text-[#24428a] ml-4">İkametgah</Text>
                    <TextInput value={address} onChangeText={setAddress} className="border border-[#24428a] p-3 mx-4 my-2 rounded-xl" multiline />
                    <View className="flex-row justify-between mx-4 mt-4">
                      <TouchableOpacity onPress={prevStep} className="bg-gray-500 py-3 w-[30%]  rounded-full">
                        <Text className="text-white text-center">Geri</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={nextStep} className="bg-[#24428a] py-3 w-[30%]  rounded-full">
                        <Text className="text-white text-center">İleri</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {step === 3 && (
                  <View className='align-center justify-center'>
                    <Text className="font-[Semibold] pb-4 text-3xl text-[#24428a] text-center">İlgi Alanlarınız</Text>
                    <Interests onSelectInterests={setSelectedInterests} />
                  <View className="flex-row justify-between mx-4 mt-4">
                    <TouchableOpacity onPress={prevStep} className="bg-gray-500 justify-center py-3 w-[30%]  rounded-full">
                      <Text className="text-white text-center">Geri</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nextStep} className="bg-[#24428a] py-3 w-[30%]  rounded-full">
                       <Text className="text-white text-center">İleri</Text>
                     </TouchableOpacity>
                  </View>
                </View>
                 
                )}
                {step === 4 && (
                   <View>
                   <Text className="text-2xl text-[#24428a] ml-4">Şifre Oluştur</Text>
                   <Text className='text-[#8b8b8b] ml-4'>Maksimum 6 karakter ve sayılardan oluşmalıdır.</Text>
                   <TextInput onChangeText={(text) => {
    // Sadece rakamları kabul et
    if (/^\d*$/.test(text)) {
      setPassword(text);
    }
  }} value={password} keyboardType='numeric' maxLength={6}  secureTextEntry className="border border-[#24428a] p-3 mx-4 my-2 rounded-xl" />
                   <Text className="text-2xl text-[#24428a] ml-4">Şifreyi Doğrula</Text>
                   <TextInput onChangeText={(text) => {
    // Sadece rakamları kabul et
    if (/^\d*$/.test(text)) {
      setPassword2(text);
    }
  }} value={password2} keyboardType='numeric' maxLength={6}  secureTextEntry className="border border-[#24428a] p-3 mx-4 my-2 rounded-xl" />
                   <View className='flex-row items-center justify-center mt-5 mx-8'>
              <Checkbox value={isChecked} onValueChange={setChecked} className="mr-3" color={isChecked ? '#24428a' : undefined} style={{ borderRadius: 5 }} />
              <Text className="text-sm" style={{ color: '#24428a' }}>
                Gizlilik ve kişisel verilerin işlenmesine dair sözleşmeyi kabul ediyorum.
              </Text>
            </View>
                   <View className="flex-row justify-between mx-4 mt-4">
                     <TouchableOpacity onPress={prevStep} className="bg-gray-500 py-3 w-[30%]  rounded-full">
                       <Text className="text-white text-center">Geri</Text>
                     </TouchableOpacity>
                     
                     <TouchableOpacity  onPress={handleSignUp} className="bg-[#0fb000] justify-center py-3 w-[30%]  rounded-full">
                      <Text className="text-white text-center">Kayıt Ol</Text>
                    </TouchableOpacity>
                   </View>
                 </View>
                )}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}