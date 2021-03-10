// const bgpopup = document.getElementById('Launch');
// const end = document.getElementById('ES_EndTransaction');

function FATCAPopFunction() {
    var popup = document.getElementById("myPopup");
    var bg = document.getElementById("myPopup1");
    popup.style.display = "block";
    bg.style.display = "block";
}


function hidePopupfatca() {
    var popup = document.getElementById("myPopup");
    var bg = document.getElementById("myPopup1");
    popup.style.display = "none";
    bg.style.display = "none";
}


function PEPPopFunction() {
    var popup1 = document.getElementById("myPopup3");
    var bg2 = document.getElementById("myPopup2");
    popup1.style.display = "block";
    bg2.style.display = "block";
}


function hidePopuppep() {
    var popup1 = document.getElementById("myPopup3");
    var bg2 = document.getElementById("myPopup2");
    popup1.style.display = "none";
    bg2.style.display = "none";
}

function CRSPopFunction() {
    var popup1 = document.getElementById("myPopup4");
    var bg2 = document.getElementById("myPopup5");
    popup1.style.display = "block";
    bg2.style.display = "block";
}


function hidePopupcrs() {
    var popup1 = document.getElementById("myPopup4");
    var bg2 = document.getElementById("myPopup5");
    popup1.style.display = "none";
    bg2.style.display = "none";
}

const xEmail = document.getElementById("noEmail");

xEmail.addEventListener('click', function() {
    if (xEmail.checked == true){
        document.getElementById('AR_Email').disabled = true;
        document.getElementById('AR_Email').value = "";
    }
    else{
        document.getElementById('AR_Email').disabled = false;
        document.getElementById('AR_Email').value = "";
    }
    
});

const xTelephone = document.getElementById("noPhone");

xTelephone.addEventListener('click', function() {
    if (xTelephone.checked == true){
        document.getElementById('AR_Telephone').disabled = true;
        document.getElementById('AR_Telephone').value = "";
    }
    else{
        document.getElementById('AR_Telephone').disabled = false;
        document.getElementById('AR_Telephone').value = "";
    }
    
});

const myKadAddress = document.getElementById("mykadAddress");

myKadAddress.addEventListener('click', function() {
    if (myKadAddress.checked == true){
        document.getElementById('AR_Address1').disabled = true;
        document.getElementById('AR_Address2').disabled = true;
        document.getElementById('AR_Postcode').disabled = true;
        document.getElementById('AR_City').disabled = true;
        document.getElementById('AR_State').disabled = true;
    }
    else{
        document.getElementById('AR_Address1').disabled = false;
        document.getElementById('AR_Address1').value = "";
        document.getElementById('AR_Address2').disabled = false;
        document.getElementById('AR_Address2').value = "";
        document.getElementById('AR_Postcode').disabled = false;
        document.getElementById('AR_Postcode').value = "";
        document.getElementById('AR_City').disabled = false;
        document.getElementById('AR_City').value = "";
        document.getElementById('AR_State').disabled = false;
        document.getElementById('AR_State').value = "";
    }
    
});