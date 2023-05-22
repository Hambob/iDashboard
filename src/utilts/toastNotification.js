import { BaseToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#37BD6B" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "400",
        fontFamily: "Cairo",
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: "Cairo",
      }}
    />
  ),
};
