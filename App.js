import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import TabNavigation from "./App/Navigation/TabNavigation";
import LoginScreen from "./App/Screens/LoginScreen/LoginScreen";
import Color from "./App/Utils/Color";


import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();


const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View style={{}}>
      <TouchableOpacity
        style={{ backgroundColor: Color.PRIMARY, padding: 10, width: "100%" }}
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: "bold"}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
  });
  
  return (
    <ClerkProvider
      publishableKey="pk_test_dW5iaWFzZWQtd2FscnVzLTgzLmNsZXJrLmFjY291bnRzLmRldiQ"
      tokenCache={tokenCache}
    >

      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
          <SignOut />
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
});
