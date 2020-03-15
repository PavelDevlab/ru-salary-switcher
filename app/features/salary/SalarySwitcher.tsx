
import React from 'react';
import {
    Field,
    reduxForm,
    InjectedFormProps
} from 'redux-form';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'app/services/utils';
import {SalaryType, salaries} from './definitions';
import SalaryRelated from './SalaryRelated';
import InfoButton from '../common/InfoButton';

interface FormSalarySwitcherValues {
    salaryType: SalaryType;
    usePersonalIncomeTax: boolean;
    amount: number;
}

const initialValues: FormSalarySwitcherValues = {
    salaryType: SalaryType.salaryAMonth,
    usePersonalIncomeTax: false,
    amount: 40000
};

const connector = connect(() => {
    return {
        initialValues,
    };
});

type PropsFromRedux = ConnectedProps<typeof connector>

// type SalarySwitcherProps = InjectedFormProps<{initialValues: FormSalarySwitcherValues}>;

const SalarySwitcher: React.FC<PropsFromRedux> = (): React.ReactElement => {

    return (
        <div className="form-group p-5">

            <label className="form-control-label">Сумма</label>
            <div className="form-group _p-1 mb-1">
                {salaries.map((item) => {
                    return (
                        <div key={item.id}
                             className="custom-control custom-radio">
                            <Field className="custom-control-input"
                                   name="salaryType"
                                   component="input"
                                   type="radio"
                                   id={item.id}
                                   value={item.id}
                            />
                            <label className="custom-control-label" htmlFor={item.id}>
                                {item.caption}
                            </label>
                            {!!item.info &&
                                <InfoButton
                                    info={item.info}
                                />
                            }
                        </div>
                    );
                })}
            </div>
            <SalaryRelated />
        </div>
    );
};

export default compose(
    connector as (arg0: React.ComponentType<PropsFromRedux>) => React.ComponentType<{}>,
    reduxForm({
        // a unique name for the form
        form: 'contact',
    }),
)(SalarySwitcher);