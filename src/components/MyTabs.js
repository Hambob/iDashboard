import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import {
  HomeIcon,
  Bars4Icon,
  Cog8ToothIcon,
  CircleStackIcon,
  TruckIcon,
} from "react-native-heroicons/solid";
import Orders from "./Orders";
import Dishes from "./Dishes";
import Toast from "react-native-toast-message";
import { toastConfig } from "../utilts/toastNotification";
import RequestDriver from "./RequestDriver";

const MyTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              borderBottomWidth: 0,
              borderTopColor: "#37BD6B",
              height: 78,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              fontFamily: "Cairo",
            },
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#2d3436",
          }}
        >
          <Tab.Screen
            name="الرئسية"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => <HomeIcon size={32} fill="#95A5A6" />,
            }}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: () => <Cog8ToothIcon size={32} fill="#95A5A6" />,
            }}
            name="الإعدادات"
            component={SettingsScreen}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: () => <CircleStackIcon size={32} fill="#95A5A6" />,
            }}
            name="الأطباق"
            component={Dishes}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: () => <Bars4Icon size={32} fill="#95A5A6" />,
            }}
            name="الطلبات"
            component={Orders}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: () => <TruckIcon size={32} fill="#95A5A6" />,
            }}
            name="طلب سائق"
            component={RequestDriver}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default MyTabs;
