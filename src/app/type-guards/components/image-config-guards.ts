import { WsImageConfig } from 'warskald-ui/models';
import { objIsType, OptionalBooleanProp, OptionalNumberProp, OptionalStringProp, TypeMapping } from '../general-type-guards';

const wsImageConfigTypeMap: TypeMapping<WsImageConfig> = {
    LOCAL_ID: OptionalStringProp,
    canLog: OptionalBooleanProp,
    localLogLevel: OptionalNumberProp,
    elementType: OptionalStringProp,
    src: OptionalStringProp,
};

export function isWsImageConfig(value: unknown): value is WsImageConfig {
    return objIsType(value, wsImageConfigTypeMap);
}