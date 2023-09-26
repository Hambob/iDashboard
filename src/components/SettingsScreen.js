import { Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { event } from "../event";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api_call from "../utilts/interceptor";
import Loading from "./Loading";

const SettingsScreen = () => {
  const [showLoading, setShowLoading] = React.useState(true);
  const [name, setName] = React.useState("");
  useEffect(() => {
    api_call.get(`/manager/profile`).then((res) => {
      setName(res.data.restaurantManager.name);
    });
    setShowLoading(false);
  }, []);
  return (
    <SafeAreaView className="w-full h-full gap-2 relative justify-around items-center bg-white">
      {showLoading && <Loading />}
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
          تسجيل الخروج
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SettingsScreen;
