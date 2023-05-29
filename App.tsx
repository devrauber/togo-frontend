import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import {
  DrawerNavigationState,
  NavigationContainer,
  ParamListBase,
} from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { useState } from "react";
import Settings from "./components/Settings";
import colors from "./global";
import { AntDesign } from "@expo/vector-icons";
import Footer from "./components/Footer";
import SignUp from "./screens/SignUp";

const Drawer = createDrawerNavigator();

interface CustomDrawerContentProp {
  loggedIn: boolean;
  navigation: any;
}

const CustomDrawerContent = ({
  loggedIn,
  navigation,
  ...props
}: CustomDrawerContentProp) => {
  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        {loggedIn ? (
          <TouchableOpacity>
            <Image
              style={styles.avatar}
              source={require("./screens/assets/LogoG.png")}
            />
            <Text style={styles.username}>John Doe</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}
          >
            <Text style={styles.loginButtonText}>
              Parece que você ainda não está logado! Clique em mim para logar
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <DrawerItemList
        state={{} as DrawerNavigationState<ParamListBase>}
        navigation={{ ...navigation }}
        descriptors={{}}
        {...props}
      />
    </DrawerContentScrollView>
  );
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#f0f0f0",
            width: "60%",
          },
          drawerActiveTintColor: colors.redLogo,
          drawerInactiveTintColor: colors.orangeLogo,
          drawerActiveBackgroundColor: colors.orangeLogo,
        }}
        initialRouteName="Home"
        drawerContent={(props) => (
          <CustomDrawerContent {...props} loggedIn={loggedIn} />
        )}
      >
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Configurações" component={Settings} />
      </Drawer.Navigator>
      <Footer onPress={() => null} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
