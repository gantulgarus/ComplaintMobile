import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";

const FAQScreen = () => {
  const [expanded, setExpanded] = useState({}); // State to track expanded/collapsed items

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const faqItems = [
    {
      id: 1,
      question: "What is React Native?",
      answer:
        "React Native is a JavaScript framework for building native mobile applications.",
    },
    {
      id: 2,
      question: "How does React Native differ from React?",
      answer:
        "React Native is specifically for mobile app development, while React is for web development.",
    },
    // Add more FAQ items as needed
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader title="Түгээмэл асуулт, хариулт" />
      <ScrollView contentContainerStyle={styles.container}>
        {faqItems.map((item) => (
          <View key={item.id} style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <Text style={styles.question}>{item.question}</Text>
            </TouchableOpacity>
            {expanded[item.id] && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textDecorationLine: "underline",
  },
  answer: {
    fontSize: 16,
  },
});

export default FAQScreen;
