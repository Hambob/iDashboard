import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { getInfoAsync } from "expo-file-system";
import InputWarning from "../utilts/InputWarning";
import { inputErrorMessage, inputLengthMessage } from "../../utilts/messages";
import { event } from "../../event";
import api_call from "../../utilts/interceptor";

const Edit = () => {
  const navigation = useNavigation();

  const c = useRoute().params.category;
  const n = useRoute().params.name;
  const d = useRoute().params.desc;
  const p = useRoute().params.price;
  const { dish_id } = useRoute().params;

  // const [selected, setSelected] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [price, setPrice] = React.useState();
  const [image, setImage] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [showInputMessage, setShowInputMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showBigFileAlert, setShowBigFileAlert] = useState(false);

  useEffect(() => {
    api_call.get(`/categories`).then((res) => {
      setCategories(res.data.allCategories);
    });
  }, []);

  const pureArray = [];
  categories.map((category) => {
    pureArray.push({ key: category.cat_id, value: category.name });
  });

  const handleUpdate = () => {
    if (!name && !price && !desc && !category && !image) {
      showToast();
      return;
    }

    const formData = new FormData();
    name && formData.append("name", name);
    price && formData.append("price", Number(price));
    desc && formData.append("description", desc);
    category && formData.append("category", Number(category));
    image &&
      formData.append("img", {
        uri: image,
        type: "image/jpg",
        name: new Date().getTime() + "dish",
      });
    api_call
      .patch(`/dish/update/${Number(dish_id)}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        event.emit("setRefresh");
        navigation.goBack();
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const fileInfo = await getInfoAsync(result.assets[0].uri);
    // console.log("fileInfo", fileInfo);

    if (fileInfo.size > 1000000) {
      setShowBigFileAlert(true);
    } else {
      setShowBigFileAlert(false);
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView className="flex-1 py-4 bg-white relative justify-center items-center px-6">
      <TouchableOpacity
        className="w-full h-16 justify-end items-end"
        onPress={() => navigation.goBack()}
      >
        <ChevronRightIcon fill="#6A6D7C" />
      </TouchableOpacity>
      <View className="w-full h-[95%] justify-around">
        <View className="relative">
          <Text
            className="text-right text-sm mb-4 text-[#95A5A6]"
            style={{ fontFamily: "Cairo" }}
          >
            إسم الطبق
          </Text>
          <TextInput
            className="w-full h-8 border-b mb-2 border-[#EEE] mx-auto"
            defaultValue={n}
            onChangeText={(text) => {
              setName(text);
              if (text.length > 30) {
                setInputMessage(inputLengthMessage);
                setMessageType("warning");
                setShowInputMessage("name");
              } else {
                setShowInputMessage("");
                setInputMessage("");
              }
              if (text.length < 1) {
                setInputMessage(inputErrorMessage);
                setMessageType("error");
                setShowInputMessage("name");
              }
            }}
          />
          {showInputMessage === "name" && (
            <InputWarning type={messageType} message={inputMessage} />
          )}
        </View>
        <View>
          <Text
            className="text-right mb-4 text-sm text-[#95A5A6]"
            style={{ fontFamily: "Cairo" }}
          >
            وصف قصير
          </Text>
          <TextInput
            className="w-full h-8 mb-2 border-b border-[#EEE] mx-auto"
            defaultValue={d}
            onChangeText={(text) => {
              setDesc(text);
              if (text.length > 30) {
                setInputMessage(inputLengthMessage);
                setMessageType("warning");
                setShowInputMessage("desc");
              } else {
                setShowInputMessage("");
                setInputMessage("");
              }
              if (text.length < 1) {
                setInputMessage(inputErrorMessage);
                setMessageType("error");
                setShowInputMessage("desc");
              }
            }}
          />
          {showInputMessage === "desc" && (
            <InputWarning type={messageType} message={inputMessage} />
          )}
        </View>
        <View>
          <Text
            className="text-right text-sm mb-4 text-[#95A5A6]"
            style={{ fontFamily: "Cairo" }}
          >
            السعر
          </Text>
          <TextInput
            className="w-full h-8 mb-2 border-b border-[#EEE] mx-auto"
            keyboardType="number-pad"
            contextMenuHidden={true}
            defaultValue={p.toString()}
            onChangeText={(text) => {
              setPrice(text);
              if (text.length < 1) {
                setInputMessage(inputErrorMessage);
                setMessageType("error");
                setShowInputMessage("price");
              } else {
                setShowInputMessage("");
                setInputMessage("");
              }
            }}
          />
          {showInputMessage === "price" && (
            <InputWarning type={messageType} message={inputMessage} />
          )}
        </View>
        <View>
          <Text
            className="text-right text-sm mb-4 text-[#95A5A6]"
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
        </View>
        <View>
          <TouchableOpacity
            onPress={pickImage}
            className="w-3/4 mx-auto rounded-lg justify-center items-center bg-grayDarkColor py-4"
          >
            <Text className="text-white" style={{ fontFamily: "Cairo" }}>
              اختر الصورة
            </Text>
          </TouchableOpacity>
          {showBigFileAlert && (
            <InputWarning type="error" message="حجم الملف غير مسموح به" />
          )}
        </View>
        <TouchableOpacity
          onPress={handleUpdate}
          className="w-3/4 mx-auto rounded-lg  justify-center items-center bg-blueColor py-4"
        >
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
