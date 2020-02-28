import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

class AddButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick} style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderWidth: 3,
        borderColor: "#EBEBEB",
        borderStyle: "dashed",
        padding: 4,
        marginBottom: 8,
    },
    text: {
        color: "#BFBEBE",
        fontStyle: "italic",
    }
});

export default AddButton