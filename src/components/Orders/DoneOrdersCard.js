import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { calcTotal } from "../../utilts/api";

const DoneOrdersCard = ({ doneOrders }) => {
  const navigation = useNavigation();
  return (
    <>
      {doneOrders?.length > 0 ? (
        doneOrders?.map((order) => (
          <View
            className="w-[90%] h-32 mt-4 flex-row bg-bgGray rounded-xl"
            key={order.order_id}
          >
            <View className="w-1/2 h-full justify-center items-center">
              <TouchableOpacity
                className="px-4 py-2 bg-white rounded-lg"
                onPress={() =>
                  navigation.navigate("/done-details", {
                    doneOrder: true,
                    c_name: order?.user.fullname,
                    order_id: order.order_id,
                    note: order.note,
                    total_price: calcTotal(order.orderItem),
                    items: order.orderItem,
                  })
                }
              >
                <Text
                  className="text-blackColor"
                  style={{ fontFamily: "Cairo" }}
                >
                  عرض الطلبية
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-1/2 h-ful gap-4 justify-center items-center">
              <Text
                className="text-textColor text-xs"
                style={{ fontFamily: "Cairo" }}
              >
                الطلبية : <Text className="text-white">{order.order_id}</Text>
              </Text>
              <Text
                className="text-textColor text-xs"
                style={{ fontFamily: "Cairo" }}
              >
                الزبون :{" "}
                <Text className="text-white">{order?.user.fullname}</Text>
              </Text>
              <Text
                className="text-textColor text-xs"
                style={{ fontFamily: "Cairo" }}
              >
                إجمالي السعر :{" "}
                <Text className="text-white">
                  {calcTotal(order.orderItem)} د.ل
                </Text>
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text className="text-white">لا يوجد طلبات منجزة</Text>
      )}
    </>
  );
};

export default DoneOrdersCard;
