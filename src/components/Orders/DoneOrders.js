import { View } from "react-native";
import React from "react";
import DoneOrdersCard from "./DoneOrdersCard";

const DoneOrders = () => {
  return (
    <View className="w-full h-full justify-center items-center">
      <DoneOrdersCard />
    </View>
  );
};

export default DoneOrders;
