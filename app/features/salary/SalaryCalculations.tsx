
import React from "react";
import {formatCurrencyAmount} from "app/services/utils";
import {formValues} from "redux-form";
import { PERSONAL_INCOME_TAX_RATE } from './definitions';

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
        <div className="alert alert-warning" role="alert">
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

export default SalaryCalculations;