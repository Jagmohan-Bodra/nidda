import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors, images } from "../themes/variables";
import Input from "../Components/Input";
import Button from "../Components/Buttons";
import { Formik } from "formik";
import * as Yup from "yup";
import { Container } from "../Components/Container/Container";
import { Content } from "../Components/Container/Content";

const orderSchema = Yup.object().shape({
  mobileNo: Yup.string()
    .min(9, "Enter valid phone number")
    .max(9, "Enter valid phone number")
    .required("Please select search terms"),
});
export default function OrderTracking() {
  const [value] = useState({ mobileNo: "", requestId: "" });

  const enquiryHandler = (values: any) => {};

  return (
    <Container style={{ flex: 1 }}>
      <Content style={{ flex: 1, backgroundColor: colors.white }}>
        <Formik
          initialValues={{
            mobileNo: value.mobileNo,
            requestId: value.requestId,
          }}
          validationSchema={orderSchema}
          onSubmit={(values) => {
            enquiryHandler(values);
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
              <View>
                <Input
                  style={styles.inputType}
                  placeholder="The mobile number with country key without the two"
                  onChangeText={handleChange("mobileNo")}
                  onBlur={handleBlur("mobileNo")}
                  message={errors.mobileNo}
                  error={touched.mobileNo && errors.mobileNo}
                  value={values.mobileNo}
                  borderRadius={20}
                />
              </View>
              <View>
                <Input
                  style={styles.inputType}
                  placeholder="Request Id"
                  onChangeText={handleChange("requestId")}
                  onBlur={handleBlur("requestId")}
                  message={errors.requestId}
                  error={touched.requestId && errors.requestId}
                  value={values.requestId}
                  borderRadius={20}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  title="Enquiry"
                  width={150}
                  color={colors.theme}
                  onPress={handleSubmit}
                />
              </View>

              {/* <View style={styles.container}>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={styles.id}>143</Text>
                                    <View style={styles.row}>
                                        <Text>Mobile</Text>
                                        <Image source={images.Arrow} style={{ marginLeft: 5 }} />
                                        <Text>Fix</Text>
                                    </View>
                                    <Text>Pending</Text>
                                </View>
                            </View> */}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputType: {
    padding: 10,
    margin: 16,
    marginBottom: 10,
    backgroundColor: colors.white,
    elevation: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  container: {
    margin: 16,
    backgroundColor: colors.white,
    borderRadius: 6,
    elevation: 5,
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    margin: 20,
  },
  id: {
    marginTop: 10,
    marginLeft: 20,
  },
});
