import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from './buttons/IconButton';

const MONTHS = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]

function numberOfDays(month) {
    let _year = new Date().getFullYear();
    return (month % 2 == 0) ? 31 : ((month == 1) ? (((_year % 4 == 0 && _year % 100 != 0) || _year % 400 == 0) ? 29 : 28) : 30);
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let _date = new Date();
        let _offset = ((new Date(_date.getUTCFullYear(), this.props.currentMonth, 1).getDay() + 7) - 1) % 7;
        let number_of_weeks = Math.ceil((numberOfDays(this.props.currentMonth) + _offset - 1) / 7);
        let toRender = [];
        for (let i = 0; i < number_of_weeks; i++) {
            let dayElements = [];
            let _counter = 0;
            for (let j = i * 7 - _offset; j < i * 7 - _offset + 7; j++ , _counter++) {
                dayElements.push(<TouchableOpacity
                    onPress={() => { if (j >= 0 && j < numberOfDays(this.props.currentMonth)) this.props.select(j) }}
                    key={j}
                    style={{ ...styles.day, ...(j + 1 == _date.getDate() && _date.getUTCMonth() == this.props.currentMonth) ? styles.today : {}, backgroundColor: (j >= 0 && j < numberOfDays(this.props.currentMonth)) ? (_counter % 7 == 5 || _counter % 7 == 6) ? "#ffdae0" : "#f2f2f2" : "#fff", ...(j == this.props.selectedDay) ? styles.selected : {} }}>
                    <Text>
                        {(j >= 0 && j < numberOfDays(this.props.currentMonth)) ? j + 1 : ''}
                    </Text>
                </TouchableOpacity>)
            }

            toRender.push(<View key={i} style={styles.week}>{dayElements}</View>)
        }

        return (
            <View>
                <View>
                    <View style={styles.toolbar}>
                        <IconButton size={24} name={"chevron-left"} color={"#252525"} onClick={this.props.previous}></IconButton>
                        <View>
                            <View style={{ ...styles.header, backgroundColor: "#252525" }}>
                                <Text style={{ color: "white", textAlign: "center", marginVertical: 2 }}>2020</Text>
                            </View>
                            <View style={styles.monthHeader}>
                                <Text style={styles.textMonth}>{MONTHS[this.props.currentMonth]}</Text>
                            </View>
                        </View>
                        <IconButton size={24} name={"chevron-right"} color={"#252525"} onClick={this.props.next}></IconButton>
                    </View>
                </View>
                <View style={styles.calendar}>
                    {toRender}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    monthHeader: {
        backgroundColor: "#fff",
        elevation: 4,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 4,
    },
    toolbar: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    header: {
        backgroundColor: "#f00",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    textMonth: {
        fontSize: 22,
    },
    calendar: {
        justifyContent: "center",
        alignItems: "center"
    },
    day: {
        width: 32,
        height: 32,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
    },
    week: {
        flexDirection: "row",
        marginBottom: 6,
    },
    today: {
        borderWidth: 2,
        borderColor: "#7488ff",
    },
    selected: {
        backgroundColor: "#c1c9ff"
    }
})

export default Calendar;
