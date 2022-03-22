import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Text, View} from '../components/Themed';
import * as firebase from 'firebase'
import ChatMember from '../components/ChatMember';
import ChatPage from './ChatPage';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * Rendu de la liste des membres du groupe
 */
const ListRender = ({user}) => (
    <View>
        <ChatMember></ChatMember>
    </View>
);

export default function MembersChats(props) {
    const [groupe,
        setGroupe] = useState([]);
    const [user,
        setUser] = useState([])

    var db = firebase
        .firestore()
        .collection("Users");

    //#region Communique avec Firestore
    /**
     * Récupère tous les personnes étant dans le même groupe que l'utilisateur
     */
    function getGroup() {
        setUser(firebase.auth().currentUser);
        //Trouve les informations de l'utilisateur sur Firestore
        db
            .doc(user.uid)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.data()) {
                    //Trouve les informations des personnes dans le même groupe que l'utilisateur
                    db
                        .where("Pseudo", "!=", querySnapshot.data().Pseudo)
                        .where("Groupe", "==", querySnapshot.data().Groupe)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot
                                .docs
                                .map(function (documentSnapshot) {
                                    setGroupe(data => [
                                        ...data,
                                        documentSnapshot.data()
                                    ])
                                });

                        })
                }
            })
    }

    // Se lance à chaque mise à jour
    useEffect(() => {
        if (groupe.length == 0) {
            getGroup()
        }
    });

    //#endregion

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Membres {user.Pseudo}</Text>
                <FlatList
                    data={groupe}
                    keyExtractor={(item) => item.Email}
                    renderItem={({item}) => <TouchableOpacity onPress={() => props.navigation.navigate('Conversation')}><ChatMember user={item}></ChatMember></TouchableOpacity>}/>
        </View>
    );
}

const theme = {
    roundness: 20
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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
