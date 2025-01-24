import { Text, TextInput,Alert, View, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import Interests from '../hooks/Interests/Interests';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [birthday, setBirthDay] = useState(""); // Başlangıç değeri olarak yeni bir Date nesnesi
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
  
    setBirthDay(masked);
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
      if(response.ok){
        Alert.alert('Başarılı', 'Kayıt başarılı!', [
          { text: 'Tamam', onPress: () => navigation.navigate('Login') },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
  };
    

  return (
    <KeyboardAvoidingView>

    <ScrollView contentContainerStyle={{ paddingBottom: 35 }}>
      <Text className="text-2xl ml-12 pt-20 text-[#24428a] border-[#24428a]" style={{ fontFamily: "Semibold" }}>Adınız</Text>
      <TextInput value={name} onChangeText={(text) => setName(text)} className=" p-3 mx-8 my-3 mt-1 rounded-xl border border-[#24428a]" />

      <Text className="text-2xl ml-12 text-[#24428a] " style={{ fontFamily: "Semibold" }}>Soyadınız</Text>
      <TextInput value={surname} onChangeText={(text) => setSurname(text)} className=" p-3 mx-8 my-3 mt-1 rounded-xl border border-[#24428a]" />

      <Text className="text-2xl ml-12 text-[#24428a]" style={{ fontFamily: "Semibold" }}>Doğum Tarihiniz</Text>
      <TextInput
  value={birthday}
  maxLength={10}
  onChangeText={handleInput}
  className="p-3 mx-8 my-3 mt-1 rounded-xl border border-[#24428a]"
  placeholder="DD-MM-YYYY" // Kullanıcıya format ipucu verilmesi için
/>


      <Text className="text-2xl ml-12 text-[#24428a]" style={{ fontFamily: "Semibold" }}>Öğrenci Numaranız</Text>
      <TextInput value={studentNumber} onChangeText={(text) => setStudentNumber(text.toLowerCase())} className=" p-3 mx-8 my-3 mt-1 rounded-xl border border-[#24428a]" />

      <Text className="text-2xl ml-12 text-[#24428a]" style={{ fontFamily: "Semibold" }}>Telefon Numaranız</Text>
      <TextInput value={phoneNumber} onChangeText={(text) => setPhoneNumber(text.toLowerCase())} className=" p-3 mx-8 my-3 mt-1 rounded-xl border border-[#24428a]" />

      <Text className="text-2xl ml-12 text-[#24428a]" style={{ fontFamily: "Semibold" }}>E-posta Adresiniz</Text>
      <TextInput value={email} onChangeText={(text) => setEmail(text.toLowerCase())} className=" p-3 mx-8 my-3 mt-1 rounded-xl border border-[#24428a]" />

      <Text className="text-2xl ml-12 text-[#24428a]" style={{ fontFamily: "Semibold" }}>İkametgah</Text>
      <TextInput value={address} onChangeText={(text) => setAddress(text.toLowerCase())} className=" p-10 mx-8 my-3 mt-1 rounded-xl border border-[#24428a]" style={{ paddingTop: 5, paddingLeft: 10, lineHeight: 18, height: 120, textAlignVertical: 'top' }} multiline={true} numberOfLines={1} />

      <Text className="text-2xl ml-12 text-[#24428a]" style={{ fontFamily: "Semibold" }}>İlgi Alanlarınız</Text>
      <View>
        <View className='flex-row  mx-10'>
           <Interests onSelectInterests={setSelectedInterests}/>
        </View>
          <Text className="text-2xl ml-12 text-[#24428a]" style={{ fontFamily: "Semibold" }}>Şifre Oluştur</Text>
          <View className='flex justify-center '>
            <TextInput keyboardType='numeric' maxLength={6} value={password} onChangeText={setPassword} secureTextEntry={showPassword} className="p-3 mx-8 my-3 mt-1 rounded-xl border border-[#24428a]" />
              <TouchableOpacity className='absolute top-2.5 right-10'>
              {showPassword ? (
                      <AntDesign onPress={() => setshowPassword(false)} name="eyeo" className='' size={30} color="black" />
                    ) : (
                      <Feather onPress={() => setshowPassword(true)} name="eye-off" size={24} color="black" />
                    )}
              </TouchableOpacity>
          </View>
          <Text className="text-2xl ml-12 text-[#24428a]" style={{ fontFamily: "Semibold" }}>Şifreyi Doğrula</Text>
       
        <View className='flex justify-center '>
        <TextInput value={password2} onChangeText={setPassword2} keyboardType='numeric' maxLength={6} secureTextEntry={confirmPassword} className="p-3 mx-8 my-3 mt-1 rounded-xl border border-[#24428a]" />
          <TouchableOpacity className='absolute top-2.5 right-10'>
          {confirmPassword ? (
                  <AntDesign onPress={() => setshowsecondPassword(false)} name="eyeo" className='' size={30} color="black" />
                ) : (
                  <Feather onPress={() => setshowsecondPassword(true)} name="eye-off" size={24} color="black" />
                )}
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center justify-center mt-5 mx-12'>
          <Checkbox value={isChecked} onValueChange={setChecked} className="mr-3" color={isChecked ? '#24428a' : undefined} style={{ borderRadius: 5 }} />
          <Text className="text-sm" style={{ color: '#24428a' }}>
            Gizlilik ve kişisel verilerin işlenmesine dair sözleşmeyi kabul ediyorum.
          </Text>
        </View>

        <View className='flex-1 items-center justify-center'>
          <TouchableOpacity onPress={handleSignUp} className='bg-[#24428a] w-[350] rounded-full items-center justify-center px-5 py-1 my-5 mx-13'>
            <Text className="text-2xl text-white" style={{ fontFamily: "Semibold" }}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}