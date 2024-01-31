import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "../../Utils/axiosInterceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import Color from "../../Utils/Color";

const AddStore = () => {
  const navigation = useNavigation();

  const [noSiup, setNoSiup] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");

  const handleBack = () => {
    navigation.navigate("Home");
  };

  const createNewStore = async () => {
    try {
      const newStoreData = {
        noSiup,
        name,
        address,
        mobilePhone,
      };

      const response = await axios.post("http://10.10.100.234:8080/store", newStoreData);

      if (response.status === 200) {
        // Display alert for successful store creation
        Alert.alert(
          "Success",
          "Store created successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
                handleBack(); // Navigate back to "Home" screen
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // Handle other response statuses
        Alert.alert("Error", "Failed to create the store. Please try again later.");
      }

      // Clear input fields
      setNoSiup("");
      setName("");
      setAddress("");
      setMobilePhone("");
    } catch (error) {
      console.error('Error creating store:', error);
      Alert.alert("Error", "Failed to create the store. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={handleBack}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Add New Store</Text>
      <TextInput
        style={styles.input}
        placeholder="No Siup"
        value={noSiup}
        onChangeText={(text) => setNoSiup(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Store Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Phone"
        value={mobilePhone}
        onChangeText={(text) => setMobilePhone(text)}
      />
      <TouchableOpacity style={styles.createButton} onPress={createNewStore}>
        <Text style={styles.createButtonText}>Create Store</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 19,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 300,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  createButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  createButtonText: {
    color: Color.WHITE,
    fontWeight: 'bold',
  },
  back: {
    backgroundColor: Color.PRIMARY,
    padding: 10,
    marginBottom: 30,
    borderRadius: 5,
  },
  backText: {
    color: Color.WHITE,
    fontWeight: 'bold',
  },
});

export default AddStore;
