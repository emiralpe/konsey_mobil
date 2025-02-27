import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clubs from '../hooks/Clubs/Clubs';

export default function ClubsScreen() {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <SafeAreaView>
                <Clubs />
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})