import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import tailwind from "twrnc";

export default function SignUpScreen() {

  const [isSporSelected, setIsSporSelected] = useState(false);
  const [isGirisimSelected, setIsGirisimSelected] = useState(false);
  const [isDogaSelected, setIsDogaSelected] = useState(false);
  const [isYazilimSelected, setIsYazilimSelected] = useState(false);
  const [isHayvanSelected, setIsHayvanSelected] = useState(false);
  const [isTarihSelected, setIsTarihSelected] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);


  const handleSporPress = () => setIsSporSelected(!isSporSelected);
  const handleGirisimPress = () => setIsGirisimSelected(!isGirisimSelected);
  const handleDogaPress = () => setIsDogaSelected(!isDogaSelected);
  const handleYazilimPress = () => setIsYazilimSelected(!isYazilimSelected);
  const handleHayvanPress = () => setIsHayvanSelected(!isHayvanSelected);
  const handleTarihPress = () => setIsTarihSelected(!isTarihSelected);
  const handlePrivacyPress = () => setIsAccepted(!isAccepted);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 35 }}>
        <Text className="text-2xl ml-12 pt-20 text-[#24428a] border-[#24428a]" style={{fontFamily:"Semibold"}}>Adınız</Text>
        <TextInput className=" p-3 mx-8 my-3 mt-1 rounded-xl border-2 border-[#24428a]" />

        <Text className="text-2xl ml-12 text-[#24428a] " style={{fontFamily:"Semibold"}}>Soyadınız</Text>
        <TextInput className=" p-3 mx-8 my-3 mt-1 rounded-xl border-2 border-[#24428a]" />

        <Text className="text-2xl ml-12 text-[#24428a]" style={{fontFamily:"Semibold"}}>Doğum Tarihiniz</Text>
        <TextInput className=" p-3 mx-8 my-3 mt-1 rounded-xl border-2 border-[#24428a]"/>

        <Text className="text-2xl ml-12 text-[#24428a]" style={{fontFamily:"Semibold"}}>Öğrenci Numaranız</Text>
        <TextInput className=" p-3 mx-8 my-3 mt-1 rounded-xl border-2 border-[#24428a]"/>

        <Text className="text-2xl ml-12 text-[#24428a]" style={{fontFamily:"Semibold"}}>Telefon Numaranız</Text>
        <TextInput className=" p-3 mx-8 my-3 mt-1 rounded-xl border-2 border-[#24428a]" />

        <Text className="text-2xl ml-12 text-[#24428a]" style={{fontFamily:"Semibold"}}>E-posta Adresiniz</Text>
        <TextInput className=" p-3 mx-8 my-3 mt-1 rounded-xl border-2 border-[#24428a]" />

        <Text className="text-2xl ml-12 text-[#24428a]" style={{fontFamily:"Semibold"}}>İkametgah</Text>
        <TextInput className=" p-10 mx-8 my-3 mt-1 rounded-xl border-2 border-[#24428a]" style={ {paddingTop: 5, paddingLeft: 10, lineHeight: 18, height: 120, textAlignVertical: 'top' }} multiline={true} numberOfLines={1} />

        <Text className="text-2xl ml-12 text-[#24428a]" style={{fontFamily:"Semibold"}}>İlgi Alanlarınız</Text>
        <View>
          <View className='flex-row justify-between mx-10'>

          <TouchableOpacity
            onPress={handleSporPress}
            className='py-1 px-4 mt-3 rounded-full border border-[#24428a]'
            style={
              { backgroundColor: isSporSelected ? '#24428a' : '#FFF', fontFamily: 'Semibold' }
            }
          >
            <Text className="text-lg" style={{ color: isSporSelected ? 'white' : '#24428a', fontFamily: 'Semibold' }}>
              Spor ⚽
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={handleGirisimPress}
            className='py-1 px-4 mt-3 rounded-full border border-[#24428a] '
            style={
              { backgroundColor: isGirisimSelected ? '#24428a' : '#FFF', fontFamily: 'Semibold'  }
            }
          >
            <Text className="text-lg"style={{ color: isGirisimSelected ? 'white' : '#24428a' , fontFamily: 'Semibold' }}>
              Girişimcilik 🤑
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={handleDogaPress}
            className='py-1 px-4 mt-3 rounded-full border border-[#24428a]'
            style={
              { backgroundColor: isDogaSelected ? '#24428a' : '#FFF' , fontFamily: 'Semibold' }
            }
          >
            <Text className="text-lg" style={{ color: isDogaSelected ? 'white' : '#24428a', fontFamily: 'Semibold'  }}>
              Doğa 🌳
            </Text>
          </TouchableOpacity>
        </View>


        <View className='flex-row justify-between mx-10'>
          <TouchableOpacity
            onPress={handleYazilimPress}
            className='py-1 px-4 mt-3 rounded-full border border-[#24428a]'
              style={{ backgroundColor: isYazilimSelected ? '#24428a' : '#FFF' , fontFamily: 'Semibold' }}
          >
            <Text className="text-lg" style={{ color: isYazilimSelected ? '#FFF' : '#24428a', fontFamily: 'Semibold'  }}>
              Yazılım 👨🏻‍💻
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleHayvanPress}
            className='py-1 px-4 mt-3 rounded-full border border-[#24428a]'
            style={  { backgroundColor: isHayvanSelected ? '#24428a' : '#FFF', fontFamily: 'Semibold'  }
            }
          >
            <Text className="text-lg" style= {{ color: isHayvanSelected ? 'white' : '#24428a', fontFamily: 'Semibold'  }}>
              Hayvan 🐶
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTarihPress}
            className='py-1 px-4 mt-3 rounded-full border border-[#24428a]'
             style={ { backgroundColor: isTarihSelected ? '#24428a' : '#FFF', fontFamily: 'Semibold'  }
            }
          >
            <Text className="text-lg"style= {{ color: isTarihSelected ? 'white' : '#24428a', fontFamily: 'Semibold'  }}>
              Tarih 🏛
            </Text>
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center justify-center mt-5 mx-12'>
          <TouchableOpacity onPress={handlePrivacyPress} className="mr-3" style={{ borderWidth: 2, borderColor: '#24428a', width: 20, height: 20, borderRadius: 5 }}>
            {isAccepted && <Text style={{ fontSize: 20, color: '#24428a' }}>✔</Text>}
          </TouchableOpacity>
          <Text className="text-sm" style= {{ color: '#24428a' }}>
            Gizlilik ve kişisel verilerin işlenmesine dair sözleşmeyi kabul ediyorum.
          </Text>
        </View>
        <View className='flex-1  items-center justify-center'>
          <TouchableOpacity className='bg-[#24428a] w-[350] rounded-full items-center justify-center px-5 py-1 my-5 mx-13'>
            <Text className="text-2xl text-white" style={ { fontFamily: "Semibold" }}>Kayıt Ol</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
