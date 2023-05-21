import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NewOrders from "./NewOrders";
import DoneOrdersCard from "./DoneOrdersCard";
import ProgressOrder from "./ProgressOrder";
import axios from "axios";
import { api, token } from "../../utilts/api";
import { ArrowPathIcon } from "react-native-heroicons/solid";

const Home = () => {
  const [isSelect, setIsSelect] = useState("new");
  const [orders, setOrders] = useState();
  const [pendingOrders, setPendingOrders] = useState();
  const [doneOrders, setDoneOrders] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`${api}/manager/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const theOrders = data.data.orders.filter(
          (order) => order.status === "PENDING"
        );
        const progressOrders = data.data.orders.filter(
          (order) => order.status === "TAKENBYD" || order.status === "ACCEPTED"
        );
        const filterDoneOrders = data.data.orders.filter(
          (order) => order.status === "DELIVERED"
        );
        setOrders(progressOrders);
        setPendingOrders(theOrders);
        setDoneOrders(filterDoneOrders);
      })
      .catch((err) => {
        console.log("Error -->", err);
      });
  }, [refresh]);

  return (
    <SafeAreaView className="w-full h-full justify-start pt-10 px-7 items-center bg-white">
      <TouchableOpacity
        className="absolute bottom-6 left-5 z-50"
        onPress={() => setRefresh(!refresh)}
      >
        <ArrowPathIcon size={26} fill="gray" />
      </TouchableOpacity>
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
          {isSelect === "new" && (
            <NewOrders
              pendingOrders={pendingOrders}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
          {isSelect === "done" && <DoneOrdersCard doneOrders={doneOrders} />}
          {isSelect === "under" && <ProgressOrder orders={orders} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;