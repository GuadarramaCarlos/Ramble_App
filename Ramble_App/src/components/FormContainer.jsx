import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import Constants from "expo-constants";

const defImage = require('../../assets/images/backgroundimagefour.jpg');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

const FormContainer = ({ children, image }) => {
    const backgroundImage = image ? image : defImage;
    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.imageBackground}>
                {children}
            </ImageBackground>
        </View>
    );
}

export default FormContainer;