import { View, Text } from "react-native";
import React from "react";
import OrderCard from "../Home/OrderCard";
import { calcTotal } from "../../utilts/api";

const NewOrders = ({ pendingOrders, refresh, setRefresh }) => {
  return (
    <View className="w-full h-full items-center justify-center">
      {pendingOrders?.length > 0 ? (
        pendingOrders?.map((order) => (
          <OrderCard
            c_name={order.user.fullname}
            total_price={calcTotal(order.orderItem)}
            key={order.order_id}
            order_id={order.order_id}
            cardType="new"
            note={order.note}
            items={order.orderItem}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        ))
      ) : (
        <Text>لا توجد طلبات جديدة</Text>
      )}
    </View>
  );
};

export default NewOrders;
