import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

class DeleteButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick} style={{ ...styles.container, ...this.props.style }}>
                <Icon size={30} name={"trash"} color="white"></Icon>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ed3232",
        borderRadius: 8,
        paddingVertical: 4
    }
});

export default DeleteButton