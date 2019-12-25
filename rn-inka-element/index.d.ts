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
    /** Render content of modal */
    renderContent?(): React.ReactNode,
    /** Enable scroll content if higher than screen 
     * @default false
     */
    enableScroll?: boolean,
    /** Language for multiple language 
     * @field title_thin
     * @field title_bold
     * @field button_ok
     * @field button_cancel
     */
    lang: object,
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
