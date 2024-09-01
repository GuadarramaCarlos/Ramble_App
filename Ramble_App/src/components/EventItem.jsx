import React from "react"
import { View, TouchableOpacity, StyleSheet, Image } from "react-native"
import StyledText from "./StyledText"

const defImage = require('../../assets/images/backgroundimagefour.jpg');

const styles = StyleSheet.create({
    image: {
        borderRadius: 15,
        width: "40%",
        backgroundColor: "#1E5367"
    },
    info: {
        padding: 10,
        width: "60%"
    },
    itemContainer: {
        backgroundColor: '#0B1023',
        flexDirection: "row",
        borderRadius: 15,
    },
})

const EventItem=({item , navigation})=>{
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Info", item)}>
        <View style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.urlImagen }} />
            <View style={styles.info}>
                <StyledText type="text" size="small" font="Artifika">{item.titulo}</StyledText>
                <StyledText type="text" size="small">{item.fecha}</StyledText>
                <StyledText type="text" size="small">{item.precio}</StyledText>
                <StyledText type="text" size="small">{item.lugar.match(/[^,]*/)[0]}</StyledText>
            </View>
        </View>
    </TouchableOpacity>
    )
}

export default EventItem;