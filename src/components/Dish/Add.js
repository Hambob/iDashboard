import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { api, token } from "./../../utilts/api";
import * as Progress from "react-native-progress";
import { event } from "../../event";

const Add = ({ setRefreshEvent }) => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("1");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);

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

  const handleAdd = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", Number(price));
    formData.append("description", description);
    formData.append("category", Number(category));
    formData.append("img", {
      uri: image,
      type: "image/jpg",
      name: new Date().getTime() + "dish",
    });

    axios
      .post(`${api}/manager/dish/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },

        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setProgress(percent);
          console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        },
      })
      .then((res) => {
        setProgress(0);
        event.emit(setRefreshEvent);
        navigation.goBack();
      })
      .catch((err) => {
        console.log("error -->", err);
      });
  };

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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white relative justify-center items-center px-6">
      {progress > 0 && (
        <View className="w-full h-10  absolute top-10 justify-center items-center">
          <Text className="text-xs" style={{ fontFamily: "Cairo" }}>
            جاري تحميل الصورة
          </Text>
          <Progress.Bar
            progress={progress / 100}
            width={250}
            height={10}
            borderColor="#37BD6B"
            color="#37BD6B"
          />
        </View>
      )}
      <TouchableOpacity
        className="absolute right-5 top-12"
        onPress={() => navigation.goBack()}
      >
        <ChevronRightIcon fill="#6A6D7C" />
      </TouchableOpacity>
      <View className="w-full h-[95%] justify-between py-12">
        <Text
          className="text-right text-sm text-[#95A5A6]"
          style={{ fontFamily: "Cairo" }}
        >
          إسم الطبق
        </Text>
        <TextInput
          placeholder="برجر لحم"
          className="w-72 h-8 border-b border-[#EEE] mx-auto"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={(text) => setName(text)}
        />

        <Text
          className="text-right text-sm text-[#95A5A6]"
          style={{ fontFamily: "Cairo" }}
        >
          وصف قصير
        </Text>
        <TextInput
          placeholder="شرائح اللحم مه الصوص"
          className="w-72 h-8 border-b border-[#EEE] mx-auto"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={(text) => setDescription(text)}
        />

        <Text
          className="text-right text-sm  text-[#95A5A6]"
          style={{ fontFamily: "Cairo" }}
        >
          السعر
        </Text>
        <TextInput
          placeholder="9"
          className="w-72 h-8 border-b border-[#EEE] mx-auto"
          textContentType="emailAddress"
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
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
          className="w-3/4 mx-auto rounded-lg justify-center items-center bg-grayDarkColor py-4"
        >
          <Text className="text-white" style={{ fontFamily: "Cairo" }}>
            اختر الصورة
          </Text>
        </TouchableOpacity>
        {/* {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
        <View className="px-">
          <TouchableOpacity
            onPress={handleAdd}
            className="w-3/4 mx-auto rounded-lg justify-center items-center bg-mainColor py-4"
          >
            <Text
              style={{ fontFamily: "Cairo" }}
              className="text-sm items-center text-white"
            >
              اضافة
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Add;
