import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';

export default function FavChats({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favoris</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"/>
        </View>
    );
}

const theme = {
    roundness: 20
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    search: {
        marginHorizontal: 30,
        width: '80%',
        height: '20%',
        backgroundColor: '#E6E6E6'
    }
});
