import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { EyeSlashIcon, EyeIcon } from "react-native-heroicons/solid";
import { useFonts } from "expo-font";
import React, { useCallback } from "react";
import { api } from "../utilts/api";
import axios from "axios";

const Login = () => {
  const [fontsLoaded] = useFonts({
    Cairo: require("../../assets/fonts/Cairo-Light.ttf"),
    CairoBold: require("../../assets/fonts/Cairo-Bold.ttf"),
  });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [data, setData] = React.useState(null);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    if (!email || !password) {
      return Alert.alert("Please fill the form");
    }
    axios
      .post(`${api}/user/login`, { email, password })
      .then((res) => {
        Alert.alert("Logged in successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <View className="h-1/2 w-full  items-center justify-end">
        <Image
          source={{
            uri: "https://idelivery.blob.core.windows.net/media/driver.svg",
          }}
          className="w-50 h-50 "
        />
      </View>
      <View className="w-full  h-1/3 px-7 justify-center">
        <Text
          className="text-right text-sm text-[#95A5A6]"
          style={{ fontFamily: "Cairo" }}
        >
          البريد الإلكتروني
        </Text>
        <TextInput
          placeholder="hamzah@me.com"
          className="w-80 h-14 border-b border-[#EEE] mx-auto"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <Text
          className="text-right mt-10 text-sm text-[#95A5A6] relative"
          style={{ fontFamily: "Cairo" }}
        >
          كلمة المرور
        </Text>
        <View className="w-full h-14  relative">
          <View className="w-10 h-10 z-50 absolute right-2 bottom-2 justify-center items-center">
            {!showPassword && (
              <EyeIcon
                color="red"
                fill={"#EEE"}
                size={30}
                onPress={() => setShowPassword(!showPassword)}
              />
            )}

            {showPassword && (
              <EyeSlashIcon
                color="red"
                fill={"#EEE"}
                size={30}
                onPress={() => setShowPassword(!showPassword)}
              />
            )}
          </View>
          <TextInput
            placeholder="**********"
            className="w-80 h-14 border-b border-[#EEE] mx-auto text-left"
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
            className="text-white  text-sm"
            style={{ fontFamily: "CairoBold" }}
          >
            تسجيل الدخول
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
