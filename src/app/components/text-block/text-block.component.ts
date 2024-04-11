import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { nanoid } from 'nanoid';
import { 
    ElementType,
    StyleGroup,
    TextBlockConfig, 
} from 'warskald-ui/models';
import { LogLevels, LoggableComponent, initStyleGroups } from 'warskald-ui/services';


@LoggableComponent({
    LOCAL_ID: 'TextBlockComponent_' + nanoid(),
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

    public defaultStyleClass = 'text-block w-full';

    public defaultBodyStyleClass = '';

    public styleClasses: string[] = [this.defaultStyleClass];

    public bodyStyleClasses: string[] = [this.defaultBodyStyleClass];

    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters

    // #endregion getters/setters
    
    
    // #region standard inputs
    @Input() id: string = nanoid();
    
    @Input() elementType: ElementType.TEXT_BLOCK = ElementType.TEXT_BLOCK;

    @Input() body?: string = '';

    @Input() illuminatedChar?: string;

    @Input() illuminated: boolean = false;

    @Input() content: string = '';

    @Input() illuminatedColor?: string = 'illuminated';

    @Input() illuminatedBorder?: string = 'illuminated-border';

    @Input() styles?: StyleGroup = {};

    @Input() bodyStyles?: StyleGroup = {};
    
    
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

    ngOnInit() {
        initStyleGroups.bind(this)();

        if(this.illuminated && this.content?.length > 0) {
            this.illuminatedChar = this.content.charAt(0);
            this.body = this.content.substring(1);
        }
        else {
            this.body = this.content;
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
