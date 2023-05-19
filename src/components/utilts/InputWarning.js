import { View, Text } from "react-native";
import React from "react";

export default function InputWarning({ message, type }) {
  return (
    <>
      <Text
        className={`text-xs ${
          type == "error" ? "text-red-700" : "text-orange-400"
        }`}
        style={{
          fontFamily: "Cairo",
        }}
      >
        {message}
      </Text>
    </>
  );
}
