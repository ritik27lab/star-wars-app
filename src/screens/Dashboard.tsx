import React, { useState, useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform,
    Share,
    Alert,
    TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import { Entypo, Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

import { StatusBarComponent } from "./components/StatusBarComponent";
import { StarWarsImage } from "./components/StarWarsImage";
import { NotificationIcon } from "./assets/svg";
import { TabViewComponent } from "./TabViewScreens/TabViewComponent";

export const Dashboard = () => {
    const { userData } = useSelector((state: any) => ({
        userData: state.store.usersArr,
    }));
    const [localStorageData, setLocalStorageData] = useState<any>();

    return (
        <View
            style={{
                backgroundColor: "#fff",
                flex: 1,
                height: "100%",
            }}
        >
            <StatusBarComponent />
            <View
                style={{
                    backgroundColor: "#181818",
                    height: Platform.OS == "ios" ? 220 : 160,
                    flex: 1,
                }}
            >
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "90%",
                            alignSelf: "center",
                            marginTop: Platform.OS == 'ios'? 65: 35,
                        }}
                    >
                        <StarWarsImage />
                        <NotificationIcon top={5} />
                    </View>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search characters"
                            placeholderTextColor="#A4A9B5"
                        />
                        <Ionicons name="search" size={20} color="#A4A9B5" />
                    </View>
                </View>
                <TabViewComponent />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    listheaderTitle: {
        fontFamily: "Quantico-BoldItalic",
        width: "18%",
        marginLeft: "4%",
        marginVertical: "2%",
    },

    userDataContainer: {
        flexDirection: "row",
        height: "45%",
        paddingHorizontal: 10,
        alignItems: "center",

        marginTop: Platform.OS == "ios" ? 30 : 10,
        width: "100%",
        justifyContent: "space-between",
    },
    imageStyle: {
        height: 82,
        width: 82,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 41,
        // zIndex: 0,
        marginTop: "5%",
        marginLeft: "5%",
    },
    welcomeText: {
        alignSelf: "center",
        marginHorizontal: 20,
        paddingBottom: 10,
        color: "#fff",
        fontFamily: "Quantico-BoldItalic",
        fontSize: 20,
    },
    searchContainer: {
        marginVertical: 25,
        width: "90%",
        height: 36,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#FFF",
    },
    input: {
        flex: 1,
        height: 40,
    },
    searchIcon: {
        paddingRight: 10,
    },
});
