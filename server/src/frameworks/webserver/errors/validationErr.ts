import { CustomErr } from "./custom-error";

export class ValidationErr extends CustomErr {
    statusCode = 400

    constructor(err: string) {
        super(err)
        Object.setPrototypeOf(this, ValidationErr.prototype)
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.message }]
    }
}