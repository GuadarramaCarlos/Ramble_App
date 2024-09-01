import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import FormContainer from '../components/FormContainer';
import HeadImage from '../components/HeadImage';
import StyledText from '../components/StyledText';

const image = require('../../assets/images/backgroundimage.png');

const Main = () => {
    const navigation = useNavigation();

    useEffect(() => {
        checkTokenAndNavigate();
    }, []);

    const checkTokenAndNavigate = async () => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
            navigation.navigate('NavHome');
            navigation.reset({
                index: 0,
                routes: [{ name: 'NavHome' }],
            })
        }
    };

    return (
        <FormContainer image={image}>
            <HeadImage big ramb />
            <StyledText type='title' size='extrabig' font='Artifika'>Descubre lugares nuevos</StyledText>
            <StyledText>Explora eventos y atracciones interesantes, selecciona el que más te convenga</StyledText>
            <View style={styles.buttoncontainer}>
                <Button button1 onPress={() => navigation.navigate("Login")}>Iniciar Sesión</Button>
                <Button onPress={() => navigation.navigate("Register")}>Regístrate</Button>
            </View>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    buttoncontainer:{
        marginTop: 20
    },
});

export default Main;