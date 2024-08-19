import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { nanoid } from 'nanoid';
import { initStyleGroups, LoggableComponent, LogLevels, RegisterClassType } from 'warskald-ui/services';
import { ElementType, StyleGroup, WsImageConfig } from 'warskald-ui/models';

@RegisterClassType(ElementType.IMAGE)
@LoggableComponent({
    LOCAL_ID: 'ImageComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error

})
@Component({
    selector: 'ws-image',
    standalone: true,
    imports: [
        CommonModule,
        ImageModule,
    ],
    templateUrl: './image.component.html',
    styleUrl: './image.component.scss'
})
export class ImageComponent implements WsImageConfig {
    
    // #region public properties

    public defaultBaseStyleClass = '';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    @Input() elementType: ElementType.IMAGE = ElementType.IMAGE;

    @Input() id: string = nanoid();
    
    @Input() src?: string;

    @Input() baseStyles?: StyleGroup = {};

    @Input() layoutStyles?: StyleGroup | undefined;

    @Input() actionID?: string;
    
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
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}