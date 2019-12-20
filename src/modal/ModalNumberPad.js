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

export default class ModalNumberPad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollview: null,
      scrollDirection: 1,
      scrollCurrentOffset: 0,
      keyboard: [
        [{ value: '1', action: '1' }, { value: '2', action: '2' }, { value: '3', action: '3' }],
        [{ value: '4', action: '4' }, { value: '5', action: '5' }, { value: '6', action: '6' }],
        [{ value: '7', action: '7' }, { value: '8', action: '8' }, { value: '9', action: '9' }],
        [{ value: '.000', action: '.000' }, { value: '0', action: '0' }, { value: 'DEL', action: 'del' }],
      ],
      modal_number_data: '0'
    }
  }

  componentDidMount() {
    if (!this.props.onRequestClose) {
      console.warn('You must declare onRequestClose function to control this modal, if no it can not close by itself')
    }
  }

  onNumberKeyPress(action) {
    let data = this.state.modal_number_data.toString().split(' ').join('');

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
    this.setState({ modal_number_data: data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") });
  }

  render() {
    const {
      onSwipeDown,
      keyboardHeight,
      visible,
      onRequestClose,
      onBackgroundPress,
      onConfirm,
      onCancel
    } = this.props;
    const keyboard = this.state.keyboard;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => !onRequestClose || onRequestClose()}>
        <TouchableWithoutFeedback onPress={() => { }}>
          <ScrollView
            style={{
              backgroundColor: '#00000077',
            }}
            onScrollBeginDrag={() => {

            }}
            ref={ref => {
              !this.state.scrollview || this.setState({ scrollview: ref })
            }}
            onScroll={event => {
              let currentOffset = event.nativeEvent.contentOffset.y;
              let scrollDirection = currentOffset > this.state.scrollCurrentOffset ? 1 : 0;
              let scrollCurrentOffset = currentOffset;
              this.setState({ scrollDirection, scrollCurrentOffset })
            }}
            scrollEventThrottle={0}
            onScrollEndDrag={() => {
              if (this.state.scrollDirection === 0) {
                if (!onSwipeDown) {
                  !onRequestClose || onRequestClose();
                } else {
                  onSwipeDown();
                }
              }
            }}
            overScrollMode="always"
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{
              width: '100%',
              alignContent: 'flex-end',
              alignItems: 'flex-end',
              flex: 1,
              flexDirection: 'column',
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (!onBackgroundPress) {
                  !onRequestClose || onRequestClose();
                } else {
                  onBackgroundPress();
                }
              }}>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  marginTop: Platform.OS === 'ios' ? 0 : 0,
                  alignContent: 'flex-end',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <KeyboardAvoidingView
                  behavior="position"
                  enabled
                  style={{ flex: 1 }}
                  keyboardVerticalOffset={
                    Platform.OS === 'android' ? -keyboardHeight : 0
                  }>
                  <TouchableWithoutFeedback>
                    <View style={styles.modal_root}>
                      <View style={styles.modal_container}>
                        <TouchableHighlight underlayColor='#ebebeb'>
                          <View style={styles.modal_header_container}>
                            <Text
                              style={styles.modal_text_header}>Choose <Text style={styles.modal_text_header_bold}>"Price"</Text></Text>
                          </View>
                        </TouchableHighlight>
                        <View style={{
                          flexDirection: 'row',
                          alignSelf: 'center',
                          paddingTop: 15,
                          alignItems: 'center',
                          paddingLeft: 38
                        }}>
                          <TouchableOpacity style={styles.modal_datetime_block_container} onPress={() => { }}>
                            <Text style={[styles.modal_datetime_block_text1, { color: '#0377fc' }]}>{this.state.modal_number_data}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ paddingVertical: 4, paddingHorizontal: 10 }} onPress={() => { this.setState({ modal_number_data: '0' }) }}>
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
                      <TouchableOpacity
                        style={[styles.modal_button, { marginBottom: 1 }]}
                        onPress={() => !onRequestClose || onRequestClose()}>
                        <Text style={{ color: '#0377fc', fontSize: 18 }} allowFontScaling={false}>OK</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.modal_button]}
                        onPress={() => !onRequestClose || onRequestClose()}>
                        <Text style={{ color: '#0377fc', fontSize: 18 }} allowFontScaling={false}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableWithoutFeedback>
      </Modal>
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