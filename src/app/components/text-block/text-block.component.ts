import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { nanoid } from 'nanoid';
import { 
    ElementType,
    StyleGroup,
    TextBlockConfig, 
} from 'warskald-ui/models';
import { LogLevels, LoggableComponent, NgLogService, RegisterClassType, initStyleGroups } from 'warskald-ui/services';


@RegisterClassType(ElementType.TEXT_BLOCK)
@LoggableComponent({
    LOCAL_ID: 'TextBlockComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Debug
})
@Component({
    selector: 'ws-text-block',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './text-block.component.html',
    styleUrl: './text-block.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBlockComponent implements TextBlockConfig {

    // #region public properties

    public defaultBaseStyleClass = 'text-block w-full';

    public defaultBodyStyleClass = '';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public bodyStyleClasses: string[] = [this.defaultBodyStyleClass];

    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters

    // #endregion getters/setters
    
    
    // #region standard inputs
    @Input() id: string = nanoid();

    @Input() escapeHTML: boolean = true;
    
    @Input() elementType: ElementType.TEXT_BLOCK = ElementType.TEXT_BLOCK;

    @Input() body?: string = '';

    @Input() illuminatedChar?: string;

    @Input() illuminated: boolean = false;

    @Input() content: string = '';

    @Input() illuminatedColor?: string = 'illuminated';

    @Input() illuminatedBorder?: string = 'illuminated-border';

    @Input() baseStyles?: StyleGroup = {};

    @Input() bodyStyles?: StyleGroup = {};

    @Input() layoutStyles?: StyleGroup | undefined;

    @Input() actionID?: string;
    
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren

    @ViewChild('body') bodyRef?: ElementRef;
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        public el: ElementRef,
    ) {
        
    }

    ngOnInit() {
        initStyleGroups.bind(this)();

        if(this.illuminated && this.content?.length > 0) {
            this.illuminatedChar = this.content.charAt(0);
            this.body = this.content.substring(1);
        }
        else {
            this.body = this.content;
        }
        if(this.bodyRef) {
            if(this.escapeHTML) {
                (<HTMLElement>this.bodyRef.nativeElement).innerHTML = this.body;
            }
        }
        this.cd.detectChanges();
    }

    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
