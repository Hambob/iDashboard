import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { event } from "../../event";

const OrderCard = ({
  cardType,
  order_id,
  c_name,
  total_price,
  note,
  items,
  setRefresh,
  refresh,
  c_phone,
  orderType,
  service_fee,
}) => {
  const navigation = useNavigation();
  const setRefreshAction = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    event.on("setRefresh", setRefreshAction);
    return () => {
      event.off("setRefresh", setRefreshAction);
    };
  }, [setRefreshAction]);
  return (
    <View
      className={`w-[90%] h-32 mt-4 flex-row ${
        orderType === "delivery" ? "bg-mainColor" : "bg-grayDarkColor"
      } rounded-xl`}
    >
      <View className="w-1/2 h-full justify-center items-center">
        {orderType === "personal" && (
          <Text className="absolute text-xs bottom-0 px-2 py-1 bg-blueColor left-0 rounded-xl text-white font-Cairo">
            إستلام شخصــي
          </Text>
        )}

        <TouchableOpacity
          className="px-4 py-2 bg-secondColor rounded-lg"
          onPress={() => {
            if (cardType === "progress") {
              navigation.navigate("/progress-details", {
                doneOrder: false,
                order_id,
                c_name,
                total_price,
                note,
                items,
                c_phone,
                service_fee,
                orderType,
                setRefreshEvent: "setRefresh",
              });
            } else {
              navigation.navigate("/new-details", {
                order_id,
                c_name,
                total_price,
                note,
                items,
                c_phone,
                setRefreshEvent: "setRefresh",
                service_fee,
                orderType,
              });
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
          الطلبية : <Text className="text-white">{order_id}</Text>
        </Text>
        <Text
          className="text-textColor text-xs"
          style={{ fontFamily: "Cairo" }}
        >
          الزبون : <Text className="text-white">{c_name}</Text>
        </Text>
        <Text
          className="text-textColor text-xs"
          style={{ fontFamily: "Cairo" }}
        >
          إجمالي السعر : <Text className="text-white">{total_price} د.ل</Text>
        </Text>
      </View>
    </View>
  );
};

export default OrderCard;
