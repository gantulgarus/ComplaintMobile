import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import ComplaintItem from "../components/ComplaintItem";

import EmptyData from "../components/EmptyData";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainBgColor, mainColor } from "../../Constants";
import useComplaint from "../hooks/useComplaint";
import Search from "../components/Search";
import { useFocusEffect } from "@react-navigation/native";

const ComplaintListScreen = (props) => {
  const [input, setInput] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [complaints, errorMessage, loading] = useComplaint(refresh, setRefresh);

  if (props.route.params && props.route.params.newComplaint) {
    Alert.alert(
      props.route.params.newComplaint.serial_number +
        " дугаартай " +
        props.route.params.newComplaint.category +
        " амжилттай бүртгэгдлээ."
    );
    delete props.route.params.newComplaint;
    setRefresh(true);
  }

  useFocusEffect(
    useCallback(() => {
      setRefresh(true);
      return () => {
        setRefresh(false);
      };
    }, [])
  );

  const filteredRows = useMemo(() => {
    const rows = [];
    const query = input.toLowerCase();

    for (const item of complaints) {
      const serialNumberIndex = item.serial_number.toLowerCase().search(query);
      const statusIndex = item.status.toLowerCase().search(query);
      const orgIndex = item.org.toLowerCase().search(query);

      if (serialNumberIndex !== -1 || statusIndex !== -1 || orgIndex !== -1) {
        rows.push({
          ...item,
          index: Math.min(
            serialNumberIndex === -1 ? Infinity : serialNumberIndex,
            statusIndex === -1 ? Infinity : statusIndex,
            orgIndex === -1 ? Infinity : orgIndex
          ),
        });
      }
    }

    return rows.sort((a, b) => a.index - b.index);
  }, [input, complaints]);

  // console.log(filteredRows);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainBgColor }}>
      <View style={styles.container}>
        <Search input={input} setInput={setInput} />
        {errorMessage && (
          <Text style={{ marginHorizontal: 20, color: "red" }}>
            {errorMessage}
          </Text>
        )}
        {loading ? (
          <ActivityIndicator size="large" color={mainColor} />
        ) : errorMessage ? (
          <Text style={{ marginHorizontal: 20, color: "red" }}>
            {errorMessage}
          </Text>
        ) : complaints.length > 0 ? (
          <FlatList
            data={filteredRows}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ComplaintItem complaint={item} />}
          />
        ) : (
          <EmptyData
            message="Мэдээлэл хоосон байна"
            imageSource={require("../../assets/images/empty-folder.png")}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ComplaintListScreen;
