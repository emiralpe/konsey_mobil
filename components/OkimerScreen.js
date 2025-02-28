import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import tailwind from 'twrnc'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function Okimer() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState("");
  
  const data = [
      {key:'1', value:'Konu'},
      {key:'2', value:'Ürünler'},
      {key:'3', value:'Sipariş'},
      
  ]
  return (
    <View>
        <View className='flex-row mt-20 items-center justify-between'>
          <AntDesign onPress={()=>navigation.goBack("Support")} name="arrowleft" className='ml-5' size={40} color="#2AB8E7"  />
          <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>OKİMER</Text>
            <Feather name="home" className='mr-5' size={35} color="#2AB8E7"/>
         </View>
      

      <View style={[tailwind`absolute top-40 right-7 left-7 p-6`, { 
  borderWidth: 2, 
  borderColor: 'white', 
  borderRadius: 20, 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8, 
  backgroundColor: 'white'
}]}>
  <SelectList 
        className='text-[#24428a] border-[#24428a]'
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        placeholder='Konu Seç'
        boxStyles={styles.selectBox} // SelectList kutusunun stili
        inputStyles={styles.selectInput} // SelectList giriş alanının stili
        dropdownStyles={styles.selectDropdown} // SelectList açılır menüsünün stili
        dropdownItemStyles={styles.selectDropdownItem} // SelectList açılır menü öğelerinin stili
    />
  
  <TextInput  fontFamily="SemiBold"
    style={[tailwind`mt-4 mb-4 p-4 text-[#24428a] rounded-xl border-[0.2] border-[#24428a]`, {height: 50 }]}
    placeholder="Başlık" placeholderTextColor={'#24428a'}
  />
  <TextInput fontFamily="SemiBold"
    style={[tailwind`mb-4 p-4 text-[#24428a] rounded-xl border-[0.2] border-[#24428a]`, {height: 120,textAlignVertical: 'top' }]} multiline={true} numberOfLines={1}
    placeholder="Mesajınız" placeholderTextColor={'#24428a'}
  />
  <TouchableOpacity style={[tailwind`bg-[#2AB8E7] w-auto rounded-xl px-5 py-2 `]}>
    <Text style={[tailwind`text-sm text-white text-center`, { fontFamily: "Semibold" }]}>Gönder</Text>
  </TouchableOpacity>
</View>

    </View>
  )
}

const styles = StyleSheet.create({
  selectBox:{
    borderColor: '#24428a', 
    borderRadius: 15,
  },
  selectInput:{
    fontFamily: "Semibold",
    color: '#24428a',
  },
})