import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Dock, DockModule } from 'primeng/dock';
import { ModularDialogConfig } from '../../models/modular-dialog.config';
import { ModularDialogComponent } from '../modular-dialog/modular-dialog.component';
import { ViewContainerRefDirective } from 'warskald-ui/directives';
import { DialogManagerService } from '../../dialog-manager.service';
import { isEqual } from 'lodash';
import { RippleModule } from 'primeng/ripple';
import { ModularDialogRef } from '../../models/modular-dialog-ref';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'ws-dialog-manager',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        DockModule,
        RippleModule,
    ],
    templateUrl: './dialog-manager.component.html',
    styleUrl: './dialog-manager.component.scss'
})
export class DialogManagerComponent {

    // #region public properties
    public dialogs: ModularDialogConfig[] = [];

    public dialogComponents: ModularDialogComponent[] = [];

    public dialogsByZindexOrder: ModularDialogComponent[] = [];

    public dockedDialogs: ModularDialogRef[] = [];
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    @Input() baseZIndex: number = 1101;
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    @ViewChild(ViewContainerRefDirective) container?: ViewContainerRefDirective;
    @ViewChild('dockRef') dockRef?: Dock;
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        private managerSvc: DialogManagerService,
    ) {
        
    }

    ngAfterViewInit() {
        this.managerSvc.dialogManager = this;
        this.managerSvc.dockedDialogs$.subscribe(dialogs => {
            this.dockedDialogs = dialogs;
            this.dockDetectChanges();
        });
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    

    public openDialog(config: ModularDialogConfig) {
        this.dialogs.push(config);
    }

    public registerDialogInstance(dialog: ModularDialogComponent) {
        this.dialogComponents.push(dialog);
        this.dialogsByZindexOrder.push(dialog);
    }

    public moveDialogToTopZIndex(dialog: ModularDialogComponent) {
        this.dialogsByZindexOrder = this.dialogsByZindexOrder.filter((dialogByZindexOrder) => {
            return !isEqual(dialogByZindexOrder, dialog);
        });
        this.dialogsByZindexOrder.push(dialog);
        this.updateZIndexes();
    }

    public updateZIndexes() {
        this.dialogsByZindexOrder.forEach((dialog, index) => {
            if(dialog.dialogElement && dialog.maskElement) {
                dialog.dialogElement.style.zIndex = `${this.baseZIndex + index}`;
                dialog.maskElement.style.zIndex = `${this.baseZIndex + index - 1}`;
            }
            dialog.cd.detectChanges();
        });
        this.cd.detectChanges();
    }

    public minimizeDialog(dialog: ModularDialogRef) {

        /* setTimeout(() => {
            this.dockedDialogs.push({
                label: dialog.header,
                icon: 'pi-window-maximize',
                state: {
                    dialog: dialog,
                },
            });
            this.dockDetectChanges();
        }, 300); */
    }

    public restoreDialog(dialog: ModularDialogRef) {
        dialog.restore();
    }

    public removeDockedDialog(dialog: ModularDialogComponent) {

        /* this.dockedDialogs = this.dockedDialogs.filter((dockedDialog) => {
            return !isEqual(dockedDialog.state?.dialog, dialog);
        });
        this.dockDetectChanges(); */
    }

    public closeDialog(dialog: ModularDialogRef) {
        dialog.close();
    }


    public dockDetectChanges() {
        this.dockRef?.cd.detectChanges();
    }

    public openExistingDialog() {

    }
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
