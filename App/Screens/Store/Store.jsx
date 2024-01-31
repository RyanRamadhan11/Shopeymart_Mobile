import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert  } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import axios from "../../Utils/axiosInterceptor";

import { Card, Image } from 'react-native-elements';

import { useUser } from '@clerk/clerk-expo';

import Color from '../../Utils/Color'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Store = () => {
  const navigation = useNavigation(); 

  const [slider1, setSlider1] = useState([]);
  const [slider2, setSlider2] = useState([]);
  const [store, setStore] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchDataStore();
    // getSlider();
    fetchDataProduct();
  }, []);

  useEffect(() => {
    getSlider();
  }, [store, product]);

  const getSlider = () => {
    GlobalApi.getSlider().then((response) => {
      try {
        const formatted = response?.sliders.map((slider, index) => {
          // console.log(slider.image);
          return {
            ...slider,
            name: store[index].name,
            noSiup : store[index].noSiup,
            mobilePhone : store[index].mobilePhone,
            address : store[index].address,
            productName: product[index]?.name,
          };
        });
        setSlider1(formatted);
        setSlider2(formatted);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const fetchDataStore = async () => {
    await axios
      .get(`http://10.10.100.234:8080/store`)
      .then((res) => {
        console.log(res.data);
        setStore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDataProduct = async () => {
    await axios
      .get(`http://10.10.100.234:8080/product`)
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const deleteStore = async (storeId) => {
    try {
      Alert.alert(
        'Are you sure?',
        'You sure will delete this store!',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes, delete it!',
            onPress: async () => {
              await axios.delete(`http://10.10.100.234:8080/store/${storeId}`);
              fetchDataStore();
              Alert.alert('Deleted!', 'Your store has been deleted.', [{ text: 'OK' }]);
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting store:', error);
      Alert.alert('Error!', 'Failed to delete the store.', [{ text: 'OK' }]);
    }
  };



  const [role, setRole] = useState("");

  const { user, isLoading } = useUser();

  useEffect(() => {
    AsyncStorage.getItem("role")
      .then((role) => {
        setRole(role);  // Ganti setUsername menjadi setRole
      })
      .catch((err) => console.log(err));
  }, []);


  const handleAdd = () => {
    navigation.navigate("addStore"); // Use navigation to navigate to 'addStore' screen
  };


  return (
    <>
      <View>
        <Text style={styles.heading}>Our Best Store</Text>
        <FlatList
          data={slider1}
          horizontal
          style={{ padding: 10 }}
          renderItem={({ item, index }) => (
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.cardContent}>
                {/* <Image
                  source={{ uri: item?.image?.url }}
                  style={styles.sliderImage}
                /> */}
                <View style={styles.textContent}>
                  <Text style={styles.title}>No - {item.noSiup}</Text>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.title}>Alamat: {item.address}</Text>
                  <Text style={styles.title}>No Hp: {item.mobilePhone}</Text>
                  
                  {role === 'ROLE_ADMIN' && (
                  <>
                      <TouchableOpacity
                        style={styles.createButton}
                        onPress={handleAdd} // Use the handleAdd function
                      >
                        <Text style={styles.createButtonText}>Add</Text>
                      </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteStore(item.id)}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </>
                  )}

                </View>
              </View>
            </Card>
          )}
        />
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'outfit-bold',
        fontSize: 19,
        textAlign: 'center',
        paddingTop: 40

    },
    cardContainer: {
    },
    cardContent: {
      flexDirection: 'row',
    },
    sliderImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    textContent: {
      marginLeft: 10,
    },
    title: {
      fontSize: 16,
      marginBottom: 5,
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignSelf: 'flex-start', // Adjust as needed
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    createButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
    },
    createButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });


export default Store;