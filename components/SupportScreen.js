import { StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
export default function SupportScreen() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)
    const [modalVisible3, setModalVisible3] = useState(false)
    const [modalVisible4, setModalVisible4] = useState(false)
    const [modalVisible5, setModalVisible5] = useState(false)
  return (
    <View className='w-full'>
          <View className='flex-row mt-20 items-center justify-between'>
             <AntDesign onPress={()=>navigation.goBack("HomePage")} name="arrowleft" className='ml-5' size={40} color="#2AB8E7"  />
            <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>Yardım</Text>
            <Feather name="home" className='mr-5' size={35} color="#2AB8E7"/>
          </View>
         <Text className='font-[Bold] text-[#24428a] text-3xl ml-5 mt-10 mb-5'>Sıkça Sorulan Sorular 😂</Text>
         <TouchableOpacity onPress={() => setModalVisible(true)} className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
        <Text className='text-[gray] text-lg p-2 font-[Bold]'>Kulübe nasıl üye olabilirim?</Text>
        <Entypo className='absolute right-10' name="chevron-right" size={32} color="gray" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className='flex-1 justify-center items-center bg-[#fff] p-5'>
          <Text className='text-2xl text-center py-4'>Kulübe üye olmak için öğrenci işleri ofisine başvurmanız gerekmektedir.</Text>
          <TouchableOpacity className='bg-[#244282] rounded-lg' onPress={() => setModalVisible(false)}>
            <Text className='text-white p-4'>Anladım</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible2(true)} className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
        <Text className='text-[gray] text-lg p-2 font-[Bold]'>Etkinlik bildirimlerini nasıl kapatabilirim?</Text>
        <Entypo className='absolute right-10' name="chevron-right" size={32} color="gray" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View className='flex-1 justify-center items-center bg-[#fff] p-5'>
          <Text className='text-2xl text-center py-4'>Etkinlik bildirimlerini kapatmak için ayarlar menüsünden bildirimleri kapatabilirsiniz.</Text>
          <TouchableOpacity className='bg-[#244282] rounded-lg' onPress={() => setModalVisible2(false)}>
            <Text className='text-white p-4'>Anladım</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible3(true)} className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
        <Text className='text-[gray] text-lg p-2 font-[Bold]'>Bilgilerimi nasıl değiştirebilirim?</Text>
        <Entypo className='absolute right-10' name="chevron-right" size={32} color="gray" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}
      >
        <View className='flex-1 justify-center items-center bg-[#fff] p-5'>
          <Text className='text-2xl text-center py-4'>Bilgilerinizi değiştirmek için profil ayarlarına gidin.</Text>
          <TouchableOpacity className='bg-[#244282] rounded-lg' onPress={() => setModalVisible3(false)}>
            <Text className='text-white p-4'>Anladım</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible4(true)} className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
        <Text className='text-[gray] text-lg p-2 font-[Bold]'>Etkinlik girişinde kamera açılmıyor?</Text>
        <Entypo className='absolute right-10' name="chevron-right" size={32} color="gray" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={() => {
          setModalVisible4(!modalVisible4);
        }}
      >
        <View className='flex-1 justify-center items-center bg-[#fff] p-5'>
          <Text className='text-2xl text-center py-4'>Kamera sorunları için uygulama ayarlarını kontrol edin.</Text>
          <TouchableOpacity className='bg-[#244282] rounded-lg' onPress={() => setModalVisible4(false)}>
            <Text className='text-white p-4'>Anladım</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible5(true)} className='flex-row items-center w-full px-5 border-b border-b-gray-400'>
        <Text className='text-[gray] text-lg p-2 font-[Bold]'>Giriş yaparken hata veriyor?</Text>
        <Entypo className='absolute right-10' name="chevron-right" size={32} color="gray" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible5}
        onRequestClose={() => {
          setModalVisible5(!modalVisible5);
        }}
      >
        <View className='flex-1 justify-center items-center bg-[#fff] p-5'>
          <Text className='text-2xl text-center py-4'>Giriş hataları için destek ekibiyle iletişime geçin.</Text>
          <TouchableOpacity className='bg-[#244282] rounded-lg' onPress={() => setModalVisible5(false)}>
            <Text className='text-white p-4'>Anladım</Text>
          </TouchableOpacity>
        </View>
      </Modal>
         <View className='w-full'>

      <TouchableOpacity onPress={()=>navigation.navigate("Okimer")} className='absolute right-0 m-5 bg-[#2AB8E7]  rounded-lg w-36 py-2 px-1'>
        <Text className='text-[#fff] font-bold text-center text-xl '>OKİMER</Text>
      </TouchableOpacity>
         </View>
    </View>
  )
}

const styles = StyleSheet.create({
})