
import React from "react";
import {Field, formValues} from "redux-form";
import {SalaryType, salaryTypesMap} from './definitions';
import SalaryCalculations from './SalaryCalculations';

interface SalaryRelatedProps {
    salaryType: SalaryType;
}
const SalaryRelatedComponent: React.FC<SalaryRelatedProps> = (props): React.ReactElement => {

    const selectedSalaryType = salaryTypesMap.get(props.salaryType);

    return (
        <>
            {!!selectedSalaryType?.related &&
            <>
                {!!selectedSalaryType.related.usePersonalIncomeTax &&
                    <fieldset className="custom-control custom-switch">
                        <Field className="custom-control-input"
                               id="usePersonalIncomeTaxId"
                               name="usePersonalIncomeTax"
                               component="input"
                               type="checkbox"
                               value="usePersonalIncomeTax"
                        />
                        <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                            <label className="custom-control-label"
                                   htmlFor="usePersonalIncomeTaxId">
                                Personal income tax:</label>
                    </fieldset>
                }
                <br /><br />
                {!!selectedSalaryType.related.amount &&
                    <fieldset>
                        <div className="input-group mb-2">
                            <Field className="form-control"
                                   name="amount"
                                   component="input"
                                   type="number"
                                   id="name"
                                   value="amount"
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">Р</div>{/* todo: Import ruble symbol here */}
                            </div>
                        </div>
                    </fieldset>
                }
                {!!selectedSalaryType.related.amount &&
                    <SalaryCalculations />
                }
            </>
            }
        </>
    );
};

// todo: apply types here
const SalaryRelated = formValues({
    salaryType: 'salaryType'
})(SalaryRelatedComponent) as any as React.FC<{}>;

export default SalaryRelated;