import React from "react";
import { View, Image } from "react-native";
import StyledText from "./StyledText";

const warnImage = require("../../assets/images/WarningBlack.png")

export default function NotFound ({text}) {
    return (
        <View style={{alignItems:'center', marginTop:170}}>
            <Image
            style={{ width: 150, height: 150 }}
            source={warnImage}
            />
            <StyledText color="black">{text}</StyledText>
        </View>
    );
};