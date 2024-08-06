export default class ResponseModel{
    constructor(data, success, message){
        this.data = data;
        this.message = message;
        this.success = success;
    }

    data: any | null;
    success: boolean;
    message: string = "";
}