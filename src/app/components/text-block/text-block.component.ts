import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { nanoid } from 'nanoid';
import { 
    ComponentClassBase, 
    DefaultConfigParser, 
    ElementType, 
    IComponentConfig, 
} from 'warskald-ui/models';
import { LoggableObject, LogLevels, EzLogService } from 'warskald-ui/services';
import { IsTextBlock } from 'warskald-ui/type-guards';


function processTextConfig(this: ComponentClassBase, input: IComponentConfig) {
    DefaultConfigParser.call(this, input);
    if(IsTextBlock(input)) {
        if(input.illuminated && input.content?.length > 0) {
            this.illuminatedChar = input.content.charAt(0);
            this.body = input.content.substring(1);
        }
        else {
            this.body = input.content;
        }
    }
}

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
export class TextBlockComponent extends ComponentClassBase implements LoggableObject {

    readonly LOCAL_ID: string = 'TextBlockComponent_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: number = LogLevels.Error;

    // #region public properties
    public override elementType: ElementType.TEXT_BLOCK = ElementType.TEXT_BLOCK;

    public body?: string = '';

    public illuminatedChar?: string;

    public illuminated: boolean = false;

    public override content: string = '';

    public illuminatedColor?: string = 'illuminated';

    public illuminatedBorder?: string = 'illuminated-border';

    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters

    // #endregion getters/setters
    
    
    // #region standard inputs
    
    
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
        super(processTextConfig);
        
    }

    ngOnInit() {
        this.cd.detectChanges();
        // console.log('border', this.config?.illuminatedBorder);
        EzLogService.debug(this, 'entering', 'config:', this.config);
    }

    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
