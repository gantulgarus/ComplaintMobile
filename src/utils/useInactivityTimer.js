import { useEffect, useRef } from "react";
import {
  AppState,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const useInactivityTimer = (onLogout, timeout = 300000) => {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onLogout();
    }, timeout);
  };

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      resetTimer();
    } else if (nextAppState.match(/inactive|background/)) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const TouchWrapper = ({ children }) => (
    <TouchableWithoutFeedback onPress={resetTimer}>
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );

  return TouchWrapper;
};
