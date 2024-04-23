import { View, Text } from "react-native";
import React from "react";
import OrderCard from "../Home/OrderCard";
import { calcTotal } from "../../utilts/api";

const ProgressOrder = ({ orders }) => {
  return (
    <View className="w-full h-full items-center justify-center">
      {orders?.length > 0 ? (
        orders?.map((order) => (
          <OrderCard
            key={order.order_id}
            cardType="progress"
            order_id={order.order_id}
            c_name={order.user.fullname}
            c_phone={order.user.phone}
            total_price={calcTotal(order.orderItem)}
            note={order.note}
            items={order.orderItem}
          />
        ))
      ) : (
        <Text className="text-white">لا يوجد طلبيات قيد التنفيذ</Text>
      )}
    </View>
  );
};

export default ProgressOrder;
