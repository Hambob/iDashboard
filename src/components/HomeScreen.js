import { View, Text, Switch, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "./Home/OrderCard";
import OrderDetails from "./Home/OrderDetails";

const HomeScreem = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    console.log(isEnabled);
  };
  if (showOrderDetails) {
    return <OrderDetails setShowOrderDetails={setShowOrderDetails} />;
  }
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
          <OrderCard setShowOrderDetails={setShowOrderDetails} />
          <OrderCard setShowOrderDetails={setShowOrderDetails} />
          <OrderCard setShowOrderDetails={setShowOrderDetails} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreem;
