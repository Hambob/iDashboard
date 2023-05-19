import { View, Text, Image, Switch, TouchableOpacity } from "react-native";
import { PencilIcon, TrashIcon } from "react-native-heroicons/solid";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { imgUrl } from "../../utilts/api";
import FastImage from "react-native-fast-image";

const DishRow = ({ setShowDelete, dish, setDishId }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("/edit", {
              name: dish.name,
              price: dish.price,
              category: dish,
            })
          }
        >
          <PencilIcon size={26} fill="#34495E" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowDelete(true);
            setDishId(dish.dish_id);
          }}
        >
          <TrashIcon size={26} fill="#E74C3C" />
        </TouchableOpacity>
      </View>
      <View className="w-1/3 h-full justify-end items-center flex-row">
        <View className="mr-2 gap-2">
          <Text className="text-grayDarkColor" style={{ fontFamily: "Cairo" }}>
            {dish.name}
          </Text>
          <Text
            className="text-grayDarkColor text-xs"
            style={{ fontFamily: "Cairo" }}
          >
            {dish.price} د.ل
          </Text>
        </View>
        {/* <FastImage
          className="w-44 h-44 rounded-full mb-10"
          source={{ uri: `${imgUrl}/images/${dish.img}` }}
          resizeMode={FastImage.resizeMode.contain}
        /> */}
        <Image
          className="w-12  h-12 rounded-full"
          style={{ borderWidth: 1, borderColor: "#FFF" }}
          source={{ uri: `${imgUrl}/${dish.img}` }}
        />
      </View>
    </View>
  );
};

export default DishRow;
