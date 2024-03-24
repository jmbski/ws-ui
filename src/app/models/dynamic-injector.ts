import { Injector, ProviderToken } from '@angular/core';

export class DynamicInjector implements Injector {
    constructor(private _parentInjector: Injector, private _additionalTokens: WeakMap<object, unknown>) {}

    get(token: ProviderToken<unknown>, notFoundValue?: unknown): unknown {
        const value = this._additionalTokens.get(token);

        if (value) return value;

        return this._parentInjector.get<unknown>(token, notFoundValue);
    }
}
