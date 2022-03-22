import React, {Component} from "react";
import {View, StyleSheet, ActivityIndicator} from "react-native";
import firebase from "firebase";

class Loading extends Component {
    componentDidMount() {
        this.CheckIfLoggedIn();
    }
    
    CheckIfLoggedIn = () => {
        firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this
                        .props
                        .navigation
                        .navigate('Root')
                } else {
                    this
                        .props
                        .navigation
                        .navigate('Auth')
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="0000ff"/>
            </View>
        );
    }
}
export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});