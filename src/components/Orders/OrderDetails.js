import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { imgUrl } from "../../utilts/api";
import FastImage from "react-native-fast-image";
import api_call from "../../utilts/interceptor";
import { event } from "../../event";

const OrderDetails = () => {
  const navigation = useNavigation();
  const {
    order_id,
    c_name,
    note,
    total_price,
    items,
    c_phone,
    service_fee,
    orderType,
  } = useRoute()?.params;

  const orderAction = async (status) => {
    if (orderType === "personal") {
      await api_call.patch(`/manager/personal-order/status`, {
        status,
        order_id,
      });
      Alert.alert("تم تغيير حالة الطلب بنجاح");
      event.emit("setRefresh");
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative justify-center items-center">
      <TouchableOpacity
        className="absolute right-5 top-12"
        onPress={() => navigation.goBack()}
      >
        <ChevronRightIcon fill="#6A6D7C" />
      </TouchableOpacity>
      <Text style={{ fontFamily: "CairoBold", fontSize: 20 }}>
        تفاصيل الطلبية
      </Text>
      <View className="w-[90%] h-3/4 bg-[#EEE] mt-6 rounded-lg">
        <View className="w-full h-[20%] flex-row p-4 justify-end">
          <View className="w-1/2 h-full justify-around items-center">
            <TouchableOpacity
              className="px-4 py-2 bg-mainColor"
              onPress={() => orderAction("DONE")}
            >
              <Text className="text-white" style={{ fontFamily: "CairoBold" }}>
                إستلم العميل الطلب
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-1/2 h-full justify-around items-end">
            {orderType === "delivery" ? (
              <Text
                style={{ fontFamily: "Cairo" }}
                className="text-textColor text-xs"
              >
                رقم الطلبية: <Text className="text-blackColor">{order_id}</Text>
              </Text>
            ) : (
              <Text
                style={{ fontFamily: "Cairo" }}
                className="text-textColor text-xs"
              >
                عمولة التطبيق :{" "}
                <Text className="text-blackColor">{service_fee}</Text>
              </Text>
            )}
            <Text
              style={{ fontFamily: "Cairo" }}
              className="text-textColor text-xs"
            >
              الزبون: <Text className="text-blackColor">{c_name}</Text>
            </Text>
            <Text
              style={{ fontFamily: "Cairo" }}
              className="text-textColor text-xs"
            >
              الهاتف:{" "}
              <Text
                className="text-blackColor"
                onPress={() => {
                  Linking.openURL(`tel:0${c_phone}`);
                }}
              >
                {c_phone}
              </Text>
            </Text>
            <Text
              style={{ fontFamily: "Cairo" }}
              className="text-textColor text-xs"
            >
              إجمالي السعر:{" "}
              <Text className="text-blackColor">{total_price} د.ل</Text>
            </Text>
          </View>
        </View>
        <View className="flex-1">
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 10,
            }}
            className="flex-1"
          >
            <View className="flex-1 justify-center gap-2 items-center">
              {items.map((item) => (
                <View
                  key={item.dish.id}
                  className="w-[90%] h-16 bg-[#D9D9D9] flex-row rounded-full"
                >
                  <View className="w-1/3 flex-row justify-around items-center">
                    {/* <FastImage
                      className="w-12 h-12 rounded-full"
                      style={{ borderWidth: 1, borderColor: "#FFF" }}
                      source={{ uri: `${imgUrl}/${item.dish.img}` }}
                    /> */}
                    <Image
                      className="w-12 h-12 rounded-full"
                      style={{ borderWidth: 1, borderColor: "#FFF" }}
                      source={{ uri: `${imgUrl}/${item.dish.img}` }}
                    />
                    <Text style={{ fontFamily: "CairoBold", fontSize: 20 }}>
                      {item.quantity}X
                    </Text>
                  </View>
                  <View className="flex-1 justify-center items-end px-4">
                    <Text
                      style={{ fontFamily: "CairoBold" }}
                      className="text-grayDarkColor"
                    >
                      {item.dish.name}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View className="w-full h-1/4 p-4">
          <Text style={{ fontFamily: "Cairo" }}>الملاحظات:</Text>
          <Text
            className="flex-1 mt-2 bg-grayColor rounded-lg p-4 text-xs"
            style={{ fontFamily: "Cairo" }}
          >
            {note ? note : "لا يوجد ملاحظات"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;
