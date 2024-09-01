import React from "react";
import { StyleSheet, Image } from "react-native";

const image1 = require('../../assets/images/RambleLogo.png');
const image2 = require('../../assets/images/Profile.png');

const styles = StyleSheet.create({
    big: {
        width: 150,
        height: 150,
        marginBottom: 15
    },
    small: {
        width: 100,
        height: 100,
    }
});

const HeadImage = ({ big, small, ramb, prof }) => {
    const imageStyles = [
        big && styles.big,
        small && styles.small
    ];

    const source = ramb ? image1 : prof ? image2 : null;

    return (
        <Image style={imageStyles} source={source} />
    );
}

export default HeadImage;