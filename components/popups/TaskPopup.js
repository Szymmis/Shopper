import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Task } from '../logic/Logic';

import ColourButton from '../buttons/ColourButton';
import IconButton from '../buttons/IconButton';

class TaskPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (this.refs.name) this.refs.name.blur();
            if (this.refs.notes) this.refs.notes.blur();
        });
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    render() {
        console.log(this.props.selected);
        return (
            <View style={styles.container}>
                {(this.props.selected) ?
                    <View>
                        <View style={{ ...styles.section }}>
                            <Text style={styles.textSmall}> treść zadania </Text>
                            <TextInput ref="name" value={this.props.selected.name} style={styles.textInput} onChange={(e) => { this.props.edit(0, { 'name': e.nativeEvent.text }) }}></TextInput>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.textSmall}> priorytet</Text>
                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <ColourButton style={{ height: 24 }} color={"#FE5454"} onClick={() => this.props.edit(0, { 'priority': 0 })}></ColourButton>
                                <ColourButton style={{ height: 24 }} color={"#f1cc39"} onClick={() => this.props.edit(0, { 'priority': 1 })}></ColourButton>
                                <ColourButton style={{ height: 24 }} color={"#1ab34d"} onClick={() => this.props.edit(0, { 'priority': 2 })}></ColourButton>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.textSmall}> godzina </Text>
                            <TextInput ref="name" value={this.props.selected.time} style={{ ...styles.textInput }} onChange={(e) => { this.props.edit(0, { 'time': e.nativeEvent.text }) }} ></TextInput>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                            <IconButton name={"trash"} style={{ marginTop: 8 }} onClick={() => { (this.props.remove) ? this.props.remove(0, this.props.selected, ) : '' }}></IconButton>
                            <IconButton name={"check"} style={{ marginHorizontal: -4, marginTop: 8 }}></IconButton>
                        </View>
                    </View>
                    : null}

                {/* <View style={styles.section}>
                    <Text style={styles.textSmall}> notatki </Text>
                    <TextInput ref="notes" multiline={true} maxHeight={100} onEndEditing={() => { console.log("test") }} style={{ ...styles.textInput, textAlign: "left", paddingHorizontal: 10 }} onFocus={() => { }}></TextInput>
                </View> */}
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
