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
import InputWarning from "../utilts/InputWarning";
import { inputErrorMessage, inputLengthMessage } from "../../utilts/messages";
import Toast, { ErrorToast } from "react-native-toast-message";

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
  const [inputMessage, setInputMessage] = useState("");
  const [showInputMessage, setShowInputMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showToast = () => {
    Toast.show({
      type: "error",
      text1: "خطأ",
      text2: "الرجاء ملئ كل الحقول بشكل صحيح",
    });
  };

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
    if (!name || !price || !description || !category || !image) {
      showToast();
      return;
    }

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
        event.emit("setRefresh");
        navigation.goBack();
      })
      .catch((err) => {
        showToast();
        setProgress(0);
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

  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
          fontFamily: "Cairo",
        }}
        text2Style={{
          fontSize: 15,
          fontFamily: "Cairo",
        }}
      />
    ),
  };
  return (
    <SafeAreaView className="flex-1 py-4 bg-white relative justify-center items-center px-6">
      <Toast config={toastConfig} />
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
            placeholder="مثال: برجر لحم | يجب ان لا يزيد حجم النص عن 30 حرف"
            className="w-full h-8 border-b mb-2 border-[#EEE] mx-auto"
            textContentType="emailAddress"
            keyboardType="email-address"
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
            placeholder="شرائح اللحم مه الصوص"
            className="w-full h-8 mb-2 border-b border-[#EEE] mx-auto"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={(text) => {
              setDescription(text);
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
            placeholder="9"
            className="w-full h-8 mb-2 border-b border-[#EEE] mx-auto"
            keyboardType="number-pad"
            contextMenuHidden={true}
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
        <TouchableOpacity
          onPress={pickImage}
          className="w-3/4 mx-auto rounded-lg justify-center items-center bg-grayDarkColor py-4"
        >
          <Text className="text-white" style={{ fontFamily: "Cairo" }}>
            اختر الصورة
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAdd}
          className="w-3/4 mx-auto rounded-lg  justify-center items-center bg-mainColor py-4"
        >
          <Text
            style={{ fontFamily: "Cairo" }}
            className="text-sm items-center text-white"
          >
            اضافة
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Add;
