import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import ColourButton from '../buttons/ColourButton';
import IconButton from '../buttons/IconButton';
import Icon from 'react-native-vector-icons/FontAwesome';

class TaskPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.textSmall}> treść zadania </Text>
                    <TextInput style={styles.textInput} onFocus={() => { }}></TextInput>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textSmall}> priorytet</Text>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <ColourButton style={{ height: 24 }} color={"#FE5454"}></ColourButton>
                        <ColourButton style={{ height: 24 }} color={"#f1cc39"}></ColourButton>
                        <ColourButton style={{ height: 24 }} color={"#1ab34d"}></ColourButton>
                    </View>
                </View>
                {/* <View style={{ ...styles.section, marginTop: 25, padding: 10, justifyContent: "center", alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ height: 50, width: 100, justifyContent: "center", alignItems: "center" }}>
                        <Icon name={"trash"} size={40}></Icon>
                    </TouchableOpacity>
                </View> */}
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


export default TaskPopup;
