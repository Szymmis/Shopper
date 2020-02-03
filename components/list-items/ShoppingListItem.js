import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Icon } from 'react-native-vector-icons';
import IconButton from '../buttons/IconButton';

const priorities = ["#FE5454", "#F1CC39", "#37E270"];

class Shoppingitem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                {(this.props.item) ?
                    <TouchableOpacity style={styles.container} onPress={() => { if (this.props.edit) this.props.edit(this.props.item); }}>
                        <View style={{ ...styles.header, height: (this.props.edited) ? undefined : 10, backgroundColor: (this.props.item.priority != undefined) ? priorities[Math.min(this.props.item.priority, priorities.length)] : "#000" }}>
                            {(this.props.edited) ? <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
                                <IconButton name={"check"} size={28} style={{ flex: 0, paddingHorizontal: 5, }} color={"white"}></IconButton>
                                <IconButton name={"trash"} size={28} style={{ flex: 0, paddingHorizontal: 5, }} color={"white"}></IconButton>
                            </View> : null}
                        </View>
                        {
                            (this.props.edited) ?
                                <View style={{ padding: 10 }}>
                                    <Text style={{ ...styles.textSmall }}>nazwa przedmiotu</Text>
                                    <TextInput value={this.props.item.name} style={styles.textInput} onFocus={(e) => { console.log(e) }}></TextInput>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ ...styles.textSmall }}>cena</Text>
                                            <TextInput value={this.props.item.price + ""} style={styles.textInput} onFocus={(e) => { console.log(e) }}></TextInput>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ ...styles.textSmall }}>data</Text>
                                            <TextInput value={this.props.item.date + ""} style={styles.textInput} onFocus={(e) => { console.log(e) }}></TextInput>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={styles.content}>
                                    <View>
                                        <Text> {this.props.item.name} </Text>
                                        {(this.props.item.group) ? <Text style={{ ...styles.textSmall, marginTop: -2 }}> {this.props.item.group.name} </Text> : null}
                                    </View>
                                    <View style={{ alignItems: "flex-end" }}>
                                        {(this.props.item.price) ? <Text style={{ color: "#007844", fontStyle: "italic" }}> {this.props.item.price}zł</Text> : null}
                                        {(this.props.item.date) ? <Text style={{ ...styles.textSmall }}> dodano {this.props.item.date}</Text> : null}
                                    </View>
                                </View>
                        }
                    </TouchableOpacity >
                    : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        elevation: 4,
        marginBottom: 10,
        borderRadius: 8,
        flex: 1
    },
    header: {
        backgroundColor: "#f00",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,

    },
    text: {
        fontSize: 18
    },
    textSmall: {
        fontSize: 12,
        color: "#A8A8A8",
        fontStyle: "italic",
    },
    content: {
        padding: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textInput: {
        backgroundColor: "#eee",
        textAlign: "center",
        borderRadius: 8,
        fontSize: 14,
        margin: 2,
    },
})

export default Shoppingitem