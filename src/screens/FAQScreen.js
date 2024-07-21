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
import { faqs } from "../../Faq";

const FAQScreen = () => {
  const [expanded, setExpanded] = useState({}); // State to track expanded/collapsed items

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader title="Түгээмэл асуулт, хариулт" />
      <ScrollView contentContainerStyle={styles.container}>
        {faqs.map((item) => (
          <View key={item.id} style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <View style={styles.row}>
                <Text style={styles.question}>{item.question}</Text>
              </View>
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
    marginBottom: 10,
  },
  row: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  question: {
    fontSize: 14,
    textTransform: "uppercase",
  },
  answer: {
    fontSize: 14,
    marginVertical: 20,
  },
});

export default FAQScreen;
