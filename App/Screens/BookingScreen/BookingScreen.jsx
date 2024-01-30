import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const BookingScreen = () => {

    const upcomingBookings = [
        { id: 1, name: 'Booking 1', date: '2024-02-01' },
        { id: 2, name: 'Booking 2', date: '2024-03-15' },
        { id: 3, name: 'Booking 3', date: '2024-04-20' },
        // Add more bookings as needed
      ];

      const exploreExperiences = [
        { id: 1, name: 'Tas Ransel', category: 'School' },
        { id: 2, name: 'Laptop', category: 'Elektronik' },
        { id: 3, name: 'Pizza', category: 'Food & Drink' },
        // Add more experiences as needed
      ];

    const tableHead = ['ID', 'Name', 'Date'];
    const tableDataBookings = upcomingBookings.map(({ id, name, date }) => [id.toString(), name, date]);
    const tableDataExperiences = exploreExperiences.map(({ id, name, category }) => [id.toString(), name, category]);

      
      
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/img/person1.jpeg')}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <Text style={styles.headerText}>Booking Your Data</Text>
      </View>

      <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableDataBookings} textStyle={styles.text} />
        </Table>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore Experiences Shopping</Text>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableDataExperiences} textStyle={styles.text} />
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
