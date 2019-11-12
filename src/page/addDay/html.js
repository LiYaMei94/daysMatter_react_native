import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Switch, TextInput, ToastAndroid, BackHandler, StatusBar } from "react-native";
import { connect } from 'react-redux';
import Picker from 'react-native-picker';

import { increase_success, increase_fail, delete_success, delete_fail } from '../../redux/actions/GetDayAction.js';
import { getTodayDate, getDiffDate, getDay, repeatDate } from '../../util.js';
import { _deleteFile, _writeFile, _readFile, _fileEx } from '../../react_native_fs.js';
import DatePicker from '../../components/datePicker.js';
import ConfirmModal from '../../components/confirmModal.js';
//引入主题配置文件
import { theme } from '../../theme.js';
import { headerPaddingTop,headerHeight } from '../../assets/css/common';
import {styles} from './style';

const fileName = 'days.txt';
const year = getTodayDate().year;
const month = getTodayDate().month;
const day = getTodayDate().day;


class AddDaysScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayID: props.navigation.getParam('id', '-1'),
            title: '',
            date: '',
            week: '',
            isTop: false,
            confirmModalVisible: false,
            repeatModalVisible: false,
            repeatText: '不重复',
            toastVisible: false,
            message: '出错',
            switchThumbColor: '',
            isRepeat: false,
            isSave: false
        }
        this.saveInfo = this.saveInfo.bind(this);
        this.deleteday = this.deleteday.bind(this);
        this.back = this.back.bind(this);
        this.createData = this.createData.bind(this);
    }
    
    componentDidMount() {
        const that = this;
        const { dayID } = that.state;
        if (dayID != '-1') {
            that.showDetail();
        }
        
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    back() {
        const { navigation } = this.props;
        this.setState({
            repeatModalVisible: false
        })
        StatusBar.setBarStyle('dark-content');
        Picker.hide();
        this.timer = setTimeout(() => {
            navigation.goBack();
        }, 500);

    }
    //编辑时的信息
    showDetail() {
        let data = {};
        const that = this;
        const { dayID } = that.state;

        _fileEx(fileName, function (res) {
            if (res) {
                _readFile(fileName, function (res) {
                    data = JSON.parse(res);
                    data.forEach((item, index) => {
                        if (dayID == item.id) {
                            that.setState({
                                title: data[index].title,
                                date: data[index].date,
                                week: data[index].week,
                                isTop: data[index].isTop,
                                repeatText: data[index].repeatText,
                                switchThumbColor: data[index].isTop ? '#53CDFF' : ''
                            })
                        }
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
            confirmModalVisible: true,
        })
    }

    //保存事件
    saveInfo() {
        const that = this;
        let { dayID, title, date, week, isTop, repeatText } = that.state;
        const { navigation } = that.props;
        let data = [];
        let obj = {};
        let copyData
        title = title != '' ? title : '某天';
        date = date != '' ? date : year + '-' + month + '-' + day;
        _fileEx(fileName, function (res) {
            if (res) {
                _readFile(fileName, function (res) {
                    data = JSON.parse(res);
                    let newDate = '';
                    let isPast = getDiffDate(date).text == '已过去' ? true : false;
                    if (isPast) {
                        newDate = repeatDate(date, repeatText);
                    } else {
                        newDate = date;
                    }
                    if (data.length == 0) {
                        obj = {
                            id: 0 + '',
                            unit: '天',
                            title: title,
                            date: date,
                            repeatDate: newDate,
                            dateStatus: getDiffDate(newDate).text,
                            dayNum: getDiffDate(newDate).dayNum,
                            week: getDay(newDate),
                            isTop: isTop,
                            isPast: getDiffDate(newDate).text == '已过去' ? true : false,
                            repeatText: repeatText
                        }
                        data.push(obj);
                    } else {
                        if (dayID != '-1') {//编辑
                            data[dayID] = {
                                id: data[dayID].id + '',
                                unit: data[dayID].unit,
                                title: title,
                                date: date,
                                repeatDate: newDate,
                                dateStatus: getDiffDate(newDate).text,
                                dayNum: getDiffDate(newDate).dayNum,
                                week: getDay(newDate),
                                isTop: isTop,
                                isPast: getDiffDate(newDate).text == '已过去' ? true : false,
                                repeatText: repeatText
                            }
                            if (isTop) {
                                data.forEach((item, index) => {
                                    if (item.id != dayID) {
                                        item.isTop = false;
                                    } else {
                                        item.isTop = true;
                                    }
                                })
                            }
                        } else {//新增
                            obj = {
                                id: (data[data.length - 1].id * 1 + 1) + '',
                                unit: '天',
                                title: title,
                                date: date,
                                repeatDate: newDate,
                                dateStatus: getDiffDate(newDate).text,
                                dayNum: getDiffDate(newDate).dayNum,
                                week: getDay(newDate),
                                isTop: isTop,
                                isPast: getDiffDate(newDate).text == '已过去' ? true : false,
                                repeatText: repeatText
                            }
                            if (isTop) {
                                data.forEach((item, index) => {
                                    if (item.id != obj.id) {
                                        item.isTop = false;
                                    } else {
                                        item.isTop = true;
                                    }
                                })
                            }
                            data.push(obj);
                        }
                    }
                    that.updateRedux('edit', data);

                })
            } else {


            }
        })
    }

    updateRedux(text, arr) {
        const { dispatch, navigation } = this.props;
        const that = this;

        _deleteFile(fileName, function (res) {
            if (res == 1) {
                _writeFile(fileName, JSON.stringify(arr), function () {

                    if (res == 1) {
                        text == 'edit' ? dispatch(increase_success()) : dispatch(delete_success());
                        navigation.push('bottomTabNavigator');
                    } else {
                        text == 'edit' ? dispatch(increase_fail()) : dispatch(delete_fail());
                        dispatch(increase_fail());

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
                        for(let i=0;i<data.length;i++){
                            if(data[i].id==dayID){
                                data.splice(i, 1);
                                that.updateRedux('delete', data);
                            }
                        }
                    })
                } else {

                }
            })
        } else {
            /*that.setState({
                toastVisible:true,
                message:'出错了，请重试'
            })*/
        }
    }
    //重复选择关闭打开
    closeRepeat() {
        this.setState({
            repeatModalVisible: false
        })
    }

    createData() {
        const that = this;
        let arr1 = ['周', '月', '年', '天'];
        let rightArr = [];
        let leftArr = [];
        for (let i = 0; i < arr1.length; i++) {
            rightArr.push(arr1[i] + '重复');
        }
        for (let i = 0; i < 100; i++) {
            leftArr.push(i == 0 ? '每' : '每' + i);
        }
        Picker.init({
            pickerData: [leftArr, rightArr],
            selectedValue: [0, 0],
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择重复类型',
            pickerConfirmBtnColor: [83, 205, 255, 1],
            pickerCancelBtnColor: [151, 151, 151, 1],
            pickerBg: [255, 255, 255, 1],
            pickerToolBarBg: [255, 255, 255, 1],
            onPickerConfirm: data => {
                that.setState({
                    repeatText: data[0] + data[1],
                    repeatModalVisible: false
                })
            },
            onPickerCancel: data => {
                that.setState({
                    repeatText: '不重复',
                    repeatModalVisible: false
                })
            },
            onPickerSelect: data => {
                that.setState({
                    repeatText: data[0] + data[1]
                })
            }
        });
        Picker.show();
    }

    render() {
        const { navigation } = this.props;
        const { title, isTop, date, week, dayID, isRepeat, confirmModalVisible, message, repeatText, switchThumbColor, repeatModalVisible } = this.state;
        return (
            <View style={styles.container}>
                <View style={[styles.header, { height: headerHeight, backgroundColor: theme.themeColor }]}>
                    <View style={{ width: 55}}>
                        <TouchableHighlight
                            onPress={() => this.back()}
                            underlayColor='rgba(0,0,0,0.2)'
                            style={{ width: 33, height: 33, borderRadius: 50, justifyContent: "center", alignItems: "center", }}
                        >
                            <Text style={{fontFamily:'iconfont',fontSize:24,color:'#fff'}}>{'\ue613'}</Text>
                        </TouchableHighlight>
                    </View>
                    <Text style={{ color: '#fff',lineHeight: 30, flex: 1, fontSize: 20,fontWeight:"bold"}}>{navigation.getParam('id') == "-1" ? "添加新日子" : "编辑事件"}</Text>
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", flexDirection: "row"}}>
                        <TouchableHighlight
                            onPress={() => this.saveInfo()}
                            underlayColor='rgba(0,0,0,0.2)'
                            style={styles.headerRightButtonBox}
                        >
                            <Text style={styles.headerRightButton} >保存</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{ padding: 20, width: '100%' }}>
                    <View style={[styles.inlineBlock, styles.infoItem]}>
                        <View style={styles.icon}>
                            <Text style={styles.infoItemIcon}>{'\ue6fa'}</Text>
                        </View>
                        <TextInput style={styles.textinput}
                            clearButtonMode={'while-editing'}
                            underlineColorAndroid={'#53CDFF'}
                            selectionColor={'#53CDFF'}
                            placeholder='点击这里输入事件名称'
                            onChangeText={(text) => this.setState({ title: text })} value={title}></TextInput>
                    </View>
                    <View style={[styles.inlineBlock, styles.infoItem]}>
                        <View style={styles.icon}>
                            <Text style={styles.infoItemIcon}>{'\ue6e9'}</Text>
                        </View>
                        <Text style={styles.iconText} >日期</Text>
                        <DatePicker style={styles.datePicker}
                            date={date}
                            mode="date"
                            format="YYYY-MM-DD"
                            //minDate={year + '-' + month + '-' + day}
                            customStyles={customStyles}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        >
                        </DatePicker>
                    </View>
                    <View style={[styles.inlineBlock, styles.infoItem]}>
                        <View style={styles.icon}>
                            <Text style={styles.infoItemIcon}>{'\ue691'}</Text>
                        </View>
                        <Text style={styles.iconText} >置顶</Text>
                        <Switch style={styles.isTop} trackColor={'#53CDFF'} thumbColor={switchThumbColor} value={isTop} onValueChange={(value) => this.setState({
                            isTop: value,
                            switchThumbColor: value ? '#53CDFF' : ''
                        })}></Switch>
                    </View>
                    <View style={[styles.inlineBlock, styles.infoItem]}>
                        <View style={styles.icon}>
                            <Text style={styles.infoItemIcon}>{'\ue634'}</Text>
                        </View>
                        <Text style={styles.iconText} >重复</Text>
                        <TouchableHighlight style={{ flex: 4 }} underlayColor='#ffffff' onPress={() => {
                            this.createData();
                            this.setState({
                                repeatModalVisible: true
                            })
                        }}>
                            <View style={{ width: '100%', flexDirection: "row", justifyContent: "flex-end", alignItems: "center", }}>
                                <Text style={{ marginRight: 10 }}>{repeatText}</Text>
                                <Text style={{fontSize:13,fontFamily:"iconfont",color:"#999"}}>{'\ue605'}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight
                        onPress={() => this.saveInfo()}
                        underlayColor='rgba(0,0,0,0.2)' style={[styles.eventButtonSave, styles.eventButtonItem, { backgroundColor: theme.themeColor }]} >
                        <Text style={styles.eventButtonText}>保存</Text>
                    </TouchableHighlight>
                    {
                        dayID == "-1"
                            ? null
                            : <TouchableHighlight onPress={() => this.deleteday()}
                                underlayColor='rgba(0,0,0,0.2)' style={[styles.eventButtonDelete, styles.eventButtonItem]} >
                                <Text style={styles.eventButtonText} >删除</Text>
                            </TouchableHighlight>
                    }
                </View>
                <ConfirmModal
                    onCloseModal={this.onCloseModal.bind(this)}
                    modalVisible={confirmModalVisible}
                    title='提示'
                    content='删除后无法恢复，确定删除吗？'
                    confirmBtnText='删除'
                    cancelBtnText='取消'
                />
                {
                    repeatModalVisible ?
                        <View style={styles.repeatcontainer}>

                        </View>
                        : null
                }
            </View>
        )
    }
}

var customStyles = StyleSheet.create({
    dateInput: {
        width: '100%',
        borderColor: "transparent",
        alignItems: 'flex-start'
    },
    placeholderText: {
        textAlign: 'left',
    }
})



function select(store) {
    return {
        GetDayReducer: store.GetDayReducer,
    }
}
export default connect(select)(AddDaysScreen);