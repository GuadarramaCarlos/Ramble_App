import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import StyledText from "./StyledText";

const image = require('../../assets/images/Rectangle91.png');

const styles = StyleSheet.create({
    TopContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 100
    },
})

export default function Header({title}) {
    return(
        <View>
            <ImageBackground source={image} resizeMode="cover" style={styles.TopContainer}>
                <StyledText type="text" font="SenBold" size="big">{title}</StyledText>
            </ImageBackground>
        </View>
    )
}