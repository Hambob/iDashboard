import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { event } from "./src/event";

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
      await AsyncStorage.getItem("token").then((data) => setToken(data));
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
