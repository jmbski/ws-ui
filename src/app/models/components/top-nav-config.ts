import { ComponentDef } from '../general';
import { StyleGroup } from '../style-types';


export interface TopNavConfig {
    topNavDef?: ComponentDef<unknown>;
    navMenuDef?: ComponentDef<unknown>;
    navMenuWrapperStyles?: StyleGroup;
    logoDef?: ComponentDef<unknown>;
    topNavStyles?: StyleGroup;
    topNavShadowStyles?: StyleGroup;
    topNavWrapperStyles?: StyleGroup;
    headerText?: string;
    headerTextStyles?: StyleGroup;
    headerStyles?: StyleGroup;

}