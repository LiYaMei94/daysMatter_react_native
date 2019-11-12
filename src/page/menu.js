import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ScrollView, SafeAreaView,StatusBar } from "react-native";
import { connect } from 'react-redux';
import { headerHeight } from '../assets/css/common';
import { theme } from '../theme.js';
class MenuScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {

    }
    render() {
        const { navigation } = this.props;
        //在这里跳转页面不能使用push
        return (
            <ScrollView>
                <StatusBar
                    animated={true}
                    barStyle="light-content"
                />
                <SafeAreaView style={styles.container}>
                    <View style={[styles.header, { height: headerHeight, backgroundColor: theme.themeColor }]}>
                        <TouchableHighlight
                            onPress={() => navigation.goBack()}
                            underlayColor='rgba(0,0,0,0.2)'
                            style={styles.menuItem}
                        >
                            <Text style={{fontFamily:'iconfont',fontSize:24,color:'#fff'}}>{'\ue613'}</Text>
                        </TouchableHighlight>
                        <Text style={styles.header_title}>倒数日</Text>
                    </View>
                    <TouchableHighlight style={styles.classify_item_box}
                        onPress={() => navigation.goBack()}
                        underlayColor='rgba(0,0,0,0.2)'
                    >
                        <View style={styles.classify_item}>
                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemIcon}>{'\ue612'}</Text>
                            </View>
                            <Text style={styles.classify_item_title}>全部</Text>
                            <Text style={styles.classify_item_num}>0</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.classify_item_box}
                        onPress={() => navigation.goBack()}
                        underlayColor='rgba(0,0,0,0.2)'
                    >
                        <View style={styles.classify_item}>
                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemIcon}>{'\ue60b'}</Text>
                            </View>
                            <Text style={styles.classify_item_title}>纪念日</Text>
                            <Text style={styles.classify_item_num}>0</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.classify_item_box}
                        onPress={() => navigation.goBack()}
                        underlayColor='rgba(0,0,0,0.2)'
                    >
                        <View style={styles.classify_item}>
                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemIcon}>{'\ue6bc'}</Text>
                            </View>
                            <Text style={styles.classify_item_title}>生活</Text>
                            <Text style={styles.classify_item_num}>0</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.classify_item_box}
                        onPress={() => {navigation.navigate('History')}}
                        underlayColor='rgba(0,0,0,0.2)'
                    >
                        <View style={styles.classify_item}>
                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemIcon}>{'\ue602'}</Text>
                            </View>
                            <Text style={[styles.classify_item_title, { color: '#666' }]}>History</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.classify_item_box}
                        onPress={() => navigation.navigate('Setting')}
                        underlayColor='rgba(0,0,0,0.2)'
                    >
                        <View style={styles.classify_item}>
                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemIcon}>{'\ue644'}</Text>
                            </View>
                            <Text style={[styles.classify_item_title, { color: '#666' }]}>Setting</Text>
                        </View>
                    </TouchableHighlight>
                </SafeAreaView>
            </ScrollView>
        )
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingLeft: 10,
        alignItems: "flex-end",
        flexDirection: "row",
        paddingBottom: 6,
    },
    header_title: {
        color: '#ffffff',
        fontSize: 22,
        marginLeft: 10,
    },
    classify_item_box: {
        height: 50,
    },
    classify_item: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    classify_item_title: {
        color: '#999',
        marginLeft: 30,
        flex: 3
    },
    classify_item_num: {
        color: '#888',
        flex: 2,
        textAlign: 'right'
    },
    menuItem:{
        width: 35, 
        height: 35, 
        borderRadius: 50, 
        justifyContent: "center", 
        alignItems: "center",
    },
    menuItemIcon:{
        fontFamily:"iconfont",
        fontSize:24,
        color:'#999'
    }
})

function select(store) {
    return {
        GetDayReducer: store.GetDayReducer,
    }
}
export default connect(select)(MenuScreen);