import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlusIcon } from "react-native-heroicons/solid";
import React from "react";
import DishRow from "../Home/DishRow";
import { useNavigation } from "@react-navigation/native";
import DeletePopUp from "./DeletePopUp";

const Home = () => {
  const navigation = useNavigation();
  const [showDelete, setShowDelete] = React.useState(false);
  return (
    <SafeAreaView className="w-full h-full relative bg-white px-4 py-6 pt-10">
      {showDelete && <DeletePopUp setShowDelete={setShowDelete} />}

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
          <DishRow setShowDelete={setShowDelete} />
          <DishRow />
          <DishRow />
          <DishRow />
          <DishRow />
          <DishRow />
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
