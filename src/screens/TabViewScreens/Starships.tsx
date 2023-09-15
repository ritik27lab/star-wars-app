// Starships.js
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import axios from "axios";
import FastImage from "react-native-fast-image";
import { Flight, MenuIcon } from "../assets/svg";
import { useIsFocused } from "@react-navigation/native";

export const StarShips = () => {
    const [starships, setStarships] = useState<any>();
    const [starshipsData, setStarshipsData] = useState([]);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const starshipsResponse = await axios.get("https://swapi.dev/api/starships/");
                const starships = starshipsResponse.data.results;
                setStarships(starships);

                const starshipPromises = starships.map(async (starship) => {
                    try {
                        const filmResponses = await Promise.all(starship.films.map((filmUrl) => axios.get(filmUrl)));
                        const pilotResponses = await Promise.all(starship.pilots.map((pilotUrl) => axios.get(pilotUrl)));

                        const filmNames = filmResponses.map((response) => response.data.title);
                        const pilotNames = pilotResponses.map((response) => response.data.name);

                        return {
                            starship: starship,
                            filmNames: filmNames,
                            pilotNames: pilotNames,
                        };
                    } catch (error) {
                        // Handle errors for individual starships
                        console.error(`Error fetching data for starship ${starship.name}:`, error);
                        return null; // Return null for failed starships
                    }
                });

                const starshipsData = await Promise.all(starshipPromises);

                // Filter out null values for failed starships
                const filteredStarshipsData = starshipsData.filter((data) => data !== null);

                setStarshipsData(filteredStarshipsData);
                console.log("Starships Data:", filteredStarshipsData);
            } catch (error) {
                console.error("Error fetching starships data:", error);
            }
        };

        fetchData();
    }, []);

    const StarShipCard = ({ item, filmNames, pilotNames }) => {

        return (

            <View
                style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#f5f6f8",
                    width: "95%",
                    alignSelf: "center",
                    borderWidth: 1,
                    marginVertical: 2,
                    borderRadius: 16,
                    height: 310,
                    elevation: 5, // Shadow for Android
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                }}
            >

                <FastImage
                    style={styles.fastImage}
                    source={{ uri: "https://picsum.photos/700" }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            width: "95%",
                            alignSelf: "center",
                            marginTop: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={{ alignSelf: "flex-end" }}
                            onPress={() => console.log("YESS")}
                        >
                            <MenuIcon />
                        </TouchableOpacity>
                    </View>
                </FastImage>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "95%",
                        marginTop: 10,
                    }}
                >
                    <Text style={styles.title}>{item.starship.name}</Text>
                    <Flight />
                </View>


                <Text numberOfLines={3} style={[styles.subTitle, { fontSize: 14 }]}>
                    The starship starred in
                    <Text style={{ flexDirection: 'row' }}>{" "}{filmNames.join(", ")}</Text>
                    and was piloted by {pilotNames == '' ? 'Unknown' : pilotNames.join(", ")}.
                </Text>

                <Text style={{ fontSize: 12, color: "#A4A9B5", marginLeft: 12, alignSelf: 'flex-end', marginTop: 20, marginRight: 5 }}>
                    {item.starship.manufacturer} ● <Text style={{ textTransform: 'capitalize', fontSize: 12, color: "#A4A9B5" }}> {item.starship.hyperdrive_rating} </Text>
                </Text>
            </View>

        );
    };


    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>

            <FlatList
                data={starshipsData}
                renderItem={({ item }) => (
                    <StarShipCard
                        item={item}
                        filmNames={item.filmNames}
                        pilotNames={item.pilotNames}
                    />
                )}
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
        // lineHeight: 16,
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
        marginTop: 10,
        color: "#667085",
    },
    fastImage: {
        height: 141,
        // width: 345,
        backgroundColor: "red",
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        // marginHorizontal: 10,
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
    },
});
