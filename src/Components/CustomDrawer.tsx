import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RightAppMenus from "./Drawer";
import Works from "../Screen/Works";

const CustomDrawer = createDrawerNavigator();

const RightAppMenuList = () => (
  <NavigationContainer independent={true}>
    <CustomDrawer.Navigator
      drawerType={"slide"}
      initialRouteName="Works"
      drawerContent={(props) => <RightAppMenus {...props} />}
    >
      <CustomDrawer.Screen name="works" component={Works} />
    </CustomDrawer.Navigator>
  </NavigationContainer>
);

export default RightAppMenuList;
