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
import { LoggableObject, LogLevels, EzLogService } from 'warskald-ui/services';

export interface TabbedResponseData {
    tabName: string,
    tableConfig: TableConfig,
}

export interface TabbedResponseTableConfig {
    xmlCollectionTags: string[];
}

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
export class TabbedResponseTableComponent implements LoggableObject {

    readonly LOCAL_ID: string = 'TabbedResponseTableComponent_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: number = LogLevels.Error;

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
        EzLogService.debug(this, 'entering', 'xmlString:', this.xmlString, 'config:', this.config);
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

            EzLogService.debug(this, 'tabbedResponseData:', this.tabbedResponseData, 'tabMenuModel:', this.tabMenuModel);
            this.cd.detectChanges();
        }
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public onTabChange(event: unknown) {
        EzLogService.debug(this, 'entering', 'event:', event);
    }

    public parseElementValue(textContent: string | null): string {
        EzLogService.debug(this, 'entering', 'textContent:', textContent);
        
        if(!textContent) {
            EzLogService.debug(this, 'exiting', 'string');
            return 'string';
        }
        if(isBooleanString(textContent)) {
            EzLogService.debug(this, 'exiting', 'boolean');
            return 'boolean';
        }
        if(isNumericString(textContent)) {
            EzLogService.debug(this, 'exiting', 'number');
            return 'number';
        }
        if(stringToDate(textContent)) {
            EzLogService.debug(this, 'exiting', 'date');
            return 'date';
        }

        EzLogService.debug(this, 'exiting', 'string');
        return 'string';
    }

    public measureTextWidth(text: string, fontSize: number): number {
        EzLogService.debug(this, 'entering', 'text:', text, 'fontSize:', fontSize);

        const el = document.createElement('div');
        el.style.position = 'absolute'; 
        el.style.left = '-9999px'; 
        el.style.fontSize = fontSize + 'px'; 
    
        el.textContent = text;
        document.body.appendChild(el);
    
        const width = el.clientWidth + 32; // 32 is the padding
    
        document.body.removeChild(el);

        EzLogService.debug(this, 'exiting', 'width:', width);
        return width;
    }

    public xmlElementToColumnDef(element: Element, tagPrefix: string = 'ws:'): ColumnDefinition {
        EzLogService.debug(this, 'entering', 'element:', element, 'tagPrefix:', tagPrefix);

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
        
        EzLogService.debug(this, 'exiting', 'columnDef:', columnDef);
        return columnDef;
    }

    public addXmlColumnDef(columnDefs: ColumnDefinition[], element: Element): void {
        EzLogService.debug(this, 'entering', 'columnDefs:', columnDefs, 'element:', element);

        const columnDef = this.xmlElementToColumnDef(element);
        if(columnDefs.findIndex((def: ColumnDefinition) => def.field === columnDef.field) === -1) {
            columnDefs.push(columnDef);
        }

        EzLogService.debug(this, 'exiting', 'columnDefs:', columnDefs);
    }

    public parseXmlToTabbedResponseData(xmlString: string, tagPrefix: string = 'ws:'): TabbedResponseData[] {
        EzLogService.debug(this, 'entering', 'xmlString:', xmlString, 'tagPrefix:', tagPrefix);

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

                EzLogService.debug(this, 'tableConfig:', tableConfig, 'tag:', tag);
                data.push({
                    tabName: tag,
                    tableConfig,
                });
            });
        }
        
        EzLogService.debug(this, 'exiting', 'data:', data);
        return data;
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
