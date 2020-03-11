
import React, { useEffect, useCallback, useReducer } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { connect /*, ConnectedProps */ } from 'react-redux';
import { compose } from 'app/services/utils';
import $ from 'jquery';


enum SalaryType {
    salaryAMonth= "salaryAMonth",
    minimumSalary= "minimumSalary",
    salaryADay= "salaryADay",
    salaryAHour= "salaryAHour",
}

interface FormSalarySwitcherValues {
    salaryType: SalaryType;
}

const initialValues: FormSalarySwitcherValues = {
    salaryType: SalaryType.salaryAMonth
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
        personalIncomeTax?: boolean;
        amount?: boolean;
        calculations?: boolean;
    };
}

const salaryTypes: SalaryState[] = [{
    id: SalaryType.salaryAMonth,
    caption: "Оклад за месяц",
    related: {
        personalIncomeTax: true,
        amount: true,
        calculations: true
    }
}, {
    id: SalaryType.minimumSalary,
    caption: "МРОТ",
    info: "МРОТ — минимальный размер оплаты труда. Разный для разных регионов.",
}, {
    id: SalaryType.salaryADay,
    caption: "Оклад за день",
    related: {
        personalIncomeTax: true,
        amount: true
    }
}, {
    id: SalaryType.salaryAHour,
    caption: "Оклад за час",
    related: {
        personalIncomeTax: true,
        amount: true
    }
}];

// const defaultSalarySwitcherState = {
//     salaryType: initialValues.salaryType
// };
//
// interface Action {
//     type: string;
// }

// const salarySwitcherReducer = (state: typeof defaultSalarySwitcherState, action: Action) => {
//     switch (action.type) {
//         case 'SET_SALARY_TYPE':
//             return {
//                 ...state,
//                 salaryType: action.payload
//             };
//         default:
//             return state;
//     }
// };

const SalaryRelated: React.FC<any> = (props): React.ReactElement => {
    // eslint-disable-next-line no-console
    console.log(props.input.value);
    return (
        <fieldset className="form-group">

        </fieldset>
    );
};

const SalarySwitcher: React.FC<SalarySwitcherProps> = (): React.ReactElement => {
    // console.log(props);
    //const [state, dispatch] = useReducer(salarySwitcherReducer, defaultSalarySwitcherState);
//
    //const handleSalaryTypeChange = useCallback((event, newValue) => {
//
    //}, []);

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
            <Field name='salaryType'
                   component={SalaryRelated}
            />
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