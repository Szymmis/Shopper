import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

class ColourButton extends Component {
    render() {
        return (
            <TouchableOpacity style={{ ...styles.container, backgroundColor: (this.props.color) ? this.props.color : "#000" }}>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        borderRadius: 8,
        marginHorizontal: 5,
        elevation: 5,
    },
});

export default ColourButton