import React, { useEffect, useState } from "react";
import { colors, images } from "../themes/variables";
import { View, Text, StyleSheet, Image, I18nManager } from "react-native";
import Touchable from "../Components/Touchable";
import {
  getCountry,
  getCities,
  getServices,
  serviceTask,
} from "../api/request";
import { Select } from "../Components/Select";
import Input from "../Components/Input";
import { Container } from "../Components/Container/Container";
import { Content } from "../Components/Container/Content";
import Button from "../Components/Buttons";
import { Formik } from "formik";
import * as Yup from "yup";

const workSchema = Yup.object().shape({
  mobileNo: Yup.string()
    .min(9, "Enter valid phone number")
    .max(9, "Enter valid phone number")
    .required("Mobile number is required"),
  name: Yup.string().required("Name is required"),
});

export default function Works(props: any) {
  let isRTL = I18nManager.isRTL ? true : false;
  const [services, setServices] = useState([] as any[]);
  const [countries, setCountries] = useState([] as any[]);
  const [cities, setCities] = useState([] as any[]);
  const [selected, setSelected] = useState({ country: "", city: "" });
  const [service, setService] = useState([] as any[]);
  const [serviceTasks, setServiceTask] = useState([] as any[]);
  const [type, setType] = useState("work");
  const [AccountType, setAccountType] = useState("company");
  const [value] = useState({ name: "", mobileNo: "", clarify: "" });
  const [taskTypes, setTaskTypes] = useState([] as any[]);

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
    getServices({ city_id: selected.city || 1 })
      .then((res) => {
        if (res.data.cityservices) {
          setServices(res.data.cityservices);
        }
      })
      .catch((err) => {
        console.log(err, "get Services Error");
      });
  }, []);

  const countryChangeHandler = (country: any) => {
    setSelected((prvState) => ({ ...prvState, country }));
  };

  const cityChangeHandler = (city: any) => {
    setSelected((prvState) => ({ ...prvState, city }));
  };

  const serviceChangeHandle = (service_id: any, service_title: any) => {
    const duplicateService = service.findIndex((a) => a === service_title);
    if (duplicateService >= 0) {
      service.splice(duplicateService, 1);
      setService([...service]);
      requestServiceTask([...service]);
    } else {
      setService([...service, service_title]);
      requestServiceTask([...service, service_title]);
    }
  };

  const serviceTaskChangeHandle = (service_id: any, task_title: any) => {
    const duplicateServiceTask = serviceTasks.findIndex(
      (a) => a === task_title
    );
    if (duplicateServiceTask >= 0) {
      serviceTasks.splice(duplicateServiceTask, 1);
      setServiceTask([...serviceTasks]);
    } else {
      setServiceTask([...serviceTasks, task_title]);
    }
  };

  const requestServiceTask = (arg: any) => {
    serviceTask(arg.join(","))
      .then((res) => {
        setTaskTypes(res.data.selectedService);
      })
      .catch((err) => console.log(err, "get service task error"));
  };

  const selectTypeHandler = (type: string) => {
    setType(type);
  };

  const selectAccountTypeHandler = (type: string) => {
    setAccountType(type);
  };

  const worksHandler = (value: any) => {
    props.navigation.navigate("worksDetail");
  };

  console.log(taskTypes, "a");
  return (
    <Container style={styles.main}>
      <Content>
        <Formik
          initialValues={{
            name: value.name,
            mobileNo: value.mobileNo,
            clarify: value.clarify,
          }}
          validationSchema={workSchema}
          onSubmit={(values) => {
            worksHandler(values);
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
              <View style={[styles.row, { margin: 16, marginTop: 50 }]}>
                <Touchable
                  style={[
                    styles.container,
                    type === "work" && styles.selectedContainer,
                  ]}
                  onPress={() => selectTypeHandler("work")}
                >
                  <View style={styles.row}>
                    <View style={styles.checkBox}>
                      {type === "work" && <Image source={images.Selecting} />}
                    </View>
                    <Text
                      style={[
                        styles.label,
                        type === "work" && styles.selectedLabel,
                      ]}
                    >
                      Work
                    </Text>
                  </View>
                </Touchable>
                <Touchable
                  style={[
                    styles.container,
                    type === "driver" && styles.selectedContainer,
                  ]}
                  onPress={() => selectTypeHandler("driver")}
                >
                  <View style={styles.row}>
                    <View style={styles.checkBox}>
                      {type === "driver" && <Image source={images.Selecting} />}
                    </View>
                    <Text
                      style={[
                        styles.label,
                        type === "driver" && styles.selectedLabel,
                      ]}
                    >
                      Driver
                    </Text>
                  </View>
                </Touchable>
              </View>
              {type === "work" && (
                <View
                  style={[styles.row, { margin: 16, justifyContent: "center" }]}
                >
                  <Touchable
                    style={[
                      AccountType === "company" && styles.selectedContainer,
                      styles.accountType,
                    ]}
                    onPress={() => selectAccountTypeHandler("company")}
                  >
                    <View style={styles.row}>
                      <View style={styles.checkBox}>
                        {AccountType === "company" && (
                          <Image source={images.Selecting} />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.label,
                          AccountType === "company" && styles.selectedLabel,
                        ]}
                      >
                        Company
                      </Text>
                    </View>
                  </Touchable>
                  <Touchable
                    style={[
                      AccountType === "individual" && styles.selectedContainer,
                      styles.accountType,
                    ]}
                    onPress={() => selectAccountTypeHandler("individual")}
                  >
                    <View style={[styles.row, { margin: 16 }]}>
                      <View style={styles.checkBox}>
                        {AccountType === "individual" && (
                          <Image source={images.Selecting} />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.label,
                          AccountType === "individual" && styles.selectedLabel,
                        ]}
                      >
                        An Individual
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
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
              {type === "work" && (
                <View style={{ margin: 16 }}>
                  <Text style={styles.serviceText}>The areas i mastered</Text>
                  <View style={styles.mainContainer}>
                    {services.map((a) => {
                      return (
                        <Touchable
                          key={a.service_id.toString()}
                          style={[
                            styles.container,
                            service.find((s) => s === a.service_title) &&
                              styles.selectedContainer,
                          ]}
                          onPress={() =>
                            serviceChangeHandle(
                              a.service_id,
                              isRTL ? a.service_title_ar : a.service_title
                            )
                          }
                        >
                          <View style={styles.row}>
                            <View style={styles.checkBox}>
                              {service.find((s) => s === a.service_title) && (
                                <Image source={images.Selecting} />
                              )}
                            </View>
                            <Text
                              style={[
                                styles.label,
                                service.find((s) => s === a.service_title) &&
                                  styles.selectedLabel,
                              ]}
                            >
                              {isRTL ? a.service_title_ar : a.service_title}
                            </Text>
                          </View>
                        </Touchable>
                      );
                    })}
                  </View>
                </View>
              )}

              {!!taskTypes.length && type === "work" && (
                <View style={{ margin: 16 }}>
                  <Text style={styles.serviceText}>Select Services</Text>
                  <View style={styles.mainContainer}>
                    {taskTypes.map((p) =>
                      p.tasks.map((a: any) => {
                        return (
                          <Touchable
                            key={a.task_id.toString()}
                            style={[
                              styles.container,
                              serviceTasks.find((s) => s === a.task_title) &&
                                styles.selectedContainer,
                            ]}
                            onPress={() =>
                              serviceTaskChangeHandle(
                                a.task_id,
                                isRTL ? a.task_title_ar : a.task_title
                              )
                            }
                          >
                            <View style={styles.row}>
                              <View style={styles.checkBox}>
                                {serviceTasks.find(
                                  (s) => s === a.task_title
                                ) && <Image source={images.Selecting} />}
                              </View>
                              <Text
                                style={[
                                  styles.label,
                                  serviceTasks.find(
                                    (s) => s === a.task_title
                                  ) && styles.selectedLabel,
                                ]}
                              >
                                {isRTL ? a.service_title_ar : a.service_title}
                              </Text>
                              <Image
                                source={images.Arrow_Left}
                                style={{ marginLeft: 5 }}
                              />
                              <Text
                                style={[
                                  styles.label,
                                  styles.serviceLabel,
                                  serviceTasks.find(
                                    (s) => s === a.task_title
                                  ) && styles.selectedLabel,
                                ]}
                              >
                                {isRTL ? a.task_title_ar : a.task_title}
                              </Text>
                            </View>
                          </Touchable>
                        );
                      })
                    )}
                  </View>
                </View>
              )}

              <View style={{ marginBottom: 0 }}>
                <Input
                  style={[styles.inputType, { height: 80 }]}
                  multiline={true}
                  onChangeText={handleChange("clarify")}
                  onBlur={handleBlur("clarify")}
                  value={values.clarify}
                  message={errors.clarify}
                  error={touched.clarify && errors.clarify}
                  placeholder="Clarification"
                  borderRadius={20}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  title="Next"
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
  },
  mainContainer: {
    marginTop: 15,
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  container: {
    minHeight: 40,
    width: "45%",
    backgroundColor: colors.white,
    elevation: 5,
    justifyContent: "center",
    marginVertical: 7,
    marginHorizontal: 5,
    flexGrow: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  selectedContainer: {
    backgroundColor: colors.theme,
  },
  accountType: {
    borderRadius: 20,
    width: "45%",
    height: 40,
    flexGrow: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  selectedLabel: {
    color: colors.white,
  },
  countryContainer: {
    //margin: 16,
    //marginTop: 5,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 20,
  },
  selectType: {
    paddingLeft: 10,
    backgroundColor: colors.white,
    borderColor: colors.white,
    elevation: 5,
    borderRadius: 20,
    //borderWidth: 5,
    height: 45,
  },
  iconStyle: {
    right: 5,
    top: 10,
  },
  inputType: {
    padding: 10,
    margin: 16,
    marginBottom: 10,
    backgroundColor: colors.white,
    elevation: 5,
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    width: "85%",
    borderRadius: 20,
  },
  code: {
    alignSelf: "center",
    marginRight: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBox: {
    height: 22,
    width: 22,
    borderWidth: 1,
    borderRadius: 11,
    borderColor: colors.theme,
    backgroundColor: colors.white,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginLeft: 10,
    color: colors.black,
    fontFamily: "Lato-Regular",
  },
  serviceText: {
    fontSize: 16,
    fontFamily: "Lato-Bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  serviceLabel: {
    marginLeft: 3,
    textAlign: "center",
    flex: 1,
    flexWrap: "wrap",
  },
});
