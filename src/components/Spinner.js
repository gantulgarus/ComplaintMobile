import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { mainColor } from "../../Constants";

const Spinner = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <ActivityIndicator size="large" color={mainColor} />
      <Text style={{ top: 10, fontWeight: "bold", fontSize: 18 }}>
        Түр хүлээнэ үү...
      </Text>
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({});
