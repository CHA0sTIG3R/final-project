var galleryImages = document.querySelectorAll(".gallery-img");
var getLatestOpenedImg;
var WindowWidth = window.innerWidth;

if (galleryImages) {
    galleryImages.forEach(function(image, index) {
        image.onclick = function() {
            var getElementCss = window.getComputedStyle(image);
            var getFullimgUrl = getElementCss.getPropertyValue("background-image");
            var getImgUrlPos = getFullimgUrl.split("/images/small/");
            var setNewImgUrl = getImgUrlPos[1].replace('")', '');

            getLatestOpenedImg = index + 1;

            var container = document.body;
            var newImgWindow = document.createElement("div")
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()");

            var newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "images/" + setNewImgUrl);
            newImg.setAttribute("id", "current-img");

            newImg.onload = function() {
                var imgWidth = this.width;
                var calcImgToEdge = ((WindowWidth - imgWidth) / 2) - 80;

                var newNextBtn = document.createElement("a");
                var btnNextText = document.createTextNode("Next");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

                var newPrevBtn = document.createElement("a");
                var btnPrevText = document.createTextNode("Prev");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";

            }


        }
    });
}

function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir) {
    document.querySelector("#current-img").remove();

    var getImgWindow = document.querySelector(".img-window");
    var newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    var calcNewImg;
    if (changeDir === 1) {
        calcNewImg = getLatestOpenedImg + 1;
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    } else if (changeDir === 0) {
        calcNewImg = getLatestOpenedImg - 1;
        if (calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }
    newImg.setAttribute("src", "images/img" + calcNewImg + ".jpg");
    newImg.setAttribute("id", "current-img");

    getLatestOpenedImg = calcNewImg;

    newImg.onload = function() {
        var imgWidth = this.width;
        var calcImgToEdge = ((WindowWidth - imgWidth) / 2) - 80;

        var nextBtn = document.querySelector("img-btn-next");
        nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

        var prevBtn = document.querySelector("img-btn-prev");
        prevBtn.style.cssText = "right: " + calcImgToEdge + "px;";
    }
}






//form js

const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const dob = document.getElementById('dob');
const gender = document.getElementById('gender');
const address = document.getElementById('address');
const zip = document.getElementById('zip');
const city = document.getElementById('city');
const state = document.getElementById('state');

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    // trim to remove the whitespaces
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const dobValue = dob.value.trim();
    const genderValue = gender.value.trim();
    const addressValue = address.value.trim();
    const zipValue = zip.value.trim();
    const cityValue = city.value.trim();
    const stateValue = state.value.trim();

    if (firstnameValue === '') {
        setErrorFor(firstname, 'Firstname cannot be blank');
    } else {
        setSuccessFor(firstname);
    }

    if (lastnameValue === '') {
        setErrorFor(lastname, 'Lastname cannot be blank');
    } else {
        setSuccessFor(lastname);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }

    if (phoneValue === '') {
        setErrorFor(phone, 'Phone Number cannot be blank');
    } else if (!phonenum(phoneValue)) {
        setErrorFor(phone, 'Not a valid Phone Number');
    } else {
        setSuccessFor(phone);
    }

    if (dobValue === '') {
        setErrorFor(dob, 'Please fill out this field');
    } else {
        setSuccessFor(dob);
    }

    if (genderValue === '') {
        setErrorFor(gender, 'Please fill out this field');
    } else {
        setSuccessFor(gender);
    }

    if (addressValue === '') {
        setErrorFor(address, 'Please fill out this field');
    } else {
        setSuccessFor(address);
    }

    if (zipValue === '') {
        setErrorFor(zip, 'Please fill out this field');
    } else {
        setSuccessFor(zip);
    }

    if (cityValue === '') {
        setErrorFor(city, 'Please fill out this field');
    } else {
        setSuccessFor(city);
    }


    if (stateValue === '') {
        setErrorFor(state, 'Please fill out this field');
    } else {
        setSuccessFor(state);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function phonenum(phone) {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}