import { ChangeDetectorRef, Component } from '@angular/core';
import { WeakObject } from 'warskald-ui/models';

@Component({
    selector: 'ws-modular-dialog',
    standalone: true,
    imports: [],
    templateUrl: './modular-dialog.component.html',
    styleUrl: './modular-dialog.component.scss'
})
export class ModularDialogComponent {

    // #region public properties
    public header?: string;

    public dialogElement?: HTMLElement;
    public dialogContentElement?: HTMLElement;
    public headerElement?: HTMLElement;
    public maskElement?: HTMLElement;

    public config?: WeakObject;

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
    // #endregion constructor and lifecycle hooks


    // #region public methods

    public minimize(...args: unknown[]): void {

    }

    public restore(...args: unknown[]): void {
            
    }

    public close(...args: unknown[]): void {
        
    }

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    // #endregion private methods


}
