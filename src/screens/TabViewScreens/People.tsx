import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import FastImage from "react-native-fast-image";
import axios from "axios";

export const People = () => {
    const [peopleData, setPeopleData] = useState([]);
    const [homeworldNames, setHomeworldNames] = useState({});

    useEffect(() => {
        axios
            .get("https://swapi.dev/api/people/") // Fetch data from the SWAPI
            .then((response) => {
                setPeopleData(response.data.results);

                const homeworldURLs = response.data.results.map( //running a map over the response to get the homeworld urls
                    (item: any) => item.homeworld //it'll save the urls in the homeworldURLs
                );
                fetchHomeworldNames(homeworldURLs); // Extract homeworld URLs
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const fetchHomeworldNames = async (urls: any) => { //urls in array form
        try {
            const cachedNames = { ...homeworldNames }; // Create a cache memory for fetch homeworld names

            const fetchPromises = []; // Create an array to collect promises for fetching names
            for (const url of urls) {
                if (!cachedNames[url]) {
                    // Check if the name is not already cached, if not fetch it
                    fetchPromises.push(
                        axios.get(url).then((response) => {
                            cachedNames[url] = response.data.name; // Store the fetched name in the cache object memory
                        })
                    );
                }
            }
            await Promise.all(fetchPromises); // Wait for all Promises to complete
            setHomeworldNames(cachedNames); // Update the state with the updated cachedNames
        } catch (error) {
            // Handle any errors that occur during the process
            console.error("Error fetching homeworld names:", error);
        }
    };

    const renderCharacter = (item: any) => {
        const homeworldName = homeworldNames[item.item.homeworld] || "Unknown"; //if nothing comes up it'll show Unknown
        return (
            <View style={{ marginLeft: 12, marginVertical: 10 }}>
                <FastImage
                    style={styles.fastImage}
                    source={{ uri: "https://picsum.photos/200" }}
                />
                <Text
                    style={styles.Name}
                >
                    {item.item.name}
                </Text>
                <Text
                    style={styles.subTitle}
                >
                    The character hails from {homeworldName}, born on{" "}
                    {item.item.birth_year}
                </Text>
            </View>
        );
    };

    return (
        <ScrollView
            style={{
                backgroundColor: "#FFFFFF",
                flex: 1,
                // height: "100%",


            }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <Text
                    style={styles.heading}
                >
                    Popular Characters
                </Text>
                <FlatList
                    horizontal
                    data={peopleData}
                    renderItem={(item) => renderCharacter(item)}
                    showsHorizontalScrollIndicator={false}
                />
                <Text
                    style={styles.heading}
                >
                    All Characters
                </Text>
                <FlatList
                    horizontal
                    data={peopleData}
                    renderItem={(item) => renderCharacter(item)}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    fastImage: {
        height: 141,
        width: 141,
        backgroundColor: "red",
        borderRadius: 10,
        marginHorizontal: 10,
    },
    Name: {
        fontSize: 16,
        fontFamily: "Inter",
        lineHeight: 16,
        marginHorizontal: 12,
        fontWeight: "700",
        marginVertical: 7,
    },
    subTitle: {
        width: 141,
        marginLeft: 10,
        textAlign: "left",
        fontSize: 12,
    }, heading: {
        fontSize: 18,
        fontFamily: "Inter-Regular",
        fontWeight: "700",
        marginLeft: 25,
        marginVertical: 10,
    }


})