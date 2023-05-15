import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View, Animated, PanResponder } from 'react-native';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SideMenu = ({ isVisible, onClose, children }: Props) => {
  const [animation] = useState(new Animated.Value(1));
  const [maxTranslateX] = useState(-300);

  useEffect(() => {
    const initialValue = isVisible ? 1 : 0.5;
    Animated.timing(animation, {
      toValue: initialValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animation, isVisible]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dx < 100,
    onPanResponderMove: (_, gestureState) => {
      let newTranslateX = Math.min(0, gestureState.dx);
      if (gestureState.dx > 0) {
        newTranslateX = 0;
      }
      const newAnimationValue = Math.max(1, 0);
      animation.setValue(newAnimationValue);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (animation._value < 0.5) {
        onClose();
      } else if (animation._value === 1 && gestureState.dx < -250) {
        onClose();
      } else {
        Animated.timing(animation, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          if (animation._value < 0.5) {
            onClose();
          } else {
            isVisible ? onClose() : null;
          }
        });
      }
    },
  });

  const containerStyles = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [maxTranslateX, 0],
        }),
      },
    ],
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.container, containerStyles]} {...panResponder.panHandlers}>
        {children}
      </Animated.View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    padding: 20,
    top: 0,
    bottom: 0,
    left: 0,
    width: '60%',
    height: '100%',
  },
});

export default SideMenu;
