import { View, Text, Switch, ScrollView } from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "./Home/OrderCard";
import OrderDetails from "../components/Home/OrderDetails";
const Stack = createStackNavigator();

const HomeScreem = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="/"
        component={ViewOrders}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="/new-details"
        component={OrderDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const ViewOrders = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    console.log(isEnabled);
  };
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <View className="w-full h-16 bg-mainColor flex-row justify-between px-6 items-center">
        <Switch
          trackColor={{ false: "#FFF", true: "#FFF" }}
          thumbColor={isEnabled ? "#FEAC56" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
        <Text className="text-white text-sm" style={{ fontFamily: "Cairo" }}>
          حالة المطعم
        </Text>
      </View>
      <View className="w-full h-12 justify-end items-end px-6 mt-4">
        <Text className="text-xl border-b w-36" style={{ fontFamily: "Cairo" }}>
          الطلبات الواردة
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        <View className="w-full py-4 justify-center items-center">
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreem;
