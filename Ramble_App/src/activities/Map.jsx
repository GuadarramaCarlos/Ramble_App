import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { View , StyleSheet } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import Constants from "expo-constants";
import RambleImage from "../../assets/images/RambleMediumLogo.png";
import Header from "../components/Header";
import StyledText from "../components/StyledText";

const MapScreen = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState({latitude: 19.42847, longitude: -99.1276});
  const [showMarker, setShowMarker] = useState(false);
  const [newEvents, setNewEvents] = useState([]);

  useEffect(() => {
    requestLocationPermission();
    const intervalId = setInterval(() => {
      updateUserLocation();
    },  60000 /4 );
    return () => clearInterval(intervalId);
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso denegado");
        setShowMarker(false);
        return;
      }
      updateUserLocation();
    } catch (error) {
      console.error("Error al solicitar permiso de ubicación en Map:", error);
      console.error("Detalles del error:", error.response);
    }
  };

  const updateUserLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setShowMarker(true);
    } catch (error) {
      console.error("Error al obtener la ubicación actual en Map:", error);
      console.error("Detalles del error", error.response);
    }
  };

  const apiKey = "bc4e7e363d1744928900161c65166fe4";

  const getCoordinates = async (event) => {
    const urlGeocoding = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(event.lugar)}&apiKey=${apiKey}`;
    try {
      const response = await axios.get(urlGeocoding);
      const coordenadas = response.data.features[0].geometry.coordinates;
      return { ...event, coordenadas };
    } catch (error) {
      console.error("Error al obtener coordenadas en Map:",error.response?.data || error.message);
      return event;
    }
  };

  const fetchEventsWithCoordinates = async () => {
    try {
      const response = await axios.get("https://ramble-backend-production.up.railway.app/api/events/list");
      const eventos = response.data;
      const eventosConCoordenadas = await Promise.all(eventos.map(async (events) => {return await getCoordinates(events);}));
      setNewEvents(eventosConCoordenadas);
      return eventosConCoordenadas;
    } catch (error) {
      console.error("Error al obtener eventos en Map:",error.response?.data || error.message);
      return [];
    }
  };

  useEffect(() => {
    fetchEventsWithCoordinates();
  }, []);

  const pinEventos = () => {
    return newEvents.map((evento, index) => (
      <Marker key={index} coordinate={{ latitude: evento.coordenadas[1], longitude: evento.coordenadas[0] }} pinColor='#DC2626'>
        <Callout onPress={ () => navigation.navigate("Info",evento)}>
          <View style={{padding:5}}>
            <StyledText type="input" size="small" color="black">{evento.titulo}</StyledText>
            <StyledText color="black" size="small" type="input">{evento.fecha}</StyledText>
            <StyledText color="black" size="small" type="input" font="SenBold">Ver más</StyledText>
          </View>
        </Callout>
      </Marker>
    ));
  };

  return (
    <View style={styles.mainContainer}>
      <Header title="Mapa"/>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={{latitudeDelta: 0.0059, longitudeDelta: 0.000521, latitude: userLocation.latitude, longitude: userLocation.longitude}}>
          {showMarker && (<Marker coordinate={userLocation} image={RambleImage} style={styles.rambleImage} title="Tú"/>)}
          {pinEventos()}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    height: 110,
    alignItems: "center",
    paddingTop: 20,
  },
  mainContainer: {
    marginTop: Constants.statusBarHeight,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    width: "100%",
    height: 647,
    alignContent: "center",
  },
  rambleImage: {
    width: 10,
    height: 10,
  }
});

export default MapScreen;