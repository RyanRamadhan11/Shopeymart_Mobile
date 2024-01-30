// Import komponen dan fungsi getSlider
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi'; // Sesuaikan path dengan struktur proyek Anda

export default function Slide() {
  const [slider, setSlider] = useState([]);


    //versi 1

    useEffect(() => {
        getSlider();
    }, []);

    const getSlider = () => {
         GlobalApi.getSlider().then((response) => {
         console.log("response: ", response);
         setSlider(response?.sliders);
        });
    };

//   useEffect(() => {
//     const fetchSliderData = async () => {
//       try {
//         const data = await GlobalApi.getSlider();
//         setSlider(data.sliders);
//       } catch (error) {
//         console.error('Error fetching slider data:', error);
//       }
//     };

//     fetchSliderData(); // Panggil fungsi saat komponen di-mount
//   }, []);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offers For You</Text>
      <FlatList
        data={slider}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.sliderItem}>
            <Text style={styles.sliderItemName}>{item.name}</Text>
            <Image
              source={{ uri: item?.image?.url }}
              style={styles.sliderItemImage}
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sliderItem: {
    marginRight: 15,
  },
  sliderItemName: {
    marginBottom: 8,
  },
  sliderItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
