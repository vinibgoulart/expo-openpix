import { Image, StyleSheet } from "react-native";

export const OpenpixHeading = () => {
  return (
    <Image
      style={styles.image}
      source={require("../../assets/woovi_logo.png")}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 80,
    resizeMode: "stretch",
    marginTop: 20,
  },
});
