import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { nanoid } from 'nanoid';
import { CssStyleObject } from 'warskald-ui/models';
import { LoggableObject, LogLevel, LogService } from 'warskald-ui/services';

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
export class NavLogoComponent implements LoggableObject {

    readonly LOCAL_ID: string = 'NavLogoComponent_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: LogLevel = LogLevel.Error;

    // #region public properties
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    @Input() logoImage: string = 'assets/images/default_logo.webp';

    @Input() logoAltText?: string = 'Default Logo';

    @Input() imgStyleClass?: string = 'app-top-nav-logo';

    @Input() imgStyle?: string | CssStyleObject;

    @Input() wrapperStyleClass?: string = 'app-top-nav-logo';

    @Input() wrapperStyle?: string | CssStyleObject;

    @Input() isLink?: boolean = true;

    @Input() linkUrl?: string = '/';
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    private _config?: Partial<NavLogoComponent>;
    @Input()
    get config() {
        return this._config;
    }
    set config(input: Partial<NavLogoComponent> | undefined) {
        LogService.debug(this, 'entering', 'input:', input);

        this._config = input;
        Object.assign(this, input);

        LogService.debug(this, 'exiting');
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