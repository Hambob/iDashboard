import { View } from "react-native";
import { CircleSnail } from "react-native-progress";
import React from "react";

const Loading = () => {
  return (
    <View className="w-full h-full  absolute top-0 z-50 justify-center items-center">
      <CircleSnail color="#37BD6B" size={90} progress={1} className="ml-4" />
    </View>
  );
};

export default Loading;
