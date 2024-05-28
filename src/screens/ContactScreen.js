import React from "react";
import { View, ScrollView, Image, Text, Button } from "react-native";

const ContactScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/contact.jpg")}
      />
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>jane.doe@example.com</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>San Francisco, CA</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Bio:</Text>
          <Text style={styles.infoValue}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
            non massa sem. Etiam finibus odio quis feugiat facilisis.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
  },
  image: {
    height: 400,
    width: "100%",
    aspectRatio: 1,
  },
  content: {
    padding: 20,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoValue: {
    marginTop: 5,
  },
};

export default ContactScreen;
