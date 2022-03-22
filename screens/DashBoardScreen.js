import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class DashBoard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>DashBoard</Text>
            </View>
        );
    }
}
export default DashBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});