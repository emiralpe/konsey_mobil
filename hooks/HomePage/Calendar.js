import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function Calendar() {
  return (
    <View className="w-full m-5 mt-7 flex-row">
      <View style={styles.container} className="items-center bg-[#24428a] justify-center">
        <Text className="text-[#fff] text-xl font-[Bold]">Aralık</Text>
        <Text className="text-[#fff] text-5xl font-[Bold]">26</Text>
        <Text className="text-[#fff] text-2xl font-[Bold]">2024</Text>
      </View>

      <View className="flex flex-wrap h-[150] justify-center mt-1">
        <TouchableOpacity className="ml-3 flex-row items-center">
          <Text style={{fontFamily:"SemiBold"}} className="text-[#24428a] text-lg">Bugün ki Etkinlikler </Text>
          <AntDesign className='' name="arrowright" size={18} color="#24428a" />
        </TouchableOpacity>

        <Text className="w-60 mb-2 mt-2 ml-3 text-base font-[Bold]" numberOfLines={4}>
          Öğrenci Konseyi Buluşma Etkinliği bugün saat 14:00'da SA-YE Restoranda... Detay
        </Text>
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
