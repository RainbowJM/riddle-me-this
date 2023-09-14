import Cryptr from 'cryptr';
const cryptr = new Cryptr('myTotallySecretKey');

/**
 * Encrypt will take a string and encrypt it
 * 
 * @param {*} value The string value to be encrypted 
 * @returns encrypted string
 */
export const encrypt = (value) => cryptr.encrypt(value);

/**
 * Decrypt will take an encrypted string and decrypt it
 * 
 * @param {*} cypher The ecrypted string value to be decrypted 
 * @returns encrypted string
 */
export const decrypt = (cypher) => cryptr.decrypt(cypher);