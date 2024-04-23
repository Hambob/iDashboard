import { View, Text, Switch, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "./Home/OrderCard";
import OrderDetails from "../components/Home/OrderDetails";
import { ArrowPathIcon } from "react-native-heroicons/solid";
import { calcTotal } from "../utilts/api";
import Toast from "react-native-toast-message";
import api_call from "../utilts/interceptor";

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
    api_call.get(`/manager/orders`).then((data) => {
      setOrders(data.data.orders);
      const theOrders = data.data.orders.filter(
        (order) => order.status === "PENDING"
      );
      setPendingOrders(theOrders);
    });

    api_call.get(`/restaurant/status`).then((res) => {
      setIsEnabled(res.data.status.status === "OPEN" ? true : false);
    });
  }, [refresh]);

  const toggleSwitch = async () => {
    const status = isEnabled ? "CLOSE" : "OPEN";
    await api_call.patch(`/manager/restaurants/update`, {
      status,
    });
    setRefresh(!refresh);
    showingRestaurantToast(toastNotificationMsg(status));
    setIsEnabled(!isEnabled);
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
        <View className="w-full py justify-center items-center">
          {pendingOrders?.length > 0 ? (
            pendingOrders?.map((order) => (
              <OrderCard
                c_name={order.user.fullname}
                c_phone={order.user.phone}
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
