/*
 * @Author: your name
 * @Date: 2019-11-04 11:55:53
 * @LastEditTime: 2019-11-12 14:18:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react_native_appc:\Users\123\Desktop\top_ten\src\pages\MinePage\html.js
 */



import React, { Component } from 'react';
import { 
    Text, 
    StatusBar, 
    ScrollView, 
    View, 
    TouchableHighlight, 
    Dimensions, 
    Animated, 
    DeviceEventEmitter, 
    PanResponder,
    ImageBackground,
    NativeModules } from 'react-native';
import { styles } from './style';
import {RightArrowIcon} from '../../assets/css/common';
import HeadPortraits from '../../components/head_portraits';
const lineData=[
    {
        name:"背景图片",
        route:'BackGround'
    },
    {
        name:"设置",
        route:'Setting'
    }
]
export default class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isLogin:true
        }
    }
    componentDidMount() {
        
    }
    
    render() {
        const {isLogin}=this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    barStyle="light-content"
                />
                <ImageBackground source={require('../../assets/images/mineTopBg.png')} style={styles.mine_top}>
                    <HeadPortraits style={{marginLeft:30}} navigation={this.props.navigation} width={60} height={60} header_img={''} iconStyleFontSize={45}></HeadPortraits>
                    {
                        isLogin ?
                            <View style={styles.mine_top_left}>
                                <Text style={styles.mine_nickname}>辣辣的草莓酱</Text>
                                <Text style={styles.mine_like}>189****7689</Text>
                            </View> :
                            <TouchableHighlight
                                underlayColor='transparent'
                                onPress={() => {}}
                                style={[styles.mine_top_left, { justifyContent: "center", }]}
                            >
                                <Text style={[styles.mine_nickname]}>去登录</Text>
                            </TouchableHighlight>
                    }
                </ImageBackground>
                <View style={[styles.mine_content_wrap]}>
                    {
                        lineData.map((item,index)=>{
                            return <Line item={item} index={index} navigation={this.props.navigation} key={index}></Line>
                        })
                    }
                </View>
            </View>

        );
    }
}

class Line extends Component {
    linePress(){
        const {item,index,navigation}=this.props;
        if(index==2){

        }else{
            StatusBar.setBarStyle('dark-content');
            navigation.push(item.route,{});
        }
    }
    render(){
        const {item,index,navigation}=this.props;
        //console.log(this.props)
        return(
            <TouchableHighlight style={[styles.mine_content_line,{borderBottomWidth:index==lineData.length-1?0:1,}]} onPress={this.linePress.bind(this)} underlayColor='white'>
                <View style={styles.mine_content_line_wrap}>
                    <Text style={styles.mine_content_line_text}>{item.name}</Text>
                    <Text style={[styles.iconStyle, styles.mine_content_line_icon]}> {RightArrowIcon}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}