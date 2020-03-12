
import React, { useEffect } from 'react';
import {
    Field,
    reduxForm,
    InjectedFormProps
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'app/services/utils';
import $ from 'jquery';
import {SalaryType, salaryTypes} from './definitions';
import SalaryRelated from './SalaryRelated';

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

type SalarySwitcherProps = InjectedFormProps<{initialValues: FormSalarySwitcherValues}>;

const SalarySwitcher: React.FC<SalarySwitcherProps> = (): React.ReactElement => {

    useEffect(() => {
        const unsubscribe = ($('[data-toggle="tooltip"]') as any).tooltip();
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="p-5">
            <label>Сумма</label>
            <fieldset className="form-group">
                {salaryTypes.map((item) => {
                    return (
                        <div key={item.id}
                             className="form-check">
                            <Field className="form-check-input"
                                   name="salaryType"
                                   component="input"
                                   type="radio"
                                   id={item.id}
                                   value={item.id}
                            />
                            <label className="form-check-label" htmlFor={item.id}>
                                {item.caption}
                                {!!item.info &&
                                    <button type="button"
                                            className="btn btn-secondary"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title={item.info}>
                                        I
                                    </button>
                                }
                            </label>
                        </div>
                    );
                })}
            </fieldset>
            <SalaryRelated />
        </div>
    );
};

export default compose(
    connector as (arg0: any) => any,
    reduxForm({
        // a unique name for the form
        form: 'contact',
    }),
)(SalarySwitcher);