function validateEmail(strEmail){
    if(strEmail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return true;
    }
    return false;
};

$('#btnLogin').on('click', function () {
    let strUsername = $('#txtUsername').val().trim();
    let strPassword = $('#txtPassword').val();
    let blnError = false;
    let strErrorMessage = '';
    
    if (strUsername == '') {
        blnError = true; 
        strErrorMessage += "<h5>Email can't be blank.</h5>";
    }else if(!validateEmail(strUsername)){
        blnError = true;
        strErrorMessage += "<h5>Email is invalid.</h5>";
    }

    if (strPassword == '') {
        blnError = true;
        strErrorMessage += "<h5>Password can't be blank.</h5>";
    }

    if (blnError == true) {
        Swal.fire({
            icon: 'error',
            title: 'Empty Fields',
            html: strErrorMessage,
        });
    } else {
        $('#registerCard').slideUp();
        $('#loginCard').slideUp();
    }
});

$('#btnRegister').on('click', function () {
    let strEmail = $('#txtEmail').val().trim();
    let strRegisterPassword = $('#txtRegisterPassword').val();
    let strFirstName = $('#txtFirstName').val();
    let strLastName = $('#txtLastName').val();
    let strStreetAddress1 = $('#txtStreetAddress1').val();
    let strStreetAddress2 = $('#txtStreetAddress2').val();
    let strCity = $('#txtCity').val();
    let strState = $('#txtState').val();
    let strZipCode = $('#txtZipCode').val();
    let strPhoneNumber = $('#txtPhoneNumber').val();
    let strCoopRegistrationID = $('#txtCoopRegistrationID').val();

    let blnError = false;
    let strErrorMessage = '';

    if (strEmail == '') {
        blnError = true; 
        strErrorMessage += "<h5>Email can't be blank.</h5>";
    }else if(!validateEmail(strEmail)){
        blnError = true;
        strErrorMessage += "<h5>Email is invalid.</h5>";
    }
    if (strRegisterPassword == '') {
        blnError = true;
        strErrorMessage += "<h5>Password can't be blank.</h5>";
    }
    if (strFirstName == '') {
        blnError = true;
        strErrorMessage += "<h5>First Name can't be blank.</h5>";
    }
    if (strLastName == '') {
        blnError = true;
        strErrorMessage += "<h5>Last Name can't be blank.</h5>";
    }
    if (strStreetAddress1 == '') {
        blnError = true;
        strErrorMessage += "<h5>Street Address can't be blank.</h5>";
    }
    if (strCity == '') {
        blnError = true;
        strErrorMessage += "<h5>City can't be blank.</h5>";
    }
    if (strState == '') {
        blnError = true;
        strErrorMessage += "<h5>State can't be blank.</h5>";
    }
    if (strZipCode == '') {
        blnError = true;
        strErrorMessage += "<h5>Zip Code can't be blank.</h5>";
    }
    if (strPhoneNumber == '') {
        blnError = true;
        strErrorMessage += "<h5>Phone Number can't be blank.</h5>";
    }
    if (strCoopRegistrationID == '') {
        blnError = true;
        strErrorMessage += "<h5>Registration ID can't be blank.</h5>";
    }

    if (blnError == true) {
        Swal.fire({
            icon: 'error',
            title: 'Empty Fields',
            html: strErrorMessage,
        });
    } else {
        $.post('https://simplecoop.swollenhippo.com/users.php',{Email:strEmail,Password:strRegisterPassword,FirstName:strFirstName,LastName:strLastName,CoopID:strCoopRegistrationID},function(result){
            result = JSON.parse(result);
            if(result.Error){
                Swal.fire({
                    icon:'error',
                    html:result.Error
                })
            } else {
                $.post('https://simplecoop.swollenhippo.com/useradress.php',{Email:strEmail,Street1:strStreetAddress1,Street:strStreetAddress2,City:strCity,State:strState,ZIP:strZipCode},function(addressResult){
                    result = JSON.parse(addressResult);
                    if(addressResult.Error){
                        Swal.fire({
                            icon:'error',
                            html:addressResult.Error
                        })
                    } else {
                        $.post('https://simplecoop.swollenhippo.com/sessions.php',{Email:strEmail,Password:strRegisterPassword},function(sessionResult){
                            sessionResult = JSON.parse(sessionResult);
                            if(sessionResult.Error){
                                Swal.fire({
                                    icon:'danger',
                                    html:result.Error
                                }) 
                            } else {
                                sessionStorage.setItem("SessionID",sessionResult.SessionID);
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Registration Successful',
                                    showConfirmButton: false
                                });
                                setTimeout(function () {
                                    Swal.close()
                                    $('#registerCard').slideUp();
                                    $('#loginCard').slideUp();
                                }, 2000);
                            }
                        })
                    }
                })
            }
        })
    }
})