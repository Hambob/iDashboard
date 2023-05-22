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
} from "react-native-heroicons/solid";
import Orders from "./Orders";
import Dishes from "./Dishes";

const MyTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderBottomWidth: 0,
            borderTopColor: "#37BD6B",
            height: 60,
          },
          tabBarActiveTintColor: "#37BD6B",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Cairo",
          },
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyTabs;
