import { View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MyTabs from "../components/MyTabs";
import axios from "axios";
import { api } from "../utilts/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utilts/notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Home = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      registerForPushNotificationsAsync().then((device_token) => {
        setExpoPushToken(device_token);
        console.log("Device Token", device_token);
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
            console.log(err);
          });
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
