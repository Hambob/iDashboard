import { View, Text, Switch, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "./Home/OrderCard";
import OrderDetails from "../components/Home/OrderDetails";
import { ArrowPathIcon } from "react-native-heroicons/solid";
import axios from "axios";
import { api, calcTotal } from "../utilts/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

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
  const [isEnabled, setIsEnabled] = useState();
  const [token, setToken] = useState("");

  const showingRestaurantToast = (msg) => {
    Toast.show({
      type: "success",
      text1: msg,
      position: "bottom",
      autoHide: true,
      visibilityTime: 1000,
    });
  };

  const toastNotificationMsg = (status) => {
    switch (status) {
      case "OPEN":
        return "تم فتح المطعم";
      case "CLOSED":
        return "تم إغلاق المطعم";
      default:
        return "تم إغلاق المطعم";
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      setToken(token);
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
          setPendingOrders(theOrders);
        })
        .catch((err) => {
          console.log("Error -->", err);
        });

      axios
        .get(`${api}/restaurant/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsEnabled(res.data.status.status === "OPEN" ? true : false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [refresh]);

  const toggleSwitch = () => {
    const status = isEnabled ? "CLOSE" : "OPEN";
    axios
      .patch(
        `${api}/manager/restaurants/update`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setRefresh(!refresh);
        showingRestaurantToast(toastNotificationMsg(status));
        setIsEnabled(!isEnabled);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView className="w-full h-full bg-white">
      {/* <Toast config={toastConfig} /> */}
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
          <ArrowPathIcon size={20} fill="gray" />
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
          {pendingOrders?.length > 0 ? (
            pendingOrders?.map((order) => (
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
            ))
          ) : (
            <View className="w-full h-96 justify-center items-center">
              <Text
                style={{ fontFamily: "Cairo" }}
                className="text-2xl text-grayDarkColor"
              >
                لا يوجد طلبات
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreem;
