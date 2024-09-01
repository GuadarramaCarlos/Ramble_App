import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BACKEND_URL } from '@env';
import { useSQLiteContext } from 'expo-sqlite';
import { handleLogout , handleDelete} from '../../util/controler/ControlerSettings';
import values from '../styles/values';
import Confirmation from '../components/Confirmation';
import FormContainer from '../components/FormContainer';
import HeadImage from '../components/HeadImage';
import SettingButton from '../components/SettingButton';
import StyledText from '../components/StyledText';

const Settings = () => {
    const navigation = useNavigation();
    const db = useSQLiteContext();
    const size = 30;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("authToken")
            .then(token => {
                if (!token) {
                    throw new Error("No se ha encontrado el token de autenticación en AsyncStorage");
                } else {
                    return axios.get(`https://ramble-backend-production.up.railway.app/api/auth/profile`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }
            })
            .then(response => {
                return axios.get(`https://ramble-backend-production.up.railway.app/api/user/${response.data.sub}`);
            })
            .then(data => {
                const { correo } = data.data;
                const nombre = data.data.persona.nombre + " " + data.data.persona.apellido;
                setName(nombre);
                setEmail(correo);
            })
            .catch(error => {
                console.error("Error al obtener datos de perfil en Setting:", error);
                console.error("Detalles del error", error.response);
            });
    }, []);

    const handleButton = () => {
        handleLogout(navigation)
    };

    const handleErrase = () => {
        handleDelete(navigation,db)
        setModalVisible(false)
    };

    return (
        <FormContainer>
            <HeadImage big prof />
            <StyledText type='title' size='big'>{name}</StyledText>
            <StyledText label>{email}</StyledText>
            <View style={styles.buttoncontainer}>
                <SettingButton start onPress={() => navigation.navigate("PersonalData")} text="Editar Datos Personales">
                    <AntDesign name="user" size={size} color="black" />
                </SettingButton>
                <SettingButton start onPress={() => navigation.navigate("AccountData")} text="Editar Información de la Cuenta">
                    <AntDesign name="lock" size={size} color="black" />
                </SettingButton>
                <SettingButton start onPress={() => navigation.navigate("Terms")} text="Términos y condiciones">
                    <Ionicons name="document-lock-outline" size={size} color="black" />
                </SettingButton>
                <SettingButton text="Cerrar Sesión" onPress={handleButton}>
                    <MaterialCommunityIcons name="logout" size={size} color="black" />
                </SettingButton>
            </View>
            <View style={styles.buttoncontainer}>
                <SettingButton start onPress={() => navigation.navigate("About")} text="Acerca de nosotros">
                    <FontAwesome5 name="info-circle" size={size} color="black" />
                </SettingButton>
                <SettingButton start onPress={() => navigation.navigate("Faq")} text="Soporte y Ayuda">
                    <AntDesign name="questioncircle" size={size} color="black" />
                </SettingButton>
                <SettingButton text="Eliminar cuenta" onPress={() => setModalVisible(true)}>
                    <AntDesign name="deleteuser" size={size} color='#DC2626' />
                </SettingButton>
                <Confirmation visible={modalVisible} onClose={() => setModalVisible(false)} onConfirm={handleErrase} text="¿Estás seguro de borrar tu cuenta?"/>
            </View>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    buttoncontainer:{
        marginTop: 20,
        backgroundColor: values.colors.zinc_300,
        width: '85%',
        borderRadius:20
    },
});

export default Settings;