import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Events() {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken'); // Kullanıcı Token'ını al
                const response = await fetch('http://localhost:3000/api/events/get', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Token'ı ekle
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error('Error fetching events:', errorData);
                    return;
                }

                const data = await response.json();
                setData(data);
                setFilteredData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEvents();
    }, []);

    const searchFilter = (text) => {
        setSearch(text);
        if (text) {
          const newData = data.filter(item => {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredData(newData);
        } else {
          setFilteredData(data);
        }
    };

    const filterByDate = (days) => {
        const now = new Date();
        const filtered = data.filter(event => {
            const eventDate = new Date(event.date);
            const diffTime = Math.abs(now - eventDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= days;
        });
        setFilteredData(filtered);
        setModalVisible(false);
    };

    return (
        <SafeAreaView>
            <ScrollView>
            <View className='flex-row items-center justify-between'>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" className='ml-5' size={40} color="#2AB8E7" />
                <Text className=' mx-5 text-[#24428a] text-3xl font-[Bold]'>Etkinlikler</Text>
                <Feather onPress={() => navigation.navigate("HomePage")} name="home" className='mr-5' size={35} color="#2AB8E7" />
            </View>
            <View className='width-full'>
                 <View className='flex-row items-center mt-10 mx-6'>
                        <TextInput
                          value={search}
                          placeholder='Arama'
                          className='bg-[#fff] justify-center items-center text-lg shadow w-[60%] pl-12 h-12 rounded-xl'
                          onChangeText={(text) => searchFilter(text)}
                        />
                        <AntDesign name="search1" size={28} className='absolute ml-2' color="#24428a" />
                        <TouchableOpacity className='flex-row items-center justify-end ml-16' onPress={() => setModalVisible(true)}>
                          <Text className='text-[#2AB8E7] text-2xl font-[Bold]'>Filtrele</Text>
                        </TouchableOpacity>
                      </View>
                
                {filteredData.map((event, index) => {
                    const dateTimeRegex = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/;
                    const match = event.date.match(dateTimeRegex);
                    const datePart = match ? match[1] : '';
                    const timePart = match ? match[2] : '';
                    const eventDate = new Date(datePart);
                    const day = eventDate.getDate();
                    const month = eventDate.getMonth() + 1; // Aylar 0'dan başlar, bu yüzden 1 ekliyoruz
                    const year = eventDate.getFullYear();
                    const [hour, minute] = timePart.split(':'); // Saat ve dakikayı ayır

                    return (
                        <TouchableOpacity key={index}>
                            <View className='pl-2 w-[90%] m-auto col-span-12 shadow items-center flex-row rounded-xl mt-4 h-28 bg-[#fff]'>
                                <View className='flex-1' flexShrink>
                                    <Text ellipsizeMode='tail' className='text-[#2AB8E7] text-lg font-[Semibold] ml-2'>{event.title}</Text>
                                    <Text numberOfLines={2} ellipsizeMode='tail' className=' font-[Semibold] text-base ml-2'>Düzenleyen: {event.organizer.name}</Text>
                                    <Text numberOfLines={2} ellipsizeMode='tail' className=' font-[Semibold] text-base ml-2'>Tarih: {day}/{month}/{year}</Text>
                                    <Text numberOfLines={2} ellipsizeMode='tail' className=' font-[Semibold] text-base ml-2'>Saat: {hour}:{minute}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Filtrele</Text>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => filterByDate(1)}
                            >
                                <Text style={styles.textStyle}>Son 24 Saat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => filterByDate(7)}
                            >
                                <Text style={styles.textStyle}>Son 7 Gün</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => filterByDate(30)}
                            >
                                <Text style={styles.textStyle}>Son 1 Ay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Kapat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});