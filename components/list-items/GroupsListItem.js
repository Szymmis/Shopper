import React, { Component, isValidElement } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import IconButton from '../buttons/IconButton';

class GroupsListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => { this.props.select(this.props.group) }} style={{ ...styles.container }}>
                    <View style={{ ...styles.header, backgroundColor: (this.props.group.color) ? this.props.group.color : "#000" }}></View>
                    <View style={{ flex: 1, padding: 9, paddingTop: 6, flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={styles.text}> {this.props.group.name} </Text>
                            {(this.props.group.items) ?
                                <Text style={styles.textSmall}> {this.props.group.items.length} przedmioty </Text>
                                : null}
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={styles.textSmall}> całkowity koszt </Text>
                            {(this.props.group.items) ?
                                <Text style={{ ...styles.text, color: "#454545", fontStyle: "italic" }}> {this.props.group.items.reduce((acc, curr) => { return acc + parseFloat(curr.price); }, 0)}zł</Text>
                                : null}
                            {/* <Text style={styles.textSmall}> utworzona {new Date().getUTCDate()}.{new Date().getUTCMonth()}</Text> */}

                        </View>
                    </View>
                    {/* <View style={styles.prioritiesBar}>
                    <View style={{ width: "60%", height: 5, backgroundColor: "#FE5454" }}></View>
                    <View style={{ width: "20%", height: 5, backgroundColor: "#F1CC39" }}></View>
                    <View style={{ width: "20%", height: 5, backgroundColor: "#37E270" }}></View>
                </View> */}
                </TouchableOpacity>
                <IconButton name={"trash"} size={32} style={{ marginLeft: 10 }} onClick={() => { if (this.props.remove) this.props.remove(this.props.group) }}></IconButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        elevation: 4,
        marginBottom: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        flex: 1
    },
    header: {
        backgroundColor: "#f00",
        height: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    text: {
        fontSize: 18,
        color: "#454545"
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
    prioritiesBar: {
        flexDirection: "row",
        marginBottom: 10,
        marginHorizontal: 10,
        opacity: 0.9
    },
})

export default GroupsListItem