import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BottomBarProps {
  onPress: (section: number) => void;
}

const Footer: React.FC<BottomBarProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.section}
        onPress={() => onPress(0)}
      >
        <Ionicons name="ios-notifications-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.section, styles.centerSection]}
        onPress={() => onPress(1)}
      >
        <Ionicons name="search-sharp" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.home}
        onPress={() => onPress(2)}
      >
        <MaterialCommunityIcons name="home-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.section}
        onPress={() => onPress(3)}
      >
        <AntDesign name="staro" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.section}
        onPress={() => onPress(4)}
      >
        <Ionicons name="person-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    borderTopColor: 'black',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSection: {
    elevation: 2,
  },
  text: {
    color: 'black',
  },
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 50
  }
});

export default Footer;
