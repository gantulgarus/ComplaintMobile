import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const Search = ({ input, setInput }) => {
  return (
    <View style={styles.searchWrapper}>
      <View style={styles.search}>
        <View style={styles.searchIcon}>
          <FeatherIcon color="#848484" name="search" size={17} />
        </View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          placeholder="Хайх.."
          placeholderTextColor="#848484"
          returnKeyType="done"
          style={styles.searchControl}
          value={input}
          onChangeText={(val) => setInput(val)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  searchWrapper: {
    paddingBottom: 10,
  },
  searchIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Search;
