import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native';

import ColourButton from '../buttons/ColourButton';

class TaskPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', ()=>{
            this.refs.name.blur();
            this.refs.notes.blur();
        });
    }

    componentWillUnmount(){
        this.keyboardDidHideListener.remove();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.textSmall}> treść zadania </Text>
                    <TextInput ref="name" style={styles.textInput} onFocus={() => { }}></TextInput>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textSmall}> priorytet</Text>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <ColourButton style={{ height: 24 }} color={"#FE5454"}></ColourButton>
                        <ColourButton style={{ height: 24 }} color={"#f1cc39"}></ColourButton>
                        <ColourButton style={{ height: 24 }} color={"#1ab34d"}></ColourButton>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textSmall}> notatki </Text>
                    <TextInput ref="notes" multiline={true} maxHeight={100} onEndEditing={() => { console.log("test") }} style={{ ...styles.textInput, textAlign: "left", paddingHorizontal: 10 }} onFocus={() => { }}></TextInput>
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
