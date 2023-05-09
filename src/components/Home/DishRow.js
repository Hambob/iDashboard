import { View, Text, Image, Switch, TouchableOpacity } from "react-native";
import { PencilIcon, TrashIcon } from "react-native-heroicons/solid";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const DishRow = ({ setShowDelete }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    console.log(isEnabled);
  };
  const navigation = useNavigation();
  return (
    <View className="w-full h-24 rounded-lg bg-grayColor justify-center mt-4 items-center flex-row px-4">
      <View className="flex-1 h-full flex-row  gap-4 items-center">
        <Switch
          trackColor={{ false: "#FFF", true: "#FFF" }}
          thumbColor={isEnabled ? "#34495E" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("/edit")}>
          <PencilIcon size={26} fill="#34495E" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDelete(true)}>
          <TrashIcon size={26} fill="#E74C3C" />
        </TouchableOpacity>
      </View>
      <View className="w-1/3 h-full justify-end items-center flex-row">
        <View className="mr-2 gap-2">
          <Text className="text-grayDarkColor" style={{ fontFamily: "Cairo" }}>
            شاورما عربي
          </Text>
          <Text
            className="text-grayDarkColor text-xs"
            style={{ fontFamily: "Cairo" }}
          >
            700 د.ل
          </Text>
        </View>
        <Image
          className="w-12 h-12 rounded-full"
          style={{ borderWidth: 1, borderColor: "#FFF" }}
          source={require("../../../assets/test.jpeg")}
        />
      </View>
    </View>
  );
};

export default DishRow;