import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { api } from "./../../utilts/api";

const Edit = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("1");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${api}/categories`)
      .then((res) => {
        setCategories(res.data.allCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const pureArray = [];
  categories.map((category) => {
    pureArray.push({ key: category.cat_id, value: category.name });
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white relative justify-center items-center px-6">
      <TouchableOpacity
        className="absolute right-5 top-12"
        onPress={() => navigation.goBack()}
      >
        <ChevronRightIcon fill="#6A6D7C" />
      </TouchableOpacity>
      <View className="w-full h-1/2 px-4">
        <Text
          className="text-right text-sm text-[#95A5A6]"
          style={{ fontFamily: "Cairo" }}
        >
          إسم الطبق
        </Text>
        <TextInput
          placeholder="hamzah@me.com"
          className="w-72 h-8 border-b border-[#EEE] mx-auto"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <Text
          className="text-right text-sm mt-5 text-[#95A5A6]"
          style={{ fontFamily: "Cairo" }}
        >
          السعر
        </Text>
        <TextInput
          placeholder="hamzah@me.com"
          className="w-72 h-8 border-b mb-8 border-[#EEE] mx-auto"
          textContentType="emailAddress"
          keyboardType="numeric"
        />

        <Text
          className="text-right text-sm text-[#95A5A6]"
          style={{ fontFamily: "Cairo" }}
        >
          الصنف
        </Text>
        <SelectList
          setSelected={(text) => setCategory(text)}
          data={pureArray}
          save="key"
          placeholder="إختر الصنف"
        />
        <TouchableOpacity
          onPress={pickImage}
          className="w-3/4 mx-auto rounded-lg justify-center items-center mt-8 bg-grayDarkColor py-4"
        >
          <Text className="text-white" style={{ fontFamily: "Cairo" }}>
            اختر الصورة
          </Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <View className="w-full px-4 h-36 justify-end">
        <TouchableOpacity className="w-3/4 mx-auto rounded-lg justify-center items-center mt-8 bg-blueColor py-4">
          <Text
            style={{ fontFamily: "Cairo" }}
            className="text-sm items-center text-white"
          >
            تعديل
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Edit;
