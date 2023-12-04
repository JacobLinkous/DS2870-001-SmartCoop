let FoodAlarmStart = true;
let WaterAlarmStart = true;

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
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Water"}, function(waterReuslt){
        $("#homepageWaterStatus").html("<b>Water|"+ waterReuslt.Value +"%</b>");
    });
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Food"}, function(foodReuslt){
        $("#homepageFoodStatus").html("<b>Food|"+ foodReuslt.Value +"%</b>");
    });
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"TotalEggs"}, function(eggReuslt){
        $("#homepageEggCount").html("<b>Eggs|"+ eggReuslt.Value +"</b>");
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
    $.post('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Food", value:"100"}, function (sessionResult) {
        sessionResult = JSON.parse(sessionResult);
    });
    $.post('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Water", value:"100"}, function (sessionResult) {
        sessionResult = JSON.parse(sessionResult);
    });
    $.post('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"WaterAlarm", value:"0"}, function (sessionResult) {
        sessionResult = JSON.parse(sessionResult);
    });
    $.post('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"FoodAlarm", value:"0"}, function (sessionResult) {
        sessionResult = JSON.parse(sessionResult);
    });
    $.post('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"TotalEggs", value:"0"}, function (sessionResult) {
        sessionResult = JSON.parse(sessionResult);
    });
}

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
            } else if((heatReuslt.Value.split('|')[0]) == 'Timer On'){
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
            } else if((fanReuslt.Value.split('|')[0]) == 'Timer On'){
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

function heatOn(){
    let heatOnTime = $('#heatOnTimer').val();
    $("#temperatureHeatStatus").html("<b>Timer On| Time Left:"+ heatOnTime +" Mins</b>");
    $("#homepageHeatStatus").html("<b>Timer On| Time Left:"+ heatOnTime +" Mins</b>");
    let heatOnTimer = setInterval(function(){
        $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat"}, function(heatResult){
            if(heatResult.Value == 'On'){
                clearInterval(heatOnTimer);
            } else if(heatResult.Value == 'Off'){
                clearInterval(heatOnTimer);
            } else if((heatResult.Value.split('|')[0]) == 'Auto'){
                clearInterval(heatOnTimer); 
            } else {
                if(heatOnTime == 0){
                    clearInterval(heatOnTimer);
                    heatOff();
                } else {
                heatOnTime--;
                    $("#temperatureHeatStatus").html("<b>Timer On| Time Left:"+ heatOnTime +" Mins</b>");
                    $("#homepageHeatStatus").html("<b>Timer On| Time Left:"+ heatOnTime +" Mins</b>");
                }
            }
        });
   }, 5000);

    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Heat&value=Timer On|" + heatOnTime,
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat"}, function(heatResult){
                $("#temperatureHeatStatus").html("<b>Timer On| Time Left:"+ (heatResult.Value.split('|')[1]) +" Mins</b>");
                $("#homepageHeatStatus").html("<b>Timer On| Time Left:"+ (heatResult.Value.split('|')[1]) +" Mins</b>");
            })
            fanOff();
        }
    });
}

function fanOn(){
    let fanOnTime = $('#fanOnTimer').val();
    $("#temperatureFanStatus").html("<b>Timer On| Time Left:"+ fanOnTime +" Mins</b>");
    $("#homepageFanStatus").html("<b>Timer On| Time Left:"+ fanOnTime +" Mins</b>");
    let fanOnTimer = setInterval(function(){
        $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan"}, function(fanResult){
            if(fanResult.Value == 'On'){
                clearInterval(fanOnTimer);
            } else if(fanResult.Value == 'Off'){
                clearInterval(fanOnTimer);
            } else if((fanResult.Value.split('|')[0]) == 'Auto'){
                clearInterval(fanOnTimer); 
            } else {
                if(fanOnTime == 0){
                    clearInterval(fanOnTimer);
                    fanOff();
                } else {
                fanOnTime--;
                    $("#temperatureFanStatus").html("<b>Timer On| Time Left:"+ fanOnTime +" Mins</b>");
                    $("#homepageFanStatus").html("<b>Timer On| Time Left:"+ fanOnTime +" Mins</b>");
                }
            }
        });
   }, 5000);

    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Fan&value=Timer On|" + fanOnTime,
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan"}, function(fanResult){
                $("#temperatureFanStatus").html("<b>Timer On| Time Left:"+ (fanResult.Value.split('|')[1]) +" Mins</b>");
                $("#homepageFanStatus").html("<b>Timer On| Time Left:"+ (fanResult.Value.split('|')[1]) +" Mins</b>");
            })
            heatOff();
        }
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

function foodAlarm(){
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Food"}, function(foodResult){
        $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"FoodAlarm"}, function(foodAlarmPercentage){
            if((foodResult.Value*1) <= (foodAlarmPercentage.Value*1)){
                Swal.fire({
                    icon: 'warning',
                    title: 'Food is low',
                    html: "Food is at " + foodResult.Value + "%"
                });
                FoodAlarmStart = false;
            }
        });
    });
}

function waterAlarm(){
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Water"}, function(waterResult){
        $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"WaterAlarm"}, function(waterAlarmPercentage){
            if((waterResult.Value*1) <= (waterAlarmPercentage.Value*1)){
                Swal.fire({
                    icon: 'warning',
                    title: 'Water is low',
                    html: "Water is at " + waterResult.Value + "%"
                });
                WaterAlarmStart = false;
            }
        });
    });
}    

function foodUse(){
    let tempFood = 100;
    let foodUse = setInterval(function(){
        $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Food"}, function(foodResult){
            if((foodResult.Value*1) <= 0){
                clearInterval(foodUse);
            } else {
                if(FoodAlarmStart){
                    foodAlarm();
                }
                tempFood = foodResult.Value - (Math.floor(Math.random() * 5) + 1);
                $("#foodStatus").html("<b>Food|"+ tempFood +"%</b>");
                $("#homepageFoodStatus").html("<b>Food|"+ tempFood +"%</b>");
                $.ajax({
                    url: 'https://simplecoop.swollenhippo.com/settings.php',
                    type: 'PUT',
                    data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Food&value="+ tempFood,
                });
            }
        });
   }, 20000);
}

function waterUse(){
    let tempWater = 100;
    let waterUse = setInterval(function(){
        $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Water"}, function(waterResult){
            if((waterResult.Value*1) <= 0){
                clearInterval(waterUse);
            } else {
                if(WaterAlarmStart){
                    waterAlarm();
                }
                tempWater = waterResult.Value - (Math.floor(Math.random() * 5) + 1);
                $("#waterStatus").html("<b>Water|"+ tempWater +"%</b>");
                $("#homepageWaterStatus").html("<b>Water|"+ tempWater +"%</b>");
                $.ajax({
                    url: 'https://simplecoop.swollenhippo.com/settings.php',
                    type: 'PUT',
                    data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Water&value="+ tempWater,
                });
            }
        });
   }, 20000);
}

//light controls
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

//door controls
$('#DoorSubmit').on('click', function () {
    autoDoor()
});

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

//temp controls
$('#autoHeatOnSubmit').on('click', function(){
    autoHeat();
});

$('#autoFanOnSubmit').on('click', function(){
    autoFan();
});

$('#heatOnTimerSubmit').on('click', function(){
    fanOff();
    heatOn();
});

$('#fanOnTimerSubmit').on('click', function(){
    heatOff();
    fanOn();
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

//food and water controls
$('#foodReset').on('click', function () {
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Food&value=100",
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Food"}, function(foodReuslt){
                $("#foodStatus").html("<b>Food|"+ foodReuslt.Value +"%</b>");
            });
            foodUse()
        }
    });
});

$('#waterReset').on('click', function () {
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Water&value=100",
        success: function(){
            $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Water"}, function(waterReuslt){
                $("#waterStatus").html("<b>Water|"+ waterReuslt.Value +"%</b>");
            });
            waterUse()
        }
    });
});

$('#foodAlarmSubmit').on('click', function(){
    let foodAlarmPercentage = $('#foodAlarm').val();
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=FoodAlarm&value="+ foodAlarmPercentage,
    });
    FoodAlarmStart = true;
});

$('#waterAlarmSubmit').on('click', function(){
    let waterAlarmPercentage = $('#waterAlarm').val();
    $.ajax({
        url: 'https://simplecoop.swollenhippo.com/settings.php',
        type: 'PUT',
        data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=WaterAlarm&value="+ waterAlarmPercentage,
    });
    WaterAlarmStart = true;
});

//egg controls
$('#eggCountSubmit').on('click', function(){
    let eggCount = $('#eggCountInput').val();
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"TotalEggs"}, function(eggResult){
        eggCount = (eggResult.Value*1) + (eggCount*1);
        $('#eggCountInput').val(0);
        $("#eggCountTotal").html("<b>Eggs|"+ eggCount +"</b>");
        $("#homepageEggCount").html("<b>Eggs|"+ eggCount +"</b>");
        $.ajax({
            url: 'https://simplecoop.swollenhippo.com/settings.php',
            type: 'PUT',
            data: "SessionID="+ sessionStorage.getItem("SessionID") +"&setting=TotalEggs&value="+ eggCount,
        });
    });
});