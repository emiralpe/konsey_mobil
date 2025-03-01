import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EventsDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { event } = route.params;

  if (!event) {
    return (
      <SafeAreaView>
        <View className='flex-row items-center justify-between'>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
          <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Etkinlik Detayları</Text>
          <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
        </View>
        <View className='justify-center items-center'>
          <Text className='text-[#24428a] text-3xl font-[Bold] mt-10'>Etkinlik bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!event.date) {
    return (
      <SafeAreaView>
        <View className='flex-row items-center justify-between'>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
          <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Etkinlik Detayları</Text>
          <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
        </View>
        <View className='justify-center items-center'>
          <Text className='text-[#24428a] text-3xl font-[Bold] mt-10'>Etkinlik tarihi bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Tarih ve saat bilgilerini formatlama
  const eventDate = new Date(event.date);
  const formattedDate = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(eventDate);
  const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Etkinlik konum bilgisi
  const eventLocation = {
    latitude: event.location.latitude,
    longitude: event.location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleApply = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      if (!userId || !token) {
        Alert.alert('Hata', 'Kullanıcı ID veya Token bulunamadı');
        return;
      }

      const response = await fetch('http://localhost:3000/api/events/post/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, eventId: event._id })
      });
      if (response.ok) {
        Alert.alert('Başarılı', 'Etkinliğe başarıyla başvuruldu');
      } else {
        const errorData = await response.json();
        Alert.alert('Hata', errorData.message || 'Etkinliğe başvurulurken bir hata oluştu');
      }
    } catch (error) {
      Alert.alert('Hata', 'Etkinliğe zaten başvurdunuz.');
      console.error('Error applying for event:', error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='flex-row items-center justify-between'>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
          <Text className='mx-5 text-[#24428a] text-3xl font-[Bold]'>Etkinlik Detayları</Text>
          <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
        </View>
        <View className='justify-center ml-10'>
           <Text className='text-[#24428a] text-3xl font-[Bold] mt-10'>{event.title}</Text>
           <Text className=' text-base mt-5'>{event.description}</Text>
           <Text className='text-[#24428a] font-[Semibold] text-xl mt-7'>Düzenleyen</Text>
           <View className='flex-row items-center'>
            <Image className='rounded-full w-28 h-28' source={{ uri: event.organizer.imageUrl }} />
           <Text className='font-[Bold]'>{event.organizer.name}</Text>
           </View>
           <Text className='text-[#24428a] font-[Semibold] text-xl mt-7'>Tarih ve Konum bilgisi</Text>
           <Text className='font-[Semibold] text-xl'>{formattedDate} Saat: {formattedTime}</Text>
           <Text className='font-[Semibold] text-xl'>{event.venue}</Text> 
           <Text className='font-[Semibold] text-[#2AB8E7] text-xl'>{event.location}</Text> 
        </View>
        <View className='align-center flex-1'>
          <MapView
             provider={PROVIDER_DEFAULT}
             style={styles.map}
             className='w-full h-96'
             initialRegion={eventLocation}
           >
             <Marker
               coordinate={eventLocation}
               title={event.title}
               description={event.venue}
             />
           </MapView>
        </View>
        <View className='justify-center items-center mt-5'>
          <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Etkinliğe Başvur</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 200,
    marginTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  applyButton: {
    backgroundColor: '#2AB8E7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});