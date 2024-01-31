import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from "../../Utils/axiosInterceptor";

const BookingScreen = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchDataCustomers();
  }, []);

  const fetchDataCustomers = async () => {
    try {
      const response = await axios.get(`http://10.10.100.234:8080/customer`);
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tableHead = ['Name', 'Address', 'Phone', 'Email'];
  const tableDataCustomers = customers.map(({ name, address, mobilePhone, email }) => [
    name,
    address,
    mobilePhone,
    email,
  ]);

  
    const upcomingBookings = [
        { id: 1, name: 'Booking 1', date: '2024-02-01' },
        { id: 2, name: 'Booking 2', date: '2024-03-15' },
        { id: 3, name: 'Booking 3', date: '2024-04-20' },
        // Add more bookings as needed
      ];


    const tableHead2 = ['ID', 'Name', 'Date'];
    const tableDataBookings = upcomingBookings.map(({ id, name, date }) => [id.toString(), name, date]);

      
      
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/img/data.jpg')}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <Text style={styles.headerText}>Data Penjualan</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data All Customer</Text>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableDataCustomers} textStyle={styles.text} />
          </Table>
        </View>
      </View>

      <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row data={tableHead2} style={styles.head} textStyle={styles.text} />
          <Rows data={tableDataBookings} textStyle={styles.text} />
        </Table>
      </View>

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
    position: 'relative',
    height: 200,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
});

export default BookingScreen;
