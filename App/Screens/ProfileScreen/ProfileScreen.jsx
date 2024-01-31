import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';

import Color from '../../Utils/Color'
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {


  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const { user, isLoading } = useUser();

  useEffect(() => {
    AsyncStorage.getItem("username")
      .then((uname) => {
        setUsername(uname);
      })
      .catch((err) => console.log(err));
    AsyncStorage.getItem("role")
      .then((role) => {
        setRole(role);  // Ganti setUsername menjadi setRole
      })
      .catch((err) => console.log(err));
  }, []);
  

    const transactionHistory = [
        { id: '1', date: '2022-01-01', amount: "Rp. 120.000" },
        { id: '2', date: '2022-01-10', amount: "Rp. 45.000" },
        { id: '3', date: '2022-02-05', amount: "Rp. 130.000" },
    ];
    
      const userSettings = [
        { id: '1', title: 'Notification', value: 'On' },
        { id: '2', title: 'Language', value: 'English' },
        { id: '3', title: 'Theme', value: 'Light' },
      ];
    
      const renderTransactionItem = ({ item }) => (
        <View style={styles.transactionItem}>
          <Text>Date: {item.date}</Text>
          <Text>Amount: ${item.amount}</Text>
        </View>
      );
    
      const renderSettingsItem = ({ item }) => (
        <View style={styles.settingsItem}>
          <Text>{item.title}: {item.value}</Text>
        </View>
      );
  return (
    <ScrollView style={styles.container}>
      {user && (
      <View style={styles.header}>
        <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
        <Text style={styles.userName}>{username}</Text>
        <Text style={styles.userEmail}>{role}</Text>
      </View>
       )}
       {username && (
        <View style={styles.header}>
        <Image
          source={require('../../../assets/img/person2.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{username}</Text>
        <Text style={styles.userEmail}>{role}</Text>
      </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
        <FlatList
          data={transactionHistory}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <FlatList
          data={userSettings}
          renderItem={renderSettingsItem}
          keyExtractor={(item) => item.id}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  settingsItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ProfileScreen;
