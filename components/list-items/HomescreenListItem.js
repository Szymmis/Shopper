import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const priorities = ["#FE5454", "#F1CC39", "#1ab34d"];

class HomescreenListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {(this.props.item) ?
                    <TouchableOpacity style={styles.container}>
                        <View style={{ ...styles.header, backgroundColor: (this.props.item.priority != undefined) ? priorities[Math.min(this.props.item.priority, priorities.length)] : "#000" }}></View>
                        <View style={styles.content}>
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "flex-end"}}>
                                <Text> {this.props.item.name} </Text>
                                {(this.props.item.group) ? <Text style={{ ...styles.textSmall, marginTop: -2 }}> {this.props.item.group.name} </Text> : null}
                            </View>
                            <View style={{ alignItems: "flex-end" }}>
                                {(this.props.item.price) ? <Text style={{ color: "#454545", fontStyle: "italic" }}> {this.props.item.price}zł</Text> : null}
                            </View>
                        </View>
                    </TouchableOpacity>
                    : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        elevation: 4,
        marginBottom: 8,
        borderRadius: 8
    },
    header: {
        backgroundColor: "#f00",
        height: 10,
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
    }
})

export default HomescreenListItem