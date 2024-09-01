import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { handleLogin } from "../../util/controler/ControlerLog"; 
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import HeadImage from "../components/HeadImage";
import Input from "../components/Input";
import StyledText from "../components/StyledText";

const image = require('../../assets/images/backgroundimagetwo.png');

const Login = () => {
    const navigation = useNavigation();
    const db = useSQLiteContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = () => {
        handleLogin(email,password,navigation,db)
    };

    return (
        <FormContainer image={image}>
            <HeadImage big ramb/>
            <StyledText type="title" font="Artifika" size="extrabig">Iniciar Sesión</StyledText>
            <View style={styles.inputContainer}>
                <Input value={email} onChangeText={setEmail} security={false}>Correo Electrónico</Input>
                <Input value={password} onChangeText={setPassword} security={true}>Contraseña</Input>
            </View>
            <View style={styles.buttonContainer}>
                <Button button1 onPress={handleFormSubmit}>Iniciar Sesión</Button>
                <Button onPress={() => navigation.navigate("Register")}>Crear Cuenta</Button>
            </View>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        marginTop: 20
    },
});

export default Login;