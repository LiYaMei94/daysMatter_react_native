/*
 * @Author: your name
 * @Date: 2019-11-12 10:51:49
 * @LastEditTime: 2019-11-12 10:55:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \liuyan_frontend_reactnativec:\Users\123\Desktop\daysMatter_react_native\index.js
 */
/**
 * @format
 */

import {AppRegistry,View,Text,StyleSheet} from 'react-native';
import React, { Component } from 'react';
import App from './App';
import {name as appName} from './app.json';
import _ from 'lodash';
//0.56(不包括)版本之前
/*Text.prototype.render = _.wrap(Text.render, function (func, ...args) {
    let originText = func.apply(this, args)
    return React.cloneElement(originText, {allowFontScaling: false,style:[
        originText.props.style,
        styles.defaultFontFamily
    ]})
})*/
//0.56(包括)版本之后
Text.render = _.wrap(Text.render, function (func, ...args) {
    let originText = func.apply(this, args)
    return React.cloneElement(originText, {allowFontScaling: false,style:[
        originText.props.style,
        styles.defaultFontFamily
    ]})
})
var styles = StyleSheet.create({
    defaultFontFamily:{
        //fontFamily: 'Zocial',
    }
})
AppRegistry.registerComponent(appName, () => App);
