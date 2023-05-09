import { View, Text } from "react-native";
import React from "react";
import MyTabs from "../components/MyTabs";
import OrderDetails from "../components/Home/OrderDetails";
import Add from "../components/Dish/Add";

const Home = () => {
  return (
    <View className="w-full h-full bg-white">
      <MyTabs />
    </View>
  );
};

export default Home;
