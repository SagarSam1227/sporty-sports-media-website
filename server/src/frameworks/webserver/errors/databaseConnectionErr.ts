import { CustomErr } from "./custom-error";

export class DatabaseConnectionErr extends CustomErr {
    statusCode = 500

    constructor() {
        super('Error connecting to database')
        Object.setPrototypeOf(this, DatabaseConnectionErr.prototype)
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: 'Error connecting to database' }]
    }
}
