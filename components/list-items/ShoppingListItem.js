import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Icon } from 'react-native-vector-icons';
import IconButton from '../buttons/IconButton';
import NumberInput from '../input/NumberInput';

const priorities = ["#FE5454", "#F1CC39", "#37E270"];

let regex = new RegExp('[0-9]{0,}[.]?[0-9]{0,2}');

class Shoppingitem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                {(this.props.item) ?
                    <TouchableOpacity style={styles.container} onPress={() => { if (this.props.select) this.props.select(this.props.item); }}>
                        <View style={{ ...styles.header, height: (this.props.edited) ? undefined : 10, backgroundColor: (this.props.item.priority != undefined) ? priorities[Math.min(this.props.item.priority, priorities.length)] : "#000" }}>
                            {(this.props.edited) ? <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 5 }}>
                                {/* <IconButton name={"check"} size={28} style={{ flex: 0, paddingHorizontal: 5, }} color={"white"}></IconButton> */}
                                <IconButton name={"trash"} onClick={() => { this.props.remove(this.props.item); }} size={28} style={{ flex: 0, paddingHorizontal: 5, }} color={"white"}></IconButton>
                            </View> : null}
                        </View>
                        {
                            (this.props.edited) ?
                                <View style={{ padding: 10 }}>
                                    <Text style={{ ...styles.textSmall }}>nazwa przedmiotu</Text>
                                    <TextInput value={this.props.item.name} onChange={(e) => { this.props.edit({ "name": e.nativeEvent.text }); }} style={styles.textInput} onFocus={(e) => { }}></TextInput>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ ...styles.textSmall }}>cena</Text>
                                            <TextInput value={(this.props.item.price > 0) ? this.props.item.price + "" : ""} keyboardType={"numeric"} onChange={
                                                (e) => {
                                                    let text = 0;
                                                    if (e.nativeEvent.text && regex.exec(e.nativeEvent.text) && regex.exec(e.nativeEvent.text).length > 0){
                                                        console.log(regex.exec(e.nativeEvent.text))
                                                        text = regex.exec(e.nativeEvent.text)[0];
                                                    }
                                                    console.log(text);
                                                    this.props.edit({ "price": text });
                                                }
                                            } style={styles.textInput} onFocus={(e) => { }}></TextInput>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ ...styles.textSmall }}>data</Text>
                                            <TextInput value={this.props.item.date + ""} style={styles.textInput} editable={false} onFocus={(e) => { }}></TextInput>
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
                                        <Text style={{ color: "#007844", fontStyle: "italic" }}> {(this.props.item.price && this.props.item.price > 0) ? `${this.props.item.price}zł` : ""}</Text>
                                        {(this.props.item.date) ? <Text style={{ ...styles.textSmall }}> na {this.props.item.date}</Text> : null}
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