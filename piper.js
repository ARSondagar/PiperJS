const tenantCode = "Master";
const resourceName = window.location.hostname
    .replace("http://", "")
    .replace(".in", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(".com", "")
    .replace(".co.in", "");
const header = {
    "Content-type": "application/json",
    "X-Custom-Header": "ProcessThisImmediately"
}
const url = `https://elisa.kautilyam.com/api/FrontUtility/`;
const logoUrl = `https://elisa.kautilyam.com/ArcKautilyam/Images/Master/`;
getConfig();

function getConfig() {
    fetch(`${url}GetConfig`, {
            method: "POST",
            headers: header,
            body: JSON.stringify({
                resourceName: resourceName,
                tenantCode: tenantCode
            })
        })
        .then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    if (data.data && data.data.length) {
                        localStorage.setItem("configData", JSON.stringify(data.data[0]))
                    }
                })
            }
        })
        .catch((error) => console.warn("Configdata did not found.", error));
};

// implement this functionon button or link [not submit button]

function sendContactMail() {
    const form = document.getElementById("contactForm"); // "ContactForm" = id of form tag
    let formData = {
        configCode: JSON.parse(localStorage.getItem("configData")).configCode,
        tenantCode: tenantCode,
        toEmail: JSON.parse(localStorage.getItem("configData")).email
    };
    new FormData(form).forEach((value, key) => (formData[key] = value)); // add    "contact","email","fullname","subject","message"
    fetch(url + `ContactUs`, {
            method: "POST",
            headers: header,
            body: JSON.stringify(formData),
        })
        .catch((error) => console.warn("Configdata did not found.", error));
};

function sendSubscribeMail() {
    const form = document.getElementById("subscribe-form");
    let formData = {
        isActive: true,
        tenantCode: tenantCode,
        configCode: JSON.parse(localStorage.getItem("configData")).configCode,
        toEmail: JSON.parse(localStorage.getItem("configData")).email
    };
    new FormData(form).forEach((value, key) => (formData[key] = value)); // add    "contact","email"
    fetch(url + `Subscribe`, {
            method: "POST",
            headers: header,
            body: JSON.stringify(formData),
        })
        .catch((error) => console.warn("Configdata did not found.", error));
};

function sendQAMail() {
    const form = document.getElementById("ContactForm");
    let formData = {
        tenantCode: tenantCode,
        toEmail: JSON.parse(localStorage.getItem("configData")).email
    };
    new FormData(form).forEach((value, key) => (formData[key] = value)); // add    "contact","email", "question", "note"
    fetch(url + `AskQuestion`, {
            method: "POST",
            headers: header,
            body: JSON.stringify(formData),
        })
        .catch((error) => console.warn("Configdata did not found.", error));
};
const configData = JSON.parse(localStorage.getItem("configData"));

window.onload = () => {
    if (configData != null) {
        changeHTML("address", configData.address);
        changeText("email1", configData.email);
        changeAttribute("email1", "href", configData.email);
        if (configData.email == null) {
            changeText("email1", configData.altEmail);
            changeAttribute("email1", "href", configData.altEmail);
        }
        changeText("email2", configData.email);
        changeAttribute("email2", "href", configData.email);
        if (configData.email == null) {
            changeText("email2", configData.altEmail);
            changeAttribute("email2", "href", configData.altEmail);
        }
        changeText("contact1", configData.contact);
        if (configData.contact == null) {
            changeText("contact1", configData.altContact);
        }
        changeText("contact2", configData.contact);
        if (configData.contact == null) {
            changeText("contact2", configData.altContact);
        }
        changeHTML("aboutus", configData.aboutUs);

        changeAttribute("darklogo", "src", logoUrl + configData.darkLogoUrl);
        changeAttribute("logo-img", "src", logoUrl + configData.logoUrl);
        changeAttribute("logo1", "src", logoUrl + configData.logoUrl);
        changeAttribute("moblogo", "src", logoUrl + configData.logoUrl);

        hideElement("facebook", configData.facebook);
        changeAttribute("facebook", "href", configData.facebook);

        hideElement("instagram", configData.instagram);
        changeAttribute("instagram", "href", configData.instagram);

        hideElement("linkedIn", configData.linkedIn);
        changeAttribute("linkedIn", "href", configData.linkedIn);

        hideElement("skype", configData.skype);
        changeAttribute("skype", "href", configData.skype);

        hideElement("twitter", configData.twitter);
        changeAttribute("twitter", "href", configData.twitter);

        hideElement("whatsApp", configData.whatsApp);
        changeAttribute("whatsApp", "href", configData.whatsApp);

        hideElement("youtube", configData.youtube);
        changeAttribute("youtube", "href", configData.youtube);
    }
};

function changeText(id, value) {
    if (value != null && document.getElementById(id) != null) {
        document.getElementById(id).innerText = value;
    }
};

function changeAttribute(id, attribute, value) {
    if (value != null && document.getElementById(id) != null) {
        document.getElementById(id).setAttribute(attribute, value);
    }
};

function changeHTML(id, value) {
    if (value != null && document.getElementById(id) != null) {
        document.getElementById(id).innerHTML = value;
    }
};

function hideElement(id, value) {
    if (value == null && document.getElementById(id) != null) {
        document.getElementById(id).style.display = "none";
    }
}