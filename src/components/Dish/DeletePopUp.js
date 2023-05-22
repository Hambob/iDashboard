import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { CheckIcon, XMarkIcon } from "react-native-heroicons/solid";
import axios from "axios";
import { api } from "../../utilts/api";
import { event } from "../../event";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeletePopUp = ({ setShowDelete, dishId }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token").then((res) => {
      setToken(res);
    });
  }, []);
  const deleteDish = () => {
    axios
      .delete(`${api}/dish/delete/${Number(dishId)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setShowDelete(false);
        event.emit("setRefresh");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View className="w-80 left-10 z-50  rounded-lg h-36 absolute top-72 justify-center items-center bg-grayDarkColor">
      <Text
        className="text-center mt-4 text-white"
        style={{ fontFamily: "Cairo" }}
      >
        هل متاكد من الحذف؟
      </Text>
      <View className="w-full h-24 flex-row justify-center items-center gap-1">
        <TouchableOpacity
          className="w-20 h-10 bg-redBtn justify-center items-center"
          onPress={() => setShowDelete(false)}
        >
          <XMarkIcon size={30} fill="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-20 h-10 bg-mainColor justify-center items-center"
          onPress={deleteDish}
        >
          <CheckIcon size={30} fill="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeletePopUp;
