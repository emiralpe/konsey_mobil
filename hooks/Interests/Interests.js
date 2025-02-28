import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Interests({ onSelectInterests }) {
  const [interests1, setInterests] = useState([]);
  const [interests, setSelectedInterests] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/interests/get", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setInterests(data);
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };

    fetchInterests();
  }, []);

  const handlePress = (interests1) => {
    setSelectedInterests((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(interests1._id)) {
        updatedSelected = prevSelected.filter(item => item !== interests1._id);
      } else {
        updatedSelected = [...prevSelected, interests1._id];
      }
      onSelectInterests(updatedSelected); // Seçilen ilgi alanlarının id'lerini callback fonksiyonuna ilet
      return updatedSelected;
    });
  };

  return (
    <View className='w-[100%]'>
      <View className='items-center justify-center flex-row gap-2 flex-wrap'>
        {interests1.map((interests1, index) => {
          const isSelected = interests.includes(interests1._id);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(interests1)}
              className={`py-1 px-4 items-center mt-3 rounded-full border ${isSelected ? 'bg-[#24428a]' : 'bg-[#FFF]'} border-[#24428a]`}
            >
              <Text style={{ color: isSelected ? '#FFF' : '#24428a' }}>{interests1.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  interestsContainer: {
    flexWrap: 'wrap'
  }
});