export type ApplicationError = {
    name: string;
    message: string;
    email: string;
};

export type RequestError = {
    status: number;
    data: object | null;
    statusText: string;
    name: string;
    message: string;
};