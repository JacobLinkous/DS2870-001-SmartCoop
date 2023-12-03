/*
for profile to get address
$.get('https://simplecoop.swollenhippo.com/coop.php?SessionID=5e88dbee-4e00-430d-b3f2-44f10d8c4777',function(result){
        console.log(result.ZIP);
    });
*/
function getWeather(){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=38501,us&appid=f9cd6c6a1f0237008e9fd5c6f964fbd4`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        let temperature = data.main.temp;
        temperature = (Math.trunc((temperature-273.15)*(9/5)+32));
        sessionStorage.setItem("currentTemp", temperature);
        $('#temperatureCurrentStatus').html("<b>"+temperature+"°F</b>");
        return;
    })
    .catch(error => {
        console.log('Error fetching weather data:', error);
    }); 
}

function getTime(){
    let date = new Date();
    return ((date.getHours()*60) + date.getMinutes());
}

function autoLights(){
    let turnOnLights = $('#LightsOnTime').val();
    turnOnLights = (turnOnLights.split(':')[0]*60) + (turnOnLights.split(':')[1]*1);
    let turnOffLights = $('#LightsOffTime').val();
    turnOffLights = (turnOffLights.split(':')[0]*60) + (turnOffLights.split(':')[1]*1);
    let lightChecker = setInterval(function (){
        $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Lights"}, function(lightsReuslt){
            if(lightsReuslt.Value == 'On'){
                clearInterval(lightChecker);
            } else if(lightsReuslt.Value == 'Off'){
                clearInterval(lightChecker);
            } else {
                turnOnLights = lightsReuslt.Value.split('|')[1];
                turnOffLights = lightsReuslt.Value.split('|')[2];
                sessionStorage.setItem("LightsOn", turnOnLights);
                sessionStorage.setItem("LightsOff", turnOffLights);
                if(getTime() <= turnOffLights && getTime() >= turnOnLights){
                    $("#lightsLightsStatus").html("<b>"+ (lightsReuslt.Value.split('|')[0]) + " On | Start:"+ (lightsReuslt.Value.split('|')[1]) + " to End:" + (lightsReuslt.Value.split('|')[2]) +"</b>");
                    $("#homepageLightsStatus").html("<b>"+ (lightsReuslt.Value.split('|')[0]) + " On | Start:"+ (lightsReuslt.Value.split('|')[1]) + " to End:" + (lightsReuslt.Value.split('|')[2]) +"</b>");
                }else{
                    $("#lightsLightsStatus").html("<b>"+ (lightsReuslt.Value.split('|')[0]) + " Off | Start:"+ (lightsReuslt.Value.split('|')[1]) + " to End:" + (lightsReuslt.Value.split('|')[2]) +"</b>");
                    $("#homepageLightsStatus").html("<b>"+ (lightsReuslt.Value.split('|')[0]) + " Off | Start:"+ (lightsReuslt.Value.split('|')[1]) + " to End:" + (lightsReuslt.Value.split('|')[2]) +"</b>");
                }
            }      
        });
    }, 3000);
    
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Lights&value=Auto|" + turnOnLights + "|" + turnOffLights,
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Lights"}, function(lightsReuslt){
                $("#lightsLightsStatus").html("<b>"+ (lightsReuslt.Value.split('|')[0]) + " | Start:"+ (lightsReuslt.Value.split('|')[1]) + " to End:" + (lightsReuslt.Value.split('|')[2]) +"</b>");
            });
        }
    });
}

function autoDoor(){
    let openDoor = $('#DoorOpenTime').val();
    openDoor = (openDoor.split(':')[0]*60) + (openDoor.split(':')[1]*1);
    let closeDoor = $('#DoorCloseTime').val();
    closeDoor = (closeDoor.split(':')[0]*60) + (closeDoor.split(':')[1]*1);
    let doorChecker = setInterval(function (){
        $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Door"}, function(doorReuslt){
            if(doorReuslt.Value == 'Open'){
                clearInterval(doorChecker);
            } else if(doorReuslt.Value == 'Close'){
                clearInterval(doorChecker);
            } else {
                openDoor = doorReuslt.Value.split('|')[1];
                closeDoor = doorReuslt.Value.split('|')[2];
                sessionStorage.setItem("DoorOpen", openDoor);
                sessionStorage.setItem("DoorClose", closeDoor);
                if(getTime() <= closeDoor && getTime() >= openDoor){
                    $("#doorDoorStatus").html("<b>"+ (doorReuslt.Value.split('|')[0]) + " Open | Start:"+ (doorReuslt.Value.split('|')[1]) + " to End:" + (doorReuslt.Value.split('|')[2]) +"</b>");
                    $("#homepageDoorStatus").html("<b>"+ (doorReuslt.Value.split('|')[0]) + " Open | Start:"+ (doorReuslt.Value.split('|')[1]) + " to End:" + (doorReuslt.Value.split('|')[2]) +"</b>");
                }else{
                    $("#doorDoorStatus").html("<b>"+ (doorReuslt.Value.split('|')[0]) + " Close | Start:"+ (doorReuslt.Value.split('|')[1]) + " to End:" + (doorReuslt.Value.split('|')[2]) +"</b>");
                    $("#homepageDoorStatus").html("<b>"+ (doorReuslt.Value.split('|')[0]) + " Close | Start:"+ (doorReuslt.Value.split('|')[1]) + " to End:" + (doorReuslt.Value.split('|')[2]) +"</b>");
                }
            }      
        });
    }, 3000);
    
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Door&value=Auto|" + openDoor + "|" + closeDoor,
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Door"}, function(doorReuslt){
                $("#doorDoorStatus").html("<b>Auto | Start:"+ openDoor + " to End:" + closeDoor +"</b>");
            });
        }
    });
}

function autoHeat(){
    let heatChecker = setInterval(function (){
        $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat"}, function(heatReuslt){
            if(heatReuslt.Value == 'On'){
                clearInterval(heatChecker);
            } else if(heatReuslt.Value == 'Off'){
                clearInterval(heatChecker);
            } else {
                if(sessionStorage.getItem('currentTemp') <= (heatReuslt.Value.split('|')[1]*1)){
                    $("#temperatureHeatStatus").html("<b>"+ (heatReuslt.Value.split('|')[0]) + " On | Heat:"+ (heatReuslt.Value.split('|')[1]) +"</b>");
                    $("#homepageHeatStatus").html("<b>"+ (heatReuslt.Value.split('|')[0]) + " On | Heat:"+ (heatReuslt.Value.split('|')[1]) +"</b>");
                }else{
                    $("#temperatureHeatStatus").html("<b>"+ (heatReuslt.Value.split('|')[0]) + " Off | Heat:"+ (heatReuslt.Value.split('|')[1]) +"</b>");
                    $("#homepageHeatStatus").html("<b>"+ (heatReuslt.Value.split('|')[0]) + " Off | Heat:"+ (heatReuslt.Value.split('|')[1]) +"</b>");
                }
            }      
        });
    }, 10000);

    getWeather();
    if(sessionStorage.getItem('currentTemp') <= ($('#autoHeatOn').val()*1)){
        $.ajax({
            url: 'https://simplecoop.swollenhippo.com/settings.php',
            type: 'PUT',
            data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Heat&value=Auto|" + ($('#autoHeatOn').val()*1),
            success: function(){
                $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat"}, function(heatReuslt){
                    $("#temperatureHeatStatus").html("<b>Auto| Heat:"+ (heatReuslt.Value.split('|')[1]) +"</b>");
                })
                fanOff();
            }
        });
    }
}

function autoFan(){
    let fanChecker = setInterval(function (){
        $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan"}, function(fanReuslt){
            if(fanReuslt.Value == 'On'){
                clearInterval(fanChecker);
            } else if(fanReuslt.Value == 'Off'){
                clearInterval(fanChecker);
            } else {
                if(sessionStorage.getItem('currentTemp') >= (fanReuslt.Value.split('|')[1]*1)){
                    $("#temperatureFanStatus").html("<b>"+ (fanReuslt.Value.split('|')[0]) + " On | Fan:"+ (fanReuslt.Value.split('|')[1]) +"</b>");
                    $("#homepageFanStatus").html("<b>"+ (fanReuslt.Value.split('|')[0]) + " On | Fan:"+ (fanReuslt.Value.split('|')[1]) +"</b>");
                }else{
                    $("#temperatureFanStatus").html("<b>"+ (fanReuslt.Value.split('|')[0]) + " Off | Fan:"+ (fanReuslt.Value.split('|')[1]) +"</b>");
                    $("#homepageFanStatus").html("<b>"+ (fanReuslt.Value.split('|')[0]) + " Off | Fan:"+ (fanReuslt.Value.split('|')[1]) +"</b>");
                }
            }      
        });
    }, 10000);

    getWeather();
    if(sessionStorage.getItem('currentTemp') >= ($('#autoFanOn').val()*1)){
        $.ajax({
            url: 'https://simplecoop.swollenhippo.com/settings.php',
            type: 'PUT',
            data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Fan&value=Auto|" + ($('#autoFanOn').val()*1),
            success: function(){
                $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan"}, function(fanReuslt){
                    $("#temperatureFanStatus").html("<b>Auto| Fan:"+ (fanReuslt.Value.split('|')[1]) +"</b>");
                })
                heatOff();
            }
        });
    }
}

function checkStatusHomePage(){
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Lights"}, function(lightsReuslt){
        if(lightsReuslt.Value == 'On'){
            $("#homepageLightsStatus").html("<b>"+lightsReuslt.Value+"</b>");
        } else if(lightsReuslt.Value == 'Off'){
            $("#homepageLightsStatus").html("<b>"+lightsReuslt.Value+"</b>");
        } else {
            $("#homepageLightsStatus").html("<b>Auto | Start:"+ (lightsReuslt.Value.split('|')[1]) + " to End:" + (lightsReuslt.Value.split('|')[2]) +"</b>");
        }
    });
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan"}, function(fanReuslt){
        $("#homepageFanStatus").html("<b>"+fanReuslt.Value+"</b>");
    });
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat"}, function(heatReuslt){
        $("#homepageHeatStatus").html("<b>"+heatReuslt.Value+"</b>");
    });
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Door"}, function(doorReuslt){
        if(doorReuslt.Value == 'Open'){
            $("#homepageDoorStatus").html("<b>"+doorReuslt.Value+"</b>");
        } else if(doorReuslt.Value == 'Close'){
            $("#homepageDoorStatus").html("<b>"+doorReuslt.Value+"</b>");
        } else {
            $("#homepageDoorStatus").html("<b>Auto | Start:"+ (doorReuslt.Value.split('|')[1]) + " to End:" + (doorReuslt.Value.split('|')[2]) +"</b>");
        }    
    });
}

function createAllSettings(){
    $.post('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Lights", value:"Off"}, function (sessionResult) {
        sessionResult = JSON.parse(sessionResult);
    });
    $.post('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan", value:"Off"}, function (sessionResult) {
        sessionResult = JSON.parse(sessionResult);
    });
    $.post('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat", value:"Off"}, function (sessionResult) {
        sessionResult = JSON.parse(sessionResult);
    });
    $.post('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Door", value:"Close"}, function (sessionResult) {
        sessionResult = JSON.parse(sessionResult);
    });
}

function heatOff(){
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Heat&value=Off",
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat"}, function(heatReuslt){
                $("#temperatureHeatStatus").html("<b>"+heatReuslt.Value+"</b>");
            });
        }
    });
}

function fanOff(){
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Fan&value=Off",
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan"}, function(fanReuslt){
                $("#temperatureFanStatus").html("<b>"+fanReuslt.Value+"</b>");
            });
        }
    });
}

$('#manualDoorOpen').on('click', function () {
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Door&value=Open",
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Door"}, function(doorReuslt){
                $("#doorDoorStatus").html("<b>"+doorReuslt.Value+"</b>");
            });
        }
    });
});

$('#manualDoorClose').on('click', function () {
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Door&value=Close",
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Door"}, function(doorReuslt){
                $("#doorDoorStatus").html("<b>"+doorReuslt.Value+"</b>");
            });
        }
    });
});

$('#manualFanOff').on('click', function () {
    fanOff()
});

$('#manualHeatOff').on('click', function () {
    heatOff()
});

$('#manualFanOn').on('click', function () {
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Fan&value=On",
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan"}, function(fanReuslt){
                $("#temperatureFanStatus").html("<b>"+fanReuslt.Value+"</b>");
            });
            heatOff()
        }
    });
});

$('#manualHeatOn').on('click', function () {
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Heat&value=On",
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat"}, function(heatReuslt){
                $("#temperatureHeatStatus").html("<b>"+heatReuslt.Value+"</b>");
            })
            fanOff()
        }
    });
});

$('#flexSwitchCheckChecked').on('change', function(){
    if($('#flexSwitchCheckChecked').is(':checked')){
        $.ajax({
            url: 'https://simplecoop.swollenhippo.com/settings.php',
            type: 'PUT',
            data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Lights&value=On",
            success: function(){
                $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Lights"}, function(lightsReuslt){
                    $("#lightsLightsStatus").html("<b>"+lightsReuslt.Value+"</b>");
                });
            }
        });
    }else {
        $.ajax({
            url: 'https://simplecoop.swollenhippo.com/settings.php',
            type: 'PUT',
            data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Lights&value=Off",
            success: function(){
                $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Lights"}, function(lightsReuslt){
                    $("#lightsLightsStatus").html("<b>"+lightsReuslt.Value+"</b>");
                });
            }
        });
    }
});

$('#lightSubmit').on('click', function () {   
    autoLights()
});

$('#DoorSubmit').on('click', function () {
    autoDoor()
});

$('#autoHeatOnSubmit').on('click', function(){
    autoHeat();
});

$('#autoFanOnSubmit').on('click', function(){
    autoFan();
});