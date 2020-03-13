export enum SalaryType {
    salaryAMonth= "salaryAMonth",
    minimumSalary= "minimumSalary",
    salaryADay= "salaryADay",
    salaryAHour= "salaryAHour",
}

export const PERSONAL_INCOME_TAX_RATE = 0.13;

interface SalaryState {
    id: SalaryType;
    caption: string;
    info?: string;
    currencyPostfix?: string;
    related?: {
        usePersonalIncomeTax?: boolean;
        amount?: boolean | {
            default: number;
        };
        calculations?: boolean;
    };
}

export const salaryMap: Map<SalaryType, SalaryState> = new Map([
    [SalaryType.salaryAMonth, {
        id: SalaryType.salaryAMonth,
        caption: "Оклад за месяц",
        related: {
            usePersonalIncomeTax: true,
            amount: {
                default: 40000
            },
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
        currencyPostfix: 'в день',
        related: {
            usePersonalIncomeTax: true,
            amount: {
                default: 1500
            }
        }
    }],
    [SalaryType.salaryAHour, {
        id: SalaryType.salaryAHour,
        caption: "Оклад за час",
        currencyPostfix: 'в час',
        related: {
            usePersonalIncomeTax: true,
            amount: {
                default: 400
            }
        }
    }]
]);

export const salaries: SalaryState[] = Array.from(salaryMap).map(([, item]) => item);