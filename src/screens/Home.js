import { Alert, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MyTabs from "../components/MyTabs";
import axios from "axios";
import { api } from "../utilts/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { useNotifications } from "../hooks/useNotifications";

const Home = () => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [data, setData] = useState({});
  const navigation = useNavigation();
  useEffect(() => {
    const { registerForPushNotificationsAsync, allowsNotificationsAsync } =
      useNotifications();

    allowsNotificationsAsync();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    AsyncStorage.getItem("token").then((token) => {
      registerForPushNotificationsAsync().then((device_token) => {
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

    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     setNotification(notification);
    //     setData(notification.request.content.data);
    //     console.log("Notification -->", notification.request.content);
    //   });

    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     Alert.alert("تحقق منهم");
    //   });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <View className="w-full h-full bg-white">
      <MyTabs />
    </View>
  );
};

export default Home;
