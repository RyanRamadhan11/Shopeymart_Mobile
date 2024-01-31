import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import GlobalApi from "../../Utils/GlobalApiProduct";
import axios from "../../Utils/axiosInterceptor";

export default function ProductScreen() {
  const [slider1, setSlider1] = useState([]);
  const [slider2, setSlider2] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchDataProduct();
  }, []);

  useEffect(() => {
    getSlider();
  }, [product]);

  const getSlider = () => {
    GlobalApi.getSlider().then((response) => {
      try {
        const formatted = response?.products.map((slider, index) => {
          // Ambil harga dari array productPrices, dan ambil harga pertama (index 0) sebagai contoh
          const price = product[index]?.productPrices[0]?.price;
          
          return {
            ...slider,
            productName: product[index]?.name,
            desc: product[index]?.description,
            price: price,
          };
        });
        setSlider1(formatted);
        setSlider2(formatted);
      } catch (err) {
        console.log(err);
      }
    });
  };
  

  const fetchDataProduct = async () => {
    await axios
      .get(`http://10.10.100.234:8080/product`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Best Product</Text>
      <FlatList
        data={slider2}
        horizontal
        style={{ padding: 10 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card}>
            <Image
                source={{ uri: item?.image?.url }}
                style={styles.sliderImage}
                resizeMode="contain"
            />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.productName}</Text>
              <Text style={styles.cardDiscount}>{item.desc}</Text>
              <Text style={styles.cardDiscount}>Rp. {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({

   container: {
    paddingHorizontal: 20,
  },
  sliderImage: {
    width: 130,
    aspectRatio: 10 / 7, // Sesuaikan rasio aspek dengan preferensi Anda
    borderRadius: 20,
    marginRight: 25,
  },
  heading: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
    marginTop: 10,
    fontFamily: 'outfit-bold'
  },
  card: {
    marginBottom: 10,
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
    color: 'green',
  },
});
