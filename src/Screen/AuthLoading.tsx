import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../themes/variables";
import Axios from "axios";
// import { Creators as auth } from '../store/ducks/auth';
// import { useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthLoading(props: any) {
  useEffect(() => {
    //bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("login");
    const user = JSON.parse(userToken as string);
    if (user) {
      console.log("user Login");
      Axios.defaults.headers = { "auth-token": user.token };
      dispatch(auth.confirmOtpSuccess(user));
    } else {
      console.log("user not Login");
      dispatch(auth.confirmOtpSuccess(null));
    }
  };

  return (
    <View style={styles.main}>
      <ActivityIndicator size="large" color={colors.theme} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
