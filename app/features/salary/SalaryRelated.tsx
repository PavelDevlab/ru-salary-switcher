
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
                <fieldset className="form-group">
                    <label>
                        Personal income tax:
                    </label>
                    <Field className="form-check-input"
                           name="usePersonalIncomeTax"
                           component="input"
                           type="checkbox"
                           value="usePersonalIncomeTax"
                    />
                </fieldset>
                }
                <br /><br />
                {!!selectedSalaryType.related.amount &&
                <fieldset>
                    <label>
                        Amount:
                    </label>
                    <Field className="form-check-input"
                           name="amount"
                           component="input"
                           type="number"
                           id="name"
                           value="amount"
                    />
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