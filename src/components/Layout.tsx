import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { OpenpixHeading } from "./OpenpixHeading";
import { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.heading}>
          <OpenpixHeading />
        </View>
        <View style={styles.children}>{props.children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
    height: "100%",
  },
  heading: {
    borderBottomWidth: 1,
    borderBottomColor: "#03D69D",
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  children: {
    width: "100%",
    backgroundColor: "#FCFCFC",
    height: "100%",
  },
  scrollView: {
    width: "100%",
  },
});
