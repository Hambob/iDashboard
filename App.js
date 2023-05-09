import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import OrderDetails from "./src/components/Home/OrderDetails";
import Dishes from "./src/components/Dishes";
import "react-native-gesture-handler";
export default function App() {
  const [fontsLoaded] = useFonts({
    Cairo: require("./assets/fonts/Cairo-Regular.ttf"),
    CairoBold: require("./assets/fonts/Cairo-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 bg-white">
      <Home />
    </View>
  );
}
