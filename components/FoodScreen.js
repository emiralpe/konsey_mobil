import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FoodScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [foodData, setFoodData] = useState(null);

  const fetchFoodData = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD formatında tarih
    try {
      const response = await fetch(`http://localhost:3000/api/foodLists/get/${today}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setFoodData(data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const formatDate = (dateString) => {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}`;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2AB8E7" />;
  }

  if (!foodData) {
    return (
      <SafeAreaView>
        <View className='flex-row items-center justify-between'>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
          <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Yemek Listesi</Text>
          <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
        </View>
        <View className='justify-center items-center mt-10'>
          <Text className='text-[#24428a] text-3xl font-[Bold]'>Bugünün yemek listesi bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View className='flex-row items-center justify-between'>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
        <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Yemek Listesi</Text>
        <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
      </View>
      
      <View className='p-5 border rounded-3xl mt-52 mx-14 items-center justify-center'>
        <Text className='text-[#24428a] my-2 text-4xl font-[Bold]'>{formatDate(foodData.date)}</Text>
        <View style={styles.separator} />
        <Text className='text-[#24428a] my-2 text-xl font-[Semibold]'>{foodData.soup}</Text>
        <View style={styles.separator} />
        <Text className='text-[#24428a] my-2 text-xl font-[Semibold]'>{foodData.mainCourse}</Text>
        <View style={styles.separator} />
        <Text className='text-[#24428a] my-2 text-xl font-[Semibold]'>{foodData.garniture}</Text>
        <View style={styles.separator} />
        <Text className='text-[#24428a] my-2 text-xl font-[Semibold]'>{foodData.otherFoodDrink}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#24428a',
    width: '100%',
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
    marginVertical: 10,
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