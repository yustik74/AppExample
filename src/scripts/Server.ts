export const ExternalSettings: IExternalSettings = (window as any)['external-settings'];

export interface IExternalSettings {
    Name: string;
    Version: string;
    Urls: IExternalSettingsUrls;
    Token: string;
    User: IUser;
    Organization: IOrganization;
    Settings: { [key: string]: string };
    LocaleDefault: string;
    LocaleCurrent: string;
}

export interface IExternalSettingsUrls {
    Service: string;
    Relative: string;
    Content: string;
    App: string;
    ImageCar: string;
    ImageGF: string;
    ImageImplements: string;
    ImageDrivers: string;
}

export interface IUser {
    ID: number;
    UID: any;
    Name: string;
    Login: string;
    Mail: string;
    Theme: any;
    Props: { [key: string]: string };
}

export interface IOrganization {
    ID: number;
    UID: any;
    Name: string;
    Props: { [key: string]: string };
}