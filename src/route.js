import React, { Component } from 'react';
import { Easing, Animated,Text,StyleSheet } from "react-native";
//路由文件
import Days from './page/days/html';
import AddDay from './page/addDay/html';
import History from './page/history/html';
import Mine from './page/mine/html';
import PastDayDetail from './page/pastDayDetail/html';
import Setting from './page/setting';
import BackGround from './page/backGround/html';
import Menu from './page//menu.js';

import {headerStyle,headerPaddingTop,headerHeight,tabBarOptions,borderColor} from './assets/css/common';

import { createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer} from 'react-navigation';

//底部tabbar的图标
const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let iconName;
    if (routeName === 'Days') {
        iconName = '\ue74f';
    } else if (routeName === 'History') {
        iconName = '\ue636';
    }else{
        iconName = '\ue600';
    }
    return <Text style={[styles.iconStyle,{color:tintColor}]}>{iconName}</Text>;
};

//底部tabbar
const TabNavigator = createBottomTabNavigator(
    {
        Days: createStackNavigator(
            {
                Days: {
                    screen: Days,
                    navigationOptions: ({ navigation, screenProps }) => {
                        return {
                            title: '倒数日',
                            headerStyle: {
                                backgroundColor: 'rgba(255,255,255,0.5)',
                                height: headerHeight,
                                paddingTop: headerPaddingTop
                            },
                            headerTintColor: '#666',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTransparent: true,
                        }
                    }
                },
                //不传参的写法
                /*Days: {
                    screen: Days,
                    navigationOptions:{
                        title: '倒数日',
                            headerStyle: {
                                backgroundColor: 'rgba(255,255,255,0.5)',
                                height: height,
                                paddingTop: paddingTop
                            },
                            headerTintColor: '#666',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTransparent: true,
                    }
                },*/
            }
        ),
        History: createStackNavigator(
            {
                History: {
                    screen: History,
                    navigationOptions: ({ navigation, screenProps }) => {
                        return {
                            title: '历史上的今天',
                            headerStyle: {
                                backgroundColor: 'rgba(255,255,255,0.5)',
                                height: headerHeight,
                                paddingTop: headerPaddingTop
                            },
                            headerTintColor: '#666',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTransparent: true
                        }
                    }
                }
            }
        ),
        Mine: createStackNavigator(
            {
                Mine: {
                    screen: Mine,
                    navigationOptions: {
                        header: null,
                    }
                }
            }
        )
    },
    {
        defaultNavigationOptions: ({ navigation }) => (
            {
                tabBarIcon: ({ focused, tintColor }) =>
                    getTabBarIcon(navigation, focused, tintColor),
            }
        ),
        tabBarOptions: tabBarOptions,
    }
);
//创建全局导航器createStackNavigator
const StackNavigator = createStackNavigator(
    {
        bottomTabNavigator: {
            screen: TabNavigator,
            navigationOptions: {
                header: null,
            }
        },
        AddDay: {
            screen: AddDay,
            navigationOptions: {
                header: null,
            }
        },
        PastDayDetail: {
            screen: PastDayDetail,
        },
        BackGround: {
            screen: BackGround,
        },
        Setting:{
            screen: Setting,
            navigationOptions: {
                title:'设置'
            }
        }
    },
    {
        initialRouteName: "bottomTabNavigator",
        defaultNavigationOptions: ({ navigation, screenProps }) => {
            return {
                headerStyle: headerStyle,
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }
        }
    }
)
// 带有侧滑页的
const DrawerNavigator = createDrawerNavigator(
    {
        StackNavigator: {
            screen: StackNavigator
        },
    },
    {
        //drawerWidth: Screen.width * 0.9, // 展示的宽度
        drawerPosition: 'left', // 抽屉在左边还是右边
        contentComponent: Menu, // 自定义侧滑栏
        // swipeEnabled: false
    },

);

export const AppContainer = createAppContainer(DrawerNavigator);


const styles = StyleSheet.create({
    iconStyle:{
        fontFamily: "iconfont",
        fontSize: 25,
    }
})