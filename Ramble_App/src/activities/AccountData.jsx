import React, { useState } from "react";
import { StyleSheet, View, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { handleAccountData } from "../../util/controler/ControlerAccountData";
import Button from "../components/Button";
import Confirmation from "../components/Confirmation";
import FormContainer from "../components/FormContainer";
import HeadImage from "../components/HeadImage";
import Input from "../components/Input";
import StyledText from "../components/StyledText";

const AccountData = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const verification = () => {
        if(email.trim() == "" && password.trim() == ""){
            Alert.alert("No se han hecho cambios")
            return;
        }
        return setModalVisible(true)
    }

    const handleFormSubmit = () => {
        handleAccountData(email, password, navigation)
        setModalVisible(false);
    };

    return (
        <FormContainer>
            <HeadImage big prof/>
            <StyledText type='title' size='extrabig'>Información de la cuenta</StyledText>
            <View style={styles.inputContainer}>
                <Input value={email} onChangeText={setEmail} security={false}>Correo</Input>
                <Input value={password} onChangeText={setPassword} security={true}>Nueva Contraseña</Input>
            </View>
            <View style={styles.buttonContainer}>
                <Button button1 onPress={verification}>Editar</Button>
                <Confirmation visible={modalVisible} onClose={() => setModalVisible(false)} onConfirm={handleFormSubmit} text="¿Estás seguro de los cambios?"/>
            </View>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width:'100%'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        marginTop: 20
    }
});

export default AccountData;