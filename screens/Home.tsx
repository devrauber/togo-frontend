import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import arrayDeObjetos from "../mocks/mockEvents";
import colors from "../global";

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

const Home: React.FC = () => {
  const [location, setLocation] = useState<ILocation>({} as ILocation);
  const [errorMsg, setErrorMsg] = useState("");

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
              width: 40,
              height: 40,
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

      setLocation(location);
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
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
