$('#btnToRegistration').on('click', function(){
    $.post('https://simplecoop.swollenhippo.com/coop.php',function(result){
        console.log(result);
    });
});
