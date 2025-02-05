import React from 'react';
import { View, Text } from 'react-native';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { title: 'Adım 1', details: 'Kişisel Bilgiler' },
    { title: 'Adım 2', details: 'İletişim Bilgileri' },
    { title: 'Adım 3', details: 'Güvenlik ve Şifre' },
    { title: 'Adım 4', details: 'İlgi Alanları' },
  ];

  return (
    <View className="flex-row justify-center items-center mb-4">
      {steps.map((step, index) => {
        const isActive = currentStep === index + 1;
        return (
          <View key={index} className="flex-row items-center">
            <View className={`w-10 h-10 rounded-full justify-center items-center border-2 ${isActive ? 'border-[#24428a] bg-[#24428a]' : 'border-gray-400'}`}>
              <Text className={`${isActive ? 'text-white' : 'text-gray-400'} font-bold`}>{index + 1}</Text>
            </View>
            {index !== steps.length - 1 && (
              <View className="w-10 h-1 bg-gray-400 mx-1" />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default StepIndicator;
