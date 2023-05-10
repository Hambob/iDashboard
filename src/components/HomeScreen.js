import { View, Text, Switch, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "./Home/OrderCard";
import OrderDetails from "../components/Home/OrderDetails";
import { ArrowPathIcon } from "react-native-heroicons/solid";
import axios from "axios";
import { api, token } from "../utilts/api";

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
  const [orders, setOrders] = useState();
  const [pendingOrders, setPendingOrders] = useState();
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios
      .get(`${api}/manager/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setOrders(data.data.orders);
        const theOrders = data.data.orders.filter(
          (order) => order.status === "PENDING"
        );
        console.log("--->", theOrders);
        setPendingOrders(theOrders);
      })
      .catch((err) => {
        console.log("Error -->", err);
      });
  }, [refresh]);

  const calcTotal = (items) => {
    let total = 0;
    items.map((item) => {
      total += item.price;
    });
    return total;
  };
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
      <View className="w-full h-12 flex-row justify-between items-center px-6 mt-4">
        <TouchableOpacity onPress={() => setRefresh(!refresh)}>
          <ArrowPathIcon size={20} fill="#FFF" />
        </TouchableOpacity>
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
          {pendingOrders?.map((order) => (
            <OrderCard
              c_name={order.user.fullname}
              total_price={calcTotal(order.orderItem)}
              key={order.order_id}
              order_id={order.order_id}
              cardType="new"
              note={order.note}
              items={order.orderItem}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreem;
