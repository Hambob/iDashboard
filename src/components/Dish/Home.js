import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlusIcon } from "react-native-heroicons/solid";
import React, { useEffect } from "react";
import DishRow from "../Home/DishRow";
import { useNavigation } from "@react-navigation/native";
import DeletePopUp from "./DeletePopUp";
import axios from "axios";
import { api, token } from "../../utilts/api";
const Home = () => {
  const navigation = useNavigation();
  const [showDelete, setShowDelete] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [dishes, setDishes] = React.useState();
  const [dishId, setDishId] = React.useState();

  useEffect(() => {
    axios
      .get(`${api}/restaurant/dishes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setDishes(data.data.data);
      })
      .catch((err) => {
        console.log("Error -->", err);
      });
  }, [refresh]);
  return (
    <SafeAreaView className="w-full h-full relative bg-white px-4 py-6 pt-10">
      {showDelete && (
        <DeletePopUp
          dishId={dishId}
          setRefresh={setRefresh}
          refresh={refresh}
          setShowDelete={setShowDelete}
        />
      )}

      <Text className="text-lg" style={{ fontFamily: "CairoBold" }}>
        الأطباق
      </Text>
      <ScrollView
        className="w-full"
        contentContainerStyle={{
          paddingVertical: 10,
        }}
      >
        <View className="flex-1">
          {dishes?.map((dish) => (
            <DishRow
              key={dish.dish_id}
              setShowDelete={setShowDelete}
              dish={dish}
              setRefresh={setRefresh}
              refresh={refresh}
              setDishId={setDishId}
            />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("/add")}
        className="w-16 h-16 rounded-full mt-4 bg-mainColor justify-center items-center"
      >
        <PlusIcon size={50} fill="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
