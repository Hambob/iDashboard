import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Linking,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { imgUrl } from "../../utilts/api";
import { event } from "../../event";
import FastImage from "react-native-fast-image";
import api_call from "../../utilts/interceptor";

const OrderDetails = () => {
  const navigation = useNavigation();
  const {
    c_name,
    note,
    total_price,
    items,
    order_id,
    setRefreshEvent,
    service_fee,
    orderType,
    c_phone,
  } = useRoute()?.params;

  const orderAction = (status) => {
    if (orderType === "delivery") {
      api_call
        .patch(`/manager/order/status`, { status, order_id })
        .then((res) => {
          if (status === "CANCELED") {
            Alert.alert("تم رفض الطلب بنجاح");
          } else {
            Alert.alert("تم قبول الطلب بنجاح");
          }
          event.emit("setRefresh");
          navigation.goBack();
        })
        .catch((err) => {
          Alert.alert(
            "تم الغاء الطلبية من قبل العميل, قم بتحديث الطلبيات الواردة"
          );
        });
    } else {
      api_call
        .patch(`/manager/personal-order/status`, { status, order_id })
        .then((res) => {
          if (status === "CANCELED") {
            Alert.alert("تم رفض الطلب بنجاح");
          } else {
            Alert.alert("تم قبول الطلب بنجاح");
          }
          event.emit("setRefresh");
          navigation.goBack();
        })
        .catch((err) => {
          Alert.alert(
            "تم الغاء الطلبية من قبل العميل, قم بتحديث الطلبيات الواردة"
          );
        });
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white relative justify-center items-center">
      <TouchableOpacity
        className="absolute right-5 top-12"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <ChevronRightIcon fill="#6A6D7C" />
      </TouchableOpacity>
      <Text style={{ fontFamily: "CairoBold", fontSize: 20 }}>
        تفاصيل الطلبية
      </Text>
      <View className="w-[90%] h-3/4 bg-[#EEE] mt-6 rounded-lg">
        <View className="w-full h-[20%] flex-row p-4">
          <View className="w-1/2 h-full  justify-around items-center flex-row">
            <TouchableOpacity
              className="px-4 py-2 bg-redBtn"
              onPress={() => orderAction("CANCELED")}
            >
              <Text className="text-white" style={{ fontFamily: "CairoBold" }}>
                رفض
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 bg-mainColor"
              onPress={() => orderAction("ACCEPTED")}
            >
              <Text className="text-white" style={{ fontFamily: "CairoBold" }}>
                قبول
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-1/2 h-full  justify-around items-end">
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
                <Text className="text-blackColor">{service_fee} د.ل</Text>
              </Text>
            )}
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
              الزبون: <Text className="text-blackColor">{c_name}</Text>
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
                  id={item.order_id}
                  key={item.order_id}
                  className="w-[90%] h-16 bg-[#D9D9D9] flex-row rounded-full"
                >
                  <View className="w-1/3 flex-row justify-around items-center">
                    <FastImage
                      className="w-12 h-12 rounded-full"
                      style={{ borderWidth: 1, borderColor: "#FFF" }}
                      source={{ uri: `${imgUrl}/${item.dish.img}` }}
                    />
                    {/* <Image
                      className="w-12 h-12 rounded-full"
                      style={{ borderWidth: 1, borderColor: "#FFF" }}
                      source={{ uri: `${imgUrl}/${item.dish.img}` }}
                    /> */}
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
        <View className="w-full h-1/3 p-4">
          <Text style={{ fontFamily: "Cairo" }}>الملاحظات:</Text>
          <Text
            className="flex-1 mt-2 bg-grayColor rounded-lg p-4 text-xs"
            style={{ fontFamily: "Cairo" }}
          >
            {note || "لا يوجد ملاحظات"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;
