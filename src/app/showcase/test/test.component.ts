import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PageLayoutComponent } from 'warskald-ui/components';
import { PageLayoutConfig } from 'warskald-ui/models';
import { LayoutService, LoggableClass, LogLevels } from 'warskald-ui/services';

/**
 * A test component for the showcase.
 */
@LoggableClass({
    LOCAL_ID: 'TestComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Debug
})
@Component({
    selector: 'ws-test',
    standalone: true,
    imports: [
        CommonModule,
        PageLayoutComponent,
    ],
    templateUrl: './test.component.html',
    styleUrl: './test.component.css'
})
export class TestComponent {

    // #region public properties

    public pageLayoutConfig?: PageLayoutConfig;
    
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
        
    }

    ngOnInit() {
        this.pageLayoutConfig = LayoutService.getLayout('showcase');
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
