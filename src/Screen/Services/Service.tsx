import React, { useEffect, useState, useRef } from "react";
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
} from "react-native";
import { colors, images } from "../../themes/variables";
import Input from "../../Components/Input";
import Button from "../../Components/Buttons";
import Touchable from "../../Components/Touchable";
import { getDeliveryTitle, getTask } from "../../api/request";
import { Formik } from "formik";
import * as Yup from "yup";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Container } from "../../Components/Container/Container";
import { Content } from "../../Components/Container/Content";
import RNLocation from "react-native-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { color } from "react-native-reanimated";

const taskSchema = Yup.object().shape({
  mobileNo: Yup.string()
    .min(9, "Enter valid phone number")
    .max(9, "Enter valid phone number")
    .required("Mobile number required"),
  task: Yup.string().required("Please select task type"),
});
RNLocation.configure({
  distanceFilter: 5.0,
});

export default function Mobile(props: any) {
  const mapRef = useRef(null);
  const formik = useRef<any>();
  let isRTL = I18nManager.isRTL ? true : false;
  const [taskTypes, setTaskTypes] = useState([] as any[]);
  const [deliveryTitle, setDeliveryTitle] = useState("");
  const [task, setTask] = useState({ task_id: "", task_title: "" });
  const [mobileNo, setMobileNo] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [value, setValue] = useState({ country_id: "", city_id: "" });
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(false);

  const serviceChangeHandle = (task_id: any, task_title: any) => {
    setTask((prv) => ({ ...prv, task_id, task_title }));
    formik.current.setFieldValue("task", task_id);
    getDeliveryTitle({ country_id: 1, task_id })
      .then((res) => {
        setDeliveryTitle(res.data.delivery_title);
      })
      .catch((err) => console.log(err, "get delivery title error"));
  };

  useEffect(() => {
    const {
      service_id,
      service_title,
      country_id,
      city_id,
    } = props.route.params;
    setServiceTitle(service_title);
    setValue({ country_id, city_id });
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: { detail: "fine" },
    }).then((granted) => {
      if (granted) {
        RNLocation.getLatestLocation({ timeout: 60000 }).then(
          (latestLocation) => {
            setLocation((p) => ({ ...p, ...latestLocation }));
          }
        );
      }
    });
    getTask({ service_id })
      .then((res) => {
        setTaskTypes(res.data.tasktypes);
      })
      .catch((err) => console.log(err, "get task error"));
  }, []);

  const nextScreenHandler = (values: any) => {
    setLoading(true);
    // const serviceType = taskTypes.find((a) => a.task_id === values.task).task_title;
    props.navigation.navigate("ServiceDetails", {
      deliveryTitle,
      mobileNumber: values.mobileNo,
      country_id: value.country_id,
      city_id: value.city_id,
      lat: location.latitude,
      lan: location.longitude,
      task: values.task,
    });
    setLoading(false);
    // tasksTypes({ serviceType })
    //   .then((res) => {
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log(err, 'task types error')
    //   });
  };

  const getCurrentLocation = () => {
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: { detail: "coarse" },
    }).then((granted) => {
      if (granted) {
        RNLocation.getLatestLocation({ timeout: 60000 }).then(
          (latestLocation) => {
            setLocation((p) => ({ ...p, ...latestLocation }));
          }
        );
      }
    });
  };

  const onRegionChangeHandler = (region: any) => {
    setLocation((prv) => ({ ...prv, ...region }));
  };

  return (
    <Container style={styles.main}>
      <Content>
        <Formik
          //isInitialValid={task.task_title ? true : false}
          // @ts-ignore
          innerRef={formik}
          initialValues={{ task: task.task_id, mobileNo: mobileNo }}
          validationSchema={taskSchema}
          onSubmit={(values) => {
            nextScreenHandler(values);
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
              <View style={styles.serviceContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.serviceText}>{serviceTitle}</Text>
                  </View>
                  <View style={[styles.titleContainer, { width: 30 }]}>
                    <Image
                      source={isRTL ? images.Arrow_Left : images.Arrow_Right}
                    />
                  </View>
                  {task.task_title ? (
                    <View
                      style={[
                        styles.titleContainer,
                        { backgroundColor: "#FFB300" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.serviceText,
                          task.task_title && styles.selectedLabel,
                        ]}
                      >
                        {task.task_title}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.headerText}>Choose Task Type</Text>
                <View style={styles.mainContainer}>
                  {taskTypes.map((a) => {
                    return (
                      <Touchable
                        key={a.task_id}
                        style={[
                          styles.container,
                          task.task_id === a.task_id &&
                            styles.selectedContainer,
                        ]}
                        onPress={() =>
                          serviceChangeHandle(
                            a.task_id,
                            isRTL ? a.task_title_ar : a.task_title
                          )
                        }
                      >
                        <View style={[styles.row, { borderRadius: 20 }]}>
                          <View style={styles.checkBox}>
                            {task.task_id === a.task_id && (
                              <Image source={images.Selecting} />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.label,
                              task.task_id === a.task_id &&
                                styles.selectedLabel,
                            ]}
                          >
                            {isRTL ? a.task_title_ar : a.task_title}
                          </Text>
                        </View>
                      </Touchable>
                    );
                  })}
                </View>
                <Text style={{ color: colors.theme }}>{errors.task}</Text>
                <View style={styles.line} />
                <View style={styles.rowContainer}>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        borderRadius: 20,
                      },
                    ]}
                  >
                    <Input
                      style={styles.inputType}
                      keyboardType="numeric"
                      maxLength={9}
                      onChangeText={handleChange("mobileNo")}
                      onBlur={handleBlur("mobileNo")}
                      value={values.mobileNo}
                      message={errors.mobileNo}
                      error={touched.mobileNo && errors.mobileNo}
                      placeholder="Enter Mobile no without zero"
                      borderRadius={20}
                    />
                  </View>
                  <Text style={styles.code}>+966</Text>
                </View>

                <View style={styles.locationContainer}>
                  <Touchable
                    style={[
                      styles.inputContainer,
                      {
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 25,
                      },
                    ]}
                    onPress={getCurrentLocation}
                  >
                    <Image width={30} height={30} source={images.Location} />
                  </Touchable>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: colors.white,
                      elevation: 10,
                      marginLeft: 15,
                      borderRadius: 20,
                      paddingHorizontal: 10,
                    }}
                  >
                    <GooglePlacesAutocomplete
                      listViewDisplayed="auto"
                      placeholder="Search"
                      minLength={1} // minimum length of text to search
                      fetchDetails={true}
                      onPress={(data, details) => {
                        // 'details' is provided when fetchDetails = true
                        // @ts-ignore
                        setLocation((prv) => ({
                          ...prv,
                          latitude: details.geometry.location.lat,
                          longitude: details?.geometry.location.lng,
                          latitudeDelta: 0.3,
                          longitudeDelta: 0.3,
                        }));
                      }}
                      query={{
                        key: "AIzaSyAY1c0iL6AdoEIfc32ck4P5StLIyhnIXZc",
                        language: "en", // language of the results
                        components: "country:ind",
                      }}
                      styles={{
                        description: {
                          fontWeight: "bold",
                          textAlign: "right",
                        },
                        predefinedPlacesDescription: {
                          color: "#1faadb",
                          borderRadius: 20,
                          marginHorizontal: 10,
                        },
                      }}
                      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                      currentLocationLabel="Current location"
                      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                      GooglePlacesSearchQuery={{
                        rankby: "distance",
                        types: "airport",
                      }}
                      filterReverseGeocodingByTypes={[
                        "locality",
                        "administrative_area_level_3",
                      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                      predefinedPlacesAlwaysVisible={true}
                    />
                  </View>
                </View>
                <View style={styles.mapContainer}>
                  <MapView
                    minZoomLevel={15}
                    region={location}
                    mapType={"standard"}
                    showsUserLocation={true}
                    onRegionChangeComplete={onRegionChangeHandler}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                  />
                  <View pointerEvents="none" style={styles.markerFixed}>
                    <Image style={styles.marker} source={images.Marker} />
                  </View>
                  {/* <Marker coordinate={location}
                      draggable
                      onDragEnd={(e) => {
                        const { longitude, latitude } = e.nativeEvent.coordinate;
                        setLocation(prv => ({ ...prv, latitude, longitude }))
                      }}
                    /> */}
                  {/* </MapView> */}
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Back"
                    width={150}
                    color={colors.theme}
                    onPress={() => props.navigation.goBack()}
                  />
                  <Button
                    title="Next"
                    loading={loading}
                    width={150}
                    color={colors.theme}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
              <View style={styles.Adfooter}>
                <View style={styles.AdfooterContainer}>
                  <Text style={styles.footerText}>Advertisement</Text>
                </View>
              </View>
              <View style={styles.footer}>
                <View style={styles.footerContainer}>
                  <View style={styles.footerInnerContainer}>
                    <Image source={images.FooterCall} />
                  </View>
                  <Text style={styles.footerText}>(+966) 555766542</Text>
                  <View style={styles.footerInnerContainer}>
                    <Image source={images.FooterWhatsApp} />
                  </View>
                </View>
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
    //paddingHorizontal: 5,
    paddingBottom: 20,
  },
  serviceContainer: {
    margin: 16,
  },
  row: {
    flexDirection: "row",
  },
  mainContainer: {
    marginTop: 15,
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
    textAlignVertical: "center",
  },
  container: {
    height: 40,
    width: "45%",
    backgroundColor: colors.white,
    elevation: 10,
    justifyContent: "center",
    textAlignVertical: "center",
    margin: 4,
    flexGrow: 1,
    borderRadius: 20,
    //paddingHorizontal: 5,
    //paddingVertical: 5,
    marginVertical: 10,
  },
  line: {
    borderWidth: 3,
    marginBottom: 15,
    borderColor: "#DCE5E8",
  },
  checkBox: {
    height: 32,
    width: 32,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.theme,
    backgroundColor: colors.white,
    marginLeft: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedLabel: {
    color: colors.white,
  },
  label: {
    marginLeft: 10,
    color: colors.black,
    fontFamily: "Lato-bold",
    textAlignVertical: "center",
  },
  selectedContainer: {
    backgroundColor: colors.theme,
    borderRadius: 20,
    elevation: 10,
    color: colors.white,
  },

  rowContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
  },
  locationContainer: {
    flexDirection: "row",
    marginTop: 25,
  },
  inputContainer: {
    height: 50,
    width: "80%",
    backgroundColor: colors.white,
    elevation: 10,
  },
  inputType: {
    padding: 10,
    borderRadius: 20,
  },
  code: {
    alignSelf: "center",
    marginLeft: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  mapContainer: {
    marginTop: 30,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    elevation: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerText: {
    fontFamily: "Lato-Bold",
    marginTop: 25,
    color: colors.theme,
  },
  serviceText: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    color: colors.darkGrey,
  },
  titleContainer: {
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCE5E8",
    borderRadius: 15,
    maxWidth: 200,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
    marginTop: 20,
    //marginHorizontal: -7,
  },
  footerContainer: {
    backgroundColor: colors.lightTheme,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerInnerContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  footerText: {
    marginLeft: 15,
    marginRight: 15,
    fontWeight: "bold",
    color: colors.theme,
  },
  Adfooter: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
    marginTop: 30,
  },
  AdfooterContainer: {
    backgroundColor: colors.light,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  markerFixed: {
    // flex: 1, alignItems: 'center', justifyContent: 'center'
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 36,
    width: 28,
  },
  region: {
    color: "#fff",
    lineHeight: 20,
    margin: 20,
  },
});
