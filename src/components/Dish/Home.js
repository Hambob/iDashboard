import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlusIcon } from "react-native-heroicons/solid";
import React, { useEffect } from "react";
import DishRow from "../Home/DishRow";
import { useNavigation } from "@react-navigation/native";
import DeletePopUp from "./DeletePopUp";
import { event } from "../../event";
import Toast from "react-native-toast-message";
import api_call from "../../utilts/interceptor";
import Loading from "../Loading";

const Home = () => {
  const navigation = useNavigation();
  const [showDelete, setShowDelete] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [dishes, setDishes] = React.useState();
  const [dishId, setDishId] = React.useState();
  const [showLoading, setShowLoading] = React.useState(false);

  const secondToastShow = (msg) => {
    Toast.show({
      type: "success",
      text1: msg,
      position: "bottom",
      autoHide: true,
      visibilityTime: 1000,
    });
  };

  const setRefreshAction = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    setShowLoading(true);
    api_call
      .get(`/restaurant/dishes`)
      .then((data) => {
        setDishes(data.data.data);
        setShowLoading(false);
      })
      .catch((err) => {
        setShowLoading(false);
      });

    event.on("setRefresh", setRefreshAction);
    return () => {
      event.off("setRefresh", setRefreshAction);
    };
  }, [refresh]);
  return (
    <SafeAreaView className="w-full h-full relative bg-white px-4 py-6 pt-10">
      {showLoading && <Loading />}
      {showDelete && (
        <DeletePopUp dishId={dishId} setShowDelete={setShowDelete} />
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
          {dishes?.length > 0 ? (
            dishes?.map((dish) => (
              <DishRow
                key={dish.dish_id}
                setShowDelete={setShowDelete}
                dish={dish}
                setRefreshAction={setRefreshAction}
                setDishId={setDishId}
                secondToastShow={secondToastShow}
              />
            ))
          ) : (
            <View className="w-full h-96 justify-center items-center">
              {!showLoading && (
                <Text
                  className="text-blackColor text-lg"
                  style={{ fontFamily: "Cairo" }}
                >
                  لا يوجد أطباق
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("/add", { setRefreshEvent: "setRefresh" })
        }
        className="w-16 h-16 rounded-full mt-4 bg-mainColor justify-center items-center"
      >
        <PlusIcon size={50} fill="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
