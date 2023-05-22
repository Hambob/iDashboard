import { View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MyTabs from "../components/MyTabs";
import axios from "axios";
import { api } from "../utilts/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      enableVibrate: true,
      sound: "default",
    });
  }

  return token;
}

const Home = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    console.log("Im here");
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
