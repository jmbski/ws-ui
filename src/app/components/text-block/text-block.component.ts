import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { nanoid } from 'nanoid';
import { 
    ComponentClassBase, 
    ElementType, 
    IComponentConfig, 
} from 'warskald-ui/models';
import { LogLevels, LoggableComponent, NgLogService } from 'warskald-ui/services';
import { IsTextBlock } from 'warskald-ui/type-guards';


/* function processTextConfig(this: ComponentClassBase, input: IComponentConfig) {
    NgLogService.debug(this, 'fn:processTextConfig', 'input', input);
    DefaultConfigParser.call(this, input);
    if(IsTextBlock(input)) {
        NgLogService.debug(this, 'fn:processTextConfig', 'input.illuminated', input.illuminated);
        if(input.illuminated && input.content?.length > 0) {
            this.illuminatedChar = input.content.charAt(0);
            this.body = input.content.substring(1);
        }
        else {
            this.body = input.content;
        }
    }
} */

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
export class TextBlockComponent {

    // #region public properties

    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters

    // #endregion getters/setters
    
    
    // #region standard inputs
    
    @Input() elementType: ElementType.TEXT_BLOCK = ElementType.TEXT_BLOCK;

    @Input() body?: string = '';

    @Input() illuminatedChar?: string;

    @Input() illuminated: boolean = false;

    @Input() content: string = '';

    @Input() illuminatedColor?: string = 'illuminated';

    @Input() illuminatedBorder?: string = 'illuminated-border';
    
    
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
        this.cd.detectChanges();
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
