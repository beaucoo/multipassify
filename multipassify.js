var crypto = require('crypto');

var BLOCK_SIZE = 16;

var multipassify = module.exports = function(secret) {
    if (!(this instanceof multipassify)) return new multipassify(secret);
    if (!(typeof secret == 'string' && secret.length > 0)) throw new Error('Invalid Secret');

    // Use the Multipass secret to derive two cryptographic keys,
    // one for encryption, one for signing
    var hash = crypto.createHash("sha256").update(secret).digest();
    this._encryptionKey = hash.slice(0, BLOCK_SIZE);
    this._signingKey = hash.slice(BLOCK_SIZE, 32);
    return this;
};

multipassify.prototype.encode = function(obj) {
    if (!obj) return;

    // Store the current time in ISO8601 format.
    // The token will only be valid for a small timeframe around this timestamp.
    if (!obj["created_at"]) {
      obj["created_at"] = new Date().toISOString();
    }

    // Serialize the customer data to JSON and encrypt it
    var cipherText = this.encrypt(JSON.stringify(obj));

    // Create a signature (message authentication code) of the ciphertext
    // and encode everything using URL-safe Base64 (RFC 4648)
    var token = Buffer.concat([cipherText, this.sign(cipherText)]).toString('base64');
    token = token.replace(/\+/g, '-') // Replace + with -
        .replace(/\//g, '_'); // Replace / with _

    return token;
};

multipassify.prototype.generateUrl = function(obj, domain) {
    if(!domain) return;
    return "https://" + domain + "/account/login/multipass/" + this.encode(obj);
};

multipassify.prototype.sign = function (data) {
    var signed = crypto.createHmac("SHA256", this._signingKey).update(data).digest();
    return signed;
}

multipassify.prototype.encrypt = function(plaintext) {
    // Use a random IV
    var iv = crypto.randomBytes(BLOCK_SIZE);
    var cipher = crypto.createCipheriv('aes-128-cbc', this._encryptionKey,iv);

    // Use IV as first block of ciphertext
    var encrypted = Buffer.concat([iv, cipher.update(plaintext, 'utf8'), cipher.final()]);
    return encrypted;
}
