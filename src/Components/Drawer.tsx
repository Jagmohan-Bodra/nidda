import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  I18nManager,
  TouchableOpacity,
} from "react-native";
import { colors, images } from "../themes/variables";
import { rightMenus } from "../api/request";
import { URLS } from "../api/URLS";
import Touchable from "./Touchable";
import { Select } from "./Select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import I18n from "../i18n";
import RNRestart from "react-native-restart";
import Icon from "react-native-vector-icons/MaterialIcons";

const languageOption = [
  { label: "English", value: "en" },
  { label: "Arabic", value: "ar" },
];
const BUTTON_SIZE = 30;
const BORDER_WIDTH = 1;

function CloseButton(props: any) {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.toggleDrawer()}
      style={[
        styles.button,
        { backgroundColor: "white", borderColor: props.color },
      ]}
    >
      <Icon name="cancel" color={props.color} size={BUTTON_SIZE / 2} />

      {/* <Icon name="close" color={props.color} size={BUTTON_SIZE / 2} /> */}
    </TouchableOpacity>
  );
}

export default function RightAppMenus(props: any) {
  let isRTL = I18nManager.isRTL ? true : false;
  const [rightAppMenus, setRightAppMenus] = useState([] as any[]);
  const [language, setLanguage] = useState(I18nManager.isRTL ? "ar" : "en");

  useEffect(() => {
    rightMenus()
      .then((res) => {
        setRightAppMenus(res.data.rightmenus);
      })
      .catch((err) => console.log(err, "right app menus error"));
  }, []);

  const openLinkHandler = (url: any) => {
    Linking.canOpenURL(`http://${url}`)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(`http://${url}`);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const changeLanguageHandler = (language: any) => {
    const isRTL = language === "ar";
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    setLanguage(language);
    AsyncStorage.setItem("language", language);
    RNRestart.Restart();
  };

  const logout = async () => {
    await AsyncStorage.removeItem("login");
  };

  return (
    <View style={styles.main}>
      {/* <View style={styles.container}>
        <View style={[styles.row, { justifyContent: "space-around" }]}>
          <Image source={images.WhatsApp} />
          <View
            style={[styles.menuContainer, { backgroundColor: colors.theme }]}
          >
            <Text style={styles.menuLabel}>Customer</Text>
          </View>
          <View style={styles.menuContainer}>
            <Text style={styles.menuLabel}>Company</Text>
          </View>
          <View style={styles.menuContainer}>
            <Text style={styles.menuLabel}>Driver</Text>
          </View>
        </View>
      </View> */}
      {/* {rightAppMenus.map((a) => {
        return (
          <Touchable
            key={a.menu_id}
            style={styles.container}
            onPress={() => openLinkHandler(a.link_url)}
          >
            <View style={styles.row}>
              <Image
                source={{ uri: URLS.image + a.menu_icon }}
                style={{ height: 30, width: 30 }}
              />
              <Text style={styles.menuText}>
                {isRTL ? a.menu_name_ar : a.menu_name}
              </Text>
            </View>
          </Touchable>
        );
      })} */}
      <View style={styles.container}>
        <CloseButton
          color={colors.theme}
          style={{ right: "1px" }}
          navigation={props.navigation}
        />
        <View
          style={[
            styles.row,
            { borderBottomColor: colors.opacity, borderBottomWidth: 1 },
          ]}
        >
          <Image source={images.Sound} style={{ height: 30, width: 30 }} />
          <Text style={styles.menuText}>{I18n.t("sound")}</Text>
        </View>
        {/* <Text style={[styles.menuText, { marginLeft: 40, marginTop: 10 }]}>Log in</Text>     */}

        <Touchable
          onPress={() => props.navigation.navigate("Dashboard")}
          style={[{ borderBottomColor: colors.opacity, borderBottomWidth: 1 }]}
        >
          <View style={styles.selectedMenu}>
            <Image source={images.Home} style={{ marginLeft: 5 }} />
            <Text style={[styles.menuText]}>{I18n.t("home")}</Text>
          </View>
        </Touchable>
        <Touchable
          style={[styles.menu]}
          onPress={() => props.navigation.navigate("orderTracking")}
        >
          <Text style={styles.menuText}>{I18n.t("order")}</Text>
        </Touchable>
        <Touchable style={[styles.menu]}>
          <Text style={styles.menuText}>{I18n.t("contact")}</Text>
        </Touchable>
        <Touchable style={[styles.menu]}>
          <Text style={styles.menuText}>{I18n.t("about")}</Text>
        </Touchable>
        <Touchable style={[styles.menu]}>
          <Text style={styles.menuText}>{I18n.t("participation")}</Text>
        </Touchable>
        <Touchable style={[styles.menu]} onPress={logout}>
          <Text style={styles.menuText}>{I18n.t("login")}</Text>
        </Touchable>
      </View>
      {/* <View style={styles.filterContainer}>
        <Select
          pickerStyle={{
            inputIOS: { borderWidth: 0 },
            inputAndroid: { borderWidth: 0, borderBottomWidth: 0 },
          }}
          style={styles.selectType}
          placeholder="Select Language"
          value={language}
          onValueChange={(lang: string) => changeLanguageHandler(lang)}
          iconStyle={styles.iconStyle}
          items={languageOption}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 50,
  },
  container: {
    // marginLeft: 20,
    marginTop: 40,
    //alignItems: "flex-start",
    borderBottomColor: colors.opacity,
    //borderBottomWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  menu: {
    borderBottomColor: colors.opacity,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Lato-Bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
  },
  filterContainer: {
    width: "55%",
    margin: 20,
  },
  selectType: {
    paddingLeft: 7,
    backgroundColor: colors.white,
    borderColor: colors.white,
    elevation: 10,
    borderRadius: 8,
  },
  iconStyle: {
    right: 5,
    top: 10,
  },
  menuContainer: {
    height: 28,
    borderColor: "#974857",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    padding: 5,
    color: "#4DA3C7",
    fontFamily: "Lato-Bold",
  },
  selectedMenu: {
    height: 32,
    width: 130,
    marginVertical: 10,
    backgroundColor: colors.theme,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    width: BUTTON_SIZE + BORDER_WIDTH,
    height: BUTTON_SIZE + BORDER_WIDTH,
    borderWidth: BORDER_WIDTH,
    borderRadius: BUTTON_SIZE / 2,
  },
});
