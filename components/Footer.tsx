import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.footerText}>Footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "lightblue",
    padding: 16,
  },

  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "lightblue",
    padding: 16,
  },
});

export default Footer;
