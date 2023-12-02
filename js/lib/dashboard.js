/*
for profile to get address
$.get('https://simplecoop.swollenhippo.com/coop.php?SessionID=5e88dbee-4e00-430d-b3f2-44f10d8c4777',function(result){
    console.log(result);
});
*/


function checkStatusHomePage(){
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Lights"}, function(lightsReuslt){
        $("#homepageLightsStatus").html("<b>"+lightsReuslt.Value+"</b>");
    });
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Fan"}, function(fanReuslt){
        $("#homepageFanStatus").html("<b>"+fanReuslt.Value+"</b>");
    });
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Heat"}, function(heatReuslt){
        $("#homepageHeatStatus").html("<b>"+heatReuslt.Value+"</b>");
    });
    $.getJSON('https://simplecoop.swollenhippo.com/settings.php', { SessionID:sessionStorage.getItem("SessionID"), setting:"Door"}, function(doorReuslt){
        $("#homepageDoorStatus").html("<b>"+doorReuslt.Value+"</b>");
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

$('#flexSwitchCheckChecked').on('click', function(){
    console.log($('#flexSwitchCheckChecked').value)
    if($('#flexSwitchCheckChecked').checked == true){
        $.ajax({
            url: 'https://simplecoop.swollenhippo.com/settings.php',
            type: 'PUT',
            data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Lights&value=On",
        });
    }else if($('#flexSwitchCheckChecked').checked == false){
        $.ajax({
            url: 'https://simplecoop.swollenhippo.com/settings.php',
            type: 'PUT',
            data: "SessionID="+sessionStorage.getItem("SessionID")+"&setting=Lights&value=Off",
        });
    }
});


