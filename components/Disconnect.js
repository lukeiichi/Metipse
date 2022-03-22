import React from "react";
import {View, StyleSheet, Button} from "react-native";
import {disconnect} from "../config/firebase";

//Boutton qui permet de déconnecter un utilisateur
const DisconnectButton = () => (
    <View style={styles.container}>
        <Button
            title={"Déconnecter"}
            onPress={() => {
            disconnect()
        }}/>
    </View>
)
export default DisconnectButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});