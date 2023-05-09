import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRightIcon } from "react-native-heroicons/solid";

const OrderDetails = ({ setShowOrderDetails }) => {
  return (
    <SafeAreaView className="flex-1 bg-white relative justify-center items-center">
      <TouchableOpacity
        className="absolute right-5 top-12"
        onPress={() => setShowOrderDetails(false)}
      >
        <ChevronRightIcon fill="#6A6D7C" />
      </TouchableOpacity>
      <Text style={{ fontFamily: "CairoBold", fontSize: 20 }}>
        تفاصيل الطلبية
      </Text>
      <View className="w-[90%] h-3/4 bg-[#EEE] mt-6 rounded-lg">
        <View className="w-full h-[20%] flex-row p-4">
          <View className="w-1/2 h-full  justify-around items-center flex-row">
            <TouchableOpacity className="px-4 py-2 bg-redBtn">
              <Text className="text-white" style={{ fontFamily: "CairoBold" }}>
                رفض
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-mainColor">
              <Text className="text-white" style={{ fontFamily: "CairoBold" }}>
                قبول
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-1/2 h-full  justify-around items-end">
            <Text
              style={{ fontFamily: "Cairo" }}
              className="text-textColor text-xs"
            >
              رقم الطلبية: <Text className="text-blackColor">0074154</Text>
            </Text>
            <Text
              style={{ fontFamily: "Cairo" }}
              className="text-textColor text-xs"
            >
              الزبون: <Text className="text-blackColor">حمزة أبوقرين</Text>
            </Text>
            <Text
              style={{ fontFamily: "Cairo" }}
              className="text-textColor text-xs"
            >
              إجمالي السعر: <Text className="text-blackColor">700 د.ل</Text>
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
              <View className="w-[90%] h-16 bg-[#D9D9D9] flex-row rounded-full">
                <View className="w-1/3 flex-row justify-around items-center">
                  <Image
                    className="w-12 h-12 rounded-full"
                    style={{ borderWidth: 1, borderColor: "#FFF" }}
                    source={require("../../../assets/test.jpeg")}
                  />
                  <Text style={{ fontFamily: "CairoBold", fontSize: 20 }}>
                    2X
                  </Text>
                </View>
                <View className="flex-1 justify-center items-end px-4">
                  <Text
                    style={{ fontFamily: "CairoBold" }}
                    className="text-grayDarkColor"
                  >
                    شاورما عربي
                  </Text>
                </View>
              </View>
              <View className="w-[90%] h-16 bg-[#D9D9D9] flex-row rounded-full">
                <View className="w-1/3 flex-row justify-around items-center">
                  <Image
                    className="w-12 h-12 rounded-full"
                    style={{ borderWidth: 1, borderColor: "#FFF" }}
                    source={require("../../../assets/test.jpeg")}
                  />
                  <Text style={{ fontFamily: "CairoBold", fontSize: 20 }}>
                    2X
                  </Text>
                </View>
                <View className="flex-1 justify-center items-end px-4">
                  <Text
                    style={{ fontFamily: "CairoBold" }}
                    className="text-grayDarkColor"
                  >
                    شاورما عربي
                  </Text>
                </View>
              </View>
              <View className="w-[90%] h-16 bg-[#D9D9D9] flex-row rounded-full">
                <View className="w-1/3 flex-row justify-around items-center">
                  <Image
                    className="w-12 h-12 rounded-full"
                    style={{ borderWidth: 1, borderColor: "#FFF" }}
                    source={require("../../../assets/test.jpeg")}
                  />
                  <Text style={{ fontFamily: "CairoBold", fontSize: 20 }}>
                    2X
                  </Text>
                </View>
                <View className="flex-1 justify-center items-end px-4">
                  <Text
                    style={{ fontFamily: "CairoBold" }}
                    className="text-grayDarkColor"
                  >
                    شاورما عربي
                  </Text>
                </View>
              </View>
              <View className="w-[90%] h-16 bg-[#D9D9D9] flex-row rounded-full">
                <View className="w-1/3 flex-row justify-around items-center">
                  <Image
                    className="w-12 h-12 rounded-full"
                    style={{ borderWidth: 1, borderColor: "#FFF" }}
                    source={require("../../../assets/test.jpeg")}
                  />
                  <Text style={{ fontFamily: "CairoBold", fontSize: 20 }}>
                    2X
                  </Text>
                </View>
                <View className="flex-1 justify-center items-end px-4">
                  <Text
                    style={{ fontFamily: "CairoBold" }}
                    className="text-grayDarkColor"
                  >
                    شاورما عربي
                  </Text>
                </View>
              </View>
              <View className="w-[90%] h-16 bg-[#D9D9D9] flex-row rounded-full">
                <View className="w-1/3 flex-row justify-around items-center">
                  <Image
                    className="w-12 h-12 rounded-full"
                    style={{ borderWidth: 1, borderColor: "#FFF" }}
                    source={require("../../../assets/test.jpeg")}
                  />
                  <Text style={{ fontFamily: "CairoBold", fontSize: 20 }}>
                    2X
                  </Text>
                </View>
                <View className="flex-1 justify-center items-end px-4">
                  <Text
                    style={{ fontFamily: "CairoBold" }}
                    className="text-grayDarkColor"
                  >
                    شاورما عربي
                  </Text>
                </View>
              </View>
              <View className="w-[90%] h-16 bg-[#D9D9D9] flex-row rounded-full">
                <View className="w-1/3 flex-row justify-around items-center">
                  <Image
                    className="w-12 h-12 rounded-full"
                    style={{ borderWidth: 1, borderColor: "#FFF" }}
                    source={require("../../../assets/test.jpeg")}
                  />
                  <Text style={{ fontFamily: "CairoBold", fontSize: 20 }}>
                    2X
                  </Text>
                </View>
                <View className="flex-1 justify-center items-end px-4">
                  <Text
                    style={{ fontFamily: "CairoBold" }}
                    className="text-grayDarkColor"
                  >
                    شاورما عربي
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View className="w-full h-1/4 p-4">
          <Text style={{ fontFamily: "Cairo" }}>الملاحظات:</Text>
          <Text
            className="flex-1 mt-2 bg-grayColor rounded-lg p-4 text-xs"
            style={{ fontFamily: "Cairo" }}
          >
            الشاورما بدون جبنة
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;
