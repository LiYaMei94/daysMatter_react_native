import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Animated } from "react-native";
import PropTypes from 'prop-types';
export default class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            animatedHeight: new Animated.Value(0),
        }
        this.setModalVisible = this.setModalVisible.bind(this);
        this.onPressCancel = this.onPressCancel.bind(this);
        this.onPressConfirm = this.onPressConfirm.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setModalVisible(nextProps.modalVisible);
    }
    setModalVisible(visible) {
        const { height, duration } = this.props;

        // slide animation
        if (visible) {
            this.setState({ modalVisible: visible });
            return Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: height,
                    duration: duration
                }
            ).start();
        } else {
            return Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: 0,
                    duration: duration
                }
            ).start(() => {
                this.setState({ modalVisible: visible });
            });
        }
    }
    onPressCancel() {
        this.setModalVisible(false);

        if (typeof this.props.onCloseModal === 'function') {
            this.props.onCloseModal(false);
        }
    }

    onPressConfirm() {
        this.setModalVisible(false);

        if (typeof this.props.onCloseModal === 'function') {
            this.props.onCloseModal(true);
        }
    }
    isOpen() {
        const { modalVisible } = this.state;
        const {
            title,
            content,
            confirmBtnText,
            cancelBtnText
        } = this.props;
        return modalVisible
            ? <View style={styles.confirmModal}>
                <TouchableHighlight style={styles.bg} underlayColor='rgba(0,0,0,0.3)' onPress={() => this.onPressCancel()} >
                    <View ></View>
                </TouchableHighlight>
                <View style={styles.modal}>
                    <Text allowFontScaling={false} style={styles.modalTitle}>{title}</Text>
                    <Text allowFontScaling={false} style={styles.modalContent}>{content}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight underlayColor='#ffffff' onPress={() => this.onPressCancel()} style={styles.button}>
                            <Text allowFontScaling={false} style={styles.cancelBtn}>{cancelBtnText}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='#ffffff' onPress={() => this.onPressConfirm()} style={styles.button}>
                            <Text allowFontScaling={false} style={styles.confirmBtn}>{confirmBtnText}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            : null
    }
    render() {
        return this.isOpen()
    }
}
ConfirmModal.defaultProps = {
    modalVisible: false,
    title: "温馨提示",
    content: "确定吗？",
    duration: 200,
    height: 150,
    confirmBtnText: '确定',
    cancelBtnText: '取消',
}
ConfirmModal.propTypes = {
    modalVisible: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    onCloseModal: PropTypes.func,
    height: PropTypes.number,
    duration: PropTypes.number,
    confirmBtnText: PropTypes.string,
    cancelBtnText: PropTypes.string,
}
var styles = StyleSheet.create({
    block: {
        flexDirection: "column",
    },
    inlineBlock: {
        flexDirection: "row",
    },
    confirmModal: {
        width: '100%',
        height: '100%',
        position: "absolute",
        alignItems: "center",
        elevation:4,//层级
    },
    bg: {
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.3)",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
    },
    modal: {
        width: '80%',
        height: 150,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginTop: 130,
    },
    modalTitle: {
        width: '100%',
        textAlign: 'center',
        lineHeight: 40,
        fontSize: 20,
    },
    modalContent: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        height: 60,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        color: '#999999'
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        borderTopColor: '#eeeeee',
        borderTopWidth: 1,
        borderStyle: "solid"
    },
    button: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
    },
    cancelBtn: {
        width: '100%',
        lineHeight: 45,
        borderRightColor: '#eeeeee',
        borderRightWidth: 1,
        borderStyle: "solid",
        color: '#999999',
        fontSize: 18,
        textAlign:'center',
    },
    confirmBtn: {
        width: '100%',
        lineHeight: 45,
        color: '#53CDFF',
        fontSize: 18,
        textAlign:'center',
    }
})