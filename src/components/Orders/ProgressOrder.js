import { View, Text } from "react-native";
import React from "react";
import OrderCard from "../Home/OrderCard";
import { calcTotal } from "../../utilts/api";

const ProgressOrder = ({ orders }) => {
  return (
    <View className="w-full h-full items-center justify-center">
      {orders?.map((order) => (
        <OrderCard
          key={order.order_id}
          cardType="progress"
          order_id={order.order_id}
          c_name={order.user.fullname}
          total_price={calcTotal(order.orderItem)}
          note={order.note}
          items={order.orderItem}
        />
      ))}
    </View>
  );
};

export default ProgressOrder;
