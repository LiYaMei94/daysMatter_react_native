/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-30 15:47:35
 * @LastEditTime: 2019-11-12 14:33:39
 * @LastEditors: Please set LastEditors
 */


import React, { Component } from 'react';
import { DeviceEventEmitter, StyleSheet, StatusBar, View } from 'react-native';


import { YellowBox } from 'react-native';

//引入路由组件
import { AppContainer } from './src/route';
//启动页
import SplashScreen from 'react-native-splash-screen';

//redux 
import { Provider } from 'react-redux';
import configureStore from './src/redux/store/store.js';
const store = configureStore();//创建store
export default class App extends React.Component {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillMount has been renamed',
            'Warning: componentWillReceiveProps has been renamed',
            'Warning: DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release',
        ]);
    }

    componentDidMount() {
        // 组件加载完毕之后，隐藏启动页
        this.timer = setTimeout(() => {
            SplashScreen.hide();
        }, 900)
        StatusBar.setBarStyle('dark-content');
    }
    //卸载计时器
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);//同时为真的才执行卸载
    }
    render() {
        return (
            <Provider store={store}>
                <AppContainer  />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({

});
