import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors, images } from "../themes/variables";
import { Container } from "../Components/Container/Container";
import { Content } from "../Components/Container/Content";
import Input from "../Components/Input";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Button from "../Components/Buttons";
import { Formik } from "formik";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  sponserName: Yup.string().required("Please enter SponserName"),
  username: Yup.string().required("Username is required"),
});

export default function WorksDetails(props: any) {
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
    sponserName: "",
  });

  const signupHandler = (value: any) => {};
  return (
    <Container>
      <Content>
        <Formik
          // isInitialValid={task.task_title ? true : false}
          initialValues={{
            name: value.name,
            sponserName: value.sponserName,
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
              <View style={{ marginTop: 50 }}>
                <Input
                  keyboardType="email-address"
                  style={styles.inputType}
                  placeholder="Email Address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  message={errors.email}
                  error={touched.email && errors.email}
                  value={values.email}
                />
              </View>
              <View>
                <Input
                  style={styles.inputType}
                  placeholder="Sponser Name"
                  onChangeText={handleChange("sponserName")}
                  onBlur={handleBlur("sponserName")}
                  message={errors.sponserName}
                  error={touched.sponserName && errors.sponserName}
                  value={values.sponserName}
                />
              </View>

              <View>
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
                />
              </View>

              <View style={{ marginBottom: 5 }}>
                <Input
                  secureTextEntry={true}
                  style={styles.inputType}
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  message={errors.password}
                  error={touched.password && errors.password}
                  value={values.password}
                />
              </View>
              <View style={{ marginBottom: 5 }}>
                <Input
                  secureTextEntry={true}
                  style={styles.inputType}
                  placeholder="Confirm Password"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  message={errors.confirmPassword}
                  error={touched.confirmPassword && errors.confirmPassword}
                  value={values.confirmPassword}
                />
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
                  title="Back"
                  width={150}
                  color={colors.theme}
                  onPress={() => props.navigation.goBack()}
                />
                <Button
                  title="Sign Up"
                  width={150}
                  color={colors.theme}
                  onPress={handleSubmit}
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
    paddingHorizontal: 15,
  },
  inputType: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    elevation: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  rowContainer: {
    flexDirection: "row",
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
    justifyContent: "space-between",
  },
});
