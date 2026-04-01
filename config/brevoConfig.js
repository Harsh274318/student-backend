import SibApiV3Sdk from "sib-api-v3-sdk"
import dotenv from "dotenv"
dotenv.config()
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BRAVO_OTP_KEY
const brevoConfig = new SibApiV3Sdk.TransactionalEmailsApi();
export default brevoConfig;