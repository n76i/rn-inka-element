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
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const screen_height = Dimensions.get('window').height;

export default class ModalBottomSheet extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      scrollview: null,
      scrollDirection: 1,
      scrollCurrentOffset: 0,
    }
  }

  componentDidMount() {
    if (!this.props.onRequestClose) {
      console.warn('You must declare onRequestClose function to control this modal, if no it can not close by itself')
    }
  }

  render() {
    const {
      onSwipeDown,
      onSwipeUp,
      keyboardHeight,
      visible,
      onRequestClose,
      onBackgroundPress,
      onConfirm,
      onCancel,
      value,
      renderHeader,
      renderContent,
      enableScroll,
    } = this.props;
    let lang = {
      title_thin: 'Choose ',
      title_bold: '"Value"',
      button_ok: 'OK',
      button_cancel: 'Cancel',
    }
    if (this.props.lang) {
      lang = Object.assign(lang, this.props.lang);
    }

    let header = (
      <TouchableHighlight underlayColor='#ebebeb'>
        <View style={styles.modal_header_container}>
          <Text
            style={styles.modal_text_header}>{lang.title_thin}<Text style={styles.modal_text_header_bold}>{lang.title_bold}</Text></Text>
        </View>
      </TouchableHighlight>
    )
    if (renderHeader) {
      header = renderHeader();
    }

    let content = (
      <View style={styles.modal_root}>
        <View style={styles.modal_container}>
          {header}
          {!renderContent || renderContent()}
        </View>
      </View>
    );
    if (enableScroll) {
      content = (
        <ScrollView
          showsVerticalScrollIndicator={false}
          containerStyle={{ flex: 1, width: '100%' }}>
          <TouchableWithoutFeedback>
            {content}
          </TouchableWithoutFeedback>
        </ScrollView>
      );
    }

    let fixPaddingTop = 0;
    let confirmButton = null;
    if (onConfirm) {
      confirmButton = (
        <TouchableOpacity
          style={styles.modal_button}
          onPress={() => {
            onConfirm();
          }}>
          <Text style={{ color: '#0377fc', fontSize: 18 }} allowFontScaling={false}>{lang.button_ok}</Text>
        </TouchableOpacity>
      )
      fixPaddingTop += 48;
    }
    let cancelButton = null;
    if (onCancel) {
      cancelButton = (
        <TouchableOpacity
          style={styles.modal_button}
          onPress={() => {
            onCancel();
          }}>
          <Text style={{ color: '#0377fc', fontSize: 18 }} allowFontScaling={false}>{lang.button_cancel}</Text>
        </TouchableOpacity>
      )
      fixPaddingTop += 48;
    }

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => !onRequestClose || onRequestClose()}>
        <TouchableWithoutFeedback onPress={() => { }}>
          <ScrollView
            style={{
              backgroundColor: '#00000077'
            }}
            onScrollBeginDrag={() => {

            }}
            showsVerticalScrollIndicator={false}
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
              paddingTop: fixPaddingTop
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
                  elevation: 5
                }}>
                <KeyboardAvoidingView
                  behavior="position"
                  enabled
                  style={{ flex: 1 }}
                  keyboardVerticalOffset={
                    Platform.OS === 'android' ? -keyboardHeight : 0
                  }>
                  {content}
                  {onCancel || onConfirm ? (<View style={{
                    width: '100%',
                    paddingHorizontal: 15,
                    paddingBottom: 8,
                  }}>
                    {confirmButton}
                    {cancelButton}
                  </View>) : null}
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
    borderRadius: 15,
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
    marginTop: 1
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