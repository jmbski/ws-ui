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