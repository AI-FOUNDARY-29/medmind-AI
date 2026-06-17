// MedMind AI Demo Script

function sendSOS() {
    alert("🚨 SOS Alert Sent Successfully!");
}

function askAI() {

    const question =
    document.getElementById("aiQuestion").value;

    const response =
    document.getElementById("aiResponse");

    if(question.trim() === "") {
        response.innerHTML =
        "Please enter a health question.";
        return;
    }

    let answer = "";

    const q = question.toLowerCase();

    if(q.includes("fever")) {
        answer =
        "🌡 Fever detected. Stay hydrated and consult a doctor if symptoms continue.";
    }

    else if(q.includes("headache")) {
        answer =
        "🤕 Headaches can occur due to stress, dehydration or lack of sleep.";
    }

    else if(q.includes("cold")) {
        answer =
        "🤧 Common cold detected. Rest well and drink warm fluids.";
    }

    else if(q.includes("cough")) {
        answer =
        "😷 Persistent cough should be monitored. Consult a doctor if severe.";
    }

    else if(q.includes("stress")) {
        answer =
        "🧠 Try meditation, breathing exercises and proper sleep.";
    }

    else if(q.includes("sleep")) {
        answer =
        "😴 Adults should aim for 7-9 hours of sleep daily.";
    }

    else {
        answer =
        "🤖 MedMind AI recommends consulting a healthcare professional for accurate guidance.";
    }

    response.innerHTML = answer;
}

// Demo Health Updates

setInterval(() => {

    const heart =
    Math.floor(Math.random() * 20) + 65;

    const spo2 =
    Math.floor(Math.random() * 3) + 97;

    const temp =
    (36.5 + Math.random()).toFixed(1);

    document.getElementById("heartRate")
    .innerHTML = heart + " BPM";

    document.getElementById("spo2")
    .innerHTML = spo2 + "%";

    document.getElementById("temperature")
    .innerHTML = temp + "°C";

}, 5000);

console.log("MedMind AI Loaded Successfully");