import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Color from '../../Utils/Color';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

   const navigation = useNavigation();

  useWarmUpBrowser();

  const handleLogin = async () => {
    try {
      const apiUrl = 'http://10.10.100.234:8080/api/auth/login';
  
      const response = await axios.post(apiUrl, {
        username,
        password,
      });
  
      if (response.status === 200) {
        Alert.alert(
          'Login Berhasil',
          'Selamat datang kembali, ' + response.data.username + '!',
          [{ text: 'OK', onPress: () => console.log('OK Ditekan') }],
          { cancelable: false }
        );
  
        // Simpan token atau sesi pengguna menggunakan AsyncStorage
        await AsyncStorage.setItem('userToken', response.data.token);
  
        // Redirect ke halaman home screen (ganti dengan navigasi yang sesuai)
        navigation.navigate('Home');
      } else {
        const errorMessage = response.data.message || 'Login Gagal. Silakan coba lagi.';
        Alert.alert(
          'Login Gagal',
          errorMessage,
          [{ text: 'OK', onPress: () => console.log('OK Ditekan') }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Kesalahan API', error);
      Alert.alert(
        'Error',
        'Terjadi kesalahan. Silakan coba lagi.',
        [{ text: 'OK', onPress: () => console.log('OK Ditekan') }],
        { cancelable: false }
      );
    }
  };
  

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/online.png')}
        style={styles.logo}
      />
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don't have an account? Sign Up
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={{ textAlign: 'center', fontSize: 17, color: Color.PRIMARY }}>Login With Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fc9003',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#e74c3c',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  signUpText: {
    marginTop: 30,
    color: '#fff',
  },
  button: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderRadius: 99,
    marginTop: 40,
  },
});




// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import Color from '../../Utils/Color';
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth } from "@clerk/clerk-expo";
// import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
// import axios from "axios";

// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen( {navigation }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   useWarmUpBrowser();

// //   const url = 'http://10.10.100.163:8080/api/auth/login'; 

// //   const handleLogin = () => {
// //     axios.post(url, {
// //         username: username,
// //         password: password
// //     })
// //     .then((res) => {
// //         console.log(res.message)
// //         console.log(res.data)
// //         Alert.alert(
// //           'Login Successful',
// //           'Welcome back, ' + data.username + '!',
// //           [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
// //           { cancelable: false }
// //         );
// //     })
// //     .catch((err) => {
// //         console.log("Login Failed")
// //         console.log(err.response.data)
// //     })
// // }


// // const handleLogin = async () => {
// //     try {
// //       const apiUrl = 'http://10.10.100.234:8080/api/auth/login';

// //       const response = await axios.post(apiUrl, {
// //         username,
// //         password,
// //       });

// //       if (response.status === 200) {
// //         Alert.alert(
// //           'Login Successful',
// //           'Welcome back, ' + response.data.username + '!',
// //           [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
// //           { cancelable: false }
// //         );
        
// //         // Redirect ke halaman home screen (ganti dengan navigasi yang sesuai)
// //         navigation.navigate('Home');
// //       } else {
// //         Alert.alert(
// //           'Login Failed',
// //           'Please enter valid credentials.',
// //           [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
// //           { cancelable: false }
// //         );
// //       }
// //     } catch (error) {
// //       console.error('API Error', error);
// //     }
// //   };

// //make fetch
//   const handleLogin = async () => {
//     try {
//       // Ganti URL sesuai dengan API Anda
//       const apiUrl = 'http://10.10.100.234:8080/api/auth/login';
      
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert(
//           'Login Successful',
//           'Welcome back, ' + data.username + '!',
//           [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
//           { cancelable: false }
//           // Redirect ke halaman home screen (ganti dengan navigasi yang sesuai)
//          navigation.navigate('Home');
//         );
//       } else {
//         Alert.alert(
//           'Login Failed',
//           'Please enter valid credentials.',
//           [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
//           { cancelable: false }
//         );
//       }
//     } catch (error) {
//       console.error('API Error', error);
//     }
//   };

//   const onPress = React.useCallback(async () => {
//     try {
//       const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
//       if (createdSessionId) {
//         setActive({ session: createdSessionId });
//       } else {
//         // Use signIn or signUp for next steps such as MFA
//       }
//     } catch (err) {
//       console.error("OAuth error", err);
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../../../assets/online.png')}
//         style={styles.logo}
//       />
//       <Text style={styles.label}>Username</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         onChangeText={(text) => setUsername(text)}
//       />
//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         onChangeText={(text) => setPassword(text)}
//       />
//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginButtonText}>Login</Text>
//       </TouchableOpacity>

//       <Text style={styles.signUpText}>
//         Don't have an account? Sign Up
//       </Text>
      
//       <TouchableOpacity style={styles.button} onPress={onPress}>
//         <Text style={{ textAlign: 'center', fontSize: 17, color: Color.PRIMARY }}>Login With Google</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fc9003',
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     width: '80%',
//     borderColor: '#e74c3c',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingLeft: 10,
//   },
//   label: {
//     color: 'white',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   loginButton: {
//     marginTop: 20,
//     backgroundColor: '#000',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   signUpText: {
//     marginTop: 30,
//     color: '#fff',
//   },
//   button: {
//     padding: 15,
//     backgroundColor: Color.WHITE,
//     borderRadius: 99,
//     marginTop: 40,
//   },
// });



// // import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native'
// // import React, { useState, useEffect } from 'react';

// // import Color from '../../Utils/Color'
// // import * as WebBrowser from "expo-web-browser";
// // import { useOAuth } from "@clerk/clerk-expo";
// // import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";

// // WebBrowser.maybeCompleteAuthSession();

// // export default function LoginScreen() {

// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleLogin = () => {
// //     if (username !== '' && password !== '') {
// //       Alert.alert(
// //         'Login Successful',
// //         'Welcome back, ' + username + '!',
// //         [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
// //         { cancelable: false }
// //       );
// //     } else {
// //       Alert.alert(
// //         'Login Failed',
// //         'Please enter valid credentials.',
// //         [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
// //         { cancelable: false }
// //       );
// //     }
// //   };

// //   useWarmUpBrowser();
// //   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

// //   const onPress = React.useCallback(async () => {
// //     try {
// //       const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
// //       if (createdSessionId) {
// //         setActive({ session: createdSessionId });
// //       } else {
// //       }
// //     } catch (err) {
// //       console.error("OAuth error", err);
// //     }
// //   }, []);


// //   return (
// //       <View style={styles.container}>
// //       <Image
// //         source={require('../../../assets/online.png')}
// //         style={styles.logo}
// //       />
// //       <Text style={styles.label}>Username</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Username"
// //         onChangeText={(text) => setUsername(text)}
// //       />
// //       <Text style={styles.label}>Password</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Password"
// //         secureTextEntry
// //         onChangeText={(text) => setPassword(text)}
// //       />
// //       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
// //         <Text style={styles.loginButtonText}>Login</Text>
// //       </TouchableOpacity>
// //       <Text style={styles.signUpText}>
// //         Don't have an account? Sign Up
// //       </Text>
// //       <TouchableOpacity style={styles.button} onPress={onPress}>
// //           <Text style={{textAlign: 'center', fontSize: 17, color: Color.PRIMARY}}>Login With Google</Text>
// //         </TouchableOpacity>
// //     </View>

// //   )
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: '#fc9003',
// //   },
// //   logo: {
// //     width: 150,
// //     height: 150,
// //     borderRadius: 75,
// //     marginBottom: 20,
// //   },
// //   input: {
// //     height: 40,
// //     width: '80%',
// //     borderColor: '#e74c3c',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     marginBottom: 10,
// //     paddingLeft: 10,
// //   },
// //   label: {
// //     color: 'white',
// //     fontSize: 16,
// //     marginBottom: 5,
// //   },
// //   loginButton: {
// //     marginTop: 20,
// //     backgroundColor: '#000',
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     borderRadius: 5,
// //   },
// //   loginButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     textAlign: 'center',
// //   },
// //   signUpText: {
// //     marginTop: 30,
// //     color: '#fff',
// //   },
// //   button: {
// //     padding: 15,
// //     backgroundColor: Color.WHITE,
// //     borderRadius: 99,
// //     marginTop: 40
// //   },
// // })
