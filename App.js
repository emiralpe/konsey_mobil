import { StyleSheet } from "react-native";
import HomeScreen from "./components/HomeScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useEffect, useState } from "react";
import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import "./global.css"
import HomePageScreen from "./components/HomePageScreen";
import SupportScreen from "./components/SupportScreen";
import OkimerScreen from "./components/OkimerScreen";
import ClubsScreen from "./components/ClubsScreen";
import EventsScreen from "./components/EventsScreen";
import EventJoinScreen from "./components/EventJoinScreen";
import NewsScreen from "./components/NewsScreen";
import ClubDetailsScreen from "./components/ClubDetailsScreen";
import ClubDetailsScreen2 from "./components/ClubDetailsScreen2";
import AllClubsScreen from "./components/AllClubsScreen";
import NotificationsScreen from "./components/NotificationsScreen";
import AllOtherClubs from "./hooks/Clubs/AllOtherClubs";
import EventsDetailScreen from "./components/EventsDetailScreen";
import OfferDetails from "./hooks/Offers/OfferDetails";
import Offer from "./hooks/Offers/Offer";
import AccountScreen from "./components/AccountScreen";
import FoodScreen from "./components/FoodScreen";


const Stack = createNativeStackNavigator();



const loadFonts = () => {
  return Font.loadAsync({
    'Regular': require('./assets/fonts/RalewayRegular.ttf'),
    'Semibold': require('./assets/fonts/RalewaySemiBold.ttf'),
    'Medium': require('./assets/fonts/RalewayMedium.ttf'),
    'Bold': require('./assets/fonts/RalewayBold.ttf'),
  });
};

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsLoaded(true))
      .catch((err) => console.error(err));
  }, []);
  if (!fontsLoaded) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setFontsLoaded(true)} onError={(err) => console.error(err)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Öğrenci Konseyi App" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomePage" component={HomePageScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Okimer" component={OkimerScreen} />
        <Stack.Screen name="Clubs" component={ClubsScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="EventJoin" component={EventJoinScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Company" component={Offer} />
        <Stack.Screen name="ClubDetails" component={ClubDetailsScreen} />
        <Stack.Screen name="ClubDetails2" component={ClubDetailsScreen2} />
        <Stack.Screen name="AllClubs" component={AllClubsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="AllOtherClubs" component={AllOtherClubs} />
        <Stack.Screen name="EventDetail" component={EventsDetailScreen} />
        <Stack.Screen name="OfferDetails" component={OfferDetails} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
