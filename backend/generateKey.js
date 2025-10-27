import crypto from 'crypto';

const KEY_LENGTH_BYTES = 64
const ENCODING = 'base64'

function generateKey(){
    try {
        const secret = crypto.randomBytes(KEY_LENGTH_BYTES).toString(ENCODING)
    console.log(`Secret key: ${secret}`)
    } catch (error) {
        console.error("Failed to Generate Secret Key",error.message)
    }
}
generateKey()