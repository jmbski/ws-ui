import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { nanoid } from 'nanoid';
import { StyleGroup } from 'warskald-ui/models';
import { LogLevels, Utils, LoggableComponent, RegisterClassType } from 'warskald-ui/services';

@RegisterClassType('NavLogoComponent')
@LoggableComponent({
    LOCAL_ID: 'NavLogoComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-nav-logo',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
    ],
    templateUrl: './nav-logo.component.html',
    styleUrl: './nav-logo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavLogoComponent {

    // #region public properties

    public defaultImgStyleClass: string = 'app-top-nav-logo';

    public defaultWrapperStyleClass: string = 'app-top-nav-logo';

    public imgStyleClasses: string[] = [this.defaultImgStyleClass];

    public wrapperStyleClasses: string[] = [this.defaultWrapperStyleClass];
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    @Input() logoImage: string = 'assets/images/default_logo.webp';

    @Input() logoAltText?: string = 'Default Logo';

    /* @Input() imgStyle?: StyleGroup;

    @Input() wrapperStyle?: StyleGroup = {
        baseClass: 'app-top-nav-logo',
    }; */

    @Input() isLink?: boolean = true;

    @Input() linkUrl?: string = '/';
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    private _imgStyle?: StyleGroup;
    @Input()
    get imgStyle() {
        return this._imgStyle;
    }
    set imgStyle(input: StyleGroup | undefined) {

        this._imgStyle = input;
        this.imgStyleClasses = Utils.MergeStyleGroupClasses(this.imgStyle, this.defaultImgStyleClass);
    }

    private _wrapperStyle?: StyleGroup;
    @Input()
    get wrapperStyle() {
        return this._wrapperStyle;
    }
    set wrapperStyle(input: StyleGroup | undefined) {

        this._wrapperStyle = input;
        this.wrapperStyleClasses = Utils.MergeStyleGroupClasses(this.wrapperStyle, this.defaultWrapperStyleClass);
    }
    
    private _config?: Partial<NavLogoComponent>;
    @Input()
    get config() {
        return this._config;
    }
    set config(input: Partial<NavLogoComponent> | undefined) {

        this._config = input;
        Object.assign(this, input);

        this.cd.detectChanges();
    }
    
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
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

export type NavLogoConfig = Partial<NavLogoComponent>;