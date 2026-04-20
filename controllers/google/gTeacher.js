import customRes from "../../utils/customRes.js";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx4HjrMMbUBWMKR77-TxHntO9tpb15At3p2ZAEho-XJZNEzbd6L0dsxJo055lEifFQTOw/exec";

async function gTeacher(req, res) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });
        return customRes(res, 201, true, "query sent", "", "")

    } catch (err) {
        console.log("google says::-", err.message);
        return customRes(res, 500, false, "", err.message, "");
    }
}

export default gTeacher;