/*
 * @Author: your name
 * @Date: 2019-06-25 16:02:31
 * @LastEditTime: 2019-11-12 14:14:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react_native_app\DaysMatter\src\page\setting.js
 */
import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Text, TouchableHighlight } from "react-native";

export default class DaysScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={[styles.container]}>

            </View>
        )
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: 20,
    },
    setItem: {
        width: '100%',
        height: 60,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    itemleft: {
        flex: 1
    },
    itemcenter: {
        flex: 3.5,
        fontSize: 16,
    },
    itemright: {
        flex: 1.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },

})