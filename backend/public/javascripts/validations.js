module.exports = {
    validPEM(pem) {
        let pemRegex = new RegExp("^-----BEGIN PUBLIC KEY-----(.|\n|\r)*-----END PUBLIC KEY-----\r?\n?$");
        if(pemRegex.test(pem))
            return true;
        else {
            return false;
        }
    }
}