import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import Calendar from '../Calendar';

class CalendarPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Calendar onSelect={this.props.onSelect} hideSelected={true}></Calendar>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    textSmall: {
        fontSize: 12,
        color: "#A8A8A8",
        fontStyle: "italic",
        alignSelf: "flex-end",
    },
    textInput: {
        marginTop: 5,
        backgroundColor: "#eee",
        textAlign: "center",
        borderRadius: 8,
        fontSize: 16,
        paddingVertical: 2.5
    },
    section: {
        marginBottom: 10,
    }
})


export default CalendarPopup;
