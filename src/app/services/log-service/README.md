# NgLogService


## General Overview

The NgLogService is designed to be a highly customizable logging service that's also 
painless to set up and use.

The service uses all static functions and properties, and as such does not need to be 
initialized with a constructor etc... This also means that the log functions can be 
called from almost anywhere, as well as updating the service properties. You can, however,
use `NgLogService.initialize()` to configure the initial settings. Since the service comes
with default settings configured, you can technically call the various log functions 
without running `initialize()`, this function is required if you want to use the `toggleState`
or `customKeyListeners` properties (since the event listener is created during the 
`initialize()` function).

The service is also decorated with Angular's `@Injectable()` decorator with `providedIn` set to 
`root`, so it does not need to be provided anywhere either. The goal was to reduce the amount 
of work needed to be able to implement the service.

## LoggableObject

This is a simple interface with a log configuration specific to a single class with local log
settings. These settings are used to provide logging context and help determine whether the
call can log or not.

Properties:
- `LOCAL_ID` - string **Required** - _The local ID for the class, used to provide context for log statements_
- `autoAddLogs` - boolean (optional) - _Automatically add logging to all class methods_
- `canLog` - boolean (optional) - _Whether or not the class can log_
- `className` - string (optional) - _The name of the class, used for black/white listing_
- `localLogLevel` - number/LogLevels (optional) - _The default log level for the class_

## @LoggableComponent() and @LoggableClass() class decorators

These two decorators provide the easiest means of applying logging wrappers en masse.
Both decorators take as an argument an instance of `LoggableObject`, and subsequently 
apply those properties to the class, and then wrap each of its callable properties with
logging statements, using the decorator factory function from the `Loggable` decorator.

Typically `@LoggableComponent()` will be the decorator to use with most Angular classes,
however in some instances the class structure is different and isn't compatible with how
`@LoggableComponent()` defines the properties. The pattern I've noticed so far is that if
the class has a constructor, `@LoggableComponent()` will work, otherwise use `@LoggableClass()`.
My recommendation however is to just use `@LoggableComponent()`, and if the log output doesn't
work, or looks weird (such as logging the call to efac etc...), then try using `@LoggableClass()`.
If neither work, then you'll just have to implement `LoggableObject` on the class and apply
the `@Loggable()` decorators manually.

## @Loggable() class method decorator

The `@Loggable()` decorator can be used to decorate class functions (including get and set
properties), and automatically wrap them with logging statements. No arguments are necessary
to be provided in it, as it retrieves the `LoggableObject` properties automatically from the
property's `this` reference. However, you can provide a range of additional options, such as
a specific console function to use and the arguments for any valid console function. You can
also simply provide a level you'd like to log at for the decorated function. More information 
on this is listed in the JSDocs of each specific function override.

The decorator also wraps the function in a simple try/catch and logs the error data to the 
console in the catch. 

## Main NgLogService functions

### initialize(settings?: LogServiceConfig)

    The initialize function applies the passed in settings if provided, or the default settings
    otherwise. It also sets up the state saving if turned on, as well as creates the key event
    listener using the `window` object.

    It is recommended that you define log settings in environment property files, then import them
    into your `app.config.ts` or `app.module.ts` files as appropriate, and pass them to `initialize()`
    outside the bootstrap call/module class definition as appropriate.

    **_app.module.ts example:_**
    ```
    // component/module imports ...
    
    import { environment } from 'environments';

    NgLogService.initialize(environment.logSettings);

    @NgModule(
        // imports, declarations, providers etc...
    )
    export class AppModule {}
    ```

    **_app.config.ts example:_**
    ```
    import { ApplicationConfig } from '@angular/core';
    import { provideRouter } from '@angular/router';

    import { routes } from './app.routes';
    import { provideAnimations } from '@angular/platform-browser/animations';
    import { environment } from 'environments';

    NgLogService.initialize(environment.logSettings);

    export const appConfig: ApplicationConfig = {
        providers: [
            provideRouter(routes),
            provideAnimations(),
        ]
    };
    ```

    Caveats:

    The settings are always applied over top of the default settings, to ensure that changing states
    doesn't leave setting artifacts from previous states.

    The `toggleState` property is only assigned during initialize, not state changing. This is to 
    ensure that the toggleState and primary state don't override each other and stay constant.

    The `customConsoleFunctDefs` property of the `LogServiceConfig` applies over top of the `NgLogService`'s
    private `_consoleFunctDefMap` property, to ensure that default values remain the same if not
    specifically reassigned.

    The `persistCurrentState` property causes the service to save the states and current state to
    `localStorage` if true.

