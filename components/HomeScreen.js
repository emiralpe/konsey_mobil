import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import tailwind from "twrnc";
import LoginScreen from "./LoginScreen";
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={tailwind``}>
      <ImageBackground
        source={require("../assets/loginbgimage.png")}
        style={{ width: "100%", height: "100%" }}

      >
        <View className='absolute w-full h-full bg-black opacity-60' />
        <View className="flex-row justify-between mt-16 mx-5">

          <Image className="rounded-full w-[120] h-[120]" source={require('../assets/oklogo.png')} />
          <Image className="rounded-full w-[120] h-[120]" source={require('../assets/barulogo.png')} />
        </View>
        <View className="`w-[100] h-[100] flex-1 ml-8 justify-center mb-24`">
          <Text className="text-[white] text-2xl font" style={{ fontFamily: "SemiBold" }}>Konsey Mobil'e Hoş Geldiniz</Text>
          <View className="flex-row mt-4">
            <TouchableOpacity onPress={() => navigation.navigate('Login')} className="bg-[#24428a] rounded-lg items-center justify-center px-5 py-3 ">
              <Text className="text-2xl text-white" style={{ fontFamily: "Semibold" }}>Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="bg-[#24428a] rounded-lg items-center justify-center px-5 ml-3 py-3 ">
              <Text className="text-2xl text-white" style={{ fontFamily: "Semibold" }}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({});
