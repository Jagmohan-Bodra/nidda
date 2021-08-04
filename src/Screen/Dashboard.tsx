import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  I18nManager,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { colors, images } from "../themes/variables";
import Touchable from "../Components/Touchable";
import { Select } from "../Components/Select";
import { Container } from "../Components/Container/Container";
import { getCountry, getCities, getServices } from "../api/request";
import I18n from "../i18n";
import SvgUri from "react-native-svg-uri";

export default function Dashboard(props: any) {
  let isRTL = I18nManager.isRTL ? true : false;
  const [countries, setCountries] = useState([] as any[]);
  const [cities, setCities] = useState([] as any[]);
  const [services, setServices] = useState([] as any[]);
  const [selected, setSelected] = useState({ country: "", city: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCountryRequest();
    getCitiesRequest();
    getServices({ city_id: selected.city || 1 })
      .then((res) => {
        setLoading(false);
        if (res.data.cityservices) {
          setServices(res.data.cityservices);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "get Services Error");
        ToastAndroid.show(
          err.message ? err.message : "Something Went Wrong! Try Again.",
          ToastAndroid.SHORT
        );
      });
  }, [selected.city]);

  const getCountryRequest = () => {
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
  };

  const getCitiesRequest = () => {
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
  };

  const countryChangeHandler = (country: any) => {
    setSelected((prvState) => ({ ...prvState, country }));
  };

  const cityChangeHandler = (city: any) => {
    setSelected((prvState) => ({ ...prvState, city }));
  };

  return (
    <ScrollView>
      <Container style={styles.main}>
        <View style={styles.main}>
          <View style={styles.mainContainer}>
            <View style={styles.filterContainer}>
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
            <View style={[styles.filterContainer, { marginLeft: 13 }]}>
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
          </View>
          <Text style={[styles.chooseService, { paddingVertical: 20 }]}>
            {I18n.t("serviceTitle")}
          </Text>
          <View style={[styles.row, { paddingHorizontal: 30 }]}>
            {loading ? (
              <View style={{ flex: 1 }}>
                <ActivityIndicator size="large" color={colors.theme} />
              </View>
            ) : (
              services.map((a) => {
                return (
                  <Touchable
                    key={a.id}
                    style={styles.container}
                    onPress={() =>
                      props.navigation.navigate("Service", {
                        service_id: a.service_id,
                        service_title: isRTL
                          ? a.service_title_ar
                          : a.service_title,
                        country_id: selected.country,
                        city_id: selected.city,
                      })
                    }
                  >
                    <Image
                      source={images[a.image_title]}
                      style={styles.serviceIcon}
                    />
                    {/* <SvgUri
                      width={50}
                      height={50}
                      //style={styles.serviceIcon}
                      source={images[a.image_title]}
                    /> */}
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>
                        {isRTL ? a.service_title_ar : a.service_title}
                      </Text>
                    </View>
                  </Touchable>
                );
              })
            )}
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
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
  },
  chooseService: {
    alignSelf: "center",
    fontFamily: "Lato-Bold",
    marginTop: 4,
    color: colors.theme,
  },
  container: {
    height: 85,
    width: 100,
    elevation: 6,
    backgroundColor: colors.white,
    marginLeft: 9,
    marginTop: 9,
    alignItems: "center",
    padding: 6,
    borderRadius: 15,
  },
  labelContainer: {
    width: "80%",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontFamily: "Lato-Bold",
    marginTop: 3,
    textAlign: "center",
  },
  filterContainer: {
    width: "48%",
    marginTop: 10,
  },
  iconStyle: {
    right: 5,
    top: 10,
  },
  imageStyle: {
    height: 50,
    width: 50,
  },
  selectType: {
    paddingLeft: 7,
    backgroundColor: colors.white,
    borderColor: colors.white,
    elevation: 10,
    borderRadius: 8,
  },
  serviceIcon: {
    height: 50,
    width: 50,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 40,
    marginTop: 20,
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
  footerContainer: {
    backgroundColor: colors.lightTheme,
    height: 50,
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
});
