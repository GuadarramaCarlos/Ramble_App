import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from '@env';
import { handleSupport } from "../../util/controler/ControlerSupport";
import Button from "../components/Button";
import Input from "../components/Input";
import StyledText from "../components/StyledText";
import HeadImage from "../components/HeadImage";
import FormContainer from "../components/FormContainer";

const Support = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [description, setDescription] =  useState("");
    const [selected, setSelected] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://ramble-backend-soporte-production.up.railway.app/api/support/temas/list`)
        .then((response) => {
            let newArray = response.data.map((item) => {
                return { key: item.id, value: item.tipoTicket };
            });
        setData(newArray);
        })
        .catch((error) => {
            console.error("Error al obtener los tipos de ticket en Support",error);
            console.error("Detalles del error", error.response);
        });
    }, []);

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
                setEmail(correo);
            })
            .catch(error => {
                console.error("Error al obtener datos de perfil en Support:", error);
                console.error("Detalles del error", error.response);
            });
    }, []);

    const handleFormSubmit = () => {
        handleSupport(email,selected,description,navigation)
    };

    return (
        <FormContainer>
            <HeadImage big ramb/>
            <StyledText type='title' size='extrabig' font="SenBold">Soporte Técnico</StyledText>
            <View style={styles.inputContainer}>
                <Input value={email} onChangeText={setEmail} security={false}>Correo</Input>
                <StyledText type="input" size="small">Asunto</StyledText>
                <SelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    save="value"
                    boxStyles={{backgroundColor:"#fff", marginBottom:10}}
                    dropdownStyles={{backgroundColor:"#fff"}}
                    fontFamily="Sen"
                    search={false}
                    placeholder="Selecciona un asunto"
                />
                <Input value={description} onChangeText={setDescription} security={false}>Descripción</Input>
            </View>
            <View style={styles.buttonContainer}>
                <Button button1 onPress={handleFormSubmit}>Enviar</Button>
                <View style={{marginHorizontal:10}}/>
                <Button button3 onPress={() => navigation.navigate("Faq")}>Cancelar</Button>
            </View>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width:"100%",
        justifyContent:"center"
    },
    inputContainer: {
        width: '100%',
        marginVertical: 20
    }
});

export default Support;
