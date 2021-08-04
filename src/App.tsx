import React, { useEffect, useState, createContext, useContext } from "react";
import { Image, I18nManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "./Screen/Dashboard";
import Maintenance from "./Screen/Services/Maintenance";
//import OrderTracking from './Screen/Services/OrderTracking';
import Login from "./Screen/Auth/Login";
import Signup from "./Screen/Auth/Signup";
import ServiceScreen from "./Screen/Services/Service";
import ServiceDetails from "./Screen/Services/ServiceDetails";
import OrderTracking from "./Screen/OrderTracking";
import Works from "./Screen/Works";
import WorksDetails from "./Screen/WorksDetails";
import LeftDrawer from "./Components/Drawer";
import { colors, images } from "./themes/variables";
import Touchable from "./Components/Touchable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthLoading from "./Screen/AuthLoading";
import SplashScreen from "react-native-splash-screen";
import I18n from "./i18n";
import RightAppMenuList from "./Components/CustomDrawer";
import CustomDrawer from "./Components/CustomDrawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Auth = createStackNavigator();

const AuthScreen = (props: any) => {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="login"
        component={Login}
        options={{ headerTransparent: true, headerShown: false }}
      />
      <Auth.Screen
        name="signup"
        component={Signup}
        options={{ headerTransparent: true, headerShown: false }}
      />
      <Auth.Screen
        name="works"
        component={Works}
        options={{ headerTransparent: true, headerShown: false }}
      />
      <Auth.Screen
        name="worksDetail"
        component={WorksDetails}
        options={{ headerTransparent: true, headerShown: false }}
      />
    </Auth.Navigator>
  );
};

const LeftDrawerButton = (props: any) => {
  return (
    <Touchable onPress={() => props.navigation.toggleDrawer()}>
      <Image source={images.Menu} style={{ marginLeft: 10 }} />
    </Touchable>
    // <Touchable>
    //   <Image source={images.Menu} style={{ marginLeft: 10 }} />
    // </Touchable>
  );
};
const handlePerss = (props: any) => {
  console.log("clicked");
};
const stackScreen = (props: any) => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
      title: "Maintenance & Services",
      headerTintColor: colors.theme,
      headerStyle: {
        elevation: 0,
        backgroundColor: "rgba(255, 89, 0, 0.1)",
      },
      headerTitleStyle: {
        fontSize: 16,
        fontFamily: "Lato-Bold",
      },

      //headerLeft: () => <LeftDrawer navigation={props.navigation} />,
      headerLeft: () => <LeftDrawerButton navigation={props.navigation} />,
      headerRight: () => (
        <Image
          source={images.Logo}
          style={{ marginRight: 20, height: 40, width: 70 }}
        />
      ),
    }}
  >
    <Stack.Screen name="Dashboard" component={Dashboard} />
    {/* <Stack.Screen name="Maintenance" component={Maintenance} /> */}
    <Stack.Screen name="orderTracking" component={OrderTracking} />
    <Stack.Screen name="Service" component={ServiceScreen} />
    <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
  </Stack.Navigator>
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Services" component={stackScreen} />
    </Drawer.Navigator>
  );
};

export default function App(props: any) {
  const [token, setToken] = useState<string | null>(null);
  const handlePerss = () => {
    props.navigation.navigate("RightAppMenuList");
  };
  useEffect(() => {
    //bootstrapAsync();
  }, [token]);

  // useEffect(() => {
  //   SplashScreen.hide();
  // }, [])

  const bootstrapAsync = async () => {
    AsyncStorage.getItem("language").then((val) => {
      if (val !== null) I18n.locale = val;
    });
    const userToken = await AsyncStorage.getItem("login");
    const user = JSON.parse(userToken as string);
    setToken(user ? user?.token : null);
  };

  // if (token === null) {
  //   return <AuthLoading />;
  // }

  return (
    //<Signup />
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerTitleAlign: "center",
    //       title: "Maintenance & Services",
    //       headerTintColor: colors.theme,
    //       headerStyle: {
    //         elevation: 0,
    //         backgroundColor: "rgba(255, 89, 0, 0.1)",
    //       },
    //       headerTitleStyle: {
    //         fontSize: 16,
    //         fontFamily: "Lato-Bold",
    //       },
    //       headerLeft: () => <CustomDrawer />,
    //       headerRight: () => (
    //         <Image
    //           source={images.Logo}
    //           style={{ marginRight: 20, height: 40, width: 70 }}
    //         />
    //       ),
    //     }}
    //   >
    //     <Stack.Screen name="Dashboard" component={Dashboard} />
    //     <Stack.Screen name="Maintenance" component={Maintenance} />
    //     <Stack.Screen name="orderTracking" component={OrderTracking} />
    //     <Stack.Screen name="Service" component={ServiceScreen} />
    //     <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
    //     <Stack.Screen name="RightAppMenuList" component={RightAppMenuList} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Drawer.Navigator
        independent={true}
        drawerType={"slide"}
        initialRouteName="stackScreen"
        drawerContent={(props) => <LeftDrawer {...props} />}
      >
        <Drawer.Screen name="DashBoard" component={stackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
