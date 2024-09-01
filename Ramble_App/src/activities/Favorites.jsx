import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from '@env';
import EventItem from "../components/EventItem";
import Header from "../components/Header";
import NotFound from "../components/NotFound";

const FavScreen = () => {
    const navigation = useNavigation();
    const [events, setEvents]=useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem("authToken")
        .then(token => {
            if (!token) {
                throw new Error("No se ha encontrado el token de autenticación en AsyncStorage");
            }
            return axios.get(`https://ramble-backend-production.up.railway.app/api/auth/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        })
        .then(response => {
            return axios.get(`https://ramble-backend-production.up.railway.app/api/favoritos/user/${response.data.sub}`);
        })
        .then(responses => {
            setEvents(responses.data);
        })
        .catch(error => {
            console.error("Error al obtener datos en Favoritos: ", error);
            console.error("Detalles del error: ", error.response);
        });
    }, []);
    
    return (
        <View style={styles.mainContainer}>
            <Header title="Favoritos"/>
            <View style={styles.content}>
                {events.length > 0 ? (
                <FlatList
                data={events}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (<EventItem item={item} navigation={navigation}/>)}
                />
                ) : (<NotFound text="No hay eventos guardados como favoritos, explora eventos que te interesen para agregarlos aquí"/>)}
            </View>
            <View style={styles.footer}/>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 20
    },
    footer: {
        marginTop:10,
        paddingHorizontal: 15,
    },
    mainContainer: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    }
});

export default FavScreen;