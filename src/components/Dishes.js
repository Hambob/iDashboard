import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Dish/Home";
import Add from "./Dish/Add";
import Edit from "./Dish/Edit";

const Stack = createStackNavigator();

const Dishes = () => {
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
        name="/add"
        component={Add}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="/edit"
        component={Edit}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Dishes;
