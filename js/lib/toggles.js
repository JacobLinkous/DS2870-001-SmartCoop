$('#btnToRegistration').on('click', function () {
    $('#loginCard').slideUp();
    $('#registerCard').slideDown();
});

$('#btnCancel').on('click', function () {
    $('#loginCard').slideDown();
    $('#registerCard').slideUp();
});

function closeAll(){
    $('#homepage').slideUp();
    $('#lights').slideUp();
    $('#temperature').slideUp();
    $('#door').slideUp();
    $('#foodandwater').slideUp();
    $('#egg').slideUp();
};

$('#homepagebtn').on('click', function () {
    closeAll()
    $('#homepage').slideDown();
});

$('#lightsbtn').on('click', function () {
    closeAll();
    $('#lights').slideDown();
});

$('#tempbtn').on('click', function () {
    closeAll();
    $('#temperature').slideDown();
});

$('#doorbtn').on('click', function () {
    closeAll();
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