import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ScrollView, Modal, Picker, FlatList, TouchableOpacity } from "react-native";

export default class Repeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftArr: [],
            rightArr: [],
            repeatType: '不重复',
            repeatTypeBg: '#ffffff',
            repeatCycleBg: '#ffffff',
            repeatCycle: '不重复',
        }
    }
    componentWillMount() {
        this.createData();

    }
    createData() {
        let arr1 = ['不', '周', '月', '年', '天'];
        let rightArr = [];
        let leftArr = [];
        let pickerData = [];
        for (let i = 0; i < arr1.length; i++) {
            let obj = {
                id: i + '',
                label: arr1[i] + '重复'
            };
            rightArr.push(obj);
        }
        for (let i = 0; i < 100; i++) {
            let obj = {
                id: i + '',
                label: i == 0 ? '不重复' : i == 1 ? '每' : '每' + i
            };
            leftArr.push(obj);
        }
        for (let i = 0; i < rightArr.length; i++) {
            let obj = {
                section: rightArr[i].label,
                data: leftArr
            }
            pickerData.push(obj);
        }
        this.setState({
            pickerData: pickerData,
            rightArr: rightArr,
            leftArr: leftArr,
        })
        //alert(leftArr[0].text)
    }
    
    //选择重复类型
    typeListRender({ item }) {
        return (
            <TouchableHighlight underlayColor='rgba(0,0,0,0.2)'
                onPress={() => {
                    this.repeatTypeChange(item.label);
                    let TypeScroll=32.5*(item.id*1+1);
                    this.setState({
                        repeatType: item.label,
                        repeatCycle: item.label != '不重复' ? '每' : '不重复',
                    })
                    this.props.render(item.label != '不重复' ? '每' : '不重复',item.label);
                    //this.CycleScrollView.scrollTo({ x: 0, y: 65, animated: true });
                    //this.TypeScrollView.scrollTo({ x: 0, y: TypeScroll, animated: true });
                    //,{backgroundColor:this.state.repeatType==item.label?"rgba(0,0,0,0.2)":'#ffffff'}
                }} >
                
                <Text allowFontScaling={false} style={[styles.label]}>{item.label}</Text>
            </TouchableHighlight>
        )

    }
    cycleListRender({ item }) {
        return (
            <TouchableHighlight underlayColor='rgba(0,0,0,0.2)'
                onPress={() => {
                    this.setState({
                        repeatCycle: item.label,
                        repeatType: item.label == '不重复' ? '不重复' : this.state.repeatType
                    })
                    this.props.render(item.label,item.label == '不重复' ? '不重复' : this.state.repeatType);
                }}>
                <Text allowFontScaling={false} style={[styles.label]}>{item.label}</Text>
            </TouchableHighlight>
        )

    }

    render() {
        const { modalVisible, } = this.props;
        const { repeatType, repeatCycle, leftArr, rightArr } = this.state;
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => this.props.isOpen()}
                style={styles.repeatcontainer}
            >
                <View style={styles.bg}>
                    <View style={styles.selectRepeat}>
                        <View style={styles.repeatTop}>
                            <TouchableOpacity style={[styles.repeatTopItem]} onPress={this._onPressButton}>
                                <Text allowFontScaling={false} style={{ color: repeatType != '不重复' ? '#53CDFF' : '#777777', fontSize: 18, textAlign: "center" }}>{repeatType}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.repeatTopItem]} onPress={this._onPressButton}>
                                <Text allowFontScaling={false} style={{ color: repeatCycle != '不重复' ? '#53CDFF' : '#777777', fontSize: 18, textAlign: "center" }}>{repeatCycle}</Text>
                            </TouchableOpacity>
                            <TouchableHighlight underlayColor='#ffffff' style={[styles.confirmBtn]} onPress={()=>{
                                let value=repeatType=='不重复'?'不重复':repeatCycle+repeatType;
                                this.props.isOpen(value);
                            }}>
                                <Text allowFontScaling={false} style={{
                                    borderColor: '#53CDFF',
                                    borderWidth: 1,
                                    width: 50, lineHeight: 30, borderRadius: 10, textAlign: "center"
                                }}>确定</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.ScrollViewBox}>
                            <ScrollView style={[styles.repeatItem]}
                                ref={(view) => { this.TypeScrollView = view; }}
                            >
                                <FlatList
                                    data={rightArr}
                                    renderItem={this.typeListRender.bind(this)}
                                    keyExtractor={(item) => item.id}
                                />
                            </ScrollView>
                            <ScrollView style={[styles.repeatItem]}
                                ref={(view) => { this.CycleScrollView = view; }}
                                onScroll={(event) => {
                                    {
                                        let y=event.nativeEvent.contentOffset.y;
                                        console.log(y);//垂直滚动距离 
                                    }
                                }}
                            >
                                {
                                    repeatType!='不重复'
                                    ?<FlatList
                                        data={leftArr}
                                        renderItem={this.cycleListRender.bind(this)}
                                        keyExtractor={(item) => item.id}
                                    />:null
                                }

                            </ScrollView>
                            <ScrollView style={[styles.repeatItem]}>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
        )

    }
}
/*

*/
var styles = StyleSheet.create({
    repeatcontainer: {
        height: '100%',
        width: '100%',
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
    },
    bg: {
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
    selectRepeat: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        height: 240,
        backgroundColor: '#ffffff'
    },
    repeatTop: {
        height: 40,
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1,
    },
    ScrollViewBox: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        height: 175,
        position:"relative"
    },
    repeatTopItem: {
        flex: 1,
    },
    confirmBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    repeatItem: {
        flex: 1,

    },
    label: {
        lineHeight: 35,
        fontSize: 16,
        textAlign: "center"
    },
    red: {
        backgroundColor: "red"
    },
    yellow: {
        backgroundColor: "yellow"
    },
    pink: {
        backgroundColor: "pink"
    }


})