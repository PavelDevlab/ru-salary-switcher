
import React from "react";
import {Field, formValues} from "redux-form";
import {SalaryType, salaryTypesMap} from './definitions';
import SalaryCalculations from './SalaryCalculations';
import classNames from 'classnames';

interface SalaryRelatedProps {
    salaryType: SalaryType;
    usePersonalIncomeTax: boolean;
}


const SalaryRelatedComponent: React.FC<SalaryRelatedProps> = (props): React.ReactElement => {

    const selectedSalaryType = salaryTypesMap.get(props.salaryType);

    return (
        <>
            {!!selectedSalaryType?.related &&
                <>
                    {!!selectedSalaryType.related.usePersonalIncomeTax &&
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
                    {!!selectedSalaryType.related.amount &&
                        <div className="form-group _p-2 mb-4">
                            <div className="input-group _compact">
                                <Field className="form-control"
                                       name="amount"
                                       component="input"
                                       type="number"
                                       id="name"
                                       value="amount"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text _label">
                                        ₽{' '}
                                        {!!selectedSalaryType.currencyPostfix &&
                                            selectedSalaryType.currencyPostfix
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {!!selectedSalaryType.related.calculations &&
                        <SalaryCalculations />
                    }
                </>
            }
        </>
    );
};

// todo: apply types here
const SalaryRelated = formValues({
    salaryType: 'salaryType',
    usePersonalIncomeTax: 'usePersonalIncomeTax'
})(SalaryRelatedComponent) as any as React.FC<{}>;

export default SalaryRelated;