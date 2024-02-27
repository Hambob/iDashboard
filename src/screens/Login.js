import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { EyeSlashIcon, EyeIcon } from "react-native-heroicons/solid";
import { useFonts } from "expo-font";
import React, { useCallback } from "react";
import { api } from "../utilts/api";
import axios from "axios";
import { event } from "../event";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
import Loading from "../components/Loading";

const Login = () => {
  const [fontsLoaded] = useFonts({
    Cairo: require("../../assets/fonts/Cairo-Light.ttf"),
    CairoBold: require("../../assets/fonts/Cairo-Bold.ttf"),
    CairoExtraBold: require("../../assets/fonts/Cairo-ExtraBold.ttf"),
  });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Please fill the form");
    }
    setShowLoading(true);
    await axios
      .post(`${api}/restaurant-manager/login`, { email, password })
      .then(async (res) => {
        await AsyncStorage.setItem("token", res.data.token);
        await AsyncStorage.setItem("refreshToken", res.data.refreshToken);
        setShowLoading(false);
        event.emit("renderAgain");
      })
      .catch((err) => {
        setShowLoading(false);
        Alert.alert("حدث خطأ الرجاء اعادة المحاولة");
      });
  };

  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        className="flex-1 relative justify-center items-center"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={60}
      >
        {showLoading && <Loading />}

        <View className="h-1/2 w-full bg-mainColor items-center justify-end">
          <FastImage
            source={{
              uri: "https://idelivery.blob.core.windows.net/media/bussiness2.png",
            }}
            className="w-60 h-60"
          />
          {/* <Image
            source={{
              uri: "https://idelivery.blob.core.windows.net/media/bussiness2.png",
            }}
            className="w-60 h-60"
          /> */}
        </View>
        <View className="w-full  h-1/3 px-7 justify-center">
          <Text
            className="text-right text-sm text-[#535c68]"
            style={{ fontFamily: "Cairo" }}
          >
            البريد الإلكتروني
          </Text>
          <TextInput
            placeholder="email@domain.com"
            className="w-80 h-14 border-b border-[#EEE] mx-auto"
            textContentType="emailAddress"
            placeholderTextColor="#535c68"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <Text
            className="text-right mt-10 text-sm text-[#535c68] relative"
            style={{ fontFamily: "Cairo" }}
          >
            كلمة المرور
          </Text>
          <View className="w-full h-14  relative">
            <View className="w-10 h-10 z-50 absolute right-2 bottom-2 justify-center items-center">
              {!showPassword && (
                <EyeIcon
                  color="red"
                  fill={"#535c68"}
                  size={30}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )}

              {showPassword && (
                <EyeSlashIcon
                  color="red"
                  fill={"#535c68"}
                  size={30}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )}
            </View>
            <TextInput
              placeholder="**********"
              className="w-80 h-14 border-b border-[#EEE] mx-auto text-left"
              placeholderTextColor="#535c68"
              style={{ direction: "ltr" }}
              secureTextEntry={!showPassword}
              textContentType="password"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <View className="w-full  h-1/3  justify-center items-center">
          <TouchableOpacity
            className="w-80 py-4 justify-center items-center rounded-xl bg-[#37BD6B]"
            onPress={handleLogin}
          >
            <Text
              className="text-white text-md"
              style={{ fontFamily: "CairoExtraBold" }}
            >
              تسجيل الدخول
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
