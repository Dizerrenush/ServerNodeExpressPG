export interface BaseInterface {
    id: number;
}
export interface ClientInterface {
    id: number;
    fullname: string;
    email: string;
}
export interface FeedbackInterface {
    id: number;
    description: string;
    clientId:number;
}
