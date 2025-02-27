import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';


export default function Socials() {
  return (
    <View>
       <View className='border-b border-[gray]'>

<View className='flex-row items-center justify-between mt-3 mx-10 mb-2 '>
    <View className='flex-row items-center'>
        <FontAwesome name="star" size={36} color="orange" />
        <Text className='ml-2 font-[Bold] text-2xl'>3.8</Text>
    </View>
    <View className='flex-row items-center'>
        <TouchableOpacity>
            <AntDesign className='mr-2' name="instagram" size={28} color="purple" />
        </TouchableOpacity>
        <TouchableOpacity>
            <FontAwesome className='mr-2' name="whatsapp" size={28} color="green" />
        </TouchableOpacity>
        <TouchableOpacity>
            <FontAwesome6 className='mr-2' name="x-twitter" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
            <FontAwesome5 name="facebook-f" size={22} color="blue" />
        </TouchableOpacity>
    </View>

</View>
</View>
    </View>
  )
}

const styles = StyleSheet.create({})