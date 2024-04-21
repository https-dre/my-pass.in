export class BadRequest extends Error {
    statusNumber: number = 400;

    constructor(message: string, status?: number) {
        super(message)
        if (status) {
            this.statusNumber = status;
        }
    }
}