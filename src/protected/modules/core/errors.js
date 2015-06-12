exports.HttpError = HttpError;

function HttpError (status, message, json) {
    var err = Error.apply(this, [message]);
    err.name = this.name = 'HttpError';
    this.stack = err.stack;
    this.message = err.message;
    this.json = json;
    this.status = status;
}

HttpError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: HttpError,
        writable: true,
        configurable: true
    }
});
