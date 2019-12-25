import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Switch,
  Modal,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { ModalBottomSheet } from 'rn-inka-element';

export default class ModalNumberPad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyboard: [
        [{ value: '1', action: '1' }, { value: '2', action: '2' }, { value: '3', action: '3' }],
        [{ value: '4', action: '4' }, { value: '5', action: '5' }, { value: '6', action: '6' }],
        [{ value: '7', action: '7' }, { value: '8', action: '8' }, { value: '9', action: '9' }],
        [{ value: '.000', action: '.000' }, { value: '0', action: '0' }, { value: 'DEL', action: 'del' }],
      ],
      value: '0'
    }
  }

  componentDidMount() {
    if (!this.props.onRequestClose) {
      console.warn('You must declare onRequestClose function to control this modal, if no it can not close by itself')
    }
    this.resetInitNumber();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.resetInitNumber();
  }

  resetInitNumber() {
    if (this.props.valueInit) {
      this.setState({ value: this.props.valueInit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") })
    } else {
      this.setState({ value: '0' })
    }
  }

  onNumberKeyPress(action) {
    let data = this.state.value.toString().split(' ').join('');

    switch (action) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        data = data + action;
        data = parseInt(data);
        break;
      case '.000':
        data = parseInt(data) * 1000;
        break;
      case 'del':
        data = data.slice(0, -1);
        break;
    }
    if (!data || data === '') {
      data = '0';
    }
    if (parseInt(data) > 999999999999) {
      data = '999999999999';
    }
    const value = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    !this.props.onValueChange || this.props.onValueChange(value);
    this.setState({ value: value })
  }

  render() {
    const {
      onSwipeDown,
      keyboardHeight,
      visible,
      onRequestClose,
      onBackgroundPress,
      onConfirm,
      onCancel,
    } = this.props;
    const keyboard = this.state.keyboard;

    return (
      <ModalBottomSheet
        {...this.props}
        onConfirm={() => {
          const value = this.state.value.toString().split(' ').join('');
          !onConfirm || onConfirm(parseInt(value))
        }}
        enableScroll={true}
        renderContent={() => (
          <View style={styles.container}>
            <View style={{
              flexDirection: 'row',
              alignSelf: 'center',
              paddingTop: 15,
              alignItems: 'center',
              paddingLeft: 38
            }}>
              <TouchableOpacity style={styles.modal_datetime_block_container} onPress={() => { }}>
                <Text style={[styles.modal_datetime_block_text1, { color: '#0377fc' }]}>{this.state.value}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingVertical: 4, paddingHorizontal: 10 }} onPress={() => {
                this.setState({ value: '0' })
                !this.props.onValueChange || this.props.onValueChange('0')
              }}>
                <Ionicon
                  name='ios-close-circle'
                  color='#ababab'
                  size={18}
                />
              </TouchableOpacity>
            </View>
            {keyboard.map((keys, index) => (
              <View style={{
                flexDirection: 'row',
                alignSelf: 'center'
              }} key={index}>
                {keys.map((key, i) => (
                  <TouchableOpacity style={styles.modal_datetime_key_container} onPress={() => this.onNumberKeyPress(key.action)} key={key.action}>
                    <Text style={[styles.modal_datetime_key_text, { fontSize: ['.000', 'ok'].includes(key.action) ? 18 : 23 }]}>{key.value}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  modal_root: {
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 8,
  },
  modal_container: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 15,
    paddingBottom: 6,
    paddingTop: 4
  },
  modal_header_container: {
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 10,
  },
  modal_text_header: {
    paddingHorizontal: 15,
    color: '#808080',
    textAlign: 'center',
    fontSize: 15,
  },
  modal_text_header_bold: {
    fontSize: 16,
    color: '#000'
  },
  modal_selector_item_container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15
  },
  modal_selector_item_text: {
    paddingLeft: 8,
    flex: 1
  },
  modal_button: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  modal_datetime_block_container: {
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4
  },
  modal_datetime_block_text1: {
    fontSize: 25,
    color: '#000000',
  },
  modal_datetime_block_text2: {
    fontSize: 11,
  },
  modal_datetime_key_container: {
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 13,
    flex: 1
  },
  modal_datetime_key_text: {
    fontSize: 23,
    color: '#363636',
  },
})