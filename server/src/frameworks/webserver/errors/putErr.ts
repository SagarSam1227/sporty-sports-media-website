import { CustomErr } from "./custom-error";

export class PutErr extends CustomErr {
    statusCode = 204

    constructor(err: string) {
        super(err)
        Object.setPrototypeOf(this, PutErr.prototype)
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: 'Error connecting to update data' }]
    }
}