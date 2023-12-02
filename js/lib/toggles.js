$('#btnToRegistration').on('click', function () {
    $('#loginCard').slideUp();
    $('#registerCard').slideDown();
});

$('#btnCancel').on('click', function () {
    $('#loginCard').slideDown();
    $('#registerCard').slideUp();
});

function closeAll(){
    $('#homepage').slideUp(0);
    $('#lights').slideUp(0);
    $('#temperature').slideUp(0);
    $('#door').slideUp(0);
    $('#foodandwater').slideUp(0);
    $('#egg').slideUp(0);
};

$('#homepagebtn').on('click', function () {
    closeAll();
    checkStatusHomePage();
    $('#homepage').slideDown();
});

$('#lightsbtn').on('click', function () {
    closeAll();
    /* For when it actually works
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Lights"}, function(lightsReuslt){
        $("#homepageLightsStatus").html("<b>"+lightsReuslt.Value+"</b>");
    });
    */
    $('#lights').slideDown();
});

$('#tempbtn').on('click', function () {
    closeAll();
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat"}, function(heatReuslt){
        $("#temperatureHeatStatus").html("<b>"+heatReuslt.Value+"</b>");
    })
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan"}, function(fanReuslt){
        $("#temperatureFanStatus").html("<b>"+fanReuslt.Value+"</b>");
    });
    $('#temperature').slideDown();
});

$('#doorbtn').on('click', function () {
    closeAll();
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Door"}, function(doorReuslt){
        $("#doorDoorStatus").html("<b>"+doorReuslt.Value+"</b>");
    });
    $('#door').slideDown();
});

$('#foodandwaterbtn').on('click', function () {
    closeAll();
    $('#foodandwater').slideDown();
});

$('#eggbtn').on('click', function () {
    closeAll();
    $('#egg').slideDown();
});