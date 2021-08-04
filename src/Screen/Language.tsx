import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { colors, images } from "../themes/variables";
import Touchable from "../Components/Touchable";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Language() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    (async () => {
      const language = await AsyncStorage.getItem("language");
      if (language) setLanguage(language);
    })();
  }, [language]);

  const languageChangeHandler = (lang: any) => {
    setLanguage(lang);
    AsyncStorage.setItem("language", lang);
  };
  return (
    <View style={styles.main}>
      <Text>Select Language</Text>
      <View style={styles.container}>
        <Touchable
          style={styles.innerContainer}
          onPress={() => languageChangeHandler("en")}
        >
          <View style={styles.radioButton}>
            {language === "en" && <Image source={images.Selecting} />}
          </View>
          <Text style={styles.language}>English</Text>
        </Touchable>
        <Touchable
          style={styles.innerContainer}
          onPress={() => languageChangeHandler("ar")}
        >
          <View style={styles.radioButton}>
            {language === "ar" && <Image source={images.Selecting} />}
          </View>
          <Text style={styles.language}>Arabic</Text>
        </Touchable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  innerContainer: {
    flexDirection: "row",
  },
  radioButton: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderColor: colors.theme,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectRadio: {},
  language: {
    marginLeft: 10,
  },
});
