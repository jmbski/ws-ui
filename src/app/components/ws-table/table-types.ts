import { RecordObject, TypedRecord } from 'src/app/models/_index';

export interface ColumnDefinition {
    field: string;
    header: string;
    type?: string;
    format?: string;
    sortable?: boolean;
    //filter props will probably change, these are placeholders
    filter?: boolean;
    filterMatchMode?: string;
    filterType?: string;
    filterOptions?: string[];

    width?: string;
    style?: string;
    resizable?: boolean;
    reorderable?: boolean;
    hidden?: boolean;
    frozen?: boolean;
    freezable?: boolean;
}

export interface TableData {
    columns: ColumnDefinition[];
    data: RecordObject[];
}

export interface TablePaginatorConfig {
    usePaginator?: boolean;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    paginatorPosition?: 'top' | 'bottom' | 'both';
    rows?: number;
    showCurrentPageReport?: boolean;
    showFirstLastButtons?: boolean;
}

export interface TableConfig {
    paginatorOptions?: TablePaginatorConfig;
    useFrozenColumns?: boolean;
    enableResizeColumns?: boolean;
    enableReorderColumns?: boolean;
    dataKey?: string;
    columnResizeMode?: 'fit' | 'expand' ;
    useSort?: boolean;
    scrollable?: boolean;
    selectionMode?: 'single' | 'multiple';
    tableStyle?: TypedRecord<string>;
    containerElement?: HTMLElement | string;
    filterFields?: string[];
    columnDefs: ColumnDefinition[];
    rowData: RecordObject[];

    [key: string]: unknown;
}