import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { event } from "../event";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from "react-native-progress";
import axios from "axios";
import { api } from "../utilts/api";

const SettingsScreen = () => {
  const [showLoading, setShowLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      axios
        .get(`${api}/manager/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setName(res.data.restaurantManager.name);
        });
    }, []);
  }, []);
  return (
    <SafeAreaView className="w-full h-full gap-2 relative justify-around items-center bg-white">
      {showLoading && (
        <View className="w-full h-full  absolute top-0 z-50 justify-center items-center">
          <Progress.CircleSnail
            color="#37BD6B"
            size={90}
            progress={1}
            className="ml-4"
          />
        </View>
      )}
      <Text style={{ fontFamily: "Cairo", fontSize: 27 }}>{name}</Text>
      <Pressable
        className="px-4 py-2 rounded-lg bg-red-700"
        onPress={() => {
          setShowLoading(true);
          AsyncStorage.clear();
          setShowLoading(false);
          event.emit("renderAgain");
        }}
      >
        <Text
          style={{
            fontFamily: "Cairo",
            fontSize: 20,
            color: "#FFF",
          }}
        >
          تسحيل الخروج
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SettingsScreen;
