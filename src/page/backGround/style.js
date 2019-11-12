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
        backgroundColor: '#eeeeee'
    },
    headerRightButtonBox: {
        marginRight: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ffffff",
        width: 60,
        height: 30
    },
    headerRightButton: {
        color: '#ffffff'
    },
    styleShow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        marginTop: 20,
    },
    bgImgSelectBox: {
        padding: 10,
        height: 100
    },
    imgItem: {
        borderRadius: 12,
        width: 60,
        height: 65,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    imgItemView:{
        width:'100%',
        height:'100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position:"relative"
    },
    checkcircle:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.3)',
        borderRadius: 12,
        position:"absolute",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    daysPage: {
        backgroundColor: "transparent",
        width: '80%',
        height: '100%',
        position: "relative",
    },
    header: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        height: 50
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
        fontSize: 16,
        //fontFamily: '刻石录颜体',
    },
    topDayDataDayNum: {
        fontSize: 52,
        fontWeight: 'bold',
        //fontFamily: '台湾教育部标准楷书',
    },
    topDayDataDate: {
        //fontFamily: '王汉宗中隶书繁',
    },
    dayItemContainer: {

    },
    dayItem: {
        height: 45,
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
        fontSize: 12
    },
    dayItemRight: {
        flex: 1.2,
    },
    dayDayNum: {

    },
    dayLogo: {
        textAlign: "right",
        fontSize: 12
    },
});