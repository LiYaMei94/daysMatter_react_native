/*
 * @Author: your name
 * @Date: 2019-10-23 14:39:12
 * @LastEditTime: 2019-11-04 14:20:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /c:\Users\123\Desktop\react_native_appc:\Users\123\Desktop\weekend_exhibition\src\components\head_portraits.js
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
export default class HeadPortraits extends Component {
    static defaultProps = {
        header_img:'',//头像地址
        width:50, //头像大小
        height:50,//头像大小
        iconStyleFontSize:24,//没有图片时字体图标的大小
    }
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    componentDidMount(){
        
    }
    _onPress(){
        
    }
    render() {
        const { header_img, navigation, width, height, iconStyleFontSize,style} = this.props;
        return (
            <TouchableHighlight
                underlayColor='#E0E0E0'
                activeOpacity={1}
                onPress={this._onPress.bind(this)}
                style={[styles.head_portrait, { width: width, height: height },style]}
            >
                {//<Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={{uri:header_img}}></Image>
                    //header_img != '' ?
                    header_img == '' ?
                        <Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={require('../assets/images/header.jpg')}></Image>
                        : <Text style={[styles.iconStyle, { fontSize: iconStyleFontSize, color: '#9D9D9D' }]}>{'\ue614'}</Text>
                }
            </TouchableHighlight>
        );
    }

};

const styles = StyleSheet.create({
    head_portrait: {
        backgroundColor: '#E0E0E0',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        //borderWidth:1,
    },
    iconStyle: {
        fontFamily: "iconfont",
        fontSize: 30,
    },
});

