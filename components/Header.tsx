import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  Animated,
} from "react-native";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [panResponder, setPanResponder] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
        const dx = Math.min(gestureState.dx, 0);
        menuTranslateX.setValue({ x: dx, y: 0 });
      },
      onPanResponderRelease: (evt, gestureState) => {
        const screenWidth = Dimensions.get("window").width;
        const currentX = menuTranslateX.x._value;
        console.log(currentX, screenWidth);
        if (currentX > -110) {
          handlePress();
        } else {
          Animated.timing(menuTranslateX, {
            toValue: { x: -menuWidth * 2, y: 0 },
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setIsExpanded(false);
          });
        }
      },
    })
  );
  const screenWidth = Dimensions.get("window").width;
  const menuHeight = screenWidth * 10;
  const menuWidth = screenWidth * 0.6;

  const menuTranslateX = useRef<Animated.ValueXY>(
    new Animated.ValueXY({ x: -menuWidth, y: 0 })
  ).current;
  const menuOpacity = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (isExpanded) {
      Animated.parallel([
        Animated.timing(menuTranslateX, {
          toValue: { x: -menuWidth, y: 0 },
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(menuOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setIsExpanded(false));
    } else {
      setIsExpanded(true);
      Animated.parallel([
        Animated.timing(menuTranslateX, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(menuOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const menuStyles = [
    styles.menuContainer,
    {
      height: menuHeight,
      width: menuWidth,
      transform: [
        {
          translateX: menuTranslateX.x,
        },
      ],
      opacity: menuOpacity,
    },
  ];

  return (
    <View
      style={[styles.container, isExpanded && { top: 0, left: 0, padding: 30 }]}
    >
      <TouchableOpacity
        style={styles.menuButtonContainer}
        onPress={handlePress}
      >
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Animated.View style={menuStyles} {...panResponder.panHandlers}>
        <Text style={styles.menuItem}>Item 1</Text>
        <Text style={styles.menuItem}>Item 2</Text>
        <Text style={styles.menuItem}>Item 3</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 999,
    backgroundColor: "transparent",
    borderRadius: 50,
    padding: 3,
  },
  menuButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  menuContainer: {
    position: "absolute",
    backgroundColor: "white",
    padding: 16,
  },
  menuItem: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default Header;
