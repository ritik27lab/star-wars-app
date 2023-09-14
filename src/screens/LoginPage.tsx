import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";

export const LoginPage = ({ navigation }) => {
    const handleLogin = () => {
        navigation.navigate("Dashboard");
    };
    setTimeout(() => handleLogin(), 4000)

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#181818",
            }}
        >
            <FastImage
                style={styles.logoImage}
                source={require("./assets/images/starwarslogo.png")}
            />
            <FastImage
                style={styles.dummyImage}
                source={require("./assets/images/starwarsdummyimage.png")}
            />

            <Text style={styles.welcomeText}>Welcome to Star Wars Dashboard</Text>

            <Text style={styles.subText}>
                Star Wars is an American epic space opera multimedia franchise created
                by George Lucas, which began with the eponymous 1977 film and quickly
                became a worldwide pop culture phenomenon.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    logoImage: {
        height: 92,
        width: 199,
        alignSelf: "center",
        marginTop: "25%",
    },
    welcomeText: {
        fontFamily: "OpenSans-Regular",
        fontSize: 22,
        color: "#fff",
        fontWeight: "700",
        lineHeight: 24,
        width: "90%",
        letterSpacing: 0.15,
        alignSelf: "center",
        marginVertical: 25,
    },
    subText: {
        fontFamily: "OpenSans-Regular",
        fontSize: 14,
        lineHeight: 20,
        color: "#fff",
        opacity: 0.55,
        width: "90%",
        alignSelf: "center",
        letterSpacing: 0.15,
    },
    dummyImage: {
        height: "25%",
        width: "90%",
        alignSelf: "center",
        marginTop: "25%",
        borderRadius: 8,
    },
});
