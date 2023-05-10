import { View, Text } from "react-native";
import React from "react";
import OrderCard from "../Home/OrderCard";

const ProgressOrder = () => {
  return (
    <View className="w-full h-full items-center justify-center">
      <OrderCard cardType="progress" />
    </View>
  );
};

export default ProgressOrder;
