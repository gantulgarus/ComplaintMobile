import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";
import { faqEnergy } from "../../FaqEnergy";
import { faqDulaan } from "../../FaqDulaan";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { mainColor } from "../../Constants";

// FAQ List Component
const FAQList = ({ faqs }) => {
  const [expanded, setExpanded] = useState({}); // State to track expanded/collapsed items

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
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
  );
};

const FAQScreen = () => {
  const [index, setIndex] = useState(0); // Current tab index
  const [routes] = useState([
    { key: "group1", title: "Цахилгаан" },
    { key: "group2", title: "Дулаан" },
  ]);

  // Define scenes for each tab
  const renderScene = SceneMap({
    group1: () => <FAQList faqs={faqEnergy || []} />,
    group2: () => <FAQList faqs={faqDulaan || []} />,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader title="Түгээмэл асуулт, хариулт" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "white" }}
            indicatorStyle={{ backgroundColor: mainColor }}
            activeColor={mainColor} // Active tab text color
            inactiveColor="gray" // Inactive tab text color (or any color you prefer)
          />
        )}
      />
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
