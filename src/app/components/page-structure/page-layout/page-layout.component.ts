import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { ANGULAR_COMMON, PRIME_COMMON } from 'src/app/common/_index';
import { TopNavComponent, TopNavConfig } from '@components';
import { ComponentDef, CssStyleObject, StyleGroup } from 'src/app/models/_index';
import { DynamicComponent } from '../../general/dynamic/dynamic.component';

@Component({
    selector: 'ws-page-layout',
    standalone: true,
    imports: [
        TopNavComponent,
        DynamicComponent,
        ...ANGULAR_COMMON,
        ...PRIME_COMMON,
    ],
    templateUrl: './page-layout.component.html',
    styleUrl: './page-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutComponent {

    // #region public properties
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() topNavTemplate: TemplateRef<unknown> | null = null;

    @Input() pageLayoutStyle?: StyleGroup;

    @Input() pageContentStyle?: StyleGroup;

    @Input() customTopNavDef?: ComponentDef<unknown>;

    @Input() wsTopNavConfig?: TopNavConfig;
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    
    private _config?: PageLayoutConfig;
    @Input()
    get config() {
        return this._config;
    }
    set config(input: PageLayoutConfig | undefined) {
        this._config = input;
        Object.assign(this, input);
    }
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

export type PageLayoutConfig = Partial<PageLayoutComponent>;