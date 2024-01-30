import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Color from '../../Utils/Color'

import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Header() {

    const { user, isLoading } = useUser()

  return user && (
    <View style={styles.container}>
        <View style={styles.profileMainContainer}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
                <View style={{ flex: 1}}>
                    <Text style={{ color: 'white', fontFamily: 'outfit', fontSize: 16 }}>Welcome, To My App</Text>
                    <Text style={{ color: 'white', fontFamily: 'outfit-medium', fontSize: 16 }}>{user?.fullName}</Text>
                </View>
                <FontAwesome6 name="bookmark" size={24} color={Color.WHITE} />
            </View>
        </View>

        <View style={styles.searchBarContainer}>
            <TextInput
                placeholder='Search'
                placeholderTextColor={Color.BLACK} // Ganti dengan warna placeholder yang diinginkan
                style={styles.textInput}
            />
            <FontAwesome5 name="search" size={20} color={Color.PRIMARY} style={styles.searchBtn} />
        </View>

        {/* //style input berbeda */}
        {/* <View style={styles.searchContainer}>
            <FontAwesome5 name="search" size={20} color={Color.PRIMARY} style={styles.searchIcon} />
            <TextInput
                placeholder='Search'
                placeholderTextColor={Color.BLACK} // Ganti dengan warna placeholder yang diinginkan
                style={styles.input}
            />
        </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
    userImage:{
        width: 45,
        height: 45,
        borderRadius: 99
    },
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Color.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10, // Jarak antara elemen-elemen di dalam container
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    //style input berbeda

    // searchContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginTop: 20,
    //     backgroundColor: Color.WHITE,
    //     borderRadius: 30,
    //     paddingVertical: 10, //pading atas bawah
    //     paddingHorizontal: 15, //padding kanan kiri
    // },
    // searchIcon: {
    //     marginRight: 10,
    // },
    // input: {
    //     flex: 1,
    //     color: Color.BLACK,
    //     fontSize: 14,
    // },

    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
        marginTop: 20,
    },
    searchBtn: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: Color.WHITE,
    },
    textInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Color.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 14
    },
})