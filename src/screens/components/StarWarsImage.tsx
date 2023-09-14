
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";


export const StarWarsImage = () => {

    return (
        <FastImage
            style={{
                height: 30, width: 68,
                //  marginTop: 60,
                //  marginLeft: 16
            }}
            source={require("../assets/images/starwarslogo.png")}
        />
    )
}
