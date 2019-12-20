import React from 'react';

export interface ModalNumberPadProps {
    /** Use this prop when have input inside this modal */
    keyboardHeight: number,
    onSwipeDown?(): void,
    visible: boolean,
    /** This function use help this modal can close when click cancel,... */
    onRequestClose(): void
}

export class ModalNumberPad extends React.Component<ModalNumberPadProps, any> {}