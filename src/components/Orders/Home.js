import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NewOrders from "./NewOrders";
import DoneOrdersCard from "./DoneOrdersCard";
import OrderDetails from "./OrderDetails";

const Home = () => {
  const [isSelect, setIsSelect] = React.useState("new");

  return (
    <SafeAreaView className="w-full h-full justify-start pt-10 px-7 items-center bg-white">
      <View className="w-full h-10justify-center items-center">
        <Text
          className="text-blackColor text-xl"
          style={{ fontFamily: "CairoBold" }}
        >
          سجل الطلبات
        </Text>
      </View>
      <View className="w-full h-16 mt-4 justify-between items-center flex-row">
        <TouchableOpacity
          className="px-2 py-2 rounded-lg"
          onPress={() => setIsSelect("new")}
        >
          <Text
            className={`p-2 rounded-lg text-blackColor text-sm ${
              isSelect === "new" && "bg-mainColor text-white"
            }`}
            style={{ fontFamily: "Cairo" }}
          >
            الطلبات الجديدة
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsSelect("under")}>
          <Text
            className={`p-2 rounded-lg text-blackColor text-sm ${
              isSelect === "under" && "bg-mainColor text-white"
            }`}
            style={{ fontFamily: "Cairo" }}
          >
            قيد التجهيز
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsSelect("done")}>
          <Text
            className={`p-2 rounded-lg text-blackColor text-sm ${
              isSelect === "done" && "bg-mainColor text-white"
            }`}
            style={{ fontFamily: "Cairo" }}
          >
            المنجزة
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingVertical: 4,
        }}
        className="w-full h-full"
      >
        <View className="w-full h-full justify-center items-center">
          {isSelect === "new" && <NewOrders />}
          {isSelect === "done" && <DoneOrdersCard />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
