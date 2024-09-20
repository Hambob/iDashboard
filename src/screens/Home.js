import { View } from "react-native";
import React, { useEffect } from "react";
import MyTabs from "../components/MyTabs";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../hooks/useNotifications";
import api_call from "../utilts/interceptor";
import * as Device from "expo-device";

const Home = () => {
  useEffect(() => {
    const { registerForPushNotificationsAsync } = useNotifications();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    registerForPushNotificationsAsync()
      .then(async (device_token) => {
        console.log("Device Token: ", Device.modelName, device_token);
        await api_call.post("/restaurant-manager/devices", {
          device_token: device_token,
          device_model: Device.modelName,
        });
      })
      .catch((err) => {
        console.log("Register Token error");
      });
  }, [1]);
  return (
    <View className="w-full h-full bg-white">
      <MyTabs />
    </View>
  );
};

export default Home;
