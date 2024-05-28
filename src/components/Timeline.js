import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";

export default function Timeline({ items }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Шийдвэрлэлтийн явц</Text>

      {items.map((item, index) => {
        return (
          <View key={index} style={styles.card}>
            <View style={styles.cardDelimiter}>
              {index !== items.length - 1 && (
                <View style={styles.cardDelimiterLine} />
              )}

              <View
                style={[
                  styles.cardDelimiterInset,
                  item.status_id == 6 && { backgroundColor: "springgreen" },
                ]}
              />
            </View>

            <View style={styles.cardBody}>
              <View style={styles.cardBodyContent}>
                <View style={styles.cardTitle}>
                  <Text style={styles.cardOrg}>{item.org}</Text>
                  <Text style={styles.cardStatus}>({item.status})</Text>
                </View>
                <Text style={styles.cardDates}>{item.date}</Text>

                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 10,
    // borderWidth: 1,
    // borderBottomColor: "black",
    borderBottomWidth: 2,
    // borderBottomColor: "black",
    // paddingBottom: 10,
    // backgroundColor: "red",
  },
  /** Card */
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardDelimiter: {
    position: "relative",
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  cardDelimiterLine: {
    position: "absolute",
    left: 20,
    top: "50%",
    borderLeftWidth: 1,
    borderColor: "seagreen",
    height: "100%",
    zIndex: 1,
  },
  cardDelimiterInset: {
    width: 12,
    height: 12,
    borderWidth: 3,
    borderRadius: 9999,
    backgroundColor: "seagreen",
    borderColor: "seagreen",
    zIndex: 9,
    position: "relative",
  },
  cardBody: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardBodyContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardOrg: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2a2a2a",
  },
  cardStatus: {
    fontSize: 12,
    marginLeft: 5,
    color: "gray",
  },
  cardDates: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ababab",
  },
  cardDesc: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#464646",
    marginBottom: 3,
  },
});
