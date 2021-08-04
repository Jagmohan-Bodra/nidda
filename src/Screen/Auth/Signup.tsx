import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { colors, images } from "../../themes/variables";
import { Container } from "../../Components/Container/Container";
import { Content } from "../../Components/Container/Content";
import Input from "../../Components/Input";
import { Select } from "../../Components/Select";
import { getCountry, getCities } from "../../api/request";
import Touchable from "../../Components/Touchable";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Button from "../../Components/Buttons";
import { Formik } from "formik";
import * as Yup from "yup";
import { sendOTP } from "../../api/request";

const signupSchema = Yup.object().shape({
  mobileNo: Yup.string()
    .min(9, "Enter valid phone number")
    .max(9, "Enter valid phone number")
    .required("Mobile number is required"),
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Enter valid email").required("Email required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});

export default function Signup() {
  const [countries, setCountries] = useState([] as any[]);
  const [cities, setCities] = useState([] as any[]);
  const [selected, setSelected] = useState({ country: "", city: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [value] = useState({
    name: "",
    country: "",
    city: "",
    mobileNo: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    getCountry()
      .then((res) => {
        setCountries(
          res.data.countries.map((a: any) => ({
            label: a.country_name,
            value: a.country_id,
          }))
        );
      })
      .catch((err) => console.log(err, "get country Error"));

    getCities()
      .then((res) => {
        setCities(
          res.data.cities.map((a: any) => ({
            label: a.city_name,
            value: a.city_id,
          }))
        );
      })
      .catch((err) => console.log(err, "get Cities Error"));
  }, []);

  const countryChangeHandler = (country: any) => {
    setSelected((prvState) => ({ ...prvState, country }));
  };

  const cityChangeHandler = (city: any) => {
    setSelected((prvState) => ({ ...prvState, city }));
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const showConfirmPasswordHandler = () => {
    setShowConPassword(!showConPassword);
  };

  const signupHandler = (value: any) => {
    sendOTP({ mobileNumber: value.mobileNo, user_type: 1 })
      .then((res) => {
        console.log(res.data);
        if (res.data.result === "exist") confirmationMessageHandler();
      })
      .catch((err) => {
        console.log("send otp error", err);
      });
  };

  const confirmationMessageHandler = () => {
    Alert.alert(
      "Message",
      `Registration cannot be done. This \n Customer's mobile number is already  registered`,
      [
        {
          text: "Close",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Container>
      <Content>
        <Formik
          // isInitialValid={task.task_title ? true : false}
          // @ts-ignore
          // innerRef={formik}
          initialValues={{
            name: value.name,
            mobileNo: value.mobileNo,
            email: value.email,
            username: value.username,
            password: value.password,
            confirmPassword: value.confirmPassword,
          }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            signupHandler(values);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue,
            errors,
            touched,
          }) => (
            <View style={styles.main}>
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  Immediate Maintenance and Service
                </Text>
              </View>
              <View>
                <Input
                  style={styles.inputType}
                  placeholder="Full Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  message={errors.name}
                  error={touched.name && errors.name}
                  value={values.name}
                  borderRadius={20}
                />
              </View>
              <View style={styles.countryContainer}>
                <Select
                  pickerStyle={{
                    inputIOS: { borderWidth: 0 },
                    inputAndroid: { borderWidth: 0, borderBottomWidth: 0 },
                  }}
                  style={styles.selectType}
                  placeholder="Select Country"
                  value={
                    selected.country ? selected.country : countries[0]?.value
                  }
                  onValueChange={(country: string) =>
                    countryChangeHandler(country)
                  }
                  iconStyle={styles.iconStyle}
                  items={countries}
                />
              </View>
              <View style={[styles.countryContainer, { marginTop: 0 }]}>
                <Select
                  pickerStyle={{
                    inputIOS: { borderWidth: 0 },
                    inputAndroid: { borderWidth: 0, borderBottomWidth: 0 },
                  }}
                  style={styles.selectType}
                  placeholder="Select City"
                  value={selected.city ? selected.city : cities[0]?.value}
                  onValueChange={(city: string) => cityChangeHandler(city)}
                  iconStyle={styles.iconStyle}
                  items={cities}
                />
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.inputContainer}>
                  <Input
                    style={styles.inputType}
                    keyboardType="numeric"
                    maxLength={9}
                    onChangeText={handleChange("mobileNo")}
                    onBlur={handleBlur("mobileNo")}
                    value={values.mobileNo}
                    message={errors.mobileNo}
                    error={touched.mobileNo && errors.mobileNo}
                    placeholder="Mobile Number"
                    borderRadius={20}
                  />
                </View>
                <Text style={styles.code}>+966</Text>
              </View>

              <View>
                <Input
                  keyboardType="email-address"
                  style={styles.inputType}
                  placeholder="Email Address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  message={errors.email}
                  error={touched.email && errors.email}
                  value={values.email}
                  borderRadius={20}
                />
              </View>

              <View>
                <Input
                  style={styles.inputType}
                  placeholder="User Name"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  message={errors.username}
                  error={touched.username && errors.username}
                  value={values.username}
                  borderRadius={20}
                />
              </View>

              <View style={{ marginBottom: 5 }}>
                <Input
                  secureTextEntry={!showPassword}
                  style={styles.inputType}
                  placeholder="Password"
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
                      !showPassword ? images.HidePassword : images.ShowPassword
                    }
                  />
                </Touchable>
              </View>
              <View style={{ marginBottom: 5 }}>
                <Input
                  secureTextEntry={!showConPassword}
                  style={styles.inputType}
                  placeholder="Confirm Password"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  message={errors.confirmPassword}
                  error={touched.confirmPassword && errors.confirmPassword}
                  value={values.confirmPassword}
                  borderRadius={20}
                />
                <Touchable
                  style={styles.showPassword}
                  onPress={showConfirmPasswordHandler}
                >
                  <Image
                    source={
                      !showConPassword
                        ? images.HidePassword
                        : images.ShowPassword
                    }
                  />
                </Touchable>
              </View>

              <View style={styles.mapContainer}>
                <MapView
                  minZoomLevel={15}
                  region={location}
                  mapType={"standard"}
                  showsUserLocation={true}
                  style={styles.map}
                  provider={PROVIDER_GOOGLE}
                >
                  <Marker
                    coordinate={location}
                    draggable
                    onDragEnd={(e) => {
                      const { longitude, latitude } = e.nativeEvent.coordinate;
                      setLocation((prv) => ({ ...prv, latitude, longitude }));
                    }}
                  />
                </MapView>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  title="Sign Up"
                  width={150}
                  color={colors.theme}
                  onPress={handleSubmit}
                  borderRadius={20}
                />
              </View>
            </View>
          )}
        </Formik>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    margin: 15,
    marginBottom: 0,
  },

  headerText: {
    fontSize: 24,
    color: colors.theme,
    fontFamily: "Lato-Medium",
    justifyContent: "center",
    alignSelf: "center",
  },
  inputType: {
    padding: 10,
    margin: 16,
    marginBottom: 10,
    backgroundColor: colors.white,
    elevation: 5,
    borderRadius: 5,
  },
  selectType: {
    paddingLeft: 7,
    backgroundColor: colors.white,
    borderColor: colors.white,
    elevation: 10,
    borderRadius: 8,
    borderWidth: 5,
  },
  iconStyle: {
    right: 5,
    top: 10,
  },
  countryContainer: {
    margin: 16,
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    // flex:1,
    width: "85%",
  },
  code: {
    alignSelf: "center",
    marginRight: 16,
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
  mapContainer: {
    margin: 16,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
});
