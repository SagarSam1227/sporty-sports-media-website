import { CustomErr } from "./custom-error";

export class GetErr extends CustomErr {
    statusCode = 404

    constructor(err: string) {
        super(err)
        Object.setPrototypeOf(this, GetErr.prototype)
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: 'Error connecting to fetch data' }]
    }
}