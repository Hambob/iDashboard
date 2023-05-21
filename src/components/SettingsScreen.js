import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  return (
    <SafeAreaView className="w-full h-full gap-2 justify-around items-center bg-white">
      <Text style={{ fontFamily: "Cairo", fontSize: 27 }}>حمزة أبوقرين</Text>
      <Pressable className="px-4 py-2 rounded-lg bg-red-700">
        <Text
          style={{
            fontFamily: "Cairo",
            fontSize: 20,
          }}
        >
          تسحيل الخروج
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SettingsScreen;
