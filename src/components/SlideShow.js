import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

const SlideShow = ({ onClose }) => {
  const ref = useRef(null);
  const progress = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0); // Track the current slide index

  const slides = [
    {
      image: require("../../assets/images/screen1.png"),
    },
    {
      image: require("../../assets/images/screen2.png"),
    },
    {
      image: require("../../assets/images/screen3.png"),
    },
    {
      image: require("../../assets/images/screen4.png"),
    },
  ];

  const onPressPagination = (index) => {
    ref.current?.scrollTo({
      count: index - activeIndex,
      animated: true,
    });
  };

  const handleScrollEnd = (index) => {
    setActiveIndex(index); // Update the active index
    if (index === slides.length - 1) {
      // Perform action on the last slide
      console.log("Last slide reached");
      onClose(); // Close the slideshow on the last slide
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height}
        data={slides}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        onScrollEnd={handleScrollEnd} // Use the onScrollEnd prop
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />
      {/* Pagination */}
      <Pagination.Basic
        progress={progress}
        data={slides}
        dotStyle={styles.dot}
        containerStyle={styles.paginationContainer}
        onPress={onPressPagination}
      />
      {/* Close Button */}
      <Text style={styles.closeButtonContainer}>
        <Text style={styles.closeButtonText} onPress={onClose}>
          Алгасах
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "cover",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  closeButtonContainer: {
    position: "absolute",
    bottom: 40,
    left: 20, // Aligns the button to the bottom-left corner
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10, // Border radius applied here
  },

  closeButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default SlideShow;
