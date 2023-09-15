import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";
import axios from "axios";

export const People = () => {
    const [peopleData, setPeopleData] = useState([]);
    const [homeworldNames, setHomeworldNames] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState<any>({});

    const handlePopUp = () => {
        setModalVisible(true);
    };

    const CustomModal = ({ isVisible, onClose, item, homeworldName }) => {
        return (
            <Modal
                isVisible={isVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationOutTiming={800}
                backdropColor="#000002"
                backdropOpacity={0.6} // Set the backdrop opacity
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <FastImage
                        style={styles.image}
                        source={{ uri: "https://picsum.photos/200" }}
                    />
                    <View style={styles.content}>
                        <Text style={styles.title}>{item?.name}</Text>
                        <Text style={styles.subtitle}>{homeworldName}</Text>
                        <Text style={styles.description}>
                            The character hails from {homeworldName}, born on{" "}
                            {item?.birth_year}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Got it</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const peopleResponse = await axios.get("https://swapi.dev/api/people/");
                const peopleData = peopleResponse.data.results;
                setPeopleData(peopleData);

                const homeworldURLs = peopleData.map((item) => item.homeworld);
                const homeworldNames = await fetchHomeworldNames(homeworldURLs);
                setHomeworldNames(homeworldNames);

                console.log("Homeworld Names:", homeworldNames);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const fetchHomeworldNames = async (homeworldURLs) => {
        try {
            const homeworldResponses = await Promise.all(

                homeworldURLs.map((url: any) =>
                    axios.get(url).catch((error) => {
                        console.error(`Error fetching homeworld: ${error.message}`);
                        return { data: { name: "Unknown" } }; // Return a default value in case of an error
                    })
                )
            );

            const homeworldNames = homeworldResponses.map((response) => response.data.name);
            return homeworldNames;
        } catch (error) {
            console.error("Error fetching homeworld names:", error);
            return [];
        }
    };


    const renderCharacter = (item: any) => {
        const homeworldName = homeworldNames[item.item.homeworld] || "Unknown"; //if nothing comes up it'll show Unknown
        return (
            <TouchableOpacity
                onPress={() => {
                    handlePopUp(),
                        setModalData({
                            item: item.item,
                            homeworldName: homeworldName,
                        });
                }}
                style={{ marginLeft: 12, marginVertical: 10 }}
            >
                <FastImage
                    style={styles.fastImage}
                    source={{ uri: "https://picsum.photos/300" }}
                />
                <Text style={styles.Name}>{item.item.name}</Text>

                <Text style={styles.subTitle}>
                    The character hails from
                    {/* {homeworldName} */}
                    {homeworldNames[item.homeworld] || "  Unknown"}
                    , born on{" "}
                    {item.item.birth_year}
                </Text>

                <CustomModal
                    isVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    item={modalData?.item} // Pass the dynamic item data as a prop 
                    homeworldName={homeworldName} // Pass the homeworldName as a prop
                />
            </TouchableOpacity>
        );
    };


    return (
        <ScrollView
            style={{
                backgroundColor: "#FFFFFF",
                flex: 1,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <Text style={styles.heading}>Popular Characters</Text>
                <FlatList
                    horizontal
                    data={peopleData}
                    renderItem={(item) => renderCharacter(item)}
                    showsHorizontalScrollIndicator={false}
                />
                <Text
                    style={[styles.heading, { position: "absolute", marginTop: 300 }]}
                >
                    All Characters
                </Text>
                <FlatList
                    horizontal
                    data={peopleData}
                    renderItem={(item) => renderCharacter(item)}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 60 }}
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
    },
    heading: {
        fontSize: 18,
        fontFamily: "Inter-Regular",
        fontWeight: "700",
        marginLeft: 25,
        marginVertical: 10,
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 16,
        width: 325,
        height: 388,
        alignSelf: "center",
    },
    image: {
        width: "100%",
        height: 172,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    content: {
        marginLeft: 15,
    },
    title: {
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: "700",
        marginTop: 15,
    },
    subtitle: {
        color: "#0062FF",
        fontSize: 14,
        lineHeight: 19,
        marginVertical: 5,
    },
    description: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: "Inter",
        fontWeight: "400",
        width: "95%",
        marginVertical: 15,
    },
    button: {
        width: "90%",
        height: 45,
        backgroundColor: "#0062FF",
        borderRadius: 8,
        alignSelf: "center",
        justifyContent: "center",
        marginVertical: 10
    },
    buttonText: {
        fontWeight: "600",
        fontSize: 16,
        fontFamily: "Inter",
        color: "#fff",
        alignSelf: "center",
    },
});
