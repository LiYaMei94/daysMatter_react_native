import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView, ActivityIndicator, TouchableHighlight, Image, StatusBar,Button } from "react-native";
import { connect } from 'react-redux';
import { Card } from 'react-native-shadow-cards';
import Feather from 'react-native-vector-icons/Feather';//cloud-rain
import Ionicons from 'react-native-vector-icons/Ionicons';//多云：ios-partly-sunny，晴天：md-sunny
import AsyncStorage from '@react-native-community/async-storage';

import { history, calendar, laohuangli, weather, baiduMap, baiduMapAddress } from '../../api.js';
import { getLunarDate, getLunarDateString, getTodayDate, getDay } from '../../util.js';
//引入主题配置文件
import { theme } from '../../theme.js';
import { headerHeight,headerPaddingTop } from '../../assets/css/common';
import{styles} from './style';

const historyKey = 'b469258df91094c4b3b82edabcad82c0';
const weatherKey = 'ede618bbdfe67ab7f4d22558c12f0ad7';
const ChinaCalendarKey = 'c18aec5d6c41cb971544cb2c7c919b9f';
const baiduAK = '7d23xGmMmVSaORGuq0G5G4Y7QvTMLfZh';
//const baiduMcode='97:DD:AF:D4:79:E8:6D:50:5E:7B:2F:E1:D2:F0:85:73:E4:A1:C5:27;com.daysmatter';//开发版的

const year = getTodayDate().year;
const month = getTodayDate().month;
const day = getTodayDate().day;
class HistoryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            historyData: [],
            todayDate: year + '年' + month + '月' + day,
            todayLunarDate: getLunarDateString(getLunarDate(year + '-' + month + '-' + day)),
            todayWeek: getDay(year + '-' + month + '-' + day),
            loaded: false,
            suitable: '',
            avoid: '',
            weatherData: {},
            themeInfo: {}
        }
    }
    componentWillMount() {
        const that = this;
        that.getThemeBgImg();
    }
    componentDidMount() {
        const that = this;
        const date = month + '/' + day;

        //天气
        that.getWeather();
        //历史上的今天
        that.fetch(history(date, historyKey)).then((res) => {
            if (res.error_code == 0) {
                that.setState({
                    historyData: res.result,
                    loaded: true
                })
            } else {
                that.setState({
                    historyData: [],
                    loaded: true
                })
            }
        })


    }
    //获取背景图
    getThemeBgImg() {
        const that = this;
        try {
            AsyncStorage.getItem(
                'themeInfo',
                (error, result) => {
                    if (error) {
                        //alert('取值失败:' + error);
                    } else {
                        that.setState({
                            themeInfo: JSON.parse(result)
                        })
                    }
                }
            )
        } catch (error) {
            //alert('失败' + error);
        }
    }
    
    //获取天气
    getWeather() {
        let city = '';
        const that = this;
        that.getCityLocation()
            .then(res => {
                //alert(res.address)
                city = res.address;
                //console.log('获取当前位置', res.address);
                //console.log('获取天气的api', weather(city.substr(0,city.length-1), weatherKey));
                that.fetch(weather(city.substr(0, city.length - 1), weatherKey)).then((res) => {
                    console.log('天气预报')
                    console.log(res.result)
                    if (res.error_code == 0) {
                        that.setState({
                            weatherData: res.result,
                        })
                    } else {
                        that.setState({
                            weatherData: {},
                        })
                    }
                })
            })
            .catch(err => {
                //logWarn('获取失败' + err);
            });
    }

    //获取城市定位信息
    getCityLocation() {
        const that = this;
        return new Promise((resolve, reject) => {
            //alert(baiduMapAddress(baiduAK,'bd09ll'))
            that.fetch(baiduMapAddress(baiduAK, 'bd09ll')).then((res) => {
                //console.log(res)
                if (res.status == 0) {
                    resolve(res.content)
                } else {
                    reject(res.status);
                }
            })
                .catch((error) => {
                    reject(error.status);
                })
        });
    };
    fetch(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((responseData) => {
                    resolve(responseData);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
    //历史列表
    historyItem({ item }) {
        const { themeInfo } = this.state;
        return (
            <View style={[styles.historyItem, styles.inlineBlock]}>
                <View style={styles.historyItemLeft}>
                    <Text style={{ fontSize: 18 }}>{item.date.split('年')[0]}</Text>
                </View>
                <Text style={[styles.historyItemCenter]}>{item.date},{item.title}。</Text>
                <Text style={[styles.historyItemRight]}></Text>
            </View>
        )
    }
    //天气渲染
    weatherRender() {
        const { weatherData } = this.state;
        //alert(JSON.stringify(weatherData) != '{}')
        //console.log('渲染前天气信息')
        //console.log(weatherData)
        if (JSON.stringify(weatherData) != '{}') {
            let iconName = weatherData.realtime.info.indexOf('多云')!=-1 || weatherData.realtime.info.indexOf('阴')!=-1 ? '\ue632' 
                            : weatherData.realtime.info.indexOf('晴')!=-1
                            ? '\ue676' : weatherData.realtime.info.indexOf('雨')!=-1 ? '\ue63f' : '\ue632';
            return (
                <View style={styles.weatherContainer}>
                    <View style={styles.weatherItem}>
                        <Text style={{fontSize:20,fontFamily:"iconfont",marginRight:5}}>{iconName}</Text>
                        <Text style={{ fontSize: 18, marginRight: 20 }}>{weatherData.realtime.info}</Text>
                        {
                            weatherData.realtime.temperature != '' ?
                                <Text style={{ fontSize: 35, fontWeight: "bold" }}>{weatherData.realtime.temperature}℃</Text>
                                : null
                        }
                    </View>
                    <View style={styles.weatherItem}>
                        {
                            weatherData.realtime.humidity != '' ?
                                <Text style={{ marginRight: 15 }}>湿度：{weatherData.realtime.humidity}</Text>
                                : null
                        }
                        <Text style={{ marginRight: 10 }}>{weatherData.realtime.direct} {weatherData.realtime.power}</Text>
                        {
                            weatherData.realtime.aqi != '' ?
                                <Text >空气指数：{weatherData.realtime.aqi}</Text>
                                : null
                        }
                    </View>
                </View>
            )
        } else {
            return null;
        }

    }
    render() {
        const { historyData, todayDate, todayLunarDate, loaded, suitable, avoid, weatherData, todayWeek } = this.state;
        const { navigation } = this.props;
        return (
            <View style={[styles.container, { paddingTop: headerHeight }]}>
                <StatusBar
                    animated={true}
                    barStyle="dark-content"
                />
                {
                    JSON.stringify(this.state.themeInfo) != '{}' ? <Image resizeMode='cover' source={{ uri: this.state.themeInfo.img }} style={styles.backgroundImage} /> : null
                }
                {
                    !loaded ?
                        <View style={[styles.loading, { top: headerHeight }]}>
                            <ActivityIndicator size="large" color={theme.loading} />
                        </View>
                        : <View style={{flex: 1,position: "relative"}}>
                            <Card cornerRadius={0} opacity={0.3} elevation={5} style={styles.todayContainer}>
                                <View style={styles.todayDate} >
                                    <View style={styles.topLeft}>
                                        <Text style={styles.date}>{todayDate}</Text>
                                        <Text style={styles.LunarDate}>{todayLunarDate}</Text>
                                    </View>
                                    <Text style={styles.topRight}>{todayWeek}</Text>
                                </View>
                                {this.weatherRender()}
                            </Card>
                            <View style={styles.historyContainer}>
                                {
                                    historyData.length != 0 ?
                                        <FlatList
                                            data={historyData}
                                            renderItem={this.historyItem.bind(this)}
                                            keyExtractor={(item) => item.e_id}
                                        />
                                        : <View style={styles.limit}>
                                            <Text style={{ fontSize: 18 }}>您要访问的数据去月球了</Text>
                                            <TouchableHighlight underlayColor='#ffffff' onPress={() => navigation.push('AddDay', {
                                                id: "-1"
                                            })}>
                                                <Text style={{ fontSize: 18, marginTop: 10,fontWeight:"bold" }}>去添加你的新日子吧！</Text>
                                            </TouchableHighlight>
                                        </View>
                                }
                            </View>

                        </View>
                }
            </View>
        )


    }
}



function select(store) {
    return {
        GetDayReducer: store.GetDayReducer,
    }
}
export default connect(select)(HistoryScreen);