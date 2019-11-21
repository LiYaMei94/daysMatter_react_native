import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Animated, Modal } from "react-native";
import PropTypes from 'prop-types';
export default class ConfirmModal extends React.Component {
	static propTypes = {
		modalVisible: PropTypes.bool,
		title: PropTypes.string,
		content: PropTypes.string,
		onCloseModal: PropTypes.func,
		height: PropTypes.number,
		duration: PropTypes.number,
		confirmBtnText: PropTypes.string,
		cancelBtnText: PropTypes.string,
	}
	static defaultProps = {
		modalVisible: false,
		title: "温馨提示",
		content: "确定吗？",
		duration: 200,
		height: 150,
		confirmBtnText: '确定',
		cancelBtnText: '取消',
	}
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	
	isOpen() {
		const {
			title,
			content,
			confirmBtnText,
			cancelBtnText,
			modalVisible
		} = this.props;
		return (
			<Modal transparent={true} visible={modalVisible} onRequestClose={() => this.props.onCloseModal(false)}>
				<View style={styles.confirmModal}>
					<TouchableHighlight style={styles.bg} underlayColor='rgba(0,0,0,0.3)' onPress={() => this.props.onCloseModal(false)} >
						<View ></View>
					</TouchableHighlight>
					<View style={styles.modal}>
						<Text allowFontScaling={false} style={styles.modalTitle}>{title}</Text>
						<Text allowFontScaling={false} style={styles.modalContent}>{content}</Text>
						<View style={styles.buttonContainer}>
							<TouchableHighlight underlayColor='#ffffff' onPress={() => this.props.onCloseModal(false)} style={styles.button}>
								<Text allowFontScaling={false} style={styles.cancelBtn}>{cancelBtnText}</Text>
							</TouchableHighlight>
							<TouchableHighlight underlayColor='#ffffff' onPress={() => this.props.onCloseModal(true)} style={styles.button}>
								<Text allowFontScaling={false} style={styles.confirmBtn}>{confirmBtnText}</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</Modal>
		)
        
	}
	render() {
		return this.isOpen()
	}
}

var styles = StyleSheet.create({
	block: {
		flexDirection: "column",
	},
	inlineBlock: {
		flexDirection: "row",
	},
	confirmModal: {
		justifyContent: "center",
		alignItems: "center",
		flex:1,
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
		textAlign: 'center',
	},
	confirmBtn: {
		width: '100%',
		lineHeight: 45,
		color: '#53CDFF',
		fontSize: 18,
		textAlign: 'center',
	}
})