import * as firebase from 'firebase'
import {useState} from 'react';
import {getFirestore, setDoc, doc, DocumentReference} from 'firebase/firestore';
import {CommonActions} from '@react-navigation/native';

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBx9Bz50eUv_-KU6VR0Gje5NkRQmpbaUqI",
                authDomain: "metipse.firebaseapp.com",
                projectId: "metipse",
                storageBucket: "metipse.appspot.com",
                messagingSenderId: "231222026761",
                appId: "1:231222026761:web:3a661f735849b96d0eced8"
            })
        }
    }

    checkAuth = () => {
        firebase
            .auth()
            .onAuthStateChanged(user => {
                if (!user) {
                    firebase
                        .auth()
                        .signInAnonymously();
                }
            });
    }

    parse = message => {
        const {user, timestamp, text} = message.val();
        const {key: _id} = message;
        const createAt = new Date(timestamp);

        return {_id, createAt, user, text}
    }
    /*
    get = callback => {
        this
            .db
            .on("child_added", snapshot => callback(this.parse(snapshot)));
    };
/*
    off() {
        this
            .db
            .off();
    };
*/
    get db() {
        return firebase
            .firestore()
            .collection("Chats");
    }

    get currentUserGroup() {
        return db
            .doc(currentUser.id)
            .get("Groupe")
            .id
    }

    get dbGroups() {
        return firebase
            .firestore()
            .collection("Groups");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();

var dbChat = firebase
    .firestore()
    .collection("Chats");

var db = firebase
    .firestore()
    .collection("Users");

var dbGroups = firebase
    .firestore()
    .collection("Groups")

//#endregion

/**
     * Function qui retourne un chiffre au hasard entre 0 et max (exclus)
     * @param {nombre maximum qu'on peut atteindre (exclus)} max
     * @returns un chiffre au hasard
     */
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const addChat = messages => {
    messages.forEach(item => {
        dbChat
            .doc()
            .set({ 
                Text: item.text,
                User: currentUser.uid,
                Timestamp: new Date(),
            }, {merge: true})
    })
}

/**
     * Deconnexion d'un utilisateur sur firebase
     */
export const disconnect = async() => {
    try {
        await firebase
            .auth()
            .signOut();
    } catch (e) {
        console.log(e);
    }
}

/**
     * Création de groupes
     */
export const createGroups = (navigation) => {
    SupprimerUsers(dbGroups)
    var ids = []
    var numberMembers
    var numberGroups
    var reste
    // Récupère toutes les personnes étant dans la base de données
    db
        .get()
        .then(querySnapshot => {
            console.log("en tout : " + querySnapshot.docs.length)
            // Créer le tableau comportant les ids des utilisateurs
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                ids.push(i);
            }

            // Trouve le nombre de membres idéal pour un groupe
            for (var i = 5; i < 8; i++) {
                if (querySnapshot.docs.length % i == 0) {
                    numberMembers = i;
                    i = 8
                }
            }

            // Si jamais on ne trouve pas de nombre juste, je met à 6 par groupes et calcul
            // le reste qui devront être envoyé dans d'autres groupes
            if (numberMembers == null) {
                numberMembers = 6;
                reste = querySnapshot.docs.length - Math.floor(querySnapshot.docs.length / 6) * 6
            }

            numberGroups = Math.floor(querySnapshot.docs.length / numberMembers)
            console.log("groupes: " + numberGroups)
            console.log("restes : " + reste)
            console.log("membres: " + numberMembers)

            // Récupupère tous les utilisateurs de l'application !** pas encore retiré les
            // inactifs **!
            querySnapshot
                .docs
                .map(documentSnapshot => {
                    // Redistribue un id aléatoire différent à chaque utilisateur !* pas encore
                    // enlevé les inactifs *!
                    const number = getRandomInt(ids.length);
                    db
                        .doc(documentSnapshot.id)
                        .set({
                            id: ids[number]
                        }, {merge: true})
                    ids.splice(number, 1)
                })
            /**
         * Retrie les users dans le nouvel ordre des ids
         */
            db
                .orderBy('id')
                .get()
                .then(async documentSnapshot => {
                    // Attribue à chaque user, un groupe en fonction de son nouvel id
                    var numeroUser = 0
                    var numeroGroupe = 0
                    for (var i = 0; i < numberGroups; i++) {
                        // Je créer le bon nombre de groupe
                        dbGroups
                            .doc(i.toString())
                            .set({})
                        for (var y = 0; y < numberMembers; y++) {
                            db
                                .doc(documentSnapshot.docs[numeroUser].id)
                                .set({
                                    Groupe: dbGroups.doc(i.toString())
                                }, {merge: true})
                            numeroUser++
                        }
                    }
                    // Le reste des users ne pouvant pas créer un groupe à eux tout seul
                    for (var i = 0; i < reste; i++) {
                        if (numeroGroupe == numberGroups) {
                            numeroGroupe = 0
                        }
                        db
                            .doc(documentSnapshot.docs[numeroUser].id)
                            .set({
                                Groupe: numeroGroupe
                            }, {merge: true})
                        numeroGroupe++;
                        numeroUser++
                    }

                })
                .then(() => {
                    navigation.dispatch(CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Home'
                            }
                        ]
                    }));
                });

        })
}

export const firstGroup = () => {}

export const getGroupChat = () => {
    const currentUser = getCurrentUser()

    //Trouve les informations de l'utilisateur sur Firestore
    db
        .doc(currentUser.uid)
        .get()
        .then(documentSnapshot => {
            console.log("loelef,el," + documentSnapshot.data().Groupe.toString())
            return documentSnapshot
                .data()
                .Groupe
        })
}

export const getGroup = () => {
    const currentUser = getCurrentUser()

    //Trouve les informations de l'utilisateur sur Firestore
    db
        .doc(currentUser.uid)
        .get()
        .then(documentSnapshot => {
            //Trouve les informations des personnes dans le même groupe que l'utilisateur
            db
                .where("Groupe", "==", documentSnapshot.data().Groupe)
                .where("Pseudo", "!=", documentSnapshot.data().Pseudo)
                .get()
                .then(querySnapshot => {
                    querySnapshot
                        .docs
                        .map(function (documentSnapshot) {
                            var group = []
                            group += documentSnapshot.data()
                        });
                    return "lol"
                })
        })
}

/**
 * Récupère l'utilisateur actuel
 */
export const getCurrentUser = () => {
    return currentUser = firebase
        .auth()
        .currentUser;
}

export const getAllUsers = () => {
    const [users,
        setUsers] = useState([]);

    db
        .get()
        .then(querySnapshot => {
            querySnapshot
                .docs
                .map(function (documentSnapshot) {
                    setUsers(users => [
                        ...users,
                        documentSnapshot.data()
                    ])
                })
                .then(() => {
                    console.log("users: " + users)
                })
        })
        .then(() => {
            return users
        })
}

/**
      * Récupère tous les personnes étant dans le même groupe que l'utilisateur
      * Ne marche pas pour l'instant
      */
export const getUsers = () => {
    var groupe = []

    const currentUser = firebase
        .auth()
        .currentUser;

    //Trouve les informations de l'utilisateur sur Firestore
    db
        .doc(currentUser.uid)
        .get()
        .then(documentSnapshot => {
            //Trouve les informations des personnes dans le même groupe que l'utilisateur
            db
                .where("Groupe", "==", documentSnapshot.data().Groupe)
                .get()
                .then(querySnapshot => {
                    querySnapshot
                        .docs
                        .map(function (documentSnapshot) {
                            //Met à jour le State "groupe"
                            groupe = documentSnapshot.data();
                        })
                })
                .then(() => {
                    return groupe
                })
        })
}

/**
 * Supprime une collection de la base de données Firestore (juste firestore !)
 */

export const SupprimerUsers = (collection) => {
    collection
        .get()
        .then(querySnapshot => {
            querySnapshot
                .docs
                .map(function (documentSnapshot) {
                    collection
                        .doc(documentSnapshot.id)
                        .delete();

                })
        })
        .then(console.log("Toute la collection Groups a été supprimé"))
}