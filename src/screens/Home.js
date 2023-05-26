import { View } from "react-native";
import React, { useEffect } from "react";
import MyTabs from "../components/MyTabs";
import axios from "axios";
import { api } from "../utilts/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../hooks/useNotifications";

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
    AsyncStorage.getItem("token").then((token) => {
      console.log("Token", token);
      registerForPushNotificationsAsync()
        .then((device_token) => {
          console.log("-->", device_token);
          axios
            .patch(
              `${api}/restaurant-manager/edit`,
              {
                device_token: device_token,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log("Updated");
            })
            .catch((err) => {
              console.log("Not updated", err);
            });
        })
        .catch((err) => {
          console.log("Register Token error", err);
        });
    });
  }, []);
  return (
    <View className="w-full h-full bg-white">
      <MyTabs />
    </View>
  );
};

export default Home;
