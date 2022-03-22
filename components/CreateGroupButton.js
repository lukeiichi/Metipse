import React from "react";
import {View, StyleSheet, Button} from "react-native";
import {createGroups} from "../config/firebase";

const CreateGroupsButton = (props) => (
    <View style={styles.container}>
        <Button
            title={"Reformer les groupes"}
            onPress={() => {
            createGroups(props.navigation)
        }}/>
    </View>
)
export default CreateGroupsButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});