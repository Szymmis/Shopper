import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

class AddGroupButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick} style={styles.container}>
                <Text style={styles.text}>Dodaj kategorię</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderWidth: 3,
        borderColor: "#EBEBEB",
        borderStyle: "dashed",
        marginHorizontal: 5,
    },
    text: {
        color: "#BFBEBE",
        fontStyle: "italic",
        fontSize: 16
    }
});

export default AddGroupButton