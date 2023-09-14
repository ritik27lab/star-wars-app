import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import axios from "axios";
import FastImage from "react-native-fast-image";
import { MenuIcon } from "../assets/svg";

export const Films = () => {
    const [fimlsData, setFilmsData] = useState();

    useEffect(() => {
        // Fetch data from the SWAPI
        axios
            .get("https://swapi.dev/api/films/")
            .then((response) => {
                setFilmsData(response.data.results);
                console.log("response", response.data.results);

                // setHomeTown()
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const FilmCard = (item: any) => {
        return (
            <View style={{ marginLeft: 10, marginVertical: 15 }}>
                <FastImage
                    style={styles.fastImage}
                    source={{ uri: "https://picsum.photos/400" }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', marginTop: 10 }}>
                        <View
                            style={styles.releaseDataView}
                        >
                            <Text
                                style={styles.releaseText}
                            >
                                {item.item.release_date}
                            </Text>

                        </View>
                        <TouchableOpacity onPress={() => console.log('YESS')}>
                            <MenuIcon /></TouchableOpacity>
                    </View>
                </FastImage>

                <Text style={styles.title}>{item.item.title}</Text>
                <Text numberOfLines={2} style={[styles.subTitle, { fontSize: 14 }]}>
                    {item.item.opening_crawl}
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
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <FlatList
                data={fimlsData}
                renderItem={(item) => <FilmCard item={item.item} />}
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
        height: 168,
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
