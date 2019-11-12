import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import { Card } from 'react-native-shadow-cards';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';

import Swiper from 'react-native-swiper';

//引入主题配置文件
import { theme } from '../../theme.js';
import { swiper_index } from '../../redux/actions/GetDayAction.js';
import { _deleteFile, _writeFile, _readFile, _fileEx } from '../../react_native_fs.js';
import ConfirmModal from '../../components/confirmModal.js';
import { headerHeight,headerPaddingTop } from '../../assets/css/common';
import { styles } from './style';

const fileName = 'days.txt';
class PastDayDetail extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: theme.themeColor,
            height: headerHeight,
            paddingTop: headerPaddingTop
        },
        headerTintColor: '#fff',
        headerRight: (
            <TouchableHighlight
                onPress={() => navigation.state.params.navigatePress()}

                underlayColor='rgba(0,0,0,0.2)'
                style={styles.headerRightButtonBox}
            >
                <Text style={styles.headerRightButton}>编辑</Text>
            </TouchableHighlight>
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            dayID: props.navigation.getParam('id', '-1'),
            daysData: [],
            detailInfo: {},
            modalVisible: false,
            swiperIndex: 0,
            loaded: false,//是否加载完成
        }
        headerStyle =
            this.deleteday = this.deleteday.bind(this);
        this.go_detail = this.go_detail.bind(this);
    }
    componentDidMount() {
        const that = this;
        const { dayID } = that.state;
        if (dayID != '-1') {
            that.showDetail();
        }
        that.props.navigation.setParams({ navigatePress: that.go_detail });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        let data = [];
        const that = this;
        const { navigation } = this.props;
        if (nextProps.GetDayReducer != null) {
            if (nextProps.GetDayReducer.message == 'success') {
                navigation.state.params.isPast = nextProps.GetDayReducer.isPast
                that.setState({
                    dayID: nextProps.GetDayReducer.swiper_index
                })
            } else {

            }
        }
    }
    go_detail() {
        const { navigation } = this.props;
        const { dayID } = this.state;
        navigation.push('AddDay', {
            id: dayID
        })
    }
    //编辑时的信息
    showDetail() {
        let data = {};
        const that = this;
        const { dayID } = that.state;
        let swiperIndex = 0;
        _fileEx(fileName, function (res) {
            if (res) {
                _readFile(fileName, function (res) {
                    data = JSON.parse(res);
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].id == dayID) {
                            swiperIndex = i;
                        }
                    }
                    that.setState({
                        detailInfo: data[dayID],
                        daysData: data,
                        swiperIndex: swiperIndex,
                        loaded: true,//是否加载完成
                    })
                })
            } else {
            }
        })
    }
    //删除
    deleteday() {
        const that = this;
        that.setState({
            modalVisible: true,
        })
    }
    updateRedux(text, arr) {
        const { dispatch, navigation } = this.props;
        const that = this;
        _deleteFile(fileName, function (res) {
            if (res == 1) {
                _writeFile(fileName, JSON.stringify(arr), function () {
                    if (res == 1) {
                        navigation.push('bottomTabNavigator');
                    } else {

                    }
                })
            } else {

            }
        })
    }
    //确认框关闭打开
    onCloseModal(value) {
        const that = this;
        const { dayID } = this.state;
        if (value) {
            _fileEx(fileName, function (res) {
                if (res) {
                    _readFile(fileName, function (res) {
                        data = JSON.parse(res);
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].id == dayID) {
                                data.splice(i, 1);
                                that.updateRedux('delete', data);
                            }
                        }
                    })
                } else {

                }
            })
        } else {

        }
    }

    render() {
        const { navigation, dispatch } = this.props;
        const { detailInfo, modalVisible, daysData, swiperIndex, loaded } = this.state;
        return (
            loaded ?
                <View style={styles.container}>
                    <Swiper style={styles.wrapper}
                        horizontal={true}
                        showsPagination={false}
                        loop={false}
                        index={swiperIndex}
                        onIndexChanged={(index) => {
                            dispatch(swiper_index(daysData[index].id, daysData[index].isPast))
                        }}
                    >
                        {
                            //item.isPast ? ['#767B7E', '#4B4A50', '#323137'] : ['#90E2F8', '#53CDFF', '#35A1D0']
                            daysData.map((item, index) => {
                                return (
                                    <View style={styles.slide} key={index}>
                                        <View style={styles.slide_content}>
                                            <Card style={styles.daysContainer}>
                                                <LinearGradient colors={['#90E2F8', '#53CDFF', '#35A1D0']} style={styles.title}>
                                                    <Text style={{ color: '#ffffff', fontSize: 18 }}>{item.title}{item.dateStatus}</Text>
                                                </LinearGradient>
                                                <View style={[styles.days, styles.inlineBlock]}>
                                                    <Text style={{ fontSize: 66, fontWeight: 'bold', flexDirection: "row", alignItems: "center", marginTop: 20 }}>{item.dayNum}</Text>
                                                    <Text style={{ fontSize: 14, marginTop: 25 }}>{item.unit}</Text>
                                                </View>
                                                <Text style={styles.date}>{item.repeatDate}{item.week}</Text>
                                            </Card>
                                            <View style={[styles.bottomBar, styles.inlineBlock]}>
                                                <TouchableHighlight onPress={() => navigation.push('bottomTabNavigator')} underlayColor='rgba(0,0,0,0.2)' style={styles.barItem}>
                                                    <View style={[styles.barItemBox, styles.inlineBlock]}>
                                                        <Entypo style={styles.baricon} name='list' size={25} color="#999999"></Entypo>
                                                        <Text style={styles.barText}>列表</Text>
                                                    </View>
                                                </TouchableHighlight>
                                                <TouchableHighlight onPress={() => navigation.push('AddDay')} underlayColor='rgba(0,0,0,0.2)' style={styles.barItem}>
                                                    <View style={[styles.barItemBox, styles.inlineBlock]}>
                                                        <Entypo style={styles.baricon} name='add-to-list' size={25} color="#999999"></Entypo>
                                                        <Text style={styles.barText}>新增</Text>
                                                    </View>
                                                </TouchableHighlight>
                                                <TouchableHighlight onPress={() => this.deleteday()} underlayColor='rgba(0,0,0,0.2)' style={styles.barItem}>
                                                    <View style={[styles.barItemBox, styles.inlineBlock]}>
                                                        <AntDesign style={styles.baricon} name='delete' size={25} color="#999999"></AntDesign>
                                                        <Text style={styles.barText}>删除</Text>
                                                    </View>
                                                </TouchableHighlight>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </Swiper>
                    <ConfirmModal
                        onCloseModal={this.onCloseModal.bind(this)}
                        modalVisible={modalVisible}
                        title='提示'
                        content='删除后无法恢复，确定删除吗？'
                        confirmBtnText='删除'
                        cancelBtnText='取消'
                    />
                </View>
                : <View style={[styles.loading, { top: headerHeight }]}>
                    <ActivityIndicator size="large" color={theme.loading} />
                </View>
        )
    }
}

function select(store) {
    return {
        GetDayReducer: store.GetDayReducer,
    }
}
export default connect(select)(PastDayDetail);