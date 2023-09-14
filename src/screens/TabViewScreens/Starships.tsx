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

export const StarShips = () => {
  const [starships, setStarships] = useState();

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/starships/") // Fetch data from the SWAPI
      .then((response) => {
        setStarships(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);





  const StarShipCard = (item: any) => {



    return (
      <View style={{ flex: 1, marginVertical: 5 }}>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#f5f6f8",
            width: "95%",
            alignSelf: "center",
            borderWidth: 1,
            marginVertical: 2,
            borderRadius: 16,
            height: 308,
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
              marginTop: 15,
            }}
          >
            <Text style={styles.title}>{item.item.name}</Text>
            <Flight />
          </View>
          <Text style={{ fontSize: 12, color: "#A4A9B5", marginLeft: 12 ,width: '65%' }}>
            {item.item.model} ● <Text style={{textTransform: 'capitalize', fontSize: 12, color: "#A4A9B5"}}> {item.item.starship_class} </Text>
          </Text>
          <Text numberOfLines={3} style={[styles.subTitle, { fontSize: 14 }]}>
            {/* {item.item.opening_crawl} */}
            The starship starred in $films and was piloted by $pilots.
          </Text>
          {/* <Text numberOfLines={2} style={[styles.subTitle, { fontSize: 12 }]}>
            {item.item.director}
          </Text> */}
          
            <Text style={{ fontSize: 12, color: "#A4A9B5", marginLeft: 12 , alignSelf: 'flex-end' , marginTop: 10 , marginRight: 5}}>
            {item.item.manufacturer} ● <Text style={{textTransform: 'capitalize', fontSize: 12, color: "#A4A9B5"}}> {item.item.hyperdrive_rating} </Text>
          </Text>
           
        </View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={starships}
        renderItem={(item) => <StarShipCard item={item.item} />}
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
    marginTop:15,
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
