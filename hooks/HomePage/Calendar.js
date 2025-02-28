import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Calendar() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('userToken');
        const date = new Date().toISOString();
        const response = await fetch('http://localhost:3000/api/home-page/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ userId, date })
        });

        const text = await response.text();
        console.log('Response Text:', text); // Yanıtın içeriğini konsola yazdırın
        const data = JSON.parse(text);

        if (response.ok) {
          setEvents(data); // API'den dönen "Bugünkü etkinlik" verilerini kaydet
        } else {
          console.error('Error fetching event data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('tr-TR', options).format(date);
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 3) + '...';
    }
    return title;
  };

  const date = new Date().toISOString();
  const formattedDate = formatDate(date).split(' ');

  if (loading) {
    return <ActivityIndicator size="large" color="#2AB8E7" />;
  }

  return (
    <View className="w-full m-5 mt-7 flex-row">
      <View style={styles.container} className="items-center bg-[#24428a] justify-center">
        <Text className="text-[#fff] text-xl font-[Bold]">{formattedDate[1]}</Text>
        <Text className="text-[#fff] text-5xl font-[Bold]">{formattedDate[0]}</Text>
        <Text className="text-[#fff] text-2xl font-[Bold]">{formattedDate[2]}</Text>
      </View>

      <View className="flex flex-wrap h-[150] justify-center mt-1">
        <TouchableOpacity onPress={()=> navigation.navigate('Events')} className="ml-3 flex-row items-center">
          <Text style={{fontFamily:"SemiBold"}} className="text-[#24428a]  text-lg">Bugün ki Etkinlikler </Text>
          <AntDesign className='' name="arrowright" size={18} color="#24428a" />
        </TouchableOpacity>

        {events.length > 0 ? (
          events.slice(0, 3).map((event) => (
            <View key={event._id} className="w-60 mt-1 ml-3 flex-row items-center">
              <Text className="text-base font-[Bold]" numberOfLines={1}>
                {truncateTitle(event.title, 20)}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('EventDetail', { eventId: event._id })}
                className="ml-2"
              >
                <Text style={{fontFamily:"SemiBold"}} className="text-[#24428a] text-lg">...Detay</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text className="w-60 mb-2 mt-2 ml-3 text-base font-[Bold]">
            Bugün için etkinlik bulunmamaktadır.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
});