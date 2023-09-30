import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { event } from "./src/event";
import axios from "axios";
import { api } from "./src/utilts/api";
import { I18nManager, View } from "react-native";
import Loading from "./src/components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Cairo: require("./assets/fonts/Cairo-Regular.ttf"),
    CairoBold: require("./assets/fonts/Cairo-Bold.ttf"),
  });
  const [token, setToken] = useState("");
  const [changeRender, setChangeRender] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const changeRenderAction = () => {
    setChangeRender(!changeRender);
  };

  useEffect(() => {
    try {
      I18nManager.allowRTL(false);
    } catch (error) {
      console.log(error);
    }
    async function getToken() {
      await AsyncStorage.getItem("refreshToken").then((theToken) => {
        if (!theToken) {
          setToken("");
          setShowLoading(false);
          changeRenderAction();
        } else {
          axios
            .get(`${api}/restaurant-manager/refresh`, {
              headers: {
                Authorization: `Bearer ${theToken}`,
              },
            })
            .then(async (res) => {
              await AsyncStorage.setItem("token", res.data.token);
              setShowLoading(false);
              setToken(res.data.token);
            })
            .catch((err) => {
              setShowLoading(false);
              setToken("");
            });
        }
      });
    }
    getToken();
    event.on("renderAgain", changeRenderAction);
    return () => {
      event.off("renderAgain", changeRenderAction);
    };
  }, [changeRender]);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (showLoading) {
    return (
      <View className="w-full h-full">
        <Loading />
      </View>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {!token ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
