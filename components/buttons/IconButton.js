import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

class IconButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick} style={{...styles.container, ...this.props.style}}>
                <Icon size={(this.props.size) ? this.props.size : 38} name={this.props.name} color={(this.props.color) ? this.props.color : "#9E9E9E"}></Icon>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default IconButton