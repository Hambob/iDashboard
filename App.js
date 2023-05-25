import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { event } from "./src/event";
import axios from "axios";
import { api } from "./src/utilts/api";

const rfreshManagerToken = async (theToken) => {
  axios
    .get(`${api}/restaurant-manager/refresh`, {
      headers: {
        Authorization: `Bearer ${theToken}`,
      },
    })
    .then(async (res) => {
      console.log("newToken-->", res.data.newToken);
      console.log("token-->", res.data.token);
      if (res.data.newToken) {
        setToken(res.data.newToken);
        await AsyncStorage.setItem("token", res.data.newToken);
      } else {
        setToken(res.data.token);
        await AsyncStorage.setItem("token", res.data.token);
      }
    })
    .catch((err) => {
      setToken("");
      changeRenderAction();
    });
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Cairo: require("./assets/fonts/Cairo-Regular.ttf"),
    CairoBold: require("./assets/fonts/Cairo-Bold.ttf"),
  });
  const [token, setToken] = useState("");
  const [changeRender, setChangeRender] = useState(false);

  const changeRenderAction = () => {
    setChangeRender(!changeRender);
  };

  useEffect(() => {
    async function getToken() {
      await AsyncStorage.getItem("token").then((theToken) => {
        axios
          .get(`${api}/restaurant-manager/refresh`, {
            headers: {
              Authorization: `Bearer ${theToken}`,
            },
          })
          .then(async (res) => {
            console.log("newToken-->", res.data.newToken);
            console.log("token-->", res.data.token);
            if (res.data.newToken) {
              await AsyncStorage.setItem("token", res.data.newToken);
              setToken(res.data.newToken);
            } else {
              await AsyncStorage.setItem("token", res.data.token);
              setToken(res.data.token);
            }
          })
          .catch((err) => {
            setToken("");
            changeRenderAction();
          });
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
