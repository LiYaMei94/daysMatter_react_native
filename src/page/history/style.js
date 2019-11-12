import React, { Component } from 'react';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    block: {
        flexDirection: "column",
    },
    inlineBlock: {
        flexDirection: "row",
    },
    container: {
        flex: 1,
        position: "relative"
    },
    backgroundImage: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: null,
        width: null,
        zIndex: -1
    },
    todayContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        //height:120,
        width: '100%',
        marginBottom: 15,
        backgroundColor: "transparent"
    },
    todayDate: {
        width: '100%',
        flexDirection: "row",
    },
    topLeft: {
        flex: 3
    },
    date: {
        fontSize: 18
    },
    LunarDate: {
        fontSize: 14,
    },
    topRight: {
        flex: 2,
        fontSize: 26,
        textAlign: 'right'
    },
    weatherContainer: {
        width: '100%',
    },
    city: {
        width: '100%',
        textAlign: "center",
        lineHeight: 40
    },
    weatherItem: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
    },

    historyContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "transparent"
        //marginBottom:40
    },
    historyItem: {
        marginBottom: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    historyItemLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        height: '100%'
    },
    historyItemCenter: {
        flex: 4.5,
        fontSize: 16,
    },
    historyItemRight: {
        flex: 0.5
    },

    loading: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        //flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.5)",
    },
    //历史获取出错
    limit: {
        width: '100%',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 70
    }
});
