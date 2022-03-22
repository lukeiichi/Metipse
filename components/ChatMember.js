import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from "react-native";

class ChatMember extends Component {
    render() {
        const profilImage = <Image
            style={styles.profil}
            source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'
        }}/>
        return (
            <View style={styles.container}>
                {profilImage}
                <Text>test {this.props.user.Pseudo}</Text>
            </View>
        );
    }
}
export default ChatMember;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profil: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
});