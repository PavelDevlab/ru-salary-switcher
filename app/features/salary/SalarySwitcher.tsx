
import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';


type SalarySwitcherProps = InjectedFormProps;

const reduxConnector = reduxForm({
    // a unique name for the form
    form: 'contact'
});

const SalarySwitcher: React.FunctionComponent<SalarySwitcherProps> = (): React.ReactElement => {

    return (
        <div>

        </div>
    );
};

export default reduxConnector(SalarySwitcher);