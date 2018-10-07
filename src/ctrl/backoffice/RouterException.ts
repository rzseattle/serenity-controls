"use strict";

export default class RouterException extends Error {
    constructor(message?: string) {
        // 'Error' breaks prototype chain here
        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RouterException.prototype);
        this.name = "RouterException";
    }
}