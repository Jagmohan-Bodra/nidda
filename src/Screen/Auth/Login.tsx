import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { images, colors } from "../../themes/variables";
import Input from "../../Components/Input";
import Touchable from "../../Components/Touchable";
import { Formik } from "formik";
import * as Yup from "yup";
import { Container } from "../../Components/Container/Container";
import { Content } from "../../Components/Container/Content";
import { Label } from "../../Components/Label";
import Button from "../../Components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import I18n from "../../i18n";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

export default function Login(props: any) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = (values: any) => {
    setLoading(true);
    AsyncStorage.setItem(
      "login",
      JSON.stringify({
        ...values,
        token: "dsahuadsadsad6sasad7ad8asadg?8sasadsadasd",
      })
    );
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Container style={styles.main}>
      <Content>
        <Formik
          //isInitialValid={false}
          enableReinitialize
          initialValues={{ email: login.email, password: login.password }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            loginHandler(values);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
          }) => (
            <View style={styles.main}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to</Text>
                <Text style={styles.headerDesc}>Roving Maintenance</Text>
              </View>
              <View style={styles.logoContainer}>
                <Image
                  style={{ width: 400, height: 200 }}
                  source={images.LoginLogo}
                />
              </View>
              <View style={{ marginTop: 30, paddingHorizontal: 25 }}>
                <Label style={styles.label}>{I18n.t("email")}</Label>
                <View style={styles.container}>
                  <Input
                    keyboardType="email-address"
                    style={styles.inputType}
                    placeholder={I18n.t("email")}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    message={errors.email}
                    error={touched.email && errors.email}
                    value={values.email}
                    borderRadius={20}
                  />
                </View>

                <Label style={[styles.label, { marginTop: 30 }]}>
                  {I18n.t("password")}
                </Label>
                <View style={[styles.container, { marginBottom: 5 }]}>
                  <Input
                    secureTextEntry={!showPassword}
                    style={styles.inputType}
                    placeholder={I18n.t("password")}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    message={errors.password}
                    error={touched.password && errors.password}
                    value={values.password}
                    borderRadius={20}
                  />
                  <Touchable
                    style={styles.showPassword}
                    onPress={showPasswordHandler}
                  >
                    <Image
                      source={
                        !showPassword
                          ? images.ShowPassword
                          : images.HidePassword
                      }
                    />
                  </Touchable>
                </View>
              </View>
              <Text style={styles.forgot}>Forgot your password?</Text>

              <View style={styles.buttonContainer}>
                <Button
                  title="LOGIN"
                  loading={loading}
                  width={150}
                  color={colors.theme}
                  onPress={handleSubmit}
                />
              </View>

              <View style={styles.accountContainer}>
                <Text style={styles.accountText}>
                  I don't have an account:{" "}
                </Text>
                <Touchable onPress={() => props.navigation.navigate("signup")}>
                  <Text style={[styles.accountText, { color: colors.theme }]}>
                    Create a customer account{" "}
                  </Text>
                </Touchable>
              </View>
              <Touchable onPress={() => props.navigation.navigate("works")}>
                <Text style={styles.signupContainer}>Join to work with us</Text>
              </Touchable>
            </View>
          )}
        </Formik>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    marginTop: 10,
    margin: 15,
  },
  label: {
    marginLeft: 15,
    marginTop: 11,
    fontSize: 16,
    color: colors.purple,
    fontFamily: "Lato-Bold",
  },
  headerText: {
    fontSize: 24,
    color: colors.theme,
    fontFamily: "Lato-Medium",
    textAlign: "center",
  },
  headerDesc: {
    fontSize: 24,
    color: colors.theme,
    fontFamily: "Lato-Bold",
    textAlign: "center",
  },
  container: {
    // marginLeft: 16,
    // marginRight: 16,
    // backgroundColor: colors.white,
    // elevation: 5,
    // borderRadius: 5,
    // marginTop: 9
  },
  inputType: {
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: colors.white,
    elevation: 5,
    borderRadius: 5,
    marginTop: 9,
  },
  innerContainer: {
    justifyContent: "center",
    flexDirection: "column",
  },
  forgot: {
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 16,
    marginTop: 15,
    color: colors.purple,
    fontFamily: "Lato-Bold",
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  showPassword: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    right: 15,
    top: 8,
    zIndex: 100,
    elevation: 5,
  },
  accountContainer: {
    flexDirection: "row",
    margin: 16,
    textAlign: "center",
    justifyContent: "center",
  },
  accountText: {
    fontFamily: "Lato-Bold",
    color: colors.theme,
  },
  signupContainer: {
    color: "#5f021f",
    fontFamily: "Lato-Regular",
    textAlign: "center",
    marginBottom: 10,
  },
  logoImage: {
    width: 200,
  },
});
