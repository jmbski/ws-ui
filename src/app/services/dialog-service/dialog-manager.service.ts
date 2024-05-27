
import { ApplicationRef, ChangeDetectorRef, ComponentRef, createComponent, ElementRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DynamicInjector } from 'warskald-ui/models';
import { Subscription, BehaviorSubject } from 'rxjs';
import { LoggableClass, LoggableComponent, LogLevels } from '../log-service/_index';
import { ModularDialogConfig, ModularDialogRef } from './models/_index';
import { DialogManagerComponent, ModularDialogComponent } from './components/_index';
import { isEqual } from 'lodash';
import { nanoid } from 'nanoid';
import { Dock } from 'primeng/dock';
import { DomHandler } from 'primeng/dom';

@LoggableComponent({
    LOCAL_ID: 'DialogManagerService',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Injectable({
    providedIn: 'root'
})
export class DialogManagerService {
    // #region public properties

    /** @todo determine if needed/used */
    public dialogRefsById: Map<string, ModularDialogRef> = new Map();
    
    public modularDialogMap: Map<string, ModularDialogConfig> = new Map<string, ModularDialogConfig>();
    
    public dialogRequests: ModularDialogConfig[] = [];

    public dialogComponentRefMap: Map<ModularDialogRef, ComponentRef<ModularDialogComponent>> = new Map();

    public dockedDialogs$: BehaviorSubject<ModularDialogRef[]> = new BehaviorSubject<ModularDialogRef[]>([]);

    public baseZIndex: number = 1101;

    // #endregion public properties


    // #region private properties

    private _dialogsByZIndexOrder: ModularDialogComponent[] = [];

    private _injector?: Injector;

    // #endregion private properties


    // #region getters/setters

    private _dialogManager?: DialogManagerComponent;
    public get dialogManager() {
        return this._dialogManager;
    }
    public set dialogManager(input: DialogManagerComponent | undefined) {
        this._dialogManager = input;
        if(input) {
            this.processDialogRequests();
        }
    }

    private _dockedDialogs: ModularDialogRef[] = [];
    public get dockedDialogs() {
        return this._dockedDialogs;
    }
    public set dockedDialogs(input: ModularDialogRef[]) {
        this._dockedDialogs = input;
        this.dockedDialogs$.next(input);
    }
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
        private appRef: ApplicationRef, 
        private injector: Injector,
    ) {
        
        setTimeout(() => {
            this.dialogManager = this.createManagerDock();
        });
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods

    public minimizeDialog(dialogRef: ModularDialogRef) {
        
        const dialog = this.dialogComponentRefMap.get(dialogRef)?.instance;
        if(dialog) {
            dialog.animateMinimize();
            this.removeDialogFromZIndexOrder(dialogRef);
            const newDockedDialogs = [...this.dockedDialogs.slice(), dialogRef];
            this.dockedDialogs = newDockedDialogs;
            this.dialogManager?.cd.detectChanges();
        }
    }

    public restoreDialog(dialogRef: ModularDialogRef) {
        const dialog = this.dialogComponentRefMap.get(dialogRef)?.instance;
        if(dialog) {
            dialog.animateRestore();
            this.moveDialogToTopZIndex(dialogRef);
            this.removeDialogFromDock(dialogRef);
            this.dialogManager?.cd.detectChanges();
        }
    }

    public removeDialogFromDock(dialogRef: ModularDialogRef) {
        this.dockedDialogs = this.dockedDialogs.filter((dockedDialog) => {
            return !isEqual(dockedDialog, dialogRef);
        });
    }

    public moveDialogToTopZIndex(dialogRef: ModularDialogRef) {
        const dialog = this.dialogComponentRefMap.get(dialogRef)?.instance;
        if(dialog) {
            this.removeDialogFromZIndexOrder(dialogRef);
            this._dialogsByZIndexOrder.push(dialog);
            this.updateZIndexes();
        }
    }

    public removeDialogFromZIndexOrder(dialogRef: ModularDialogRef) {
        
        const dialog = this.dialogComponentRefMap.get(dialogRef)?.instance;
        if(dialog) {
            this._dialogsByZIndexOrder = this._dialogsByZIndexOrder.filter((dialogByZindexOrder) => {
                return !isEqual(dialogByZindexOrder, dialog);
            });
        }
    }

    public updateZIndexes() {
        this._dialogsByZIndexOrder.forEach((dialog, index) => {
            if(dialog.dialogElement && dialog.maskElement) {
                dialog.dialogElement.style.zIndex = `${this.baseZIndex + index}`;
                dialog.maskElement.style.zIndex = `${this.baseZIndex + index - 1}`;
            }
            dialog.cd.detectChanges();
        });
    }

    public processDialogRequests() {
        if(this.dialogManager) {
            this.dialogRequests.forEach((dialogRequest) => {
                this.openModularDialog(dialogRequest);
            });
        }
    }

    public openModularDialog(config: ModularDialogConfig) {
        const { allowMultiple } = config;
        let { dialogID } = config;

        let dialogRef: ModularDialogRef | undefined = undefined;
        if(allowMultiple === true || dialogID == undefined) {
            dialogID = nanoid();
            
        }        

        if(this.modularDialogMap.get(dialogID) == undefined) {
            this.modularDialogMap.set(dialogID, config);
            if(this.dialogManager) {
                // const dialogRef = this.dialogManager.openDialog(config);
                dialogRef = this.createComponentRef(config);
            }
            else {
                this.dialogRequests.push(config);
            }
        }
    
        return dialogRef;

    }
    
    public removeDialog(dialogRef: ModularDialogRef) {

        this.removeDialogFromDock(dialogRef);
        this.removeDialogFromZIndexOrder(dialogRef);
        this.removeDialogComponentFromBody(dialogRef);
    }

    private removeDialogComponentFromBody(dialogRef: ModularDialogRef) {
        if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
            return;
        }

        const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
        if(dialogComponentRef && this.appRef) {
            this.appRef.detachView(dialogComponentRef.hostView);
            dialogComponentRef.destroy();
            this.dialogComponentRefMap.delete(dialogRef);
        }
    }

    public createManagerDock(options?: Partial<DialogManagerComponent>): DialogManagerComponent | undefined {

        const existingDockElement = document.querySelector('.dialog-manager');
        if(!existingDockElement) {
            const map = new WeakMap();
    
            map.set(Dock, options);
    
            const componentRef: ComponentRef<DialogManagerComponent> = createComponent(DialogManagerComponent, { 
                environmentInjector: this.appRef.injector, 
                elementInjector: new DynamicInjector(this.injector, map) 
            });
    
            Object.assign(componentRef.instance, options);

            const dockElement: HTMLElement = componentRef.injector.get(ElementRef)?.nativeElement as HTMLElement;

            if( dockElement ) {
                dockElement.classList.add('dialog-manager');
            }
    
            this.appRef.attachView(componentRef.hostView);
    
            const domElem = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
    
            document.body.appendChild(domElem);
    
            return componentRef.instance;
        }

        return undefined;
        
    }

    public createComponentRef(config: ModularDialogConfig) {
        const map = new WeakMap();
        map.set(ModularDialogConfig, config);

        const dialogRef = new ModularDialogRef();
        dialogRef.dialogID = config.dialogID;
        dialogRef.title = config.title ?? 'Untitled Dialog';

        map.set(ModularDialogRef, dialogRef);

        if(config.customInjectors) {
            config.customInjectors.forEach((injectorMapping) => {
                map.set(injectorMapping.token, injectorMapping.value);
            });
        }

        const subs: Subscription[] = [];
        
        subs.push(dialogRef.onMinimize.subscribe(() => {
            this.minimizeDialog(dialogRef);
        }));

        subs.push(dialogRef.onMaximize.subscribe(() => {
            //this.dialogComponentRefMap.get(dialogRef)?.instance.maximize();
            /** @todo implement maximize */
        }));

        subs.push(dialogRef.onRestore.subscribe(() => {
            console.log('Restoring dialog');
            this.restoreDialog(dialogRef);
        }));

        subs.push(dialogRef.onClose.subscribe(() => {
            this.removeDialog(dialogRef);
        }));

        subs.push(dialogRef.onSubmit.subscribe((output?: unknown) => {
            //implement
            
        }));

        subs.push(dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody(dialogRef);
        }));

        /* subs.forEach(sub => {
            sub.unsubscribe();
        }); */

        const componentRef = createComponent(ModularDialogComponent, { 
            environmentInjector: this.appRef.injector, 
            elementInjector: new DynamicInjector(this.injector, map) 
        });

        componentRef.instance.config = config;

        this.moveDialogToTopZIndex(dialogRef);
        

        this.appRef.attachView(componentRef.hostView);

        

        const domElem = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
        if (!config.appendTo || config.appendTo === 'body') {
            document.body.appendChild(domElem);
        } 
        else {
            DomHandler.appendChild(domElem, config.appendTo);
        }

        this.dialogComponentRefMap.set(dialogRef, componentRef);

        return dialogRef;
    }

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    // #endregion private methods


}