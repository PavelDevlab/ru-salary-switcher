
import React, {useCallback, useState, useEffect} from "react";
import {Field, formValues, change} from "redux-form";
import {SalaryType, salaryMap} from './definitions';
import SalaryCalculations from './SalaryCalculations';
import classNames from 'classnames';
import { compose } from 'app/services/utils';
import { connect } from 'react-redux';
import { StoreState } from 'app/redux/reducer';

interface SalaryRelatedProps {
    // _reduxForm: any;
    salaryType: SalaryType;
    usePersonalIncomeTax: boolean;
    onChange?: (arg0: string, arg1: string, arg2: string) => void;
}

const SalaryRelatedComponent: React.FC<SalaryRelatedProps> = (props): React.ReactElement => {
    const selectedSalary = salaryMap.get(props.salaryType);
    const [isAmountChanged, setIsAmountChanged] = useState(false);

    const handleAmountChange = useCallback(() => {
        setIsAmountChanged(true);
    }, []);

    useEffect(() => {
        if (!isAmountChanged &&
                selectedSalary?.related?.amount &&
                typeof selectedSalary?.related?.amount !== 'boolean') {
            props.onChange && props.onChange('contact','amount', String(selectedSalary.related.amount.default));
        }
    }, [props.salaryType]);

    return (
        <>
            {!!selectedSalary?.related &&
                <>
                    {!!selectedSalary.related.usePersonalIncomeTax &&
                        <div className="form-group _p-2 mb-2">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <label htmlFor={props.usePersonalIncomeTax ? "" : "usePersonalIncomeTaxId"}
                                           className={classNames({
                                               "input-group-text switcher-label _left": true,
                                               "_active": props.usePersonalIncomeTax
                                           })}>
                                        Указать с НДФЛ
                                    </label>
                                </div>
                                <div className="custom-control custom-switch switcher _reversed">
                                    <Field className="custom-control-input"
                                           id="usePersonalIncomeTaxId"
                                           name="usePersonalIncomeTax"
                                           component="input"
                                           type="checkbox"
                                           value="usePersonalIncomeTax"
                                    />
                                    <label className="custom-control-label"
                                           htmlFor="usePersonalIncomeTaxId"></label>
                                </div>
                                <div className="input-group-append">
                                    <label htmlFor={!props.usePersonalIncomeTax ? "" : "usePersonalIncomeTaxId"}
                                           className={classNames({
                                               "input-group-text switcher-label _right": true,
                                               "_active": !props.usePersonalIncomeTax
                                           })}>
                                        Без НДФЛ
                                    </label>
                                </div>
                            </div>
                        </div>
                    }
                    {!!selectedSalary.related.amount &&
                        <div className="form-group _p-2 mb-4">
                            <div className="input-group _compact">
                                <Field className="form-control"
                                       onChange={handleAmountChange}
                                       name="amount"
                                       component="input"
                                       type="number"
                                       id="name"
                                       value="amount"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text _label">
                                        ₽{' '}
                                        {!!selectedSalary.currencyPostfix &&
                                            selectedSalary.currencyPostfix
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {!!selectedSalary.related.calculations &&
                        <SalaryCalculations />
                    }
                </>
            }
        </>
    );
};

export default compose(
    connect((state: StoreState) => {
        return {
            contactForm: state.form.contact
        };
    }, (dispatch) => {
        return {
            onChange: (form: string, field: string, value: string) => {
                dispatch(change(form, field, value));
            }
        };
    }) as (a1: any) => any,
    formValues({
        salaryType: 'salaryType',
        usePersonalIncomeTax: 'usePersonalIncomeTax'
    }),
)(SalaryRelatedComponent);