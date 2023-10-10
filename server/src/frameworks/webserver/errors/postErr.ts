import { CustomErr } from "./custom-error";

export class PostErr extends CustomErr {
    statusCode = 201

    constructor(err: string) {
        super(err)
        Object.setPrototypeOf(this, PostErr.prototype)
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: 'Error connecting to create collection' }]
    }
}