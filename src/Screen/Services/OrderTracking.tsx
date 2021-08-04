import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors, images } from "../../themes/variables";
import Input from "../../Components/Input";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Button from "../../Components/Buttons";
import { Container } from "../../Components/Container/Container";
import { Content } from "../../Components/Container/Content";

export default function OrderTracking(props: any) {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <Container style={styles.main}>
      <Content>
        <View style={styles.main}>
          <View style={[styles.row, { justifyContent: "space-around" }]}>
            <View style={styles.headerContainer}>
              <View
                style={{
                  height: 24,
                  backgroundColor: colors.white,
                  width: "60%",
                }}
              />
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerLabel}>Orders</Text>
              <View style={styles.orderContainer}>
                <Text>8</Text>
              </View>
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerLabel}>Tracking</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.requestLabel}>Request Id</Text>
              <View style={styles.reqContainer}>
                <Text style={[styles.requestLabel, { marginLeft: 10 }]}>
                  123456
                </Text>
              </View>
            </View>
            <View style={styles.serviceContainer}>
              <Text style={styles.serviceText}>elevator</Text>
              <Image source={images.Arrow_Right} />
              <Text style={styles.taskLabel}>Fix</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", width: "70%" }}>
                <View style={styles.inputContainer}>
                  <Input
                    style={styles.inputType}
                    // onChangeText={(e: any) => setValue(prv => ({ ...prv, deviceModel: e }))}
                    value={""}
                    placeholder="Enter Device Type"
                  />
                </View>
                <View
                  style={[styles.inputContainer, { height: 50, marginTop: 10 }]}
                >
                  <Input
                    style={styles.inputType}
                    multiline={true}
                    // onChangeText={(e: any) => setValue(prv => ({ ...prv, clarfy: e }))}
                    value={""}
                    placeholder="Enter Description"
                  />
                </View>
              </View>
              <View style={styles.documentContainer}>
                <Text style={{ marginLeft: 5 }}>{"image.jpg"}</Text>
              </View>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>21/09/2021 10:30</Text>
            <Text style={styles.date}>21/09/2021 10:35</Text>
          </View>
          <View style={styles.mapContainer}>
                        <MapView
                            minZoomLevel={15}
                            region={location}
                            mapType={'standard'}
                            showsUserLocation={true}
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}>
                            <Marker coordinate={location}
                                draggable
                                onDragEnd={(e) => {
                                    const { longitude, latitude } = e.nativeEvent.coordinate;
                                    setLocation(prv => ({ ...prv, latitude, longitude }))
                                }}
                            />
                        </MapView>
          </View>
          <Text style={styles.distance}>Distance: 10 KM</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Accept"
              width={150}
              color={colors.theme}
              onPress={{}}
            />
            <Button
              title="Deny"
              width={150}
              color={colors.theme}
              onPress={() => props.navigation.goBack()}
            />
          </View>
          <View style={styles.footerContainer}>
            <Image source={images.Call} />
            <Image style={{ marginLeft: 10 }} source={images.WhatsApp} />
            <Text style={{ marginLeft: 20, fontFamily: "Lato-Regular" }}>
              1321231231
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: "row",
    // justifyContent: 'space-around',
    margin: 10,
  },
  headerContainer: {
    backgroundColor: "#B6E325",
    borderRadius: 8,
    height: 30,
    width: "31%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLabel: {
    fontFamily: "Lato-Bold",
    fontSize: 18,
    marginLeft: 10,
  },
  orderContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  container: {
    marginLeft: 30,
    marginTop: 20,
  },
  requestLabel: {
    color: colors.purple,
    fontSize: 18,
    fontFamily: "Lato-Bold",
  },
  reqContainer: {
    borderWidth: 2,
    marginLeft: 10,
    width: 130,
    borderColor: "#139FD3",
    borderRadius: 6,
  },
  serviceContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
  },
  serviceText: {
    fontSize: 16,
    fontFamily: "Lato-Bold",
  },
  taskLabel: {
    fontSize: 18,
  },
  inputContainer: {
    marginLeft: 16,
    height: 40,
    backgroundColor: colors.white,
    elevation: 5,
  },
  inputType: {
    padding: 10,
  },
  documentContainer: {
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  date: {
    fontFamily: "Lato-Bold",
  },
  mapContainer: {
    margin: 8,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  distance: {
    alignSelf: "center",
    margin: 5,
    fontFamily: "Lato-Bold",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
