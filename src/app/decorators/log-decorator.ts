import { LogService } from '../services/log-service/log-service';
import { LoggableObject } from '../models/general';
import { isWeakObject } from '../type-guards/general-type-guards';

export function _LogPerformance(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
  
    descriptor.value = function (...args: unknown[]) {
        console.log(`${propertyKey} method has been called...`);
        const t1 = performance.now();
        const result = originalMethod.apply(this, args);
        const t2 = performance.now();
  
        console.log(`The method took ${t2 - t1} milliseconds.`);
        return result;
    };
  
    return descriptor;
}

export function _Loggable(target: LoggableObject, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value; 

    descriptor.value = function (this: LoggableObject, ...args: unknown[]) {
        // 'this' is now the class instance.
        LogService.debug(this, `calling ${propertyKey} with arguments: `, args);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}