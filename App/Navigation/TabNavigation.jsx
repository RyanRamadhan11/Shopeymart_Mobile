import { View, Text } from 'react-native'
import React from 'react'

import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import Color from '../Utils/Color';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CategoryScreen from '../Screens/CategoryScreen/CategoryScreen';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator 
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Color.PRIMARY
        }}
    >
        <Tab.Screen name="Home" component={HomeScreen} 
            options={{
                tabBarLabel: ({color}) => (
                    <Text style={{color: color, fontSize: 12, marginTop: -7}}>Home</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <Ionicons name="home" size={24} color="black" />
                )
            }}    
        />

        <Tab.Screen name="List Category" component={CategoryScreen} 
            options={{
                tabBarLabel: ({color}) => (
                    <Text style={{color: color, fontSize: 12, marginTop: -7}}>Category</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <MaterialIcons name="category" size={24} color="black" />
                )
            }} 
        />

        <Tab.Screen name="Profile" component={ProfileScreen} 
            options={{
                tabBarLabel: ({color}) => (
                    <Text style={{color: color, fontSize: 12, marginTop: -7}}>Profile</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <AntDesign name="profile" size={24} color="black" />
                )
            }} 
        />
        
        <Tab.Screen name="Booking" component={BookingScreen} 
            options={{
                tabBarLabel: ({color}) => (
                    <Text style={{color: color, fontSize: 12, marginTop: -7}}>Booking</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <Entypo name="book" size={24} color="black" />
                )
            }} 
        />
     </Tab.Navigator>
  )
}