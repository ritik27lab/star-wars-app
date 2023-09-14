import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { People } from './People';
import { Films } from './Films';
import { Planets } from './Planets';
import { StarShips } from './Starships'

export const TabViewComponent = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'people', title: 'People' },
        { key: 'films', title: 'Films' },
        { key: 'planets', title: 'Planets' },
        { key: 'starships', title: 'Starships' },
    ]);

    const renderScene = SceneMap({
        people: People,
        films: Films,
        planets: Planets,
        starships: StarShips,
    });

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={styles.tabIndicator}
            style={styles.tabBar}
            tabStyle={styles.tab}
            labelStyle={styles.tabLabel}
            renderLabel={({ route, focused }) => (
                <Text
                    style={[
                        styles.tabLabel,
                        focused ? styles.selectedTabLabel : null,
                    ]}
                >
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
        />
    );
};



const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#181818', // Background color of the tabBar
        width: '100%',
        // marginLeft: 10
    },
    tab: {
        width: 'auto', // Adjust tab width as needed
        bottom: 15,
    },
    tabIndicator: {
        backgroundColor: '#FFFFFF', // Color of the tab indicator (underline)
        bottom: 10, width: 0.5


    },
    tabLabel: {
        color: '#A4A9B5', // Color of the tab label text
        fontSize: 16, // Font size of the tab label text
        fontFamily: 'Inter',
        textTransform: 'capitalize',
        marginHorizontal: 12,
        lineHeight: 25,
        letterSpacing: 0.2
    },
    selectedTabLabel: {
        color: '#ffffff',
    }
});