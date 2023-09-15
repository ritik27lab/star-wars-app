
//Planets.tsx
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import axios from "axios";
import { MenuIcon } from "../assets/svg";
export const Planets = () => {

    const [planetsData, setPlanetsData] = useState()

    useEffect(() => {
        axios
            .get("https://swapi.dev/api/planets/") // Fetch data from the SWAPI
            .then((response) => {
                setPlanetsData(response.data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);




    const PlanetCard = (item: any) => {
        return (
            <View style={{ marginLeft: 10, marginVertical: 15 }}>
                <FastImage
                    style={styles.fastImage}
                    source={{ uri: "https://picsum.photos/400" }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '95%', alignSelf: 'center', marginTop: 10 }}>
                        {/* <View
                            style={styles.releaseDataView}
                        >
                            <Text
                                style={styles.releaseText}
                            >
                                {item.item.name}
                            </Text>

                        </View> */}
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => console.log('YESS')}>
                            <MenuIcon /></TouchableOpacity>
                    </View>
                </FastImage>

                <Text style={styles.title}>{item.item.name}</Text>
                <Text numberOfLines={3} style={[styles.subTitle, { fontSize: 14 }]}>
                    The planet is inhabited by {item.item.population} creatures . The terrain is {item.item.terrain}. With orbital period of {item.item.orbital_period} of around its local star.
                </Text>
                <Text
                    numberOfLines={2}
                    style={[styles.subTitle, { fontSize: 12 }]}
                >
                    {item.item.director}
                </Text>
            </View>
        );
    };



    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            {/* <Text>Planets Screen</Text> */}
            <FlatList
                data={planetsData}
                renderItem={(item) => <PlanetCard item={item.item} />}
                keyExtractor={(item) => item.index}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontFamily: "Inter",
        lineHeight: 16,
        marginHorizontal: 12,
        fontWeight: "700",
        marginTop: 10,
    },
    subTitle: {
        width: "90%",
        fontFamily: "Inter",
        lineHeight: 16,
        marginHorizontal: 12,
        fontWeight: "400",
        marginVertical: 2,
        color: "#667085",
    },
    fastImage: {
        height: 141,
        width: 345,
        backgroundColor: "red",
        borderRadius: 10,
        marginHorizontal: 10,
    },
    releaseDataView: {
        height: 24,
        width: "30%",
        backgroundColor: "#000000",
        opacity: 0.5,
        // marginTop: 10,
        // marginLeft: 10,
        borderRadius: 5,
        justifyContent: "center",
    },
    releaseText: {
        fontSize: 14,
        fontFamily: "Inter",
        color: "#fff",
        alignSelf: "center",
    }

});