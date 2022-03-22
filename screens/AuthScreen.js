import React, {Component} from "react";
import {View, Text, Button, StyleSheet, Date} from "react-native";
import * as firebase from 'firebase';
import {Input} from 'react-native-elements';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

class Authentification extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({email: '', mdp: '', pseudo: ''})
    }


    /**
     * Fonction permettant d'enregistrer un nouvel utilisateur
     */
    signUp = (email, mdp, pseudo) => {
        var db = firebase
            .firestore()
            .collection('Users');
        try {
            if (pseudo == '') {
                alert("Veuillez entrez un pseudo avant de valider");
                return;
            }
            if (mdp.length < 6) {
                alert("Désolé, votre mot de passe doit contenir plus de 6 caractères");
                return;
            }
            //Créé un utilisateur pour l'authentification
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, mdp)
                .then(() => {
                    //Créér un user dans la base de donnée
                    // *! Attribuer un groupe pas tout le temps le 0 !*
                    db
                        .doc(firebase.auth().currentUser.uid)
                        .set({Email: email, Mdp: mdp, Groupe: 0, Pseudo: pseudo})
                })
        } catch (error) {
            console.log(error.toString());
        }
    }  

    logIn = async(email, mdp) => {
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, mdp)
                .then(() => {
                        this
                            .props
                            .navigation
                            .navigate('Root')
                })
        } catch (error) {
            console.log(error.toString());
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Pseudo</Text>
                <Input
                    placeholder="saisissez votre pseudo"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(pseudo) => this.setState({pseudo})}/>
                <Text>E-mail</Text>
                <Input
                    placeholder="saisissez votre e-mail"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(email) => this.setState({email})}/>
                <Text>Mot de passe</Text>
                <Input
                    secureTextEntry={true}
                    placeholder="saisissez votre mot de passe"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(mdp) => this.setState({mdp})}/>
                <Text>Confirme ton mot de passe</Text>
                <Input
                    secureTextEntry={true}
                    placeholder="saisissez de nouveau votre mot de passe"
                    autoCapitalize="none"
                    autoCorrect={false}/>
                <Button
                    title="Sign up"
                    onPress={() => this.signUp(this.state.email, this.state.mdp, this.state.pseudo)}/>
                <Button
                    title="Log In"
                    onPress={() => this.logIn(this.state.email, this.state.mdp)}/>
            </View>
        );
    }
}

export default Authentification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    }
});