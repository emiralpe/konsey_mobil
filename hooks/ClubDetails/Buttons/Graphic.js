import { ActivityIndicator } from 'react-native';
import React, { useEffect,useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
  

const MyLineChart = ({clubId}) => {
        const [months, setMonths] = useState([]);
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
            if (response.ok) {
                setMonths(data.monthlyAttendance);
            } else {
              console.error('Error fetching activity count:', data.message);
            }
          } catch (error) {
            console.error('Error fetching activity count:', error);
          }
        };    fetchActivityCount();
      }, [clubId]);
      console.log(months[0])
  return (
    <View className='mt-10 '>
      <LineChart
      
        data={{
          labels: [months[0]?.month, months[1]?.month, months[2]?.month, months[3]?.month, months[4]?.month, months[5]?.month], // Etiketler buraya gelir
          datasets: [
            {
              data: [months[0]?.count,months[1]?.count,months[2]?.count,months[3]?.count,months[4]?.count,months[5]?.count], // Veriler buraya gelir
            },
          ],
        }}
        width={Dimensions.get('window').width - 50} // Ekran genişliği
        height={220}
        yAxisInterval={1} // Y ekseni aralığı
        chartConfig={{
          backgroundColor: '#009FFD',
          backgroundGradientFrom: '#FFF',
          backgroundGradientTo: '#FFF',
          decimalPlaces: 2, // Ondalık basamak sayısı
          color: (opacity = 1) => `rgba(42, 184, 231, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '3.5',
            stroke: '#24428A',
          },
        }}
        bezier // Eğri hatları yumuşatır
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default MyLineChart;