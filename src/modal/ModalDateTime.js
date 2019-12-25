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
import moment from 'moment';

import { ModalBottomSheet } from 'rn-inka-element';

export default class ModalDateTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyboard: [
        [{ value: '1', action: '1' }, { value: '2', action: '2' }, { value: '3', action: '3' }],
        [{ value: '4', action: '4' }, { value: '5', action: '5' }, { value: '6', action: '6' }],
        [{ value: '7', action: '7' }, { value: '8', action: '8' }, { value: '9', action: '9' }],
        [{ value: 'None', action: 'none' }, { value: '0', action: '0' }, { value: 'Today', action: 'today' }],
      ],
      datetime: { year: { value: '2019', editting: false }, month: { value: '12', editting: false }, day: { value: '18', editting: true }, hour: { value: '12', editting: false }, min: { value: '00', editting: false } }
    }
  }

  componentDidMount() {
    this.resetInitDateTime();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.resetInitDateTime();
  }

  resetInitDateTime() {
    if (this.props.dateInit) {
      this.setState({ datetime: this.setMoment(moment(this.props.dateInit)) })
    } else {
      this.setState({ datetime: this.setMoment(moment()) })
    }
  }

  getMoment() {
    const date = this.state.datetime;
    return moment(`${date.year.value}-${date.month.value}-${1} ${date.hour.value}:${date.min.value}`, 'YYYY-MM-DD HH:mm')
  }

  setMoment(moment) {
    const date = this.state.datetime;
    const month = moment.month() + 1
    date.day.value = moment.date() + '';
    date.month.value = month > 9 ? month : '0' + month;
    date.year.value = moment.year() + '';
    date.hour.value = moment.hour() > 9 ? moment.hour() : '0' + moment.hour();
    date.min.value = moment.minute() > 9 ? moment.minute() : '0' + moment.minute();
    return date;
  }

  enableDateTimeEditting(type) {
    const date = this.state.datetime;

    // reset
    for (var propertyName in date) {
      if (date[propertyName].editting) {
        this.fixValidMoment(date, propertyName);
      }
      date[propertyName].editting = false;
    }

    // enable editting
    date[type].editting = true;
    this.setState({ datetime: date })
  }

  fixValidMoment(date, type) {
    switch (type) {
      case 'day':
        if (parseInt(date.day.value) < 1) {
          date.day.value = '01';
        }
        if (parseInt(date.day.value) <= 9) {
          date.day.value = '0' + parseInt(date.day.value);
        }
        break;
      case 'month':
        if (parseInt(date.month.value) < 1) {
          date.month.value = '1';
        }
        if (parseInt(date.month.value) > 12) {
          date.month.value = '12';
        }
        if (parseInt(date.month.value) <= 9) {
          date.month.value = '0' + parseInt(date.month.value);
        }
        break;
      case 'year':
        if (parseInt(date.year.value) < 1975) {
          date.year.value = '1975';
        }
        if (parseInt(date.year.value) > 2100) {
          date.year.value = moment().year();
        }
        break;
      case 'hour':
        if (parseInt(date.hour.value) > 23) {
          date.hour.value = '23';
        }
        if (parseInt(date.hour.value) <= 9) {
          date.hour.value = '0' + parseInt(date.hour.value);
        }
        break;
      case 'min':
        if (parseInt(date.min.value) > 59) {
          date.min.value = '59';
        }
        if (parseInt(date.min.value) <= 9) {
          date.min.value = '0' + parseInt(date.min.value);
        }
        break;
    }

    // fix day of month
    const mm = moment(`${date.year.value}-${date.month.value}-${1} ${date.hour.value}:${date.min.value}`, 'YYYY-MM-DD HH:mm');
    const endOfMonth = mm.endOf('month');
    if (endOfMonth.date() < parseInt(date.day.value)) {
      date = this.setMoment(endOfMonth);
    }
    return date;
  }

  onKeyPress(action) {
    let date = this.state.datetime;

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
        let object = null;
        let name = '';
        for (var propertyName in date) {
          if (date[propertyName].editting === true) {
            object = date[propertyName];
            name = propertyName;
          }
        }

        if (object) {
          if ((object.value + '').length >= 4 && name === 'year') {
            object.value = action;
          } else if ((object.value + '').length >= 2 && name !== 'year') {
            object.value = action;
          } else {
            const jump = (section) => {
              for (var propertyName in date) {
                date[propertyName].editting = false;
              }
              date[section].editting = true;
            };

            object.value += action;
            if (((object.value + '').length >= 2 && name !== 'year') || (object.value + '').length >= 4) {
              // next block
              switch (name) {
                case 'day':
                  date = this.fixValidMoment(date, 'day');
                  jump('month');
                  break;
                case 'month':
                  date = this.fixValidMoment(date, 'month');
                  jump('year');
                  break;
                case 'year':
                  date = this.fixValidMoment(date, 'year');
                  jump('hour');
                  break;
                case 'hour':
                  date = this.fixValidMoment(date, 'hour');
                  jump('min');
                  break;
                case 'min':
                  date = this.fixValidMoment(date, 'min');
                  date.min.editting = false;
                  break;
              }
            }
          }
        }

        this.setState({ datetime: date });
        return;
      case 'none':
        this.props.onRequestClose();
        break;
      case 'ok':
        this.props.onRequestClose();
        break;
      case 'today':
        this.setState({ datetime: this.setMoment(moment()) })
        break;
    }
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
      value,
    } = this.props;
    let lang = {
      title_thin: 'Choose ',
      title_bold: '"Date Time"',
      button_ok: 'OK',
      button_cancel: 'Cancel',
    }
    if (this.props.lang) {
      lang = Object.assign(lang, this.props.lang);
    }

    const keyboard = this.state.keyboard;
    const datetime = this.state.datetime;


    return (
      <ModalBottomSheet
        {...this.props}
        lang={lang}
        onConfirm={() => {
          // fix current block
          let date = this.state.datetime;

          let object = null;
          let name = '';
          for (var propertyName in date) {
            if (date[propertyName].editting === true) {
              date = this.fixValidMoment(date, propertyName);
            }
          }
          this.setState({ datetime: date })
          const result = moment(`${date.year.value}-${date.month.value}-${date.day.value} ${date.hour.value}:${date.min.value}`, 'YYYY-MM-DD HH:mm')

          !onConfirm || onConfirm(result)
        }}
        enableScroll={true}
        renderContent={() => (
          <View style={styles.container}>
            <View style={{
              flexDirection: 'row',
              alignSelf: 'center',
              paddingTop: 15
            }}>
              <TouchableOpacity style={styles.modal_datetime_block_container} onPress={() => this.enableDateTimeEditting('day')}>
                <Text style={[styles.modal_datetime_block_text1, { color: datetime.day.editting ? '#9c9c9c' : '#000000' }]}>{datetime.day.value}</Text>
                <Text style={styles.modal_datetime_block_text2}>Day</Text>
              </TouchableOpacity>
              <Text style={styles.modal_datetime_block_text1}>/</Text>
              <TouchableOpacity style={styles.modal_datetime_block_container} onPress={() => this.enableDateTimeEditting('month')}>
                <Text style={[styles.modal_datetime_block_text1, { color: datetime.month.editting ? '#9c9c9c' : '#000000' }]}>{datetime.month.value}</Text>
                <Text style={styles.modal_datetime_block_text2}>Month</Text>
              </TouchableOpacity>
              <Text style={styles.modal_datetime_block_text1}>/</Text>
              <TouchableOpacity style={styles.modal_datetime_block_container} onPress={() => this.enableDateTimeEditting('year')}>
                <Text style={[styles.modal_datetime_block_text1, { color: datetime.year.editting ? '#9c9c9c' : '#000000' }]}>{datetime.year.value}</Text>
                <Text style={styles.modal_datetime_block_text2}>Year</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modal_datetime_block_container, { marginLeft: 15 }]} onPress={() => this.enableDateTimeEditting('hour')}>
                <Text style={[styles.modal_datetime_block_text1, { color: datetime.hour.editting ? '#9c9c9c' : '#000000' }]}>{datetime.hour.value}</Text>
                <Text style={styles.modal_datetime_block_text2}>Hour</Text>
              </TouchableOpacity>
              <Text style={styles.modal_datetime_block_text1}>:</Text>
              <TouchableOpacity style={styles.modal_datetime_block_container} onPress={() => this.enableDateTimeEditting('min')}>
                <Text style={[styles.modal_datetime_block_text1, { color: datetime.min.editting ? '#9c9c9c' : '#000000' }]}>{datetime.min.value}</Text>
                <Text style={styles.modal_datetime_block_text2}>Min</Text>
              </TouchableOpacity>
            </View>
            {keyboard.map((keys, index) => (
              <View style={{
                flexDirection: 'row',
                alignSelf: 'center'
              }} key={index}>
                {keys.map((key, i) => (
                  <TouchableOpacity style={styles.modal_datetime_key_container} onPress={() => this.onKeyPress(key.action)} key={key.action}>
                    <Text style={[styles.modal_datetime_key_text, { fontSize: ['none', 'today'].includes(key.action) ? 18 : 23 }]}>{key.value}</Text>
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
  container: {
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 8,
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