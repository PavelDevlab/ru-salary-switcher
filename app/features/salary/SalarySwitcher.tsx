
import React, { useEffect } from 'react';
import {
    formValues,
    Field,
    reduxForm,
    InjectedFormProps
} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'app/services/utils';
import $ from 'jquery';
import { formatCurrencyAmount } from 'app/services/utils';

const PERSONAL_INCOME_TAX_RATE = 0.13;

enum SalaryType {
    salaryAMonth= "salaryAMonth",
    minimumSalary= "minimumSalary",
    salaryADay= "salaryADay",
    salaryAHour= "salaryAHour",
}

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

// export type SalarySwitcherReduxProps = ConnectedProps<typeof connector>;

type SalarySwitcherProps = InjectedFormProps<{initialValues: FormSalarySwitcherValues}>;

interface SalaryState {
    id: SalaryType;
    caption: string;
    info?: string;
    related?: {
        usePersonalIncomeTax?: boolean;
        amount?: boolean;
        calculations?: boolean;
    };
}

const salaryTypesMap: Map<SalaryType, SalaryState> = new Map([
    [SalaryType.salaryAMonth, {
        id: SalaryType.salaryAMonth,
        caption: "Оклад за месяц",
        related: {
            usePersonalIncomeTax: true,
            amount: true,
            calculations: true
        }
    }],
    [SalaryType.minimumSalary, {
        id: SalaryType.minimumSalary,
        caption: "МРОТ",
        info: "МРОТ — минимальный размер оплаты труда. Разный для разных регионов.",
    }],
    [SalaryType.salaryADay, {
        id: SalaryType.salaryADay,
        caption: "Оклад за день",
        related: {
            usePersonalIncomeTax: true,
            amount: true
        }
    }],
    [SalaryType.salaryAHour, {
        id: SalaryType.salaryAHour,
        caption: "Оклад за час",
        related: {
            usePersonalIncomeTax: true,
            amount: true
        }
    }]
]);

const salaryTypes: SalaryState[] = Array.from(salaryTypesMap).map(([, item]) => item);


const SalaryCalculationsComponent: React.FC<{usePersonalIncomeTax: boolean; amount: string}> = (props) => {
    const amount = parseFloat(props.amount || '0');
    const handSalaryAmount = props.usePersonalIncomeTax ? (amount * (1/(1+PERSONAL_INCOME_TAX_RATE))) : amount;
    const personalIncomeTax = props.usePersonalIncomeTax ? amount - handSalaryAmount : amount * PERSONAL_INCOME_TAX_RATE;
    const calculations = {
        handSalaryAmount: formatCurrencyAmount(handSalaryAmount),
        personalIncomeTax: formatCurrencyAmount(personalIncomeTax),
        employeeFee: formatCurrencyAmount(handSalaryAmount + personalIncomeTax),
    };

    return (
        <div>
            {calculations.handSalaryAmount} salary<br />
            {calculations.personalIncomeTax} personal income tax<br />
            {calculations.employeeFee} employee fee
        </div>
    );
};

const SalaryCalculations = formValues({
    usePersonalIncomeTax: 'usePersonalIncomeTax',
    amount: 'amount'
})(SalaryCalculationsComponent as any) as any as React.FC<{}>;

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