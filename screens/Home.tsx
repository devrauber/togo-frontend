import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import arrayDeObjetos from "../mocks/mockEvents";
import colors from "../global";
import SideMenu from "../components/SideMenu";
import { Entypo } from "@expo/vector-icons";
import SidebarMenuContent from "../components/SidebarMenuContent";
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface ILocation {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
}

type DrawerNavigatorParams = {
  SettingsScreen: undefined;
}

type SettingsScreenProps = {
  navigation: DrawerNavigationProp<DrawerNavigatorParams, 'SettingsScreen'>;
}

const Home: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [location, setLocation] = useState<ILocation>({} as ILocation);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);

  const LATITUDE_DELTA = 0.05;
  const LONGITUDE_DELTA = 0.05;

  function renderMarkers(arrayDeObjetos: any[]) {
    return arrayDeObjetos.map((objeto) => (
      <Marker
        key={objeto.id}
        coordinate={{ latitude: objeto.latitude, longitude: objeto.longitude }}
        title={objeto.title}
        description={objeto.shotDescription}

      >
        <View style={styles.marker}>
          <Image
            source={objeto.img}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </Marker>
    ));
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setLocation(location as ILocation);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && location.coords && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Circle
            radius={300}
            fillColor="rgba(167, 149, 245, 0.5)"
            strokeWidth={0}
            center={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
          {renderMarkers(arrayDeObjetos)}
        </MapView>
      )}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 60,
    height: 60,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    position: "absolute",
    top: 60,
    left: 30,
    backgroundColor: "#FFF",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  menuButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  callout: {
    width: 2000,
  }
});

export default Home;
