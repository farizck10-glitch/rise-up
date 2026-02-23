export type ScreenId =
    | 'welcome'
    | 'intro-1'
    | 'intro-2'
    | 'intro-3'
    | 'login'
    | 'home'
    | 'bloodbank'
    | 'blood-request'
    | 'schemes'
    | 'library'
    | 'market'
    | 'grievances'
    | 'jobs'
    | 'emergency'
    | 'haritha'
    | 'admin';

export interface User {
    name: string;
    phone: string;
}
