import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <Login />
    </View>
  );
}
