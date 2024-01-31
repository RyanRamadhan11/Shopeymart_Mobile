// RegisterScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../Utils/axiosInterceptor";
import Color from "../../Utils/Color";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `http://10.10.100.234:8080/api/auth/register`,
        {
          username,
          password,
          customerName,
          address,
          mobilePhone,
          email,
        }
      );

      // Handle response as needed
      console.log(response.data);

      // Check if the registration was successful
      if (response.status === 201) {
        // Display alert for successful registration
        Alert.alert(
          "Registration Successful",
          "Your account has been successfully registered.",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
                navigation.navigate("login");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // Handle other status codes if needed
        Alert.alert("Registration Failed", "Please try again later.");
      }

      // Clear input fields
      setUsername("");
      setPassword("");
      setCustomerName("");
      setAddress("");
      setMobilePhone("");
      setEmail("");
    } catch (error) {
      console.error(error);
      // Handle other errors if needed
      Alert.alert("Registration Failed", "Please try again later.");
    }
  };

//   ini console.error();
//   const handleRegister = async () => {
//     try {
//       const response = await axios.post(
//         `http://10.10.100.234:8080/api/auth/register`,
//         {
//           username,
//           password,
//           customerName: name,  // Change this to customerName
//           address,
//           mobilePhone,
//           email,
//         }
//       );

//       // Handle response as needed
//       console.log(response.data);

//       setUsername("");
//       setPassword("");
//       setCustomerName("");  // Change this to setCustomerName("")
//       setAddress("");
//       setMobilePhone("");
//       setEmail("");

//       // Display alert for successful registration
//       Alert.alert(
//         "Registration Successful",
//         "Your account has been successfully registered.",
//         [
//           {
//             text: "OK",
//             onPress: () => {
//               console.log("OK Pressed");
//               navigation.navigate("login");
//             },
//           },
//         ],
//         { cancelable: false }
//       );
//     } catch (error) {
//       console.log(error);
//       Alert.alert(
//         "Registration Failed",
//         "There was an error during registration. Please try again.",
//         [{ text: "OK", onPress: () => console.log("OK Pressed") }],
//         { cancelable: false }
//       );
//     }
//   };

  const handleLogin = () => {
    navigation.navigate("login");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.loginImage}
          source={require("../../../assets/img/Login.png")}
        />

        <View style={styles.subContainer}>
          <Text style={styles.title}>Let's Register</Text>
          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCustomerName}
              value={customerName}
            />
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={setAddress}
              value={address}
            />
            <Text style={styles.label}>Mobile Phone</Text>
            <TextInput
              style={styles.input}
              onChangeText={setMobilePhone}
              value={mobilePhone}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  loginImage: {
    width: '100%',
    height: 450,
    marginTop: 10,
    borderWidth: 4,
    borderColor: Color.WHITE,
  },
  subContainer: {
    minWidth: "100%",
    height: "100%",
    backgroundColor: Color.PRIMARY,
    marginTop: -200,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: Color.WHITE,
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    color: Color.WHITE,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: Color.WHITE,
    color: Color.BLACK,
    borderRadius: 10,
  },
  button: {
    padding: 10,
    backgroundColor: Color.WHITE,
    borderRadius: 99,
    marginTop: 15,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 17,
    color: Color.PRIMARY,
  },
  text: {
    textAlign: "center",
    marginTop: 10,
    color: Color.WHITE,
  },
});

export default RegisterScreen;
