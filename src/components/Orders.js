import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Orders/Home";
import OrderDetailsFromHome from "./Home/OrderDetails";
import OrderDetails from "./Orders/OrderDetails";

const Orders = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="/"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="/new-details"
        component={OrderDetailsFromHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="/progress-details"
        component={OrderDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Orders;
