import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressOrder from "./ProgressOrder";
import { ArrowPathIcon } from "react-native-heroicons/solid";
import api_call from "../../utilts/interceptor";
import OrderCard from "../Home/OrderCard";
import { calcTotal } from "../../utilts/api";

const Home = () => {
  const [orders, setOrders] = useState();
  const [inProgressPersonalOrders, setInProgressPersonalOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api_call.get(`/manager/orders`).then((data) => {
      const progressOrders = data.data.orders.filter(
        (order) => order.status === "TAKENBYD" || order.status === "ACCEPTED"
      );
      setOrders(progressOrders);

      api_call.get("manager/personal-order/ACCEPTED").then((data) => {
        setInProgressPersonalOrders(data.data.orders);
      });
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
          الطلبات قيد التجهيز
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingVertical: 4,
        }}
        className="w-full h-full"
      >
        <View className="w-full h-full justify-center items-center mt-2">
          {inProgressPersonalOrders?.map((order) => (
            <OrderCard
              c_name={order.user.fullname}
              c_phone={order.user.phone}
              total_price={calcTotal(order.orderItem)}
              key={order.id}
              order_id={order.id}
              cardType="progress"
              orderType="personal"
              note={order.note}
              items={order.orderItem}
              setRefresh={setRefresh}
              service_fee={order.service_fee}
              refresh={refresh}
            />
          ))}

          {orders?.map((order) => (
            <OrderCard
              c_name={order.user.fullname}
              c_phone={order.user.phone}
              total_price={calcTotal(order.orderItem)}
              key={order.order_id}
              order_id={order.order_id}
              cardType="progress"
              note={order.note}
              items={order.orderItem}
              setRefresh={setRefresh}
              service_fee={0}
              refresh={refresh}
              orderType="delivery"
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
