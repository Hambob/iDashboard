import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import api_call from "../utilts/interceptor";
import { useNavigation } from "@react-navigation/native";

const RequestDriver = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [zones, setZones] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    api_call.get(`/zones`).then((data) => {
      setZones(data.data.zones);
    });
  }, []);

  const requestDriver = () => {
    if (!address || !phone) {
      Alert.alert("الرجاء إدخال جميع الحقول");
      return;
    }
    setLoading(true);
    api_call
      .post(`/request-driver/create`, {
        phone,
        zoneId: address,
        deliveryFee,
      })
      .then((data) => {
        Alert.alert("تم إرسال الطلب بنجاح");
        setLoading(false);
        setAddress("");
        setPhone("");
        setTimeout(() => {
          navigation.navigate("الرئسية");
        }, 1500);
      })
      .catch((err) => {
        Alert.alert("حدث خطأ ما");
        setLoading(false);
      });
  };

  const getDeliveryFee = (addressID) => {
    const zone = zones?.find((zone) => zone.id == addressID);
    return zone?.price;
  };

  const pureArray = [];
  zones?.map((zone) => {
    pureArray.push({ key: zone.id, value: zone.name });
  });
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full h-12 justify-end items-center mt-8">
        <Text className="text-xl text-blackColor">طلب سائق</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={40}
        className="items-center justify-center gap-4 w-full h-full px-4"
      >
        <TextInput
          style={{
            width: 300,
            height: 50,
            borderColor: "#000",
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 10,
            textAlign: "right",
            borderRadius: 10,
            paddingHorizontal: 10,
            fontFamily: "Cairo_500Medium",
          }}
          placeholder="رقم هاتف الزبون"
          maxLength={10}
          onChangeText={(text) => setPhone(text)}
          keyboardType="number-pad"
          value={phone}
        />
        <SelectList
          setSelected={(text) => {
            setAddress(text);
            setDeliveryFee(getDeliveryFee(text));
          }}
          data={pureArray}
          save="key"
          placeholder="إختر المنطقة"
          boxStyles={{ width: 250 }}
        />
        <Text>سعر التوصيل: {deliveryFee} د.ل </Text>
        <TouchableOpacity
          className="px-6 py-3 items-center bg-mainColor rounded-lg justify-center mt-10"
          onPress={requestDriver}
          disabled={loading}
        >
          <Text className="text-gray-50">طلب</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RequestDriver;
