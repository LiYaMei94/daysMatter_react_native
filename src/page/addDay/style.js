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
        alignItems: "center",
        position: "relative",
        flex: 1,
        //backgroundColor: "red",
    },
    header: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 0,
        paddingBottom: 8,
        justifyContent: "center",
        alignItems: "flex-end",
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
        color: '#ffffff',
    },
    infoItem: {
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderBottomColor: '#999999',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        marginTop: 12,
    },
    infoItemIcon:{
        fontSize:20,
        color:"#999",
        fontFamily:"iconfont"
    },
    textinput: {
        flex: 5
    },
    datePicker: {
        flex: 4,
    },
    icon: {
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        //backgroundColor:'yellow',
    },
    iconText: {
        width: 40,
        marginLeft: 3,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    isTop: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
        flex: 4,
        marginRight: 10
    },
    eventButtonItem: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        borderRadius: 10,
        height: 40,
    },
    eventButtonSave: {
        //backgroundColor: "#53CDFF",
        marginBottom: 20,
        marginTop: 40
    },
    eventButtonDelete: {
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    eventButtonText: {
        fontSize: 16,
        color: '#ffffff',
        lineHeight: 40,
        textAlign: 'center',
    },
    repeatcontainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        paddingLeft: 20,
        paddingRight: 20,
    },
});