import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [allInterests, setAllInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [personalInfoVisible, setPersonalInfoVisible] = useState(false);
  const [contactInfoVisible, setContactInfoVisible] = useState(false);
  const [passwordChangeVisible, setPasswordChangeVisible] = useState(false);
  const [isEditingFaculty, setIsEditingFaculty] = useState(false);
  const [isEditingDepartment, setIsEditingDepartment] = useState(false);

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      if (!userId || !token) {
        console.error('User ID veya Token bulunamadı');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/accounts/get/privateData/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error fetching user data:', errorData);
        return;
      }

      const data = await response.json();
      setUserData(data);
      setSelectedInterests(data.interests.map(interest => interest._id));
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      if (!userId || !token) {
        console.error('User ID veya Token bulunamadı');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/accounts/get/meContactData/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error fetching contact data:', errorData);
        return;
      }

      const data = await response.json();
      setContactData(data);
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  };

  const fetchAllInterests = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/interests/get');
      const data = await response.json();
      setAllInterests(data);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchContactData();
    fetchAllInterests();
  }, []);

  const handleEdit = (field, value) => {
    setEditingField(field);
    setEditedValue(value);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (editingField !== 'password' && !editedValue.trim()) {
      Alert.alert('Hata', 'Bu alan boş bırakılamaz');
      return;
    }

    if (editingField === 'phoneNumber' && (!/^\d{10}$/.test(editedValue))) {
      Alert.alert('Hata', 'Telefon numarası 10 karakter olmalı ve sadece sayılardan oluşmalıdır');
      return;
    }

    if (editingField === 'password' && (!password.trim() || !newPassword.trim())) {
      Alert.alert('Hata', 'Şifre alanları boş bırakılamaz');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      if (!userId || !token) {
        Alert.alert('Hata', 'Kullanıcı ID veya Token bulunamadı');
        return;
      }

      let url = '';
      let body = {};

      if (editingField === 'faculty' || editingField === 'department' || editingField === 'interests') {
        const response = await fetch(`http://localhost:3000/api/accounts/get/privateData/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('Error fetching user data:', data.message);
          return;
        }

        const updatedData = {
          ...data,
          [editingField]: editingField === 'interests' ? selectedInterests.map(id => ({ _id: id, name: allInterests.find(interest => interest._id === id).name })) : editedValue,
        };

        url = `http://localhost:3000/api/accounts/put/updateUser/${userId}`;
        body = updatedData;
      } else if (editingField === 'email' || editingField === 'phoneNumber') {
        const response = await fetch(`http://localhost:3000/api/accounts/get/meContactData/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('Error fetching contact data:', data.message);
          return;
        }

        const updatedContactData = {
          ...data,
          [editingField]: editedValue,
        };

        url = `http://localhost:3000/api/accounts/put/updateContactData/${userId}`;
        body = updatedContactData;
      } else if (editingField === 'password') {
        url = `http://localhost:3000/api/accounts/put/password/${userId}`;
        body = { password, newPassword };
      }

      const updateResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        Alert.alert('Hata', errorData.message || 'Güncelleme sırasında bir hata oluştu');
        return;
      }

      Alert.alert('Başarılı', 'Bilgiler başarıyla güncellendi');
      setModalVisible(false);
      fetchUserData();
      fetchContactData();
    } catch (error) {
      console.error('Error updating data:', error);
      Alert.alert('Hata', 'Güncelleme sırasında bir hata oluştu');
    }
  };

  const toggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleSaveInline = async (field) => {
    if (!editedValue.trim()) {
      Alert.alert('Hata', 'Bu alan boş bırakılamaz');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      if (!userId || !token) {
        Alert.alert('Hata', 'Kullanıcı ID veya Token bulunamadı');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/accounts/get/privateData/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Error fetching user data:', data.message);
        return;
      }

      const updatedData = {
        ...data,
        [field]: editedValue,
      };

      const url = `http://localhost:3000/api/accounts/put/updateUser/${userId}`;
      const body = updatedData;

      const updateResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        Alert.alert('Hata', errorData.message || 'Güncelleme sırasında bir hata oluştu');
        return;
      }

      Alert.alert('Başarılı', 'Bilgiler başarıyla güncellendi');
      fetchUserData();
      if (field === 'faculty') setIsEditingFaculty(false);
      if (field === 'department') setIsEditingDepartment(false);
    } catch (error) {
      console.error('Error updating data:', error);
      Alert.alert('Hata', 'Güncelleme sırasında bir hata oluştu');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2AB8E7" />;
  }

  if (!userData) {
    return (
      <SafeAreaView>
        <View className='flex-row items-center justify-between'>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
          <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Hesabım</Text>
          <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
        </View>
        <View className='justify-center items-center mt-10'>
          <Text className='text-[#24428a] text-3xl font-[Bold]'>Kullanıcı bilgileri bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='flex-row items-center justify-between'>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
          <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Hesabım</Text>
          <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
        </View>
        
        <TouchableOpacity className='flex-row items-center mt-5 pl-5' onPress={() => setPersonalInfoVisible(!personalInfoVisible)}>
          <Text className='text-[#4e4e4e] text-xl font-[Bold]'>Kişisel Bilgilerim</Text>
          <AntDesign name={personalInfoVisible ? "down" : "right"} size={26} color="gray" />
        </TouchableOpacity>
        {personalInfoVisible && (
          <View className='p-4'>
            <View style={styles.row}>
              <Text className='text-[#24428a] text-xl font-[Bold]'>Ad: {userData.name}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>
              <Text className='text-[#24428a] text-xl font-[Bold]'>Soyad: {userData.surname}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>
              <Text className='text-[#24428a] text-xl font-[Bold]'>Öğrenci Numarası: {userData.studentNumber}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>
              <Text className='text-[#24428a] text-xl font-[Bold]'>Fakülte: </Text>
              {isEditingFaculty ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editedValue}
                    onChangeText={setEditedValue}
                  />
                  <TouchableOpacity onPress={() => handleSaveInline('faculty')}>
                    <Text className='bg-[#2AF] p-3 rounded-lg font-[Bold] text-white'>Kaydet</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text className='text-[#24428a] text-xl font-[Bold]'>{userData.faculty}</Text>
                  <TouchableOpacity onPress={() => { setIsEditingFaculty(true); setEditedValue(userData.faculty); }}>
                    <Text style={styles.updateButtonText}>Düzenle</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>
              <Text className='text-[#24428a] text-xl font-[Bold]'>Bölüm: </Text>
              {isEditingDepartment ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editedValue}
                    onChangeText={setEditedValue}
                  />
                  <TouchableOpacity onPress={() => handleSaveInline('department')}>
                    <Text className='bg-[#2AF] p-3 rounded-lg font-[Bold] text-white'>Kaydet</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text className='text-[#24428a] text-xl font-[Bold]'>{userData.department}</Text>
                  <TouchableOpacity onPress={() => { setIsEditingDepartment(true); setEditedValue(userData.department); }}>
                    <Text style={styles.updateButtonText}>Düzenle</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.separator} />
            <Text className='text-[#24428a] text-xl font-[Bold]'>İlgi Alanları:</Text>
            <View style={styles.interestsContainer}>
              {Array.isArray(userData.interests) && userData.interests.map((interest, index) => (
                <View key={index} className='border rounded-lg p-3 mx-2'>
                  <Text className='text-[#24428a] text-lg'>{interest.name}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity className='mt-6' style={styles.updateButton} onPress={() => handleEdit('interests', userData.interests.map(interest => interest.name).join(', '))}>
              <Text style={styles.updateButtonText}>Düzenle</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.separator} />
        
        <TouchableOpacity className='flex-row items-center pl-5' onPress={() => setContactInfoVisible(!contactInfoVisible)}>
          <Text className='text-[#4e4e4e] text-xl font-[Bold]'>İletişim Bilgilerim</Text>
          <AntDesign name={contactInfoVisible ? "down" : "right"} size={26} color="gray" />
        </TouchableOpacity>
        {contactInfoVisible && contactData && (
          <View className='p-5'>
            <View style={styles.row}>
              <Text className='text-[#24428a] text-xl font-[Bold]'>Email: {contactData.email}</Text>
              <TouchableOpacity onPress={() => handleEdit('email', contactData.email)}>
                <Text style={styles.updateButtonText}>Düzenle</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>
              <Text className='text-[#24428a] text-xl font-[Bold]'>Telefon Numarası: {contactData.phoneNumber}</Text>
              <TouchableOpacity onPress={() => handleEdit('phoneNumber', contactData.phoneNumber)}>
                <Text style={styles.updateButtonText}>Düzenle</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.separator} />
        
        <TouchableOpacity className='flex-row items-center pl-5' onPress={() => setPasswordChangeVisible(!passwordChangeVisible)}>
          <Text className='text-[#4e4e4e] text-xl font-[Bold]'>Şifreyi Değiştir</Text>
          <AntDesign name={passwordChangeVisible ? "down" : "right"} size={26} color="gray" />
        </TouchableOpacity>
        {passwordChangeVisible && (
          <View className='p-5'>
            <TextInput
              className='border-b-2 border-[lightgray] py-1 w-full text-center text-xl'
              placeholder="Mevcut Şifre"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <TextInput
              className='border-b-2 border-[lightgray] py-1 w-full text-center text-xl'
              placeholder="Yeni Şifre"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
              <Text style={styles.updateButtonText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  updateButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  updateButtonText: {
    color: '#2AB8E7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#24428a',
    flex: 1,
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 10,
    marginHorizontal: 10,
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
  interestText: {
    color: '#24428a',
    fontSize: 16,
  },
  selectedInterestText: {
    fontWeight: 'bold',
    color: '#2AB8E7',
  },
  interestItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});