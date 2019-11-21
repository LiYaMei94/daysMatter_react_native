import React, { Component } from 'react';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    block: {
        flexDirection: "column",
    },
    inlineBlock: {
        flexDirection: "row",
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
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: '#F4F8FB',
        position: 'relative'
    },
    daysContainer: {
        width: 200,
        height: 200,
        marginTop: 150,
    },
    title: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    days: {
        justifyContent: "center",
        //alignItems: "center",
        height: 110,
    },
    date: {
        width: '100%',
        lineHeight: 40,
        textAlign: 'center',
        fontSize: 16
    },
    bottomBar: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    barItem: {
        flex: 1,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    barItemBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    barIcon: {
		fontFamily:'iconfont',
		fontSize:18,
		color:'#999'
    },
    barText: {
        fontSize: 18,
        color: '#999999',
        marginLeft: 10,
    },
    wrapper: {},
    slide: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: '#F4F8FB',
        position: 'relative'
    },
    slide_content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
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
});