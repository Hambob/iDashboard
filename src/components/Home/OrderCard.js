import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const OrderCard = () => {
  return (
    <View className="w-[90%] h-32 mt-4 flex-row bg-mainColor rounded-xl">
      <View className="w-1/2 h-full justify-center items-center">
        <TouchableOpacity className="px-4 py-2 bg-secondColor rounded-lg">
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
