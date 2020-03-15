
import React from "react";
import {formatCurrencyAmount, applyPrec} from "app/services/utils";
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
        <div>
            <div className="alert alert-warning d-inline-block text-dark"
                 role="alert">
                <b>{calculations.handSalaryAmount} ₽</b> сотрудник будет получать на руки<br />
                <b>{calculations.personalIncomeTax} ₽</b> НДФЛ, {applyPrec(PERSONAL_INCOME_TAX_RATE * 100, 0)}% от оклада<br />
                <b>{calculations.employeeFee} ₽</b> за сотрудника в месяц
            </div>
        </div>
    );
};

const SalaryCalculations = formValues({
    usePersonalIncomeTax: 'usePersonalIncomeTax',
    amount: 'amount'
})(SalaryCalculationsComponent) as any as React.FC<{}>;

export default SalaryCalculations;