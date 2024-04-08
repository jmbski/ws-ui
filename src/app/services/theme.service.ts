import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { UnionTypeOf, stringLiterals } from 'warskald-ui/models';
import { BehaviorSubject } from 'rxjs';
import { LogLevels, EzLogService, LoggableClass } from './log-service/_index';

export const ThemeNames = stringLiterals('viva-dark', 'viva-light', 'medieval-wood', 'blank', 'layout');
export type ThemeName = UnionTypeOf<typeof ThemeNames>;

export const PrimaryTheme: BehaviorSubject<ThemeName> = new BehaviorSubject<ThemeName>('layout');
export const SecondaryTheme: BehaviorSubject<ThemeName> = new BehaviorSubject<ThemeName>('medieval-wood');


/**
 * A service for managing themes.
 */
@LoggableClass({
    LOCAL_ID: 'ThemeService',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Debug
})
@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    public static linkElementMap: {[key: string]: HTMLLinkElement} = {};

    public static initialize() {
        const linkElements: HTMLLinkElement[] = Array.from(document.getElementsByTagName('link'));
        const themeELements: HTMLLinkElement[] = linkElements.filter(element => element.rel === 'stylesheet' && element.id !== '');
        themeELements.forEach(element => {
            ThemeService.linkElementMap[element.id] = element;
        });
    }


    public static switchTheme(theme: ThemeName, linkId: string = 'base-theme') {

        let themeLink: HTMLLinkElement | undefined = ThemeService.linkElementMap[linkId];
        /* <link id="secondary-theme" rel="stylesheet" type="text/css" href="/blank.css" /> */
        if(themeLink == undefined) {
            themeLink = document.createElement('link');
            const linkProperties: Partial<HTMLLinkElement> = {
                id: linkId,
                rel: 'stylesheet',
                type: 'text/css',
                href: `/${theme}.css`
            };
            Object.assign(themeLink, linkProperties);
            document.head.appendChild(themeLink);
            ThemeService.linkElementMap[linkId] = themeLink;
        }

        const themeCSS = theme + '.css';

        if (!themeLink?.href.endsWith(themeCSS)) {
            themeLink.href = themeCSS;
        }

    }
}
