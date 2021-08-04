import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Image,
  Alert,
} from "react-native";
import { colors, images } from "../../themes/variables";
import Input from "../../Components/Input";
import Button from "../../Components/Buttons";
import DocumentPicker from "react-native-document-picker";
import Touchable from "../../Components/Touchable";
import { createRequest } from "../../api/request";

export default function Mobile(props: any) {
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [deliveryTitle, setDeliveryTitle] = useState("");
  const [value, setValue] = useState({
    deviceModel: "",
    clarify: "",
    mobileNumber: "",
    country_id: "",
    city_id: "",
    lat: "",
    lan: "",
    task: "",
  });

  useEffect(() => {
    const {
      deliveryTitle,
      mobileNumber,
      country_id,
      city_id,
      lat,
      lan,
      task,
    } = props.route.params;
    setDeliveryTitle(deliveryTitle);
    setValue((prv) => ({
      ...prv,
      mobileNumber,
      country_id,
      city_id,
      lat,
      lan,
      task,
    }));
  }, [props.route.params]);

  const documentsPicker = () => async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const { uri, type, name, size } = result;
      const image = { uri, type, name, size };
      setImage(image);
    } catch (err) {
      console.log(err);
    }
  };

  const requestHandler = () => {
    const data = { deviceType: 1, ...value, image: image };
    setLoading(true);
    createRequest(data)
      .then((res) => {
        setLoading(false);
        ToastAndroid.show(
          res.data.message
            ? res.data.message
            : "Something Went Wrong! Try Again.",
          ToastAndroid.SHORT
        );
        confirmationMessageHandler();
      })
      .catch((err) => {
        setLoading(false);
        ToastAndroid.show(
          err.message ? err.message : "Something Went Wrong! Try Again.",
          ToastAndroid.SHORT
        );
      });
  };

  const confirmationMessageHandler = () => {
    Alert.alert(
      "Message",
      `Sent Successfully \n will contact you in urgent`,
      [
        {
          text: "Close",
          onPress: () => props.navigation.navigate("Dashboard"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.main}>
      <View
        style={[styles.inputContainer, { borderRadius: 20, elevation: 10 }]}
      >
        <Input
          style={styles.inputType}
          onChangeText={(e: any) =>
            setValue((prv) => ({ ...prv, deviceModel: e }))
          }
          value={value.deviceModel}
          placeholder="Enter Device Modal"
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          { height: 80, borderRadius: 10, elevation: 10 },
        ]}
      >
        <Input
          style={styles.inputType}
          multiline={true}
          onChangeText={(e: any) => setValue((prv) => ({ ...prv, clarify: e }))}
          value={value.clarify}
          placeholder="Clarify"
        />
      </View>
      <View style={styles.documentContainer}>
        <Touchable style={styles.browseButton} onPress={documentsPicker()}>
          <Text style={styles.text}>Choose File</Text>
        </Touchable>
        {!image ? (
          <Text style={[styles.text, { marginLeft: 5 }]}>No file Chosen</Text>
        ) : (
          <Text style={[styles.text, { marginLeft: 5 }]}>{image.name}</Text>
        )}
      </View>

      <View style={styles.descContainer}>
        <Text style={styles.text}>{deliveryTitle}</Text>
        <View style={styles.descInnerContainer}>
          <Text style={styles.desc}>I have read instructions</Text>
          <Touchable onPress={() => console.log("d")}>
            <Text style={{ marginLeft: 3, color: "#A9DEF9" }}>Click Here</Text>
          </Touchable>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          loading={loading}
          title="Request"
          width={150}
          color={colors.theme}
          onPress={requestHandler}
        />
        <Button
          title="Back"
          width={150}
          color={colors.theme}
          onPress={() => props.navigation.goBack()}
        />
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
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 5,
  },
  inputContainer: {
    marginLeft: 16,
    marginRight: 16,
    height: 40,
    width: "90%",
    marginTop: 25,
    backgroundColor: colors.white,
    elevation: 5,
    paddingHorizontal: 10,
  },
  inputType: {
    padding: 10,
  },
  descContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  descInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  desc: {
    fontFamily: "Lato-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  documentContainer: {
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  browseButton: {
    height: 26,
    width: "auto",
    padding: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightTheme,
    borderRadius: 10,
    borderColor: colors.theme,
    color: colors.white,
  },
  text: {
    fontFamily: "Lato-Regular",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
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
  },
  footerText: {
    marginLeft: 15,
    marginRight: 15,
    fontWeight: "bold",
    color: colors.theme,
  },
});
