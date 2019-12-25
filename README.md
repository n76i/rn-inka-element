
# rn-inka-element

[![npm version](https://img.shields.io/npm/v/rn-inka-element.svg?style=flat-square)](https://www.npmjs.com/package/rn-inka-element) <a href="https://david-dm.org/beefe/rn-inka-element"><img src="https://david-dm.org/beefe/rn-inka-element.svg?style=flat-square" alt="dependency status"></a>   

## Getting started

`$ npm install rn-inka-element --save`

## REQUIRE
You need install moment for ModalDateTime
`$ npm install moment --save`

You need install react-native-vector-icons for ModalNumberPad
`$ npm install react-native-vector-icons --save`

### Mostly automatic installation

`$ react-native link rn-inka-element`

## Usage
# ModalNumberPad
```javascript
import { ModalNumberPad } from 'rn-inka-element';

// Use ModalNumberPad
<ModalNumberPad
  onRequestClose={() => modal_number_visible = false}
  onConfirm={value => {
    console.log(value);
    modal_number_visible = false;
  }}
  onCancel={() => modal_number_visible = false}
  lang={{
    title_thin: 'Choose ',
    title_bold: '"Product Price"',
    button_ok: 'OK',
    button_cancel: 'Cancel',
  }}
  valueInit={1104}
  visible={modal_number_visible} />
```
# ModalDateTime
```javascript
import { ModalDateTime } from 'rn-inka-element';

// Use ModalDateTime
<ModalDateTime
  onRequestClose={() => modal_datetime_visible = false}
  visible={modal_datetime_visible}
  dateInit='2019-12-23 12:30'
  onCancel={() => modal_datetime_visible = false}
  onConfirm={(date) => {
    // date type is moment
    console.log(date.format())
    modal_datetime_visible = false;
  }}
  />
```
# ModalBottomSheet
Other Modal is base on this component
```javascript
import { ModalBottomSheet } from 'rn-inka-element';

// Use ModalDateTime
<ModalBottomSheet
  onRequestClose={() => modal_option_visible = false}
  onCancel={() => modal_option_visible = false}
  onConfirm={() => modal_option_visible = false}
  lang={{
    title_thin: 'Choose ',
    title_bold: '"Product Price"',
    button_ok: 'OK',
    button_cancel: 'Cancel',
  }}
  enableScroll={true}
  renderContent={() => (
    <View style={styles.modal_container}>
      // Render your content here
    </View>
  )}
  visible={modal_option_visible} />
```

Props:


|Prop | Support | Description |
| --- | ---- | ----------- |
|keyboardHeight  | iOS/Android |Use this prop when have input inside this modal|
|onConfirm       | iOS/Android |On OK button press, note that if you def this props, a default button OK will render|
|onCancel        | iOS/Android |On cancel button press, note that if you def this props, a default button Cancel will render|
|onSwipeDown     | iOS         |Work on iOS only, handle event when use swipe modal down. This event use over scroll of scroll view|
|onSwipeUp       | iOS         |Work on iOS only, handle event when use swipe modal up. This event use over scroll of scroll view|
|visible         | iOS/Android |Important prop to control modal visible|
|onRequestClose  | iOS/Android |This function use help this modal can close when click cancel, ok, outside|
|renderHeader    | iOS/Android |Override render header of BottomSheet|
|renderContent   | iOS/Android |Render content of BottomSheet|
|enableScroll    | iOS/Android |Enable scroll content if higher than screen |
|lang            | iOS/Android |Use this prop for multiple language|
  
