import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Constants from 'expo-constants';
import { useSQLiteContext } from "expo-sqlite";
import { BACKEND_URL } from '@env';
import { handleAddFavorite, handleDeleteFavorite, handleAddItinerary, handleDeleteItinerary } from "../../util/controler/ControlerEventInfo";
import values from "../styles/values";
import StyledText from "../components/StyledText";
import ToggleButton from "../components/ToggleButton";

const EventInfo = ({ route }) => {
    const { params } = route;
    const { id, titulo, fecha, precio, lugar, descripcion, urlImagen } = params || {};
    const db = useSQLiteContext();
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(true);
    const [isInPrecotizador, setIsInPrecotizador] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (!token) {
                    throw new Error("No se ha encontrado el token de autenticación en AsyncStorage");
                }
                const profileRes = await axios.get(`https://ramble-backend-production.up.railway.app/api/auth/profile`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const response = await axios.get(`https://ramble-backend-production.up.railway.app/api/favoritos/${profileRes.data.sub}/evento/${id}`);
                const data = response.data;
                if (data && Object.keys(data).length !== 0) {
                    setIsFavorite(true);
                } else {
                    setIsFavorite(false);
                }
            } catch (error) {
                console.error("Error al relacionar con favoritos en EventInfo:", error);
                console.error("Detalles del erro", error.response);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const checkPrecotizador = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (!token) {
                    throw new Error("No se ha encontrado el token de autenticación en AsyncStorage");
                }
                const profileRes = await axios.get(`https://ramble-backend-production.up.railway.app/api/auth/profile`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userId = profileRes.data.sub;
                const sql = `SELECT id_evento FROM Precotizador WHERE id_usuario = ? AND id_evento = ?`;
                const result = await db.getAllAsync(sql, [userId, id]);
                if (result.length > 0) {
                    setIsInPrecotizador(true);
                } else {
                    setIsInPrecotizador(false);
                }
            } catch (error) {
                console.error("Error al verificar en el precotizador:", error);
                console.error("Detalles del error:", error.response);
            }
        };
        checkPrecotizador();
    }, [id]);

    const handleAddToFavorite = () => {
        handleAddFavorite(id)
    };
    const handleDeleteToFavorite = () => {
        handleDeleteFavorite(id)
    };
    const handleAddToPrecotizador = async () => {
        handleAddItinerary(id,db)
    };
    const handleRemoveFromPrecotizador = async () => {
        handleDeleteItinerary(id,db)
    };
    
    return (
        <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
            <View style={styles.imageContainer}>
                <ImageBackground source={{ uri: urlImagen }} resizeMode="cover" style={styles.image} />
                <View style={styles.iconContainer}>
                    <ToggleButton IconDefault={<AntDesign name="hearto" size={28} color={values.colors.red_600} />} IconPressed={<AntDesign name="heart" size={28} color={values.colors.red_600} />} messagePressed="Evento agregado a favoritos" messageDefault="Evento eliminado de favoritos" onPressPressed={handleAddToFavorite} onPressDefault={handleDeleteToFavorite} isInitiallyPressed={isFavorite}/>
                </View>
                <View style={styles.iconContainer2}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Ionicons name="arrow-back-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.row2}>
                    <StyledText size="big" type="text" font="SenBold" color="black">{titulo}</StyledText>
                    <ToggleButton IconDefault={<MaterialIcons name="assignment-add" size={28} color="black" />} IconPressed={<MaterialIcons name="assignment" size={28} color="black" />} messagePressed="Evento agregado al precotizador" messageDefault="Evento eliminado del precotizador" onPressPressed={handleAddToPrecotizador} onPressDefault={handleRemoveFromPrecotizador} isInitiallyPressed={isInPrecotizador}/>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="map-marker-outline" size={25} color={values.colors.rose_700} />
                    <View style={{width:"90%"}}><StyledText size="small" color="black" type="text">{lugar}</StyledText></View>
                </View>
                <StyledText size="small" color="black" type="text" >{fecha}</StyledText>
                <View style={styles.row}>
                    <StyledText size="small" color="black" type="text" >Precio {precio}</StyledText>
                </View>
                <View style={styles.horizontalLine} />
                <StyledText size="big" font="SenBold" color="black" type="text">Descripcion</StyledText>
                <ScrollView>
                    <StyledText size="small" color="stone" type="text">{descripcion}</StyledText>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 30,
        paddingTop: 20,
        backgroundColor: values.colors.zinc_300,
        flex: 1,
    },
    horizontalLine: {
        borderBottomColor: '#64748B',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    iconContainer: {
        position: 'absolute',
        top: 30,
        right: 30
    },
    iconContainer2: {
        position: 'absolute',
        top: 30,
        left: 30
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        height: '40%',
        justifyContent: 'flex-end',
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    row2: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default EventInfo;