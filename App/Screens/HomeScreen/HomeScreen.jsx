import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { FontAwesome } from '@expo/vector-icons';
import Header from './Header';
import Slider from './Slider';
import ListExample from './ListExample';

import { useAuth } from "@clerk/clerk-expo";
import Color from "../../Utils/Color";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {

  const SignOut = () => {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <View>
        <TouchableOpacity
        style={{ backgroundColor: Color.PRIMARY, padding: 10, width: "100%" }}
          title="Sign Out"
          onPress={async () => {
            signOut();
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("username");
            await AsyncStorage.removeItem("role");
            navigation.navigate("login");
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: "bold"}}>Sign Out</Text>
         </TouchableOpacity>
      </View>
    );
  };

  // const SignOut = () => {
  //   const { isLoaded, signOut } = useAuth();
  //   if (!isLoaded) {
  //     return null;
  //   }
  //   return (
  //     <View style={{marginTop: 20}}>
  //       <TouchableOpacity
  //         style={{ backgroundColor: Color.PRIMARY, padding: 10, width: "100%" }}
  //         title="Sign Out"
  //         onPress={() => {
  //           signOut();
  //           AsyncStorage.removeItem("userToken")
  //           console.log(AsyncStorage.getItem("userToken"))
  //         }}
  //       >
  //         <Text style={{ color: '#fff', textAlign: 'center', fontWeight: "bold"}}>Sign Out</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const featuredProducts = [
    { id: 1, name: 'Product 1', image: require('../../../assets/img/baner.png') },
    { id: 2, name: 'Product 2', image: require('../../../assets/img/baner2.jpg') },
    { id: 3, name: 'Product 3', image: require('../../../assets/img/baner3.jpeg') },
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} resizeMode="cover" />
      <Text style={styles.carouselItemTitle}>{item.name}</Text>
    </View>
  );

  const categories = [
    { id: 1, title: 'Category 1', discount: '10%', image: require('../../../assets/img/person1.jpeg') },
    { id: 2, title: 'Category 2', discount: '20%', image: require('../../../assets/img/person2.jpeg') },
    { id: 3, title: 'Category 3', discount: '15%', image: require('../../../assets/img/person3.jpeg') },
  ];

  const Card = ({ category }) => (
    <TouchableOpacity
      style={styles.card}
      
    >
      <Image source={category.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{category.title}</Text>
        <Text style={styles.cardDiscount}>{category.discount} OFF</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => (
        <>
          <Header />

          <Slider />
          <View style={styles.header}>
            <FontAwesome style={styles.logo} name="shopping-bag" size={24} color="black" />
            <Text style={styles.title}>Shoyert Mart</Text>
          </View>

        </>
      )}
      data={[{ key: 'dummy' }]} // Dummy data, karena FlatList memerlukan data
      renderItem={() => (
        <>
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured Products Carousel</Text>
            <Carousel
              data={featuredProducts}
              renderItem={renderCarouselItem}
              sliderWidth={300}
              itemWidth={150}
              loop
              autoplay
              autoplayInterval={2000}
            />
          </View>

          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Categories Discount</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Card category={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>


          <View style={{ paddingBottom: 50 }}>
            <ListExample />
          </View>

          <TouchableOpacity style={styles.promoBanner}>
            <Image
              source={require('../../../assets/img/person5.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <Text style={styles.bannerText}>Special Promo - Up to 50% Off!</Text>
          </TouchableOpacity>

          <SignOut/>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#7932a8',
  },
  logo: {
    color: '#7932a8'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#7932a8'
  },
  featuredSection: {
    padding: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  categoriesSection: {
    padding: 20,
  },
  promoBanner: {
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  bannerText: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  carouselItem: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: 150,
  },
  carouselItemTitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: 140,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDiscount: {
    fontSize: 14,
    color: '#7932a8',
  },
});

export default HomeScreen;
