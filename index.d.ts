import React from 'react';

export interface TestProps {
    prop1: boolean;
    prop2?: string;
    prop3?: string;
}

declare const Test: React.SFC<TestProps>

export default Test