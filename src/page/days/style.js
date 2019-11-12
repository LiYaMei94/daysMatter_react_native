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
        position: "relative",
        backgroundColor: "transparent"
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
    TopDayCOntainer: {
        padding: 20,
        marginBottom: 20,
    },
    topDayDataTitle: {
        fontSize: 26,
        //fontFamily: '刻石录颜体',
    },
    topDayDataDayNum: {
        fontSize: 62,
        fontWeight: 'bold',
        //fontFamily: '台湾教育部标准楷书',
    },
    topDayDataDate: {
        fontFamily: '王汉宗中隶书繁',
    },
    dayItemContainer: {

    },
    dayItem: {
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    dayItemLeft: {
        flex: 3.8,
    },
    dayTitle: {
        //fontSize: 16
    },
    dayDate: {
        fontSize: 14
    },
    dayItemRight: {
        flex: 1.2,
    },
    dayDayNum: {

    },
    dayLogo: {
        textAlign: "right",
        fontSize: 14
    },

    //以下是没有数据时的样式
    NoEvent: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    addEventBox: {
        width: 170,
        height: 45,
        borderRadius: 12,
        borderColor: '#666666',
        borderWidth: 2,
        borderStyle: 'solid',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10
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

    }
})
