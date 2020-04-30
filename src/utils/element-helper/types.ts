export interface TableColumnCustom {
    prop: string;
    property?: string;
    label: string;
    width?: number;
    minWidth?: number;
    sortable?: boolean | 'custom';
    fixed?: true | 'left' | 'right';
    showOverflowTooltip?: boolean;
    formatter?(row: Row): string;
}

export interface Row {
    [propName: string]: any;
}

export interface Formatter {
    (row: Row, column: TableColumnCustom): string | null;
}

export interface FormatterElCellContent {
    (formatter: Formatter | undefined, row: {[propName: string]: any}, column: TableColumnCustom): string;
}

export interface GetElCellEmptyText {
    (row: Row, column: TableColumnCustom, emptyText?: string): string;
}

export interface ElFormValidateRule {
    trigger: string;
    validator(rule: object, value: string, cb: (msg?: Error) => void): void;
}
