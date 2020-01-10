import React from 'react';

export interface ModalBottomSheetProps {
    /** Use this prop when have input inside this modal */
    keyboardHeight?: number,
    /**
     * Callback function when user press OK, note that if you def this props, a default button OK will render
     */
    onConfirm?(): void,
    /** On cancel button press, note that if you def this props, a default button Cancel will render */
    onCancel?(): void,
    /** Work on iOS only, handle event when use swipe modal down. This event use over scroll of scroll view */
    onSwipeDown?(): void,
    /** Work on iOS only, handle event when use swipe modal up. This event use over scroll of scroll view */
    onSwipeUp?(): void,
    /** Important prop to control modal visible */
    visible: boolean,
    /** This function use help this modal can close when click cancel, ok, outside */
    onRequestClose(): void,
    renderHeader?(): React.ReactNode,
    /** Render content of modal, in case enableScroll and scrollType is not 'ScrollView' renderContent will be disable*/
    renderContent?(): React.ReactNode,
    /** Enable scroll content if higher than screen 
     * @default false
     */
    enableScroll?: boolean,
    /** Type of content scrollview (when enableScroll = true), maybe FlatList, SectionList or ScrollView */
    scrollType?: string,
    /** Custom props of scrollview, you may use this to set data for List and all its props */
    scrollProps?: object,
    /** Language for multiple language 
     * @field title_thin
     * @field title_bold
     * @field button_ok
     * @field button_cancel
     */
    lang: object,
    /** ScrollView style, custom this style can control alignItems inside Modal (by default is flex-end) */
    containerStyle: object,
    /** Custom content shadow (white background) */
    shadowStyle: object,
    /** Show input below modal header, usually use to search data on List */
    enableInput?: boolean,
    /** Callback when input text change, use for search & filter function */
    onChangeText?(text: string),
}

export class ModalBottomSheet extends React.Component<ModalBottomSheetProps, any> { }

export interface ModalNumberPadProps extends ModalBottomSheetProps {
    /**
     * Callback function to receive new value of number pad. You need change your store value here to update value to number pad
     * @param value new value
     */
    onValueChange(value: number): void,
    // Default value will display on pad
    valueInit: number,
    /**
     * Callback function when user press OK, note that if you def this props, a default button OK will render
     * @param value Number user have typed
     */
    onConfirm?(value: number): void,
}

export class ModalNumberPad extends React.Component<ModalNumberPadProps, any> { }

export interface ModalDateTimeProps extends ModalBottomSheetProps {
    dateInit: string,
    /**
     * Callback function when user press OK, note that if you def this props, a default button OK will render
     * @param value Date use have typed
     */
    onConfirm?(value: string): void,
}
export class ModalDateTime extends React.Component<ModalDateTimeProps, any> { }
