import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from 'expo-constants';
import EventItem from "../components/EventItem";
import Header from "../components/Header";
import NotFound from "../components/NotFound";
import StyledText from "../components/StyledText";

const PrecouterScreen = () => {
    const navigation = useNavigation();
    const db = useSQLiteContext();
    const [events, setEvents] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    async function getData(userId) {
        const sql = `SELECT id_evento FROM Precotizador WHERE id_usuario = ?`;
        try {
            const result = await db.getAllAsync(sql, [userId]);
            if (result.length === 0) {
                return [];
            } else {
                const idEventos = result.map(row => row.id_evento);
                return idEventos;
            }
        } catch (error) {
            console.error(`Error recuperando los datos locales de la userId ${userId}:`, error);
            console.error(`Detalles del error:`, error.response);
            return [];
        }
    }
    
    async function getEvents(idEventos) {
        if (idEventos.length === 0) return [];
        const placeholders = idEventos.map(() => '?').join(',');
        const sql = `SELECT * FROM Evento WHERE id IN (${placeholders})`;
        try {
            const result = await db.getAllAsync(sql, idEventos);
            if (result.length === 0) {
                return [];
            } else {
                return result;
            }
        } catch (error) {
            console.error(`Error recuperando eventos relacionados con la id_evento ${idEventos}:`, error);
            console.error("Detalles del error", error.response);
            return [];
        }
    }
    
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
            .then(async (response) => {
                const userId = response.data.sub;
                const idEventos = await getData(userId);
                const eventos = await getEvents(idEventos);
                setEvents(eventos);
                const total = eventos.reduce((sum, event) => sum + event.precioProm, 0);
                setTotalPrice(total);
            })
            .catch(error => {
                console.error("Error al obtener datos en Itinerary:", error);
                console.error("Detalles del error:", error.response);
            });
    }, []);
    
    return (
        <View style={styles.mainContainer}>
            <Header title="Precotizador"/>
            <View style={styles.content}>
                <View style={styles.lista}>
                    {events.length > 0 ? (
                    <FlatList
                    data={events}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (<EventItem item={item} navigation={navigation}/>)}
                    />
                    ) : (
                        <NotFound text="No tienes eventos en el precotizador, prueba agregando unos cuantos para calcular su coste aproximado"/>
                    )}
                </View>
            </View>
            <View style={styles.footer}>
                <StyledText type="text" color="black">Total estimado</StyledText>
                <StyledText type="text" color="black" font="SenBold">{totalPrice} mxn</StyledText>
            </View>
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
        paddingVertical: 5,
        borderTopColor: "#000",
        borderTopWidth: 1,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    lista: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});

export default PrecouterScreen;