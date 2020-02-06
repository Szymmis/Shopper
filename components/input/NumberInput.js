import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'

let regex = new RegExp('[0-9]{0,}[.]?[0-9]{0,2}');

export default class NumberInput extends Component {

    constructor(props) {
        super(props);

        this.state = { value: 0 }
    }

    render() {
        return (
            <View>
                <TextInput keyboardType={"numeric"} value={this.state.value} onKeyPress={(e) => {
                    console.log(e);
                }} onChange={(e => {
                    // let input = e.nativeEvent.text;
                    // if (input.length > 0) {
                    //     if (regex.exec(input).length > 0) {
                    //         if (!isNaN(regex.exec(input)[0]))
                    //             this.setState({ value: regex.exec(input)[0] })
                    //     }
                    //     console.log(regex.exec(input));
                    // }
                    // else this.setState({ value: '' })
                })}></TextInput>
            </View>
        )
    }
}