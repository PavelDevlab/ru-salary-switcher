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
        amount?: boolean;
        calculations?: boolean;
    };
}

export const salaryTypesMap: Map<SalaryType, SalaryState> = new Map([
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
        currencyPostfix: 'в день',
        related: {
            usePersonalIncomeTax: true,
            amount: true
        }
    }],
    [SalaryType.salaryAHour, {
        id: SalaryType.salaryAHour,
        caption: "Оклад за час",
        currencyPostfix: 'в час',
        related: {
            usePersonalIncomeTax: true,
            amount: true
        }
    }]
]);

export const salaryTypes: SalaryState[] = Array.from(salaryTypesMap).map(([, item]) => item);