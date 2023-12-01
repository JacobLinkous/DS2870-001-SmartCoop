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