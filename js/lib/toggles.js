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

function homepage(){
    closeAll();
    checkStatusHomePage();
    $('#homepage').slideDown();
};

function light(){
    closeAll();
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Lights"}, function(lightsReuslt){
        if(lightsReuslt.Value == 'On'){
            $('#lightsAutoSwitchControl').prop('checked', true);
            $("#lightsLightsStatus").html("<b>"+lightsReuslt.Value+"</b>");
        } else if(lightsReuslt.Value == 'Off'){
            $('#lightsAutoSwitchControl').prop('checked', false);
            $("#lightsLightsStatus").html("<b>"+lightsReuslt.Value+"</b>");
        } else {
            $("#lightsLightsStatus").html("<b>Auto | Start:"+ (lightsReuslt.Value.split('|')[1]) + " to End:" + (lightsReuslt.Value.split('|')[2]) +"</b>");
        }
    }); 
    $('#lights').slideDown();
};

function temperature(){
    closeAll();
    getWeather();
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat"}, function(heatReuslt){
        $("#temperatureHeatStatus").html("<b>"+heatReuslt.Value+"</b>");
        if(heatReuslt.Value == 'On'){
            $('#heatmanualcontrol').prop('checked', true);
        } else if(heatReuslt.Value == 'Off'){
            $('#heatmanualcontrol').prop('checked', false);
        } else {
            
        }
    })
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan"}, function(fanReuslt){
        $("#temperatureFanStatus").html("<b>"+fanReuslt.Value+"</b>");
        if(fanReuslt.Value == 'On'){
            $('#fanmanualcontrol').prop('checked', true);
        } else if(fanReuslt.Value == 'Off'){
            $('#fanmanualcontrol').prop('checked', false);
        } else {
            console.log('sad')
        }
    });
    $('#temperature').slideDown();
};

function door(){
    closeAll();
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Door"}, function(doorReuslt){
        if(doorReuslt.Value == 'Open'){
            $("#doorDoorStatus").html("<b>"+doorReuslt.Value+"</b>");
            $('#doormanualcontrol').prop('checked', true);
        } else if(doorReuslt.Value == 'Close'){
            $("#doorDoorStatus").html("<b>"+doorReuslt.Value+"</b>");
            $('#doormanualcontrol').prop('checked', false);
        } else {
            $("#doorDoorStatus").html("<b>Auto | Start:"+ (doorReuslt.Value.split('|')[1]) + " to End:" + (doorReuslt.Value.split('|')[2]) +"</b>");
        }    
    });
    $('#door').slideDown();
};

function foodandwater(){
    closeAll();
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Water"}, function(waterReuslt){
        $("#waterStatus").html("<b>Percentage: "+ waterReuslt.Value +"%</b>");
    });
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Food"}, function(foodReuslt){
        $("#foodStatus").html("<b>Percentage: "+ foodReuslt.Value +"%</b>");
    });
    $('#foodandwater').slideDown();
};

function egg(){
    closeAll();
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"TotalEggs"}, function(eggReuslt){
        $("#eggCountTotal").html("<b>"+ eggReuslt.Value +"</b>")
    });
    $('#egg').slideDown();

}

$('#homepagebtn').on('click', function () {
    homepage();
});

$('#lightsbtn').on('click', function () {
    light();
});

$('#tempbtn').on('click', function () {
    temperature();
});

$('#doorbtn').on('click', function () {
    door();
});

$('#foodandwaterbtn').on('click', function () {
    foodandwater();
});

$('#eggbtn').on('click', function () {
    egg();
});

$('#homepageLightsStatusCard').on('click', function () {
    light();
});

$('#homepageHeatStatusCard').on('click', function () {
    temperature();
});

$('#homepageFanStatusCard').on('click', function () {
    temperature();
});

$('#homepageDoorStatusCard').on('click', function () {
    door();
});

$('#homepageFoodStatusCard').on('click', function () {
    foodandwater();
});

$('#homepageWaterStatusCard').on('click', function () {
    foodandwater();
});

$('#homepageEggStatusCard').on('click', function () {
    egg();
});

