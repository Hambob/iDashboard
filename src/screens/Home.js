import { View } from "react-native";
import React, { useEffect } from "react";
import MyTabs from "../components/MyTabs";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../hooks/useNotifications";
import api_call from "../utilts/interceptor";

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
      .then((device_token) => {
        api_call
          .patch(`/restaurant-manager/edit`, {
            device_token: device_token,
          })
          .catch((err) => {
            console.log("Not updated", err);
          });
      })
      .catch((err) => {
        console.log("Register Token error", err);
      });
  }, [1]);
  return (
    <View className="w-full h-full bg-white">
      <MyTabs />
    </View>
  );
};

export default Home;
