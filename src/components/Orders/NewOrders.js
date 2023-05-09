import { View, Text } from "react-native";
import React from "react";
import OrderCard from "../Home/OrderCard";

const NewOrders = () => {
  return (
    <View className="w-full h-full items-center justify-center">
      <OrderCard />
      <OrderCard />
    </View>
  );
};

export default NewOrders;
