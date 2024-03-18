import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { LocalObject, RecordObject } from '@models';
import { nanoid } from 'nanoid';
import { ColumnDefinition, TableConfig } from '@components';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
    selector: 'gdo-table',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        MultiSelectModule,
        TableModule,
    ],
    templateUrl: './gdo-table.component.html',
    styleUrl: './gdo-table.component.scss'
})
export class GdoTableComponent implements LocalObject {
    public readonly LOCAL_ID: string = 'table-component' + nanoid();

    // #region public properties

    public selectedRows: RecordObject[] = [];
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters

    get paginatorOptions() {
        return this.tableConfig?.paginatorOptions;
    }

    get useFrozenColumns() {
        return this.tableConfig?.useFrozenColumns;
    }

    get enableResizeColumns() {
        return this.tableConfig?.enableResizeColumns;
    }

    get enableReorderColumns() {
        return this.tableConfig?.enableReorderColumns;
    }

    get dataKey() {
        return this.tableConfig?.dataKey;
    }

    get useSort() {
        return this.tableConfig?.useSort;
    }

    get columnResizeMode() {
        return this.tableConfig?.columnResizeMode;
    }

    get scrollable() {
        return this.tableConfig?.scrollable;
    }

    get selectionMode() {
        return this.tableConfig?.selectionMode;
    }

    get tableStyle() {
        return this.tableConfig?.tableStyle;
    }

    get filterFields() {
        return this.tableConfig?.filterFields;
    }
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() columnDefs: ColumnDefinition[] = [];

    @Input() rowData: RecordObject[] = [];
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    private _tableConfig?: TableConfig;
    @Input()
    get tableConfig() {
        return this._tableConfig;
    }
    set tableConfig(input: TableConfig | undefined) {
        this._tableConfig = input;
        this.columnDefs = input?.columnDefs ?? [];
        this.rowData = input?.rowData ?? [];
        this.cd.detectChanges();
    }
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren

    @ViewChild('tableRef') tableRef?: Table;
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks

    constructor(
        public cd: ChangeDetectorRef,
    ) {
        
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    

    public clear(table: Table) {
        table.clear();
    }

    public filterInput(event: Event) {
        /* if(event.target && this.tableRef) {
            this.tableRef.filterGlobal(event.target, 'contains');
        } */
        if(event instanceof InputEvent) {
            this.tableRef?.filterGlobal((<HTMLInputElement>event.target).value, 'contains');
        }
        
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
