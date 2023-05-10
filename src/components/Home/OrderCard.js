import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OrderCard = ({ cardType }) => {
  const navigation = useNavigation();
  return (
    <View className="w-[90%] h-32 mt-4 flex-row bg-mainColor rounded-xl">
      <View className="w-1/2 h-full justify-center items-center">
        <TouchableOpacity
          className="px-4 py-2 bg-secondColor rounded-lg"
          onPress={() => {
            if (cardType === "progress") {
              navigation.navigate("/progress-details", { doneOrder: false });
            } else {
              navigation.navigate("/new-details");
            }
          }}
        >
          <Text className="text-white" style={{ fontFamily: "Cairo" }}>
            عرض الطلبية
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-1/2 h-ful gap-4 justify-center items-center">
        <Text
          className="text-textColor text-xs"
          style={{ fontFamily: "Cairo" }}
        >
          الطلبية : <Text className="text-white">000754</Text>
        </Text>
        <Text
          className="text-textColor text-xs"
          style={{ fontFamily: "Cairo" }}
        >
          الزبون : <Text className="text-white">علي محمد</Text>
        </Text>
        <Text
          className="text-textColor text-xs"
          style={{ fontFamily: "Cairo" }}
        >
          إجمالي السعر : <Text className="text-white">700 د.ل</Text>
        </Text>
      </View>
    </View>
  );
};

export default OrderCard;
