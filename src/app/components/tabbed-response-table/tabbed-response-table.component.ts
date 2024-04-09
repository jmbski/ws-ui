import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { 
    isBooleanString, 
    isNumericString, 
    stringToDate 
} from 'warskald-ui/type-guards';
import { ColumnDefinition, TableConfig, WsTableComponent } from 'warskald-ui/components/ws-table';
import { WeakObject, toLabelCase } from 'warskald-ui/models';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { nanoid } from 'nanoid';
import { LogLevels, NgLogService, LoggableComponent } from 'warskald-ui/services';

export interface TabbedResponseData {
    tabName: string,
    tableConfig: TableConfig,
}

export interface TabbedResponseTableConfig {
    xmlCollectionTags: string[];
}

@LoggableComponent({
    LOCAL_ID: 'TabbedResponseTableComponent_' + nanoid(),
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error

})
@Component({
    selector: 'ws-tabbed-response-table',
    standalone: true,
    imports: [
        WsTableComponent,
        TabMenuModule,
        CommonModule,
    ],
    templateUrl: './tabbed-response-table.component.html',
    styleUrl: './tabbed-response-table.component.scss'
})
export class TabbedResponseTableComponent {

    // #region public properties

    public tabbedResponseData: TabbedResponseData[] = [];

    public tabMenuModel: MenuItem[] = [];

    public activeTab: number = 0;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() xmlString?: string;

    @Input() config?: TabbedResponseTableConfig;
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks

    constructor(
        public cd: ChangeDetectorRef,
    ) {
        
    }

    ngAfterViewInit() {
        NgLogService.debug(this, 'entering', 'xmlString:', this.xmlString, 'config:', this.config);
        if(this.xmlString) {
            this.tabbedResponseData = this.parseXmlToTabbedResponseData(this.xmlString);
            this.tabMenuModel = this.tabbedResponseData.map((data: TabbedResponseData, index: number) => {
                const state: WeakObject = {
                    index,
                    data,
                };
                return {
                    label: data.tabName,
                    state,
                    command: () => {
                        this.activeTab = index;
                        this.cd.detectChanges();
                    }
                };
            });

            NgLogService.debug(this, 'tabbedResponseData:', this.tabbedResponseData, 'tabMenuModel:', this.tabMenuModel);
            this.cd.detectChanges();
        }
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public onTabChange(event: unknown) {
    }

    public parseElementValue(textContent: string | null): string {
        
        if(!textContent) {
            NgLogService.debug(this, 'exiting', 'string');
            return 'string';
        }
        if(isBooleanString(textContent)) {
            NgLogService.debug(this, 'exiting', 'boolean');
            return 'boolean';
        }
        if(isNumericString(textContent)) {
            NgLogService.debug(this, 'exiting', 'number');
            return 'number';
        }
        if(stringToDate(textContent)) {
            NgLogService.debug(this, 'exiting', 'date');
            return 'date';
        }

        return 'string';
    }

    public measureTextWidth(text: string, fontSize: number): number {

        const el = document.createElement('div');
        el.style.position = 'absolute'; 
        el.style.left = '-9999px'; 
        el.style.fontSize = fontSize + 'px'; 
    
        el.textContent = text;
        document.body.appendChild(el);
    
        const width = el.clientWidth + 32; // 32 is the padding
    
        document.body.removeChild(el);

        return width;
    }

    public xmlElementToColumnDef(element: Element, tagPrefix: string = 'ws:'): ColumnDefinition {

        const { tagName, textContent } = element;
        const columnDef: ColumnDefinition = {
            field: tagName.replace(tagPrefix, ''),
            header: toLabelCase(tagName.replace(tagPrefix, '')),
            sortable: true,
            reorderable: true,
            resizable: true,
            type: this.parseElementValue(textContent),
            width: this.measureTextWidth(tagName, 16) + 'px',
        };
        
        return columnDef;
    }

    public addXmlColumnDef(columnDefs: ColumnDefinition[], element: Element): void {

        const columnDef = this.xmlElementToColumnDef(element);
        if(columnDefs.findIndex((def: ColumnDefinition) => def.field === columnDef.field) === -1) {
            columnDefs.push(columnDef);
        }

    }

    public parseXmlToTabbedResponseData(xmlString: string, tagPrefix: string = 'ws:'): TabbedResponseData[] {

        const data: TabbedResponseData[] = [];
        if(this.config) {
            const { xmlCollectionTags } = this.config;
            const parser = new DOMParser();
            const xmlDoc: XMLDocument = parser.parseFromString(xmlString, 'text/xml');
            
            xmlCollectionTags.forEach((tag: string) => {
                const tableConfig: TableConfig = {
                    columnDefs: [],
                    rowData: [],
                };
                const xmlTag = `${tagPrefix}${tag}`;
                const collection: Element[] = Array.from(xmlDoc.getElementsByTagName(xmlTag));
                
                collection.forEach((element: Element) => {
                    const rowItem: WeakObject = {};
                    const children = Array.from(element.children);
                    children.forEach((child: Element) => {
                        const { tagName, textContent } = child;
                        if(tagName && textContent) {
                            rowItem[tagName.replace(tagPrefix, '')] = textContent;
                        }
                        this.addXmlColumnDef(tableConfig.columnDefs, child);
                    });
                    tableConfig.rowData.push(rowItem);
                });

                NgLogService.debug(this, 'tableConfig:', tableConfig, 'tag:', tag);
                data.push({
                    tabName: tag,
                    tableConfig,
                });
            });
        }
        
        return data;
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
