import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Image,
} from 'react-native';
import Color from '../../Utils/Color';

const DATA = [
  {
    title: 'List Makanan',
    data: [
      {
        name: 'Pizza',
        image: require('../../../assets/img/pizza.jpg'), // Ganti dengan path gambar yang sesuai
        price: 'Rp. 30.000',
        desc: 'makanan enak lezat dan murah 1'
      },
      {
        name: 'Burger',
        image: require('../../../assets/img/burger.webp'),
        price: 'Rp. 20.000',
        desc: 'makanan enak lezat dan murah 2'
      },
      {
        name: 'Risotto',
        image: require('../../../assets/img/risoto.png'),
        price: 'Rp. 42.000',
        desc: 'makanan enak lezat dan murah 3'
      },
    ],
  },
  {
    title: 'List Elektronik',
    data: [
      {
        name: 'Tas',
        image: require('../../../assets/img/tas.jpg'), // Ganti dengan path gambar yang sesuai
        price: 'Rp. 30.000',
      },
      {
        name: 'Laptop',
        image: require('../../../assets/img/laptop.jpg'),
        price: 'Rp. 30.000',
      },
      {
        name: 'Handphone',
        image: require('../../../assets/img/hp.jpg'),
        price: 'Rp. 30.000',
      },
    ],
  },
];

const ListExample = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.itemDetails}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.price}>{item.desc}</Text>
          </View>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      )}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 25,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#e05c14',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 16,
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 10,
    fontFamily: 'outfit-medium'
  },
  title: {
    fontSize: 24,
    color: Color.WHITE,
    fontFamily: 'outfit-bold'
  },
  price: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: 'white',
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  sectionHeaderText: {
    fontSize: 24,
    color: Color.BLACK,
    fontFamily: 'outfit-bold',
  },

});

export default ListExample;
