import * as React from 'react';
import {StyleSheet, Button} from 'react-native';

import {Text, View} from '../components/Themed';
import DisconnectButton from '../components/Disconnect';
import CreateGroupsButton from '../components/CreateGroupButton';

export const GroupsChats = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Groupes</Text>
            <View style={styles.float}>
                <CreateGroupsButton navigation={props.navigation}/>
                <DisconnectButton/>
                <Button
                    style={styles.button}
                    title={"+ Créer un nouveau groupe"}
                    onPress={() => {
                    CreateGroups()
                }}/>
            </View>
        </View>
    )
}

const theme = {
    roundness: 20
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    float: {
        position: "absolute",
        bottom: '8%',
        right: 0
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        flex: 1,
        alignItems: "flex-end",
        borderRadius: 1000
    }
});
