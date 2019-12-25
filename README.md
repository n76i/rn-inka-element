
# rn-inka-element

## Getting started

`$ npm install rn-inka-element --save`

### Mostly automatic installation

`$ react-native link rn-inka-element`

## Usage
```javascript
import { ModalNumberPad } from 'rn-inka-element';

// Use Modal Number Pad
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
  
