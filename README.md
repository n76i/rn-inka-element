
# rn-inka-element

A React Native library with some bottom sheet (using modal)

[![npm version](https://img.shields.io/npm/v/rn-inka-element.svg?style=flat-square)](https://www.npmjs.com/package/rn-inka-element)[![npm](https://img.shields.io/npm/dm/rn-inka-element.svg)](https://npmjs.com/package/rn-inka-element) <a href="https://david-dm.org/beefe/rn-inka-element"><img src="https://david-dm.org/beefe/rn-inka-element.svg?style=flat-square" alt="dependency status"></a>   

## Getting started

`$ npm install rn-inka-element --save`

## Require
You need install moment for ModalDateTime

`$ npm install moment --save`

You need install react-native-vector-icons for ModalNumberPad

`$ npm install react-native-vector-icons --save`

### Mostly automatic installation

`$ react-native link rn-inka-element`

## Usage
### ModalNumberPad

<img src="https://raw.githubusercontent.com/n76i/rn-inka-element/master/numberpad.png" width="320">

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


#### Props:


|Prop | Support | Description |
| --- | ---- | ----------- |
|onValueChange  | iOS/Android |Callback function to receive new value of number pad. You need change your store value here to update value to number pad|
|valueInit  | iOS/Android |Default value will display on pad|
|onConfirm  | iOS/Android |Callback function when user press OK, note that if you def this props, a default button OK will render, callback param will be the number you need|

### ModalDateTime

<img src="https://raw.githubusercontent.com/n76i/rn-inka-element/master/datetime.png" width="320">

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


#### Props:


|Prop | Support | Description |
| --- | ---- | ----------- |
|dateInit  | iOS/Android |Default value will display on pad|
|onConfirm  | iOS/Android |Callback function when user press OK, note that if you def this props, a default button OK will render, callback param will be the moment you choosed|

### ModalBottomSheet
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
  enableScroll={false}
  renderContent={() => (
    <View style={styles.modal_container}>
      // Render your content here
    </View>
  )}
  visible={modal_option_visible} />
```

#### Props:


|Prop | Support | Description |
| --- | ---- | ----------- |
|onConfirm       | iOS/Android |On OK button press, note that if you def this props, a default button OK will render|
|onCancel        | iOS/Android |On Cancel button press, note that if you def this props, a default button Cancel will render|
|onSwipeDown     | iOS         |Work on iOS only, handle event when use swipe modal down. This event use over scroll of scroll view|
|onSwipeUp       | iOS         |Work on iOS only, handle event when use swipe modal up. This event use over scroll of scroll view|
|visible         | iOS/Android |Important prop to control modal visible|
|onRequestClose  | iOS/Android |This function use help this modal can close when click cancel, ok, outside|
|renderHeader    | iOS/Android |Override render header of BottomSheet|
|enableScroll    | iOS/Android |Enable scroll content if higher than screen |
|renderContent   | iOS/Android |Render content of modal, in case enableScroll and scrollType is not 'ScrollView' renderContent will be disable|
|enableInput     | iOS/Android |Show input below modal header, usually use to search data on List |
|onChangeText    | iOS/Android |Callback when input text change, use for search & filter function |
|scrollType      | iOS/Android |Type of content scrollview (when enableScroll = true), maybe FlatList, SectionList or ScrollView |
|scrollProps     | iOS/Android |Custom props of ScrollView/FlatList..., you may use this to set data for List and all its props (include header, items) |
|lang            | iOS/Android |Use this prop for multiple language|

### ModalBottomSheet with FlatList and Search input
You can use FlatList inside Modal very easy, or add an input on top of modal for seach function

```javascript
import { ModalBottomSheet } from 'rn-inka-element';

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
  scrollType='FlatList'
  enableInput={true}
  onChangeText={text => console.log(text)}
  scrollProps={{
    data: options,
    keyExtractor: (item, index) => index.toString(),
    renderItem: (rowData, index) => {
      const option = rowData.item;

      return (
        // render item of list
        )
    }
  }}
  visible={modal_option_visible} />
```
