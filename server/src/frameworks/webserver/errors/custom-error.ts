export abstract class CustomErr extends Error {
    abstract statusCode: number
    constructor(msg: string) {
        super(msg)
        Object.setPrototypeOf(this, CustomErr.prototype)
    }

    abstract serializeError(): { message: string; field?: string }[]
}