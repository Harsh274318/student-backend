import customRes from "../../utils/customRes.js";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwjfzP3XiPs4Z-0uBJU7S_E4H6GICAHFQGfxibG72ztOxy_J6MVIjPFNSuDvUFYBkAL/exec";

async function gStudent(req, res) {
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

export default gStudent;