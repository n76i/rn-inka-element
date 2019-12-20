
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
 onRequestClose={() => {
 // should close modal here
 modal_number_visible = false;
 }}
 onConfirm={value => console.log(value)}
 value={{/* Store value in state, redux, mobx,... */}}
 onValueChange={value => {/* Update value */}}
 visible={modal_number_visible}/>
```
  