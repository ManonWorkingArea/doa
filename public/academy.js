console.log("JS V.2.0");

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.search);
    return (results !== null) ? results[1] || 0 : false;
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

var parser = new UAParser();
localStorage.setItem('__device', JSON.stringify(parser.getResult()));

var quizArray = [];
var ItemArray = [];
var progressStatus = false;

$('#frm-login').keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
if(keycode == '13'){
login() 
}
});

$('#frm-reset').keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
if(keycode == '13'){
resetPassword() 
}
});

renderProfile();

function __session(pagename) {
    var token       = Cookies.get('__session');
    var pathname    = window.location.pathname;
    var raw_page    = window.location.href;
    pathname        = pathname.replace("/", "");
    pathname        = pathname.replace(".html", "");

    console.log(pathname);

    if (token == undefined) {
        window.location.href="index.html";
        // Log User Login
        addLogs(token, raw_page, "access", "fail", pathname);
    } else {
        if(pathname!=pagename) {
            //window.location.href="student.html";
            addLogs(token, raw_page, "access", "fail", pathname);
        } else {
            addLogs(token, raw_page, "access", "success", pathname);
        }
    }
}

function __page(agenda){
    var course  = $.urlParam('session');
    var token   = Cookies.get('__session');
    var date    = new Date().getTime()/1000;
    console.log("Check Data Agenda : " + agenda + " | Course : " + course);
    if(!course){window.location.href="index.html";}else{
        $.ajax({
            url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/school/course/agenda/check?school=1&agenda='+agenda+'&course='+course+'&date='+date,
            type : "GET",
            dataType: "json",
            contentType : "text/plain",
            beforeSend: function(xhr) {
                $("body").append('<div id="processing_overlay">กำลังโหลดหน้า กรุณารอสักครู่...</div>');
            },
            success: function(result) {
                $("#processing_overlay").remove();

                if(token==="fXM74eSf0pyf6Pgb9ozE" || token==="dwdpmeUJ1cOg44gt2M0R" || token==="Gl2viJay5G8Lkw0gkrAg")
                {

                }
                else
                {
                    if(!result.agenda){window.location.href="student.html";}
                }
            },
            error: function(request,msg,error) {
            }
        });
    }
}

function login(){   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});

    var formData = $('#frm-login').serializeArray();
    formData = formData.reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);

    $.ajax({
        url: 'https://api.fti.academy/api/login',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            var studentArray = JSON.stringify(result);

            if (result.isStudent=="no") {
                window.location.href="permission.php";
            }
            else
            {
                Cookies.set('__session', result.token, {expires:1})
                Cookies.set('__student', studentArray, {expires:1})
                // Clear Data
                localStorage.removeItem("__topic");
                localStorage.removeItem("__course");

                var student = Cookies.get('__student');
                var student = JSON.parse(student);

                Cookies.set('__exam', student.exam_round, {expires:1});
                Cookies.set('__area', student.cert_area, {expires:1});
                
                // Clear Answer
                localStorage.removeItem("__exam");
                localStorage.removeItem("__question");
                localStorage.removeItem("__access");

                // Log User Login
                addLogs(result.token, "login", "login", "success","");

                window.location.href="student.html";
            }
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                login();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else if(request.status===500){
                login();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function login_register(){   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});

    var formData = $('#frm-login').serializeArray();
    formData = formData.reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);

    $.ajax({
        url: 'https://api.fti.academy/api/login',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            var studentArray = JSON.stringify(result);

            if (result.isStudent=="no") {
                window.location.href="permission.php";
            }
            else
            {
                Cookies.set('__session', result.token, {expires:1})
                Cookies.set('__student', studentArray, {expires:1})
                // Clear Data
                localStorage.removeItem("__topic");
                localStorage.removeItem("__course");

                var student = Cookies.get('__student');
                var student = JSON.parse(student);

                Cookies.set('__exam', student.exam_round, {expires:1});
                Cookies.set('__area', student.cert_area, {expires:1});
                
                // Clear Answer
                localStorage.removeItem("__exam");
                localStorage.removeItem("__question");
                localStorage.removeItem("__access");

                window.location.href="external.html?session=219&target=register&document=register_special";
            }
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                login();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else if(request.status===500){
                login();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function getLogin()
{
    var username  = $("#username").val();
    var password  = $("#password").val();
    window.location.href="login.html?username=" + username + "&password=" + password;
}

function renderLogin()
{
    var username    = $.urlParam('username');
    var password    = $.urlParam('password');

    if(!username&&!password)
    {
        console.log("Default Login");
    }
    else
    {
        console.log("Register Login");
        $("#password").val(password);
        $("#username").val(username);
        login();
    }
}

function register(){   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});

    var formData = $('#frm-register').serializeArray();
    formData = formData.reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);

    $.ajax({
        url: 'https://api.fti.academy/api/register',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $(".alert-block").html("");
            $.isLoading( "hide" );
            // handle success
            output = JSON.stringify(result)

            if(result.status==="true")
            {
                window.location.href="register_confirm.html?token=" + result.token;
            }
            else if(result.status==="false")
            {
                $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + result.return + "</div>");
                // $('html, body').animate({
                //     scrollTop: $("#frm-register").offset().top
                // }, 2000);
            }
        
            //
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                login();
                errorMSG = "กำลังบันทึกข้อมูล";
            }
            else if(request.status===500){
                login();
                errorMSG = "กำลังบันทึกข้อมูล";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function renderRegisterConfirm(token) {
    $.ajax({
        url: 'https://api.fti.academy/api/register_confirm/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {

            if(result.status ==="true")
            {
                $("#bill_area").show();
                $(".username").html(result.profile.username);
                $(".password").html(result.profile.password);
                $("#payment_url").val(result.payment);
                $("#username").val(result.profile.username);
                $("#password").val(result.profile.password);
            }
            else
            {
                $("#register_area").show();
            }
        },
        error: function(request,msg,error) {
            
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
                renderRegisterConfirm(token);
            }
            else if(request.status===500){
                renderRegisterConfirm(token);
            }
            else{
                errorMSG = request.responseJSON;
            }
        }
    });
}

function renderOrderConfirm(token) {
    $.ajax({
        url: 'https://api.fti.academy/api/order_confirm/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            if(result.status ==="true")
            {
                $("#bill_area").show();
                $("#payment_url").val(result.payment);
            }
        },
        error: function(request,msg,error) {
            
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
                renderRegisterConfirm(token);
            }
            else if(request.status===500){
                renderRegisterConfirm(token);
            }
            else{
                errorMSG = request.responseJSON;
            }
        }
    });
}


function renderRegisterOld(token) {
    $.ajax({
        url: 'https://api.fti.academy/api/register_old/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            $(".username").html(result.profile.username);
            $(".password").html(result.profile.password);
            $("#payment_url").val(result.payment);
        },
        error: function(request,msg,error) {
            
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
                renderRegisterConfirm(token);
            }
            else if(request.status===500){
                renderRegisterConfirm(token);
            }
            else{
                errorMSG = request.responseJSON;
            }
        }
    });
}

function openPaymentURL(uid)
{
    var url = $("#payment_url_" + uid).val();
    window.open(url, '_blank');
}

function login_token(){   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});

    var formData = $('#frm-login').serializeArray();
    formData = formData.reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);

    $.ajax(
    {
        url: 'https://api.fti.academy/api/login_token',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            var studentArray = JSON.stringify(result);
            //console.log(result.isStudent);
            if (result.isStudent=="no") {
                window.location.href="permission.html";
            } else{
                Cookies.set('__session', result.token, {expires:1})
                Cookies.set('__student', studentArray, {expires:1})
                // Clear Data
                localStorage.removeItem("__topic");
                localStorage.removeItem("__course");
                // Clear Exam Data Session
                localStorage.removeItem("__exam");
                // Clear Answer
                localStorage.removeItem("__question");
                localStorage.removeItem("__access");
                window.location.href="student.html";
            }
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
                login_token();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else if(request.status===500){
                login_token();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function notification() {
    var token   = Cookies.get('__session');
    $("#notification-area").html("<div class='text-center'></br>กำลังโหลดข้อมูลผลคะแนนของคุณ กรุณารอสักครู่ ...</br></br></div>");
    $.ajax({
        url: 'https://api.fti.academy/api/getNotification/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {

            $("#notification-area").html("");
            $.each(result.notification, function(key, val){
                console.log(key);
                console.log(val.message);
                $("#notification-area").append(
                "<div class='col-md-12 mt-2 pt-2 pt-sm-0'>"
                    +"<div class='d-flex bg-" + val.type + " key-feature align-items-center p-3 rounded shadow mt-4'>"
                        +"<i class='" + val.icon + " me-1 dashboard-icon text-white'></i>"
                        +"<div class='flex-1 content ms-3'>"
                            +"<h4 class='title mb-0 text-white'>" + val.title + "</h4>"
                            +"<span class='mb-0 text-white'><span class='score-number'>" + val.score + "</span> </br>" + val.message + "</span>"
                        +"</div>"
                    +"</div>"
                +"</div>"
                );
            });

        },
        error: function(request,msg,error) {
            
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
                notification();
            }
            else if(request.status===500){
                notification();
            }
            else{
                errorMSG = request.responseJSON;
            }
        }
    });
}

function editprofile() {   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    var formData = $('#frm-edit').serializeArray();
    formData = formData.reduce(function(obj, item){
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);

    $.ajax({
        url: 'https://api.fti.academy/api/editprofile',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            var studentArray = JSON.stringify(result.student);
            Cookies.set('__student', studentArray, {expires:1})
            window.location.href="student.html";
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                editprofile();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else if(request.status===500){
                editprofile();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function editbilling() {   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    var formData = $('#frm-edit').serializeArray();
    formData = formData.reduce(function(obj, item){
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);

    $.ajax({
        url: 'https://api.fti.academy/api/editbilling_firebase',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            //window.location.href="student.html";
            //location.reload();
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                editbilling();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else if(request.status===500){
                editbilling();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function editCertArea() {   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    var formData = $('#frm-edit').serializeArray();
    formData = formData.reduce(function(obj, item){
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);

    $.ajax({
        url: 'https://api.fti.academy/api/editcert',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            var studentArray = JSON.stringify(result.student);
            Cookies.set('__student', studentArray, {expires:1})
            //updateFirebaseUser();
            window.location.href="student.html";
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                editprofile();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else if(request.status===500){
                editprofile();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function editExamRound() {   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    var formData = $('#frm-edit').serializeArray();
    formData = formData.reduce(function(obj, item){
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);

    $.ajax({
        url: 'https://api.fti.academy/api/editround',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            var studentArray = JSON.stringify(result.student);
            Cookies.set('__student', studentArray, {expires:1})
            //updateFirebaseUser();
            window.location.href="student.html";
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                editprofile();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else if(request.status===500){
                editprofile();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function submitApproveImage(){   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    var formData = $('#frm-edit').serializeArray();
    formData = formData.reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);
    $.ajax({
        url: 'https://api.fti.academy/api/submit_approve',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            var studentArray = JSON.stringify(result.student);
            Cookies.set('__student', studentArray, {expires:1})
            window.location.href="device.php";
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                editprofile();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else if(request.status===500){
                editprofile();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function editExamPeriod() {   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    var formData = $('#frm-edit').serializeArray();
    formData = formData.reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);
    $.ajax({
        url: 'https://api.fti.academy/api/editexam',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            var studentArray = JSON.stringify(result.student);
            Cookies.set('__student', studentArray, {expires:1})
            window.location.href="student.php";
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                editExamPeriod();
                errorMSG = "กำลังพยายามบันทึกข้อมูลของคุณ";
            }
            else if(request.status===500){
                editExamPeriod();
                errorMSG = "กำลังพยายามบันทึกข้อมูลของคุณ";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function changePassword(){   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    var formData = $('#frm-password').serializeArray();
    formData = formData.reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);

    $.ajax({
        url: 'https://api.fti.academy/api/editpassword',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            output = JSON.stringify(result)
            $(".alert-block").html(output);
            $.isLoading( "hide" );

            setTimeout(function(){
                logout();
            },1000); 
            
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                changePassword();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else if(request.status===500){
                changePassword();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function resetPassword() {   
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    var formData = $('#frm-reset').serializeArray();
    formData = formData.reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    formData = JSON.stringify(formData);
    $.ajax({
        url: 'https://api.fti.academy/api/reset_password',
        type : "POST",
        data: formData,
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            window.location.href="reset_confirm.php";
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                reset();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else if(request.status===500){
                reset();
                errorMSG = "กำลังเข้าระบบอีกครั้ง";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function logout() {
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    Cookies.remove('__session');
    Cookies.remove('__student');

    Cookies.remove('__exam');
    Cookies.remove('__area');

    localStorage.clear();
    $.isLoading( "hide" );
    window.location.href="index.html";
}

function reloadContent(){
    resetData();
}

function resetData(){
    var token   = Cookies.get('__session');
    renderCourseContent();
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://api.fti.academy/api/getcourseall/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            // handle success
            var courseArray     = JSON.stringify(result.course);
            var topicArray      = JSON.stringify(result.topic);
            localStorage.setItem('__course', courseArray);
            //console.log("__course ajax: " + localStorage.getItem('__course')); //just use the err here 
            var topicContent = [];
            $.each(JSON.parse(topicArray), function (key, item){
                //console.log(key + ":" + item.name);
                topicContent.push({'tid': item.tid,'name': item.name,'next': item.next,'code': item.code,'tip': item.tip,'time': item.time,'current': item.current,'percent': item.percent,'percent_gui': item.percent_gui,'url':item.url,'icon':item.icon,'icon_percent':item.icon_percent,'typeicon':item.typeicon,'type':item.type,'status':item.status,'total': item.total,'count': item.count,'used': item.used});
            });
            localStorage.setItem('__topic', JSON.stringify(topicContent));
            $.isLoading( "hide" );
            // Clear Exam Data Session
            var exam      = localStorage.getItem('__exam');
            var exam      = JSON.parse(exam);
            var exam      = exam.token;
            var answer    = localStorage.getItem('__answer_' + exam);
            var answer    = JSON.parse(answer);
            localStorage.removeItem("__exam");
            localStorage.removeItem('__answer_' + exam);
            // Clear Answer
            localStorage.removeItem("__question");
            localStorage.removeItem("__access");
            window.location.href="course.php";
        },
        error: function(request,msg,error) {
            //g("Error: " + error); //just use the err here
            //console.log("Error: " + error); //just use the err here
            // Login undefined
            if(request.status===0){
                resetData();
            }else if(request.status===500){
                resetData();
            }else{
            }
        }
    });
}

function renderCourseContent(datatype) {
    var token   = Cookies.get('__session');
    var course  = localStorage.getItem('__course');
    if (course == undefined){
        $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
        $.ajax({
            url: 'https://api.fti.academy/api/getcourseall/' + token,
            type : "GET",
            dataType: "json",
            contentType : "text/plain",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
                xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
            },
            success: function(result) {
                // handle success
                var courseArray     = JSON.stringify(result.course);
                var topicArray      = JSON.stringify(result.topic);

                localStorage.setItem('__course', courseArray);

                //g("__course ajax: " + localStorage.getItem('__course')); //just use the err here 
                
                var topicContent = [];

                $.each(JSON.parse(topicArray), function (key, item) 
                {
                    //console.log(key + ":" + item.name);
                    topicContent.push({'tid': item.tid,'name': item.name,'next': item.next,'code': item.code,'tip': item.tip,'time': item.time,'current': item.current,'percent': item.percent,'percent_gui': item.percent_gui,'url':item.url,'icon':item.icon,'icon_percent':item.icon_percent,'typeicon':item.typeicon,'type':item.type,'status':item.status,'total': item.total,'count': item.count,'used': item.used});
                });

                localStorage.setItem('__topic', JSON.stringify(topicContent));
                $.isLoading( "hide" );
                renderTopic(datatype);
            },
            error: function(request,msg,error) {
                
                output = JSON.stringify(request.responseJSON)
                // Login undefined
                if(request.status===0){
                    location.reload();
                }
                else if(request.status===500){
                    location.reload();
                }
                else{
                    errorMSG = request.responseJSON;
                }
            }
        });
    }else{
        //console.log("__course session: " + course); //just use the err here 
        renderTopic(datatype);
    }
}

function renderCourseContentAll(datatype){
    var token   = Cookies.get('__session');
    var course  = localStorage.getItem('__course');
    if (course == undefined){
        $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
        $.ajax({
            url: 'https://api.fti.academy/api/getcourseall/' + token,
            type : "GET",
            dataType: "json",
            contentType : "text/plain",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
                xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
            },
            success: function(result) {
                // handle success
                var courseArray     = JSON.stringify(result.course);
                var topicArray      = JSON.stringify(result.topic);

                localStorage.setItem('__course', courseArray);

                //g("__course ajax: " + localStorage.getItem('__course')); //just use the err here 
                
                var topicContent = [];

                $.each(JSON.parse(topicArray), function (key, item) 
                {
                    //console.log(key + ":" + item.name);
                    topicContent.push({'tid': item.tid,'name': item.name,'next': item.next,'code': item.code,'tip': item.tip,'time': item.time,'current': item.current,'percent': item.percent,'percent_gui': item.percent_gui,'url':item.url,'icon':item.icon,'icon_percent':item.icon_percent,'typeicon':item.typeicon,'type':item.type,'status':item.status,'total': item.total,'count': item.count,'used': item.used});
                });

                localStorage.setItem('__topic', JSON.stringify(topicContent));
                $.isLoading( "hide" );
                renderTopic(datatype);
            },
            error: function(request,msg,error) {
                
                output = JSON.stringify(request.responseJSON)
                // Login undefined
                if(request.status===0){
                    location.reload();
                }
                else if(request.status===500){
                    location.reload();
                }
                else{
                    errorMSG = request.responseJSON;
                }
            }
        });
    }else{
        //console.log("__course session: " + course); //just use the err here 
        renderTopic(datatype);
    }
}


function renderTopic(type){
    var course = localStorage.getItem('__course');
    var course = JSON.parse(course);
    var topic = localStorage.getItem('__topic');
    var topic = JSON.parse(topic);
    $(".lesson-name").html(course.name);
    $(".lesson-detail").html(course.detail);
    $(".lesson-day").html(course.day + " วัน");
    $(".lesson-time").html(course.time + " ชม.");
    $(".lesson-poster").attr("src",course.poster);
    $(".progress-bar").css('width', course.topic_play_percent + '%');
    $(".progress-value").text(course.topic_play_percent + "%");
    //console.log("Percent" + course.topic_play_percent);
    $("#topic-table").html("");
    $.each(topic, function (key, item){
        if(item.type=="exam" || item.type=="content"){
            $("#topic-table").append(
            "<tr class='topic-" + item.status + "' id='" + item.code + "'>"
                +"<th class='p-3'>"
                    +"<div class='align-items-center'>"
                        +"<i class='" + item.typeicon + " h6'></i>"
                        +"<p class='mb-0 d-inline fw-normal h6 ms-1'><a href='" + item.url + "' class='' title='" + item.tip + "' data-bs-toggle='tooltip' data-bs-placement='top'>" + item.name + "</a></p>"
                        +"<p class='mb-0 d-inline fw-normal'>" + item.current + "</p>"
                        +"<p class='mb-0 d-inline fw-normal'>" + item.percent_gui + "</p>"
                    +"</div>"
                +"</th>"
                +"<td class='p-3 text-end'><i class='" + item.icon + "'></i> <span class='icon_percent'>" + item.icon_percent + "</span></td>"
            +"</tr>"
            )
        }
    });

    $("#topic-table").prepend(
        "<tr class='topic-" + course.exam_before_status + "'>"
        +"<th class='p-3'>"
            +"<div class='align-items-center'>"
                +"<i class='uil uil-notes h6'></i>"
                +"<p class='mb-0 d-inline fw-normal h6 ms-1'><a href='" + course.exam_before_url + "' class=''>" + course.exam_before.name + "</br>" + course.exam_before_text +  "</a></p>"
            +"</div>"
        +"</th>"
        +"<td class='p-3 text-end'><i class='" + course.exam_before_icon + "'></i></td>"
    +"</tr>"
    );
    // Render course percent
    //renderCoursePercent();
}
function renderCoursePercent()
{
    var token  = Cookies.get('__session');
    $.ajax({
        url: 'https://api.fti.academy/api/get_course_percent/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr){
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result){
            var courseArray = localStorage.getItem('__course');
            var courseArray = JSON.parse(courseArray);
            var currentData = courseArray;
            // -----------------------------------------------------------------
            courseArray.topic_play_percent  = result.course.topic_play_percent;
            courseArray.total_topic_percent = result.course.total_topic_percent;
            courseArray.usage_topic_percent = result.course.usage_topic_percent;
            //("currentData.name : " + currentData.name);
            // -----------------------------------------------------------------
            courseArray.day                 = currentData.day;
            courseArray.detail              = currentData.detail;
            courseArray.enroll              = currentData.enroll;
            courseArray.exam_after          = currentData.exam_after;
            courseArray.exam_after_icon     = currentData.exam_after_icon;
            courseArray.exam_after_score    = currentData.exam_after_score;
            courseArray.exam_after_status   = currentData.exam_after_status;
            courseArray.exam_after_text     = currentData.exam_after_text;
            courseArray.exam_after_url      = currentData.exam_after_url;
            courseArray.exam_before         = currentData.exam_before;
            courseArray.exam_before_icon    = currentData.exam_before_icon;
            courseArray.exam_before_score   = currentData.exam_before_score;
            courseArray.exam_before_status  = currentData.exam_before_status;
            courseArray.exam_before_text    = currentData.exam_before_text;
            courseArray.exam_before_url     = currentData.exam_before_url;
            courseArray.name                = currentData.name;
            courseArray.pms_all             = currentData.pms_all;
            courseArray.pms_current         = currentData.pms_current;
            courseArray.pms_percent         = currentData.pms_percent;
            courseArray.poster              = currentData.poster;
            courseArray.status              = currentData.status;
            courseArray.time                = currentData.time;
            courseArray.timer               = currentData.timer;
            courseArray.topic_play_percent  = currentData.topic_play_percent;
            courseArray.total_play_time     = currentData.total_play_time;
            courseArray.total_topic_percent = currentData.total_topic_percent;
            courseArray.usage_topic_percent = currentData.usage_topic_percent;
            // -----------------------------------------------------------------
            // Save Array
            localStorage.setItem('__course', JSON.stringify(courseArray));
        },
        error: function(request,msg,error) {
            if(request.status===0){
                renderCoursePercent();
            }else if(request.status===500){
                renderCoursePercent();
            }
        }
    });
}

function renderNext()
{
    /*
    var next  = Cookies.get('__next');
    var play  = Cookies.get('__play');

    var topic = localStorage.getItem('__topic');
    var topic = JSON.parse(topic);

    // Update Play Item
    playIndex = topic.findIndex((obj => obj.code == play));

    if(topic[playIndex].status == "active")
    {
        topic[playIndex].icon    = "uil uil-check-circle";
        topic[playIndex].status  = "complete";
        topic[playIndex].tip     = "เรียนจบแล้ว";
        // Save Array
        localStorage.setItem('__topic', JSON.stringify(topic));
    }

    // Update Next Item
    nextIndex = topic.findIndex((obj => obj.code == next));

    if(topic[nextIndex].status == "pending")
    {
        topic[nextIndex].icon    = "uil uil-play";
        topic[nextIndex].status  = "active";
        topic[nextIndex].tip     = "กำลังเรียน";
        topic[nextIndex].url     = "play.php?token=" + topic[nextIndex].code;
        // Save Array
        localStorage.setItem('__topic', JSON.stringify(topic));
    }

    //console.log("Next = " + next + " Index = " + nextIndex);
    */
    resetData();
    renderCourseContent();
}

function renderPlayer(){

    /*
    var code    = $.urlParam('token');
    //console.log("GET param = " + code);
    var course  = localStorage.getItem('__course');
    var course  = JSON.parse(course);
    var topic   = localStorage.getItem('__topic');
    var topic   = JSON.parse(topic);

    $(".lesson-name").html(course.name);
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    $.each(topic, function (key, item){
        if(item.code==code){
            $(".topic-name").html(item.name);
            $(".player_progress").html(item.percent);
            Cookies.set('__next', item.next, {expires:1})
            Cookies.set('__play', item.code, {expires:1})
            Cookies.set('__topic', item.tid, {expires:1})
        }
        
        if(item.type=="exam" || item.type=="content"){
            $("#topic-table").append(
            "<tr class='topic-" + item.status + "' id='" + item.code + "'>"
                +"<th class='p-3'>"
                    +"<div class='align-items-center'>"
                        +"<i class='" + item.typeicon + " h6'></i>"
                        +"<p class='mb-0 d-inline fw-normal h6 ms-1'><a href='" + item.url + "' class='' title='" + item.tip + "' data-bs-toggle='tooltip' data-bs-placement='top'>" + item.name + "</a></p>"
                        +"<p class='mb-0 d-inline fw-normal player-current-area'>" + item.current + "</p>"
                        +"<p class='mb-0 d-inline fw-normal player-percent-area'>" + item.percent_gui + "</p>"
                    +"</div>"
                +"</th>"
                +"<td class='p-3 text-end'><i class='" + item.icon + "'></i> <span class='icon_percent'>" + item.icon_percent + "</span></td>"
            +"</tr>"
            )
        }
    });
    //renderCoursePercent();
    renderCurrent()
    $.isLoading( "hide" );

    */
}

function renderCurrent(){
    var play        = Cookies.get('__play');
    var topic_play  = Cookies.get('__topic');
    var topic       = localStorage.getItem('__topic');
    var topic       = JSON.parse(topic);
    var student     = Cookies.get('__student');
    var student     = JSON.parse(student);
    /*
    var ref         = firebase.database().ref('data/'+ student.permission.student_id +'/player/');
    var query       = ref.orderByChild('topic').equalTo(topic_play);
    query.once('value', function(snapshot){
        if (!snapshot.exists()){
        //console.log("NO");
        var token   = Cookies.get('__session');
        $.ajax(
        {
            url: 'https://player.fti.academy/api/genPlayer/' + topic_play,
            type : "GET",
            dataType: "json",
            contentType : "text/plain",
            success: function(result) {

                var player = {};
                player['sid'] = student.permission.student_id;
                player['token'] = result.pid;
                player['lesson'] = result.lesson;
                player['course'] = result.course;
                player['topic'] = result.topic;
                player['total'] = result.total;
                player['timer'] = result.timer;
                player['current'] = result.current;
                player['date_create'] = Date.now();
                player['countdown'] = result.countdown;
                player['counter'] = result.counter;
                player['percent'] = result.percent;

                addPlayer(player);

            },
            error: function(request,msg,error) {
            }
        });
        }else{
            //console.log("YES");
        }
    });

    */
    // Active Current Item
    $("#" + play).addClass("topic-play");
    // Update Play Item
    playIndex = topic.findIndex((obj => obj.code == play));
    if(topic[playIndex].status == "pending"){
        topic[playIndex].icon    = "uil uil-play";
        topic[playIndex].status  = "active";
        topic[playIndex].tip     = "กำลังเรียน";
        localStorage.setItem('__topic', JSON.stringify(topic));
    }
}

function getProfile(){   
    var token   = Cookies.get('__session');
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});

    $.ajax({
        url: 'https://api.fti.academy/api/getprofile/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            var studentArray = JSON.stringify(result.student);
            Cookies.set('__student', studentArray, {expires:1})
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                getProfile();
                errorMSG = "กำลังพยายามดึงข้อมูลของคุณ";
            }
            else if(request.status===500){
                getProfile();
                errorMSG = "กำลังพยายามดึงข้อมูลของคุณ";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}


function getProfileRepeat(){   
    var token   = Cookies.get('__session');
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});

    $.ajax({
        url: 'https://api.fti.academy/api/getprofilerepeat/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );

            var token   = Cookies.get('__session');
            $('#student').val(token);
            $('#citizen').val(result.student.citizen);
            $('#phone').val(result.student.phone);
            $('#email').val(result.student.email);

            $('#firstname').val(result.student.firstname);
            $('#lastname').val(result.student.lastname);

            $('#prefix').val(result.student.prefix);
            $('#education').val(result.student.education);
            $('#experience').val(result.student.experience);

            $('input[name=birthday]').val(result.student.birthday);

            $("input[name=area_cert][value=" + result.student.cert_area + "]").attr('checked', 'checked');
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                //getProfileRepeat();
                errorMSG = "กำลังพยายามดึงข้อมูลของคุณ";
            }
            else if(request.status===500){
                //getProfileRepeat();
                errorMSG = "กำลังพยายามดึงข้อมูลของคุณ";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function nextCert()
{
    var next = $('#nextBTN').attr('data-next');

    console.log(next);
    window.location.href="certification_admin.php?token=" + next;
}

function prevCert()
{
    var prev = $('#prevBTN').attr('data-prev');
    console.log(prev);
    window.location.href="certification_admin.php?token=" + prev;
}
/*
function getCertification(){   

    var token       = $.urlParam('token');
    var session     = $.urlParam('session');
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});

    $.ajax({
        url: 'https://api.fti.academy/api/getcertification/' + token  + "/" + session,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            $('.student_name').text(result.certification.name);
            $('.cert_date').text(result.certification.cert_date);
            $('.cert_expire').text(result.certification.cert_expire);
            $(".student_profile").attr("src",result.certification.profile);
            $(".cert-number").text(result.certification.cert_id);
            $(".certdata").html("65/01/" + result.certification.cert_id );
            $(".certcode").html(token);
            $("#gqrcode").attr("src","https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=https://doasrv.fti.academy/certification.html?token=" + token + "&session=" + session);
            $('#nextBTN').attr('data-next',result.certification.cert_nav.NextToken); //setter
            $('#prevBTN').attr('data-prev',result.certification.cert_nav.PrevToken); //setter
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                getCerification();
                errorMSG = "กำลังพยายามดึงข้อมูลของคุณ";
            }
            else if(request.status===500){
                getCerification();
                errorMSG = "กำลังพยายามดึงข้อมูลของคุณ";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

*/
function renderProfile(){
    var student = Cookies.get('__student');
    var exam    = Cookies.get('__exam');
    var area    = Cookies.get('__area');
    
    if (student == undefined)
    {
        $('#user-nav').hide();
        $('#guest-nav').show();

        $('.user-block').hide();
        $('.guest-block').show();

        $(".user-block").css("display", "none");
        $(".guest-block").css("display", "block");
    }
    else
    {
        $('#user-nav').show();
        $('#guest-nav').hide();

        $('.user-block').show();
        $('.guest-block').hide();

        $(".guest-block").css("display", "none");
        $(".user-block").css("display", "block");

        var student = JSON.parse(student);

        $('.student-name').text(student.name);
        $('.student-email').text(student.email);
        $('.student-phone').text(student.phone);
        $('.exam_round').text(student.exam_round);
        $('.exam_round_date').text(student.exam_round_date);
        $('.cert_area').text(student.cert_area);
        $(".student-avatar").attr("src",student.avatar);
        $("#approve-preview").attr("src",student.approve);
        $(".avatar-btn").attr("src",student.avatar);
        $(".student-regdate").text(student.regdate);

        $(".exam_name").text(student.exam_round);
        $(".area_name").text(student.cert_area);

        //--- Student Notification

        //notification();
        $("img").bind("error", function (e) {
        var $this = $(this);
        $(this).attr("src","https://burgmaier.com/wp-content/uploads/2021/05/Musterbild-Mann.jpg");
        });
    }
}

function renderRepeatRegisterStudent(){
    getProfileRepeat();
}

function renderEditProfile(){
    var student = Cookies.get('__student');
    var student = JSON.parse(student);
    $('#firstname').val(student.firstname);
    $('#lastname').val(student.lastname);
    $('#email').val(student.email);
    $('#phone').val(student.phone);
    $('#citizen').val(student.citizen);
    $('#perfix').val(student.perfix);
    $("#avatar-preview").attr("src",student.avatar);
    $("#idcard-preview").attr("src",student.idcard);
}

function renderEditPassword(){
    var student = Cookies.get('__student');
    var student = JSON.parse(student);
    $('#username').val(student.email);
}

function renderEditExam(){
    var student = Cookies.get('__student');
    var student = JSON.parse(student);
    console.log(student.exam_round_data);
    $("input[name=exam_round][value='" + student.exam_round_data + "']").prop("checked",true);
}

function renderEditArea(){
    var student = Cookies.get('__student');
    var student = JSON.parse(student);
    console.log(student.cert_area_data);
    $("input[name=area_cert][value='" + student.cert_area_data + "']").prop("checked",true);
}

function renderExam(){
    var code    = $.urlParam('token');
    var token   = Cookies.get('__session');
    var access  = localStorage.getItem('__access');
    var access  = JSON.parse(access);
    var device  = localStorage.getItem('__device');
    //var device  = JSON.parse(device);
    var str     = b64EncodeUnicode(device);
    if (access == undefined){
        $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
        $.ajax({
            url: 'https://api.fti.academy/api/getaccess/' + code + "/" + token + "/" + str,
            type : "GET",
            dataType: "json",
            contentType : "text/plain",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
                xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
            },
            success: function(result) {
                //Question
                var accessArray     = JSON.stringify(result.access);
                localStorage.setItem('__access', accessArray);

                //console.log("__question ajax: " + localStorage.getItem('__question')); //just use the err here
                var access          = localStorage.getItem('__access');
                var access          = JSON.parse(access);
                /*
                var exam = {};
                exam['sid']         = access.student_id;
                exam['checkin']     = access.access_checkin;
                exam['checkout']    = access.access_checkout;
                exam['contest']     = access.contest_id;
                exam['status']      = access.access_status;
                exam['mode']        = access.access_mode;
                checkExam(exam);

                */

                //console.log("renderExam");
                if(result.status==="denied")
                {
                    window.location.href = "exam_wait.php";
                }
                else
                {
                    renderExamContent()
                }
            },
            error: function(request,msg,error) {
                //console.log("Error: " + error); //just use the err here
                output = JSON.stringify(request.responseJSON)
                // Login undefined
                if(request.status===0){
                    renderExam();
                }
                else if(request.status===500){
                    renderExam();
                }
                else{
                    errorMSG = request.responseJSON;
                }
            }
        });
    }else{
        if(access.access_status==="denied"){
            window.location.href="exam_wait.php";
        }else{
            renderExamContent()
        }
    }
}

function checkAccess(){
    var access    = localStorage.getItem('__access');
    var access    = JSON.parse(access);
    var a         = moment(access.access_checkin);
    var b         = moment().utc();
    var d         = a.diff(b,'seconds');
    if (d > 0){
        window.location.href="course.php";
    } else if (d < 0){
        if(access.access_status==="denied"){
            console.log("Close");
            window.location.href="course.php";
        }else{
            console.log("Open");
            window.location.href="exam_final.php?token=kJVNdUpeEVYBeZt3tgcuQqgzwsm771";
        }
    }
}

function renderScoreSession(){   
    var token   = Cookies.get('__session');
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://api.fti.academy/api/getprofile/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3"); 
        },
        success: function(result) {
            // handle success
            $.isLoading( "hide" );
            var studentArray = JSON.stringify(result.student);
            Cookies.set('__student', studentArray, {expires:1})

            window.location.href="exam_result.php";
        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            $(".alert-block").html("");
            //console.log("Error: " + error + " / " + JSON.stringify(request) + " / " + JSON.stringify(msg)); //just use the err here
            output = JSON.stringify(request.responseJSON)
            
            // Login undefined
            if(request.status===0){
                renderScoreSession();
                errorMSG = "กำลังพยายามดึงข้อมูลของคุณ";
            }
            else if(request.status===500){
                renderScoreSession();
                errorMSG = "กำลังพยายามดึงข้อมูลของคุณ";
            }
            else{
                errorMSG = request.responseJSON;
            }
            $(".alert-block").append("<div class='alert alert-danger' role='alert'>" + errorMSG + "</div>");
        }
    });
}

function renderAccess(){
    var code    = $.urlParam('token');
    var token   = Cookies.get('__session');
    var device  = localStorage.getItem('__device');
    //var device  = JSON.parse(device);
    var str     = b64EncodeUnicode(device);
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://api.fti.academy/api/getaccess/' + code + "/" + token + "/" + str,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            //Question
            var accessArray     = JSON.stringify(result.access);
            localStorage.setItem('__access', accessArray);

            var redirect    = result.access.access_callback
            var code        = $.urlParam('token');
            var token       = Cookies.get('__session');
            var question    = localStorage.getItem('__question');
            var question    = JSON.parse(question);
            $.each(question, function (key, contest){
                localStorage.removeItem(contest.id);
            });
            // Clear Exam Data Session
            var exam      = localStorage.getItem('__exam');
            var exam      = JSON.parse(exam);
            var exam      = exam.token;
            var answer    = localStorage.getItem('__answer_' + exam);
            var answer    = JSON.parse(answer);
            localStorage.removeItem("__exam");
            localStorage.removeItem('__answer_' + exam);
            // Clear Answer
            localStorage.removeItem("__question");
            localStorage.removeItem("__access");

            window.location.href=result.access.access_callback;
        },
        error: function(request,msg,error) {
            //console.log("Error: " + error); //just use the err here
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
                renderAccess() 
            }
            else if(request.status===500){
                renderAccess() 
            }
            else{
                renderAccess() 
            }
        }
    });
}

function renderAccessTemporary(){
    var code    = $.urlParam('token');
    var token   = Cookies.get('__session');
    var question    = localStorage.getItem('__question');
    var question    = JSON.parse(question);
    $.each(question, function (key, contest){
        localStorage.removeItem(contest.id);
    });

    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    // Clear Exam Data Session
    var exam      = localStorage.getItem('__exam');
    var exam      = JSON.parse(exam);
    var exam      = exam.token;
    var answer    = localStorage.getItem('__answer_' + exam);
    var answer    = JSON.parse(answer);
    localStorage.removeItem("__exam");
    localStorage.removeItem('__answer_' + exam);
    // Clear Answer
    localStorage.removeItem("__question");
    localStorage.removeItem("__access");
    window.location.href="course.php";
}

function renderExamContent(){
    var code    = $.urlParam('token');
    var token   = Cookies.get('__session');
    var exam    = localStorage.getItem('__exam');
    var access  = localStorage.getItem('__access');
    var access  = JSON.parse(access);

    if (exam == undefined){
        $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
        $.ajax({
            url: 'https://api.fti.academy/api/getexam/' + code + "/" + token,
            type : "GET",
            dataType: "json",
            contentType : "text/plain",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
                xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
            },
            success: function(result) {
                //Exam
                var examArray     = JSON.stringify(result.exam);
                localStorage.setItem('__exam', examArray);

                //Question
                var questionArray     = JSON.stringify(result.question);
                localStorage.setItem('__question', questionArray);

                var access = localStorage.getItem('__access');
                var access = JSON.parse(access);

                if(access.access_status==="denied"){
                    window.location.href="course.php?option=exam";
                }else{
                    location.reload();
                }
                $.isLoading( "hide" );
            },
            error: function(request,msg,error) {
                //console.log("Error: " + error); //just use the err here
                output = JSON.stringify(request.responseJSON)
                // Login undefined
                if(request.status===0){
                    location.reload();
                }else if(request.status===500){
                    location.reload();
                }else{
                    errorMSG = request.responseJSON;
                }
            }
        });
    }else{
        if(access.access_status==="denied"){
            window.location.href="course.php?option=exam";
        }else{
            renderQuestion()
        }
    }
}

function renderQuestion(){
    var course     = localStorage.getItem('__course');
    var course     = JSON.parse(course);
    var question   = localStorage.getItem('__question');
    var question   = JSON.parse(question);
    var exam       = localStorage.getItem('__exam');
    var exam       = JSON.parse(exam);
    var access     = localStorage.getItem('__access');
    var access     = JSON.parse(access);
    var student    = Cookies.get('__student');
    var student    = JSON.parse(student);
    var studentID  = student.permission.student_id;

    /*
    firebase.database().ref('data/' + studentID + '/exam/').orderByChild('contest').equalTo(access.contest_id).once("value", function(snapshot) 
    {
        console.log(snapshot.val());
        snapshot.forEach(function(dataRow) 
        {
            firebase.database().ref('data/' + studentID + '/exam/' + dataRow.key).once("value", function(snapshot){
              console.log(dataRow.key + " : " + snapshot.val().status);
              if(snapshot.val().status==="accept")
              {
                addQuestion(dataRow.key,studentID,question);
              }
            });
        });
    });

    */

    /*
    var ref        = firebase.database().ref('data/' + studentID + '/exam/');
    var query      = ref.orderByChild('contest').equalTo(access.contest_id);

    query.once('value', function(snapshot) {
        if (snapshot.exists()) {
            var arr = snapshot.val();
            var arr2 = Object.keys(arr);
            var key = arr2[0];
            addQuestion(key,studentID,question);
        }
    });

    */




    $(".lesson-name").html(course.name);
    $(".exam-name").html(exam.name);
    $("#contest-table").html("");

    $.each(question, function (key, contest){
        answerDiv = "";
        $.each(contest.answer, function (key, answer) 
        {
            answerDiv += 
            "<li class='quiz-answer' data-quiz='" + contest.id + "' data-answer='" + answer.id + "'>"
            +"<label for='" + answer.id + "'>"
                +"<div class='check'><input type='radio' id='" + answer.id + "' name='" + contest.id + "' value='" + answer.id + "' data-root='" + contest.id + "' data-inner='" + answer.id + "' onclick=\"callClick('" + contest.id + "','" + answer.id + "');\"></div>"
                +"<div class='text'>" + answer.content + "</div>"
            +"</label>"
            +"</li>"
        });

        q_number = ('0' + (key+1)).slice(-2)

        $("#contest-table").append(
        "<div class='quiz-item'>"
        +"<div class='quiz-question'>"
        +"<span class='quiz-number'>" + q_number + "</span>"
        +"<span class='quiz-text'>" + contest.content + "</span>"
        +"</div>"
        +"<ul data-quiz-question='" + contest.id + "' id='answer-" + contest.code + "'>"
        + answerDiv
        +"</ul>"
        +"</div>"
        ).find('input').change(function(){
            root  = $(this).attr('data-root');
            inner = $(this).attr('data-inner');
            $('[data-quiz="'+ root +'"]').removeClass('active');
            $('[data-answer="'+ inner +'"]').addClass('active');

            var now = moment().toDate().getTime();
            var answer   = localStorage.getItem('__answer_' + exam.token);
            var answer   = JSON.parse(answer);
            if (answer == undefined){
                var olddata = [{
                "quiz"      : root,
                "answer"    : inner,
                "timestamp" : now,
                }];
                localStorage.setItem('__answer_' + exam.token, JSON.stringify(olddata))
            }else{
                var data = JSON.parse(localStorage.getItem('__answer_' + exam.token));
                playIndex = data.findIndex((obj => obj.quiz == root));
                if(playIndex==-1){
                    var newdata = {
                    "quiz"   : root,
                    "answer" : inner,
                    "timestamp" : now,
                    };
                    data.push(newdata);
                    localStorage.setItem('__answer_' + exam.token, JSON.stringify(data))
                }else{
                    data.splice(playIndex, 1);
                    var newdata = {
                    "quiz"   : root,
                    "answer" : inner,
                    "timestamp" : now,
                    };
                    data.push(newdata);
                    localStorage.setItem('__answer_' + exam.token, JSON.stringify(data))
                }
            }
            getCurrentScore()
        });
        var nid = contest.id;
        quizArray.push(nid)
    });
    getCurrentScore();
    timecheck();
    setAnswer();
}

$('#avatar-change-btn').on('click',function(evt){
    evt.preventDefault();
    $('#avatar-upload').trigger('click');
});

function encodeImgtoBase64_avatar(element){
    var img = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        $("#avatar-preview").attr("src", reader.result);
        $("#avatar").val(reader.result);
    }
    reader.readAsDataURL(img);
}

$('#idcard-change-btn').on('click',function(evt){
    evt.preventDefault();
    $('#idcard-upload').trigger('click');
});

function encodeImgtoBase64_idcard(element){
    var img = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() 
    {
        $("#idcard-preview").attr("src", reader.result);
        $("#idcard").val(reader.result);
    }
    reader.readAsDataURL(img);
}

$('#approve-change-btn').on('click',function(evt){
    evt.preventDefault();
    $('#approve-upload').trigger('click');
});

function encodeImgtoBase64_approve(element){
    var img = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        $("#approve-preview").attr("src", reader.result);
        $("#approve").val(reader.result);
        submitApproveImage()
    }
    reader.readAsDataURL(img);
}

function checkLobby(){
    var token   = Cookies.get('__session');
    $.ajax(
    {
        url: 'https://player.fti.academy/api/lobby/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        success: function(result) {
            $("#lobby_btn").show();
        },
        error: function(request,msg,error) {
            $("#lobby_btn").hide();
        }
    });
}

function renderLobby(){
    var token   = Cookies.get('__session');
    $.ajax({
        url: 'https://player.fti.academy/api/progress/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        success: function(result) {
            window.location.href = result.redirect;
        },
        error: function(request,msg,error) {
            output = JSON.stringify(request.responseJSON)
            if(request.status===0){
                renderLobby();
            }
            else if(request.status===500){
                renderLobby();
            }
            else{
                errorMSG = request.responseJSON;
            }
        }
    });
}

function accessLobby(){
    var token = Cookies.get('__session');
    $.ajax(
    {
        url: 'https://player.fti.academy/api/get_lobby/' + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        success: function(result) {
            renderCourseContent();

            var tester      = result.score
            var permission  = result.permission

            if (tester == undefined)
            {
                
            }
            else
            {
                if(tester.score_number==="0" && tester.score_record==="N;" && tester.score_structor!="N;")
                {
                    $(".tester-result").html("กรุณาทำการทดสอบอีกครั้ง หากยังให้ผลแบบเดิมกรุณาติดต่อเจ้าหน้าที่");
                    $(".tester-result-date").html("เวลาที่บันทึก  "  + tester.score_adddate);
                    $(".device-tester-item").removeClass("bg-primary");
                    $(".device-tester-item").addClass("bg-warning");
                }
                else if(tester.score_number==="0" && tester.score_record==="N;" && tester.score_structor==="N;")
                {
                    $(".tester-result").html("อุปกรณ์ของคุณไม่สามารถใช้งานได้ แนะนำให้เปลี่ยนเครื่องโดยทันทีหรือติดต่อเจ้าหน้าที่");
                    $(".tester-result-date").html("เวลาที่บันทึก  "  + tester.score_adddate);
                    $(".device-tester-item").removeClass("bg-primary");
                    $(".device-tester-item").addClass("bg-danger");
                }
                else if(tester.score_number>0)
                {
                    $(".tester-result").html("คะแนนที่ทำได้ "  + tester.score_number + " หากคะแนนตรงกับการทำแบบทดสอบ คุณสามารถใช้เครื่องนี้เพื่อเข้าสู่การประเมินผลได้");
                    $(".tester-result-date").html("เวลาที่บันทึก  "  + tester.score_adddate);
                    $(".device-tester-item").removeClass("bg-primary");
                    $(".device-tester-item").addClass("bg-success");
                }
            }
        },
        error: function(request,msg,error) {
            window.location.href = "student.php";
        }
    });
}

function callClick(root,inner){
}


function preLoadExam() 
{
    var code    = "3myAHMeRrqIWKrNY5kxXz0gKIggabn";
    var token   = Cookies.get('__session');
    var exam    = localStorage.getItem('__exam');
    var access  = localStorage.getItem('__access');
    var access  = JSON.parse(access);

    if (exam == undefined) 
    {
        $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
        $.ajax(
        {
            url: 'https://api.fti.academy/api/getexampreload/' + code + "/" + token,
            type : "GET",
            dataType: "json",
            contentType : "text/plain",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
                xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
            },
            success: function(result) {
                // handle success
                //Exam
                var examArray     = JSON.stringify(result.exam);
                localStorage.setItem('__exam', examArray);
                //Question
                var questionArray     = JSON.stringify(result.question);
                localStorage.setItem('__question', questionArray);
                $.isLoading( "hide" );
            },
            error: function(request,msg,error) {
                //console.log("Error: " + error); //just use the err here
                output = JSON.stringify(request.responseJSON)
                // Login undefined
                if(request.status===0){
                    preLoadExam();
                }
                else if(request.status===500){
                    preLoadExam();
                }
                else{
                    errorMSG = request.responseJSON;
                }
            }
        });
    }
}

$('#student').keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
if(keycode == '13'){
find() 
}
});

function find(){
    var student = $("#student").val();
    firebase.database().ref('data/' + student + '/exam/').orderByChild('contest').equalTo('96').once("value", function(snapshot) 
    {
        console.clear()
        console.log(snapshot.val());
        //console.log(JSON.stringify(snapshot.val(), null, 4));
    });
}

function renderSession()
{
    var token   = Cookies.get('__session');
    $('#student').val(token);
}

function openCallback()
{
    var target  = $.urlParam('target');
    var course  = $.urlParam('session');
    if(target !== null && target !== ''  && target !==undefined) {
        window.location.href= target + ".html?session=" + course;
    } else {
        window.location.href= "student.html";
    }
}

function openCourse()
{
    var course  = $.urlParam('session');
    window.location.href= "course.html?session=" + course;
}

function checkFirebasePlayer()
{   
    var token   = Cookies.get('__session');
    var mode    = $.urlParam('mode');
    $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course?user=' + token + '&course=219',
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
        },
        success: function(result) {
            $.isLoading( "hide" );

            if(mode=="pretest")
            {
                pretestArray = result.data.scores.pretest
                console.log(pretestArray)
    
                if(pretestArray !== null && pretestArray !== ''  && pretestArray !==undefined) {
                    window.location.href="student.html";
                } else {
                    console.log(pretestArray);
                }
            }
            else if(mode=="posttest")
            {
                posttestArray = result.data.scores.posttest
                console.log(posttestArray)

                pathname    = window.location.pathname;
                pathname    = pathname.replace("/", "");
                pathname    = pathname.replace(".html", "");

                var user_array = 
                [
                    '3102200623970','3560400010739','3640600020923','1720300093031','3720800290583','1730600055444','1909800932909','3130600480627','3909800333696','3360200113471',
                    '1601300011591','1330200002193','1560100303084','1490700041464','3849800082287','1110200060624','1841701148863','1920900015659','1411500117336','3200200382325',
                    '3101600466412','3220500217371','1610100108451','1420900037797','1600900017034','3200200563508','3910100375398','3470100630511','5909899004360','5640190016481',
                    '1509900134251','3860500084006','1600100316185','3530100283837','1411200106011','3520300305681','3411700579151','2340201028721','3570300220766','3300600437703',
                    '1141000036291','3400500069213','3360400539057','3520600237893','5490100007756','1860700040243','1669800206330','3470400012741','3341900312672','1101111110111',
                    '1700400154821','3720900668383'
                ];

                var student     = Cookies.get('__student');
                var student     = JSON.parse(student);
                var user_search = student.citizen

                var index = jQuery.inArray(user_search, user_array);
                console.log("pathname : " + pathname);
                console.log("index : " + index);

                if(pathname==="exam-posttest-3-XG6eCQLYIx"){
                    if(index<0){
                        console.log("Not Found");
                        //window.location.href="student.html";
                    } else {
                        console.log("Found");
                        if(posttestArray !== null && posttestArray !== ''  && posttestArray !==undefined) {
                            //window.location.href="student.html";
                        } else {
                            console.log(posttestArray);
                        }
                    }
                }
                else
                {
                    if(posttestArray !== null && posttestArray !== ''  && posttestArray !==undefined) {
                        //window.location.href="student.html";
                    } else {
                        console.log(posttestArray);
                    }
                }
            }
            
        },
        error: function(request,msg,error) {
        }
    });
}

function openExam(session,mode)
{
    var token   = Cookies.get('__session');
    $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course?user=' + token + '&course=219',
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            $.isLoading( "hide" );
            pretestArray = result.data.scores.pretest
            console.log(pretestArray)

            if(pretestArray !== null && pretestArray !== ''  && pretestArray !==undefined) {
                window.location.href="student.html";
            } else {
                window.location.href="exam-" + mode + ".html?session=" + session + "&mode=" + mode;
            }
        },
        error: function(request,msg,error) {
        }
    });
}

function exists(arr, search) {
    return arr.some(row => row.includes(search));
}

function getFirebaseUser()
{   
    var token   = Cookies.get('__session');
    var course  = localStorage.getItem('__course');
    $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/?user=' + token + '&school=1',
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
        },
        success: function(result) {
            $.isLoading( "hide" );
            console.log(result);
            console.log("Update Profile Data");

            var user_array = 
            [
                '3102200623970','3560400010739','3640600020923','1720300093031','3720800290583','1730600055444','1909800932909','3130600480627','3909800333696','3360200113471',
                '1601300011591','1330200002193','1560100303084','1490700041464','3849800082287','1110200060624','1841701148863','1920900015659','1411500117336','3200200382325',
                '3101600466412','3220500217371','1610100108451','1420900037797','1600900017034','3200200563508','3910100375398','3470100630511','5909899004360','5640190016481',
                '1509900134251','3860500084006','1600100316185','3530100283837','1411200106011','3520300305681','3411700579151','2340201028721','3570300220766','3300600437703',
                '1141000036291','3400500069213','3360400539057','3520600237893','5490100007756','1860700040243','1669800206330','3470400012741','3341900312672','1101111110111',
                '1700400154821','3720900668383','3331001250011','3160400841651'
            ];

            var student     = Cookies.get('__student');
            var student     = JSON.parse(student);
            var user_search = student.citizen

            // Round 2
            //var round_2_score = result.data.courses.215.scores.posttest.result;
            //console.log("Round Score : " + round_2_score);

            let result_icon         = "";
            let result_bg           = "";
            let result_message      = "";

            $.each(result.data.courses, function (key, item)
            {
                if(item.info.uid === "195") {
                    course_status_class = "unactive " + item.info.uid;
                } else if(item.info.uid === "215"){
                    course_status_class = "unactive " + item.info.uid;
                } else if(item.info.uid === "219"){
                    course_status_class = "active " + item.info.uid;
                }
                else
                {
                    course_status_class = "unactive " + item.info.uid;
                }
                // Add topic item to table
                // 
                course_id = item.scores.posttest
                posttestArray = item.scores.posttest
                // console.log(posttestArray)

                if(posttestArray !== null && posttestArray !== ''  && posttestArray !==undefined) {

                    c = new Date().getTime() / 1e3;

                    // Check Exam Round
                    //
                    if(result.data.info.exam==="รอบที่ 2 วันที่ 14 - 15 มิ.ย.65") 
                    {
                        //console.log("Exam Round 2 : " + result.data.info.exam);
                       // console.log("Exam Round 2 Title : " + item.scores.posttest.title);

                        if(item.info.title==="แบบทดสอบวัดผล รุ่นที่ 2 รอบที่ 2")
                        {
                            exam_agenda = "showscore_posttest_2"; 
                            exam_result_data = "จะประกาศผลเร็วๆนี้";
                        }
                        else if(item.info.title==="แบบทดสอบวัดผล รุ่นที่ 2 รอบที่ 1")
                        {
                            exam_agenda = "showscore_posttest_1";
                            exam_result_data = "วันที่ 2 มิ.ย. 65 เวลา 09:00 น.";
                        }
                        else
                        {
                            exam_agenda = "showscore_posttest_2";
                            exam_result_data = "จะประกาศผลเร็วๆนี้";
                        }
                        
                    } 
                    else if(result.data.info.exam==="รอบที่ 1 วันที่ 30-31 พ.ค.65") 
                    {
                        //console.log("Exam Round 1 : " + result.data.info.exam);
                        //console.log("Exam Round 2 Title : " + item.scores.posttest.title);

                        if(item.scores.posttest.title==="แบบทดสอบวัดผล รุ่นที่ 2 รอบที่ 2")
                        {
                            exam_agenda = "showscore_posttest_2";
                            exam_result_data = "จะประกาศผลเร็วๆนี้";
                        }
                        else if(item.scores.posttest.title==="แบบทดสอบวัดผล รุ่นที่ 2 รอบที่ 1")
                        {
                            exam_agenda = "showscore_posttest_1";
                            exam_result_data = "วันที่ 2 มิ.ย. 65 เวลา 09:00 น.";
                        }
                        else
                        {
                            exam_agenda = "showscore_posttest_1";
                            exam_result_data = "จะประกาศผลเร็วๆนี้";
                        }
                    }
                    else if(result.data.info.exam==="รอบที่ 1 วันที่ 15 - 16 ส.ค.65") 
                    {
                        //console.log("Exam Round 1 : " + result.data.info.exam);
                        //console.log("Exam Round 2 Title : " + item.scores.posttest.title);

                        if(item.scores.posttest.title==="แบบทดสอบวัดผล รุ่นที่ 3 รอบที่ 2")
                        {
                            exam_agenda = "showscore_posttest_2";
                            exam_result_data = "จะประกาศผลเร็วๆนี้";
                        }
                        else if(item.scores.posttest.title==="แบบทดสอบวัดผล รุ่นที่ 3 รอบที่ 1")
                        {
                            exam_agenda = "showscore_posttest_1";
                            exam_result_data = "จะประกาศผลเร็วๆนี้";
                        }
                        else
                        {
                            exam_agenda = "showscore_posttest_1";
                            exam_result_data = "จะประกาศผลเร็วๆนี้";
                        }
                    }
                    else if(result.data.info.exam==="รอบที่ 2 วันที่ 30 - 31 ส.ค.65") 
                    {
                        //console.log("Exam Round 2 : " + result.data.info.exam);
                        //console.log("Exam Round 2 Title : " + item.scores.posttest.title);

                        if(item.scores.posttest.title==="แบบทดสอบวัดผล รุ่นที่ 3 รอบที่ 2")
                        {
                            exam_agenda = "showscore_posttest_2";
                            exam_result_data = "จะประกาศผลเร็วๆนี้";
                        }
                        else if(item.scores.posttest.title==="แบบทดสอบวัดผล รุ่นที่ 3 รอบที่ 1")
                        {
                            exam_agenda = "showscore_posttest_1";
                            exam_result_data = "จะประกาศผลเร็วๆนี้";
                        }
                        else
                        {
                            exam_agenda = "showscore_posttest_1";
                            exam_result_data = "จะประกาศผลเร็วๆนี้";
                        }
                    }
                    else
                    {
                        exam_agenda = "showscore_posttest_1";
                    }
                    //
                    // Check Exam Round

                    

                    $.ajax({
                        url: "https://asia-southeast1-academy-f0925.cloudfunctions.net/api/school/course/agenda/check?school=1&agenda=" + exam_agenda + "&course=" + item.info.uid + "&date=" + c,
                        type : "GET",
                        dataType: "json",
                        contentType : "text/plain",
                        beforeSend: function(xhr) {
                        },
                        success: function(result) {

                            if(result.agenda)
                            {

                                course_id       = item.scores.posttest
                                posttestArray   = item.scores.posttest
                                var post_score  = posttestArray.result

                                console.log("UID : " + item.info.uid + " : " + post_score);

                                if(post_score >=38)
                                {
                                    result_icon = "uil uil-check";
                                    result_bg = "bg-success";
                                    result_message = "ผ่านการทดสอบ";
                                    console.log("result pass : " + post_score);
                                }
                                else if(post_score<38)
                                {
                                    result_icon = "uil uil-times-circle";
                                    result_bg = "bg-danger";
                                    result_message = "ไม่ผ่านการทดสอบ";
                                    console.log("result not pass : " + post_score);
                                }

                                console.log("result_message",result_message);
                                

                                var showscore = "<div class='d-flex "+result_bg+" key-feature align-items-center p-3 rounded shadow mt-4'>"
                                    +"<i class='"+result_icon+" me-1 dashboard-icon text-white'></i>"
                                    +"<div class='flex-1 content ms-3 border-left-white'>"
                                        +"<h4 class='title mb-0 text-white'>ผลการอบรม</h4>"
                                        +"<span class='mb-0 text-white'><span class='score-number'>"+post_score+"</span> <small>คะแนน</small></br>"+result_message+"</span>"
                                        +"<span class='mb-0 text-white' id='load_cert_"+item.info.uid+"'></span>"
                                    +"</div>"
                                +"</div>";


                                /*
                                var showscore = "<div class='d-flex "+result_bg+" key-feature align-items-center p-3 rounded shadow mt-4'>"
                                    +"<i class='"+result_icon+" me-1 dashboard-icon text-white'></i>"
                                    +"<div class='flex-1 content ms-3 border-left-white'>"
                                        +"<h4 class='title mb-0 text-white'>ผลการอบรม</h4>"
                                        +"<span class='mb-0 text-white'><span class='score-number'>"+post_score+"</span> <small>คะแนน</small></br>"+result_message+"</span>"
                                        +"<span class='mb-0 text-white' id='load_cert_"+item.info.uid+"'></span>"
                                    +"</div>"
                                +"</div>";
                                */

                                // var showscore = "<p class='post-meta'>"
                                // +"📣 ประกาศคะแนนการทดสอบ รอบที่ 2 </br>"
                                // +"วันที่ 14-15 มิ.ย. 65 </br>"
                                // +"หลักสูตรผู้ควบคุมการขายวัตถุอันตรายทางการเกษตร รุ่นที่ 3 </br>"
                                // +"ตรวจสอบคะแนนได้โดยการ Login เข้าสู่ระบบอบรมปกติ ได้ตั้งแต่ วันที่ 17 มิ.ย.65 เวลา 09:00 น. เป็นต้นไป </br>"
                                // +"🎉 ผู้ผ่านเกณฑ์การทดสอบต้องได้คะแนนมากกว่า 75% หรือ 38 คะแนนขึ้นไป</p>"  
                                //      +"<div class='d-flex "+result_bg+" key-feature align-items-center p-3 rounded shadow mt-4'>"
                                //      +"<i class='"+result_icon+" me-1 dashboard-icon text-white'></i>"
                                //      +"<div class='flex-1 content ms-3 border-left-white'>"
                                //      +"<h4 class='title mb-0 text-white'>ผลการอบรม</h4>"
                                //          +"<span class='mb-0 text-white'><span class='score-number'>"+post_score+"</span> <small>คะแนน</small></br>"+result_message+"</span>"
                                //          +"<span class='mb-0 text-white' id='load_cert_"+item.info.uid+"'></span>"
                                //      +"</div>"
                                // +"</div>";

                                if(post_score>37){
                                    getCertAgenda(item.info.uid);
                                }
                            }
                            else
                            {
                                var showscore = "<p class='post-meta'>"
                                +"📣 ประกาศคะแนนการทดสอบ รอบที่ 1 </br>"
                                +"วันที่ 15 - 16 ส.ค.65 </br>"
                                +"หลักสูตรผู้ควบคุมการขายวัตถุอันตรายทางการเกษตร รุ่นที่ 3 </br>"
                                +"ตรวจสอบคะแนนได้โดยการ Login เข้าสู่ระบบอบรมปกติ ได้ตั้งแต่ วันที่ 18 ส.ค. 65 (จะแจ้งเวลาให้ทราบภายหลัง) </br>"
                                +"🎉 ผู้ผ่านเกณฑ์การทดสอบต้องได้คะแนนมากกว่า 75% หรือ 38 คะแนนขึ้นไป</p>" 
                                +"<div class='post-meta d-flex justify-content-between mt-3'>"
                                +"<a href='javascript:void(0);' class='btn w-100 btn-lg btn-light'> จบหลักสูตรแล้ว</a>"
                                +"</div>";

                                // var showscore = "<p class='post-meta'>"
                                // +"📣 ประกาศคะแนนการทดสอบ รอบที่ 2 </br>"
                                // +"วันที่ 14-15 มิ.ย. 65 </br>"
                                // +"หลักสูตรผู้ควบคุมการขายวัตถุอันตรายทางการเกษตร รุ่นที่ 2 </br>"
                                // +"ตรวจสอบคะแนนได้โดยการ Login เข้าสู่ระบบอบรมปกติ ได้ตั้งแต่ วันที่ 17 มิ.ย.65 เวลา 09:00 น. เป็นต้นไป </br>"
                                // +"🎉 ผู้ผ่านเกณฑ์การทดสอบต้องได้คะแนนมากกว่า 75% หรือ 38 คะแนนขึ้นไป</p>" 
                                // +"<div class='post-meta d-flex justify-content-between mt-3'>"
                                // +"<a href='javascript:void(0);' class='btn w-100 btn-lg btn-light'> จบหลักสูตรแล้ว</a>"
                                // +"</div>";
                            }

                            $("#course-area").append(
                            "<div class='col-md-12 mt-2 pt-2 pt-sm-0 " + course_status_class + "'>"
                                +"<div class='card blog rounded shadow'>"
                                    +"<a href='javascript:void(0);'>"
                                        +"</a><div class='card-body content'><a href='javascript:void(0);'>"
                                            +"</a><h5><a href='javascript:void(0);'></a><span class='bill-title-small'><i class='uil uil-file-bookmark-alt'></i> หลักสูตรที่ลงทะเบียน</span></br><a href='javascript:void(0);' class='card-title title text-dark'>"+item.info.title+"</a></h5>"
                                            +"<p class='post-meta'>"+item.info.description+"</p>"
                                            +"<p class='post-meta'>"+item.info.date+"</p>"
                                            + showscore
                                        +"</div>"
                                +"</div>"
                            +"</div>"
                            );
                        },
                        error: function(request,msg,error) {
                        }
                    });
                }else{
                    
                    $("#course-area").append(
                    "<div class='col-md-12 mt-2 pt-2 pt-sm-0 " + course_status_class + "'>"
                        +"<div class='card blog rounded shadow'>"
                            +"<a href='course.html?session="+item.info.uid+"'>"
                                +"</a><div class='card-body content'><a href='course.html?session="+item.info.uid+"'>"
                                    +"</a><h5><a href='course.html?session="+item.info.uid+"'></a><span class='bill-title-small'><i class='uil uil-file-bookmark-alt'></i> หลักสูตรที่ลงทะเบียน</span></br><a href='course.html?session="+item.info.uid+"' class='card-title title text-dark'>"+item.info.title+"</a></h5>"
                                    +"<p class='post-meta'>"+item.info.description+"</p>"
                                    +"<p class='post-meta'>"+item.info.date+"</p>"
                                    +"<div class='post-meta d-flex justify-content-between mt-3'>"
                                    +"<a href='course.html?session="+item.info.uid+"' class='btn btn-lg btn-primary'> เข้าเรียน <i class='uil uil-angle-right-b'></i></a>"
                                    + "<a href='javascript:void(0);' onclick='createUserBilling("+item.info.uid+");' class='btn btn-ligth btn-md'> ดึงข้อมูลคำสั่งซื้อ <i class='uil uil-bill align-middle'></i></a>"
                                    +"</div>"
                                +"</div>"
                        +"</div>"
                    +"</div>"
                    )
                    
                    /*
                    result_icon = "uil uil-times-circle";
                    result_bg = "bg-danger";
                    result_message = "ไม่ผ่านการทดสอบ เนื่องจากท่านไม่ได้อบรม หรือเข้าสอบในเวลาที่กำหนด";

                    var showscore = "<div class='d-flex "+result_bg+" key-feature align-items-center p-3 rounded shadow mt-4'>"
                        +"<i class='"+result_icon+" me-1 dashboard-icon text-white'></i>"
                        +"<div class='flex-1 content ms-3 border-left-white'>"
                            +"<h4 class='title mb-0 text-white'>ผลการอบรม</h4>"
                            +"<span class='mb-0 text-white'><span class='score-number'>ไม่มี</span> <small>คะแนน</small></br>"+result_message+"</span>"
                            +"<span class='mb-0 text-white' id='load_cert_"+item.info.uid+"'></span>"
                        +"</div>"
                    +"</div>";

                    $("#course-area").append(
                    "<div class='col-md-12 mt-2 pt-2 pt-sm-0 " + course_status_class + "'>"
                        +"<div class='card blog rounded shadow'>"
                            +"<a href='javascript:void(0);'>"
                                +"</a><div class='card-body content'><a href='javascript:void(0);'>"
                                    +"</a><h5><a href='javascript:void(0);'></a><span class='bill-title-small'><i class='uil uil-file-bookmark-alt'></i> หลักสูตรที่ลงทะเบียน</span></br><a href='javascript:void(0);' class='card-title title text-dark'>"+item.info.title+"</a></h5>"
                                    +"<p class='post-meta'>"+item.info.description+"</p>"
                                    +"<p class='post-meta'>"+item.info.date+"</p>"
                                    + showscore
                                +"</div>"
                        +"</div>"
                    +"</div>"
                    );

                    */
                }
            });

            let has_bill = true;
            
            $.each(result.data.bills, function (key, item){

                if(item.course==219)
                {
                    has_bill = false;
                }

                if(item.status=="buy")
                {
                    bill_status = "สั่งซื้อ";
                    bill_btn    = "<a href='javascript:void(0);' class='btn btn-light' onclick='openPaymentURL(" + item.course + ");'> ชำระเงิน <i class='uil uil-receipt align-middle'></i></a>";
                }
                else if(item.status=="confirm")
                {
                    bill_status = "แจ้งโอน";
                    bill_btn    = "<a href='javascript:void(0);' class='btn btn-light' onclick='openPaymentURL(" + item.course + ");'> ชำระเงิน <i class='uil uil-receipt align-middle'></i></a>";
                }
                else if(item.status=="complete")
                {
                    bill_status = "ยืนยัน";
                    bill_btn    = "<a href='bill.html?session="+item.course+"&token="+item.uid+"' class='btn btn-light'> ใบเสร็จ <i class='uil uil-receipt align-middle'></i></a>";
                }
                else if(item.status=="reject")
                {
                    bill_status = "ยกเลิก";
                    bill_btn    = "<a href='javascript:void(0);' class='btn btn-dark'> การลงทะเบียนถูกยกเลิก</a>";
                }
                // Add topic item to table
                $("#order-area").append(
                "<div class='col-md-12 mt-2 pt-2 pt-sm-0'>"
                    +"<div class='card blog rounded shadow'> <input class='form-control' type='hidden' id='payment_url_"+item.course+"' name='payment_url_"+item.course+"' value='https://payment.fti.academy/transaction/pay/"+item.uid+"'>"
                            +"<div class='card-body content'>"
                                + "<h5 class='bill-title'><span class='bill-title-small'><i class='uil uil-shopping-cart-alt'></i> สั่งซื้อและลงทะเบียน</span></br><a href='javascript:void(0);' class='card-title title text-dark'>"+item.title+"</a></h5>"
                                + "<p class='post-meta meta-border-bottom'><span class='payment-label-title'><i class='uil uil-bell'></i> สถานะ</span><span class='payment-label'>"+bill_status+"</span></p>"
                                + "<p class='post-meta meta-border-bottom'><span class='payment-label-title'><i class='uil uil-bill'></i> การชำระเงิน</span><span class='payment-label'>"+item.payment+"</span></p>"
                                + "<p class='post-meta meta-border-bottom'><span class='payment-label-title'><i class='uil uil-calendar-alt'></i> วันที่ลงทะเบียน</span><span class='payment-label'>"+item.createAt+"</span></p>"
                                + "<div class='post-meta d-flex justify-content-between mt-3'>"
                                + bill_btn
                                + "<a href='edit-bill.html?session="+item.course+"&token="+item.uid+"' class='btn btn-ligth btn-md'> แก้ไขที่อยู่ <i class='uil uil-angle-right-b align-middle'></i></a>"
                                + "</div>"
                            +"</div>"
                    +"</div>"
                +"</div>"
                );
            });


            // Round2
            /*var course_215 = result.data.courses[215].scores.posttest.result;
            
            console.log("215 : " , course_215);
            console.log("Bill : " , has_bill);

            if(course_215<38)
            {
                if(has_bill)
                {
                    console.log("Show Register 219");
                    $(".new_course_219").show();
                }
            }
            */

            var index = jQuery.inArray(user_search, user_array);
            console.log("index : " + index);

            if(index<0){
                console.log("Not Found");
            } else {
                console.log("Found");
                $("#alert-area").append(
                "<div class='col-md-12 mt-2 pt-2 pt-sm-0'>"
                    +"<div class='card blog rounded shadow'>"
                        +"<a href='javascript:void(0);'>"
                            +"</a><div class='card-body content'><a href='javascript:void(0);'>"
                                +"</a><h5><a href='javascript:void(0);'></a><span class='bill-title-small'><i class='uil uil-file-bookmark-alt'></i> แบบทดสอบรอบพิเศษ</span></br><a href='javascript:void(0);' class='card-title title text-dark'>หลักสูตรผู้ควบคุมการขายวัตถุอันตรายทางการเกษตร รุ่น 3 (แบบทดสอบรอบพิเศษ)</a></h5>"
                                +"<p class='post-meta'>วันที่ 29 ก.ย.65 ตั้งแต่ 08:00 เริ่มสอบ เวลา 08:00-12:00 น.</p>"
                                +"<a href='exam-posttest-3-XG6eCQLYIx.html?session=219&mode=posttest' class='btn btn-lg btn-danger w-100'> ทำแบทดสอบ <i class='uil uil-angle-right-b'></i></a>"
                            +"</div>"
                    +"</div>"
                +"</div>"
                );
            }
            

        },
        error: function(request,msg,error) {
            $.isLoading( "hide" );
            console.log(msg);
            console.log("No Found Profile Data");
        }
    });
}

function getCertAgenda(uid)
{
    c = new Date().getTime() / 1e3;
    var token   = Cookies.get('__session');
    $.ajax({
        url: "https://asia-southeast1-academy-f0925.cloudfunctions.net/api/school/course/agenda/check?school=1&agenda=show_cert&course=" + uid + "&date=" + c,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
        },
        success: function(result) {

            if(result.agenda)
            {
                var showcert = "<a href='javascript:void(0);' onclick='page(\"certification.html?token="+token+"&session="+uid+"\");' class='btn btn-light w-100'> ดูใบประกาศของคุณ <i class='uil uil-analysis align-middle'></i></a>";
            }
            else
            {
                var showcert = "";
            }

            $("#load_cert_" + uid).append(showcert);

        },
        error: function(request,msg,error) {
        }
    });
}

function getFirebasePlayer()
{   
    var token   = Cookies.get('__session');
    var course  = $.urlParam('session');
    $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course?user=' + token + '&course=' + course + '&school=1',
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
        },
        success: function(result) {
            $.isLoading( "hide" );
            // handle success
            $(".lesson-name").html(result.data.info.title);
            $(".lesson-period").html(result.data.info.period);
            $(".lesson-date").html(result.data.info.date);
            $(".lesson-time").html(result.data.info.time + " ชั่วโมง");
            $(".lesson-day").html(result.data.info.days + " วัน");
            $(".lesson-topic").html(result.data.info.topic);
            $(".lesson-detail").html(result.data.info.description);
            $(".lesson-poster").attr("src",result.data.info.poster);

            console.log(result.data.players)

            pretestArray = result.data.scores.pretest
            console.log(pretestArray)
            if(pretestArray !== null && pretestArray !== ''  && pretestArray !==undefined) 
            {
                enroll_status = true;
                $("#topic-table").append(
                "<tr class='topic-pending' id='exam-pretest'>"
                    +"<th class='p-3'>"
                        +"<div class='align-items-center'>"
                            +"<p class='mb-0 d-inline fw-normal topic-name-list h6'><a href='javascript:void(0);' class='topic-name-title'><strong>แบบทดสอบก่อนเรียน 50 ข้อ เวลา 20 นาที</strong></br><small>ทำแบบทดสอบก่อนเรียนแล้ว</small></a></p>"
                        +"</div>"
                    +"</th>"
                    +"<td><p class='mb-0 fw-normal topic-duration-badge'> "+pretestArray.result+" คะแนน</p></td>"
                +"</tr>"
                )
            } 
            else 
            {

                if(token==="fXM74eSf0pyf6Pgb9ozE" || token==="dwdpmeUJ1cOg44gt2M0R")
                {
                    enroll_status = false;
                    $("#topic-table").append(
                    "<tr class='topic-processing' id='exam-pretest'>"
                        +"<th class='p-3'>"
                            +"<div class='align-items-center'>"
                                +"<p class='mb-0 d-inline fw-normal topic-name-list h6'><a href='exam-demotest.html?session="+course+"&mode=pretest' class='topic-name-title'>แบบทดสอบก่อนเรียน 50 ข้อ เวลา 20 นาที</br><small>โปรดทำแบบทดสอบก่อนคลิกเข้าอบรมแต่ละหัวข้อ</small></a></p>"
                            +"</div>"
                        +"</th>"
                        +"<td><p class='mb-0 fw-normal topic-duration-badge'> <i class='uil uil-clock'></i> 10 ข้อ </p></td>"
                    +"</tr>"
                    )
                }
                else
                {
                    enroll_status = false;
                    $("#topic-table").append(
                    "<tr class='topic-processing' id='exam-pretest'>"
                        +"<th class='p-3'>"
                            +"<div class='align-items-center'>"
                                +"<p class='mb-0 d-inline fw-normal topic-name-list h6'><a href='exam-pretest.html?session="+course+"&mode=pretest' class='topic-name-title'>แบบทดสอบก่อนเรียน 50 ข้อ เวลา 20 นาที</br><small>โปรดทำแบบทดสอบก่อนคลิกเข้าอบรมแต่ละหัวข้อ</small></a></p>"
                            +"</div>"
                        +"</th>"
                        +"<td><p class='mb-0 fw-normal topic-duration-badge'> <i class='uil uil-clock'></i> 50 ข้อ </p></td>"
                    +"</tr>"
                    )
                }

                
            }

            total_item = 0;
            finish_item = 0;

            $.each(result.data.players, function (key, item){

                // Check Topic Status
                //
                if(item.status=="pending") {
                    status_icon = "<i class='uil uil-clock text-muted status-icon-data'></i> <span class='status-icon-label'>คลิ๊กเพื่อเรียน</span>";
                }
                else if(item.status=="processing") {
                    status_icon = "<i class='uil uil-play text-warning status-icon-data'></i> <span class='status-icon-label'>ยังเรียนไม่จบ</span>";
                }
                else if(item.status=="finish") {
                    status_icon = "<i class='uil uil-check-circle text-success status-icon-data'></i> <span class='status-icon-label'>เรียนจบแล้ว</span>";
                    finish_item++;
                }

                // Check Enroll Status for topic url
                //
                if(enroll_status)
                {
                    topic_link = "<a href='play.html?token=" + item.uid + "&session=" + item.course + "' class='topic-name-title' title='" + item.master.title + "' data-bs-toggle='tooltip' data-bs-placement='top'>" + item.master.title + "</a>";
                    url = "play.html?token=" + item.uid + "&session=" + item.course;
                }
                else
                {
                    topic_link = "<a href='javascript:void(0);' class='topic-name-title' title='" + item.master.title + "' data-bs-toggle='tooltip' data-bs-placement='top'>" + item.master.title + "</a>";
                    url = "javascript:void(0);";
                }

                // Add topic item to table
                // 
                play_timer = secondsTimeSpanToHMS(item.play);
                $("#topic-table").append(
                "<tr class='topic-" + item.status + " topic-link' id='" + item.uid + "' onclick='page(\""+ url +"\")'>"
                    +"<a href='"+url+"'>"
                        +"<th class='p-3'>"
                            +"<div class='align-items-center'>"
                                +"<p class='mb-0 d-inline fw-normal topic-name-list h6'>" + topic_link + "</p>"
                                +"<p class='mb-0 d-inline fw-normal topic-timer-data'>" + play_timer + " / " + item.master.duration + "</p>"
                            +"</div>"
                        +"</th>"
                        +"<td><p class='mb-0 fw-normal'>" + status_icon + " </p></td>"
                    +"</a>"
                +"</tr>"
                )
                /*
                $("#topic-table").append(
                "<tr class='topic-" + item.status + "' id='" + item.uid + "'>"
                    +"<th class='p-3'>"
                        +"<div class='align-items-center'>"
                            +"<p class='mb-0 d-inline fw-normal topic-name-list h6 ms-1'><a href='play.html?token=" + item.uid + "&session=" + item.course + "' class='' title='" + item.title + "' data-bs-toggle='tooltip' data-bs-placement='top'>" + item.title + "</a></p>"
                        +"</div>"
                    +"</th>"
                    +"<td><p class='mb-0 d-inline fw-normal topic-duration-badge'> <i class='uil uil-clock'></i> " + item.duration + " </p></td>"
                    +"<td class='p-3 text-end'><i class='" + item.icon + "'></i> <span class='icon_percent'>" + status_icon + "</span></td>"
                +"</tr>"
                )
                */
                total_item++;
            });

            var code = $.urlParam('token');
            $("#" + code).addClass("topic-play");
            $("#" + code).removeClass("topic-finish");
            $("#" + code).removeClass("topic-processing");
            $("#" + code).removeClass("topic-pending");

            // Process Enroll Percent Data
            //
            $(".enrol_item_finish").html(finish_item);
            $(".enrol_item_total").html(total_item);
            finish_percent = (100/total_item)*finish_item;
            $(".progress-bar").css("width", finish_percent + "%");

            $.ajax({
                url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user?user=' + token + '&shallow=1&school=1',
                type : "GET",
                dataType: "json",
                contentType : "text/plain",
                beforeSend: function(xhr) {
                },
                success: function(result_2) {

                    if(finish_item>12)
                    {
                        if(result_2.data.info.exam =="รอบที่ 1 วันที่ 15 - 16 ส.ค.65")
                        {
                            posttestArray = result.data.scores.posttest
                            console.log(posttestArray)

                            if(posttestArray !== null && posttestArray !== ''  && posttestArray !==undefined) {
                            } else {
                                $("#topic-table").append(
                                "<tr class='topic-processing' id='exam-pretest'>"
                                    +"<th class='p-3'>"
                                        +"<div class='align-items-center'>"
                                            +"<p class='mb-0 d-inline fw-normal topic-name-list h6'><a href='external.html?session=" + course + "&target=exam-posttest-1-TAF7eX65i7&document=posttest_2&mode=posttest' class='topic-name-title'>คลิ๊กทำข้อสอบ</a></p>"
                                            +"<p class='mb-0 d-inline fw-normal topic-name-list h6'>รอบพิเศษ 15 ก.ย. 65 เวลา 9.00 น. เป็นต้นไป</p>"
                                        +"</div>"
                                    +"</th>"
                                    +"<td><p class='mb-0 fw-normal topic-duration-badge'> <i class='uil uil-clock'></i> 50 ข้อ </p></td>"
                                +"</tr>"
                                )
                            }
                        }
                        else if(result_2.data.info.exam =="รอบที่ 2 วันที่ 30 - 31 ส.ค.65" || result_2.data.info.exam =="รอบที่ 1 วันที่ 15 - 16 ส.ค.65")
                        {
                            posttestArray = result.data.scores.posttest
                            console.log(posttestArray)

                            if(posttestArray !== null && posttestArray !== ''  && posttestArray !==undefined) {
                            } else {
                                $("#topic-table").append(
                                "<tr class='topic-processing' id='exam-pretest'>"
                                    +"<th class='p-3'>"
                                        +"<div class='align-items-center'>"
                                            +"<p class='mb-0 d-inline fw-normal topic-name-list h6'><a href='external.html?session=" + course + "&target=exam-posttest-1-TAF7eX65i7&document=posttest_2&mode=posttest' class='topic-name-title'>คลิ๊กทำข้อสอบ</a></p>"
                                            +"<p class='mb-0 d-inline fw-normal topic-name-list h6'>รอบพิเศษ 15 ก.ย. 65 เวลา 9.00 น. เป็นต้นไป</p>"
                                        +"</div>"
                                    +"</th>"
                                    +"<td><p class='mb-0 fw-normal topic-duration-badge'> <i class='uil uil-clock'></i> 50 ข้อ </p></td>"
                                +"</tr>"
                                )
                            }
                        }
                        else
                        {
                            posttestArray = result.data.scores.posttest
                            console.log(posttestArray)

                            if(posttestArray !== null && posttestArray !== ''  && posttestArray !==undefined) {
                            } else {
                                $("#topic-table").append(
                                "<tr class='topic-processing' id='exam-pretest'>"
                                    +"<th class='p-3'>"
                                        +"<div class='align-items-center'>"
                                            +"<p class='mb-0 d-inline fw-normal topic-name-list h6'><a href='edit-round.html' class='topic-name-title'>รอเข้ารับการทดสอบ</a></p>"
                                            +"<p class='mb-0 d-inline fw-normal topic-name-list h6'><a href='edit-round.html'>โปรดตรวจสอบรอบสอบของท่าน</a></p>"
                                        +"</div>"
                                    +"</th>"
                                    +"<td><a href='edit-round.html'><p class='mb-0 fw-normal topic-duration-badge'> <i class='uil uil-warning'></i> ตรวจสอบรอบสอบ </p></a></td>"
                                +"</tr>"
                                )
                            }
                        }
                    }

                },
                error: function(request,msg,error) {
                }
            });
        },
        error: function(request,msg,error) {
        }
    });
}

function getFirebasePlayerTopic()
{   
    var code    = $.urlParam('token');
    var course  = $.urlParam('session');
    var token   = Cookies.get('__session');
    $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course/player?user=' + token + '&course=' + course + '&player=' + code + '&school=1',
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
        },
        success: function(result) {
            $.isLoading( "hide" );
            // handle success
            console.log(result.data.timer);

            if(result.data.timer <1)
            {
                //updatePlayerStatus(token, course, code, result.data.play, result.data.status, result.data.duration, result.data.uid, result.data.video, result.data.timer, result.data.course, result.data.title, "finish");
            }

            if(result.data.status =="pending")
            {
                //updatePlayerStatus(token, course, code, result.data.play, result.data.status, result.data.duration, result.data.uid, result.data.video, result.data.timer, result.data.course, result.data.title, "processing");
            }

            // Detect Android Source
            //
            browserOS = getOS();
            console.log("Browser : " + browserOS);

            if(browserOS!="Android")
            {
                $("#topic_video_source").val(result.data.master.video);
            }
            else
            {
                $("#topic_video_source").val(result.data.master.video_direct);
            }
            
            $("#topic_poster_source").val(result.data.master.poster);
            $("#topic_course").val(course);
            $(".active-topic-name").html(result.data.master.title);
            $(".player-time-total").html(result.data.master.duration);
        },
        error: function(request,msg,error) {
        }
    });
}

function updateFirebasePlayer(token,course,code)
{
    var jsonObj = {
        "user": token,
        "course": course,
        "player": code,
        "data": "1",
    }

    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course/player/updateTime',
        type : "POST",
        dataType: "json",
        contentType : "application/json",
        data: JSON.stringify(jsonObj),
        beforeSend: function(xhr) {
        },
        success: function(result) {
        },
        error: function(request,msg,error) {
        }
    });
}

function updateFirebaseUser()
{
    var token   = Cookies.get('__session');
    
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    $.ajax(
    {
        url: 'https://api.fti.academy/api/order_data_token/' + token,
        type : "POST",
        dataType: "json",
        data 		: {'token':token},
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            $.isLoading( "hide" );

            var jsonObj = {
                "user": token,
                "data": {
                    "info": {
                        "firstname": result.firstname,
                        "lastname": result.lastname,
                        "prefix": result.prefix,
                        "area": result.area,
                        "exam": result.exam,
                        "email": result.email,
                        "phone": result.phone,
                        "citizen": result.citizen
                    }
                }
            }

            Cookies.set('__exam', result.exam, {expires:1})
            Cookies.set('__area', result.area, {expires:1})
        
            $.ajax({
                url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/',
                type : "POST",
                dataType: "json",
                contentType : "application/json",
                data: JSON.stringify(jsonObj),
                beforeSend: function(xhr) {
                },
                success: function(result) {
                    renderProfile();
                },
                error: function(request,msg,error) {
                }
            });

        },
        error: function(request,msg,error) {
            //console.log("Error: " + error); //just use the err here
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
            }
            else if(request.status===500){
            }
            else{
                errorMSG = request.responseJSON;
            }
        }
    });
}

function stopFirebasePlayer(token,course,code)
{
    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course/player?user=' + token + '&course=' + course + '&player=' + code,
        type : "GET",
        dataType: "json",
        contentType : "application/json",
        beforeSend: function(xhr) {
        },
        success: function(result) {
            console.log(result)

            var jsonObj = {
                "user": token,
                "course": course,
                "player": code,
                "data": result.data.timer,
            }
        
            $.ajax({
                url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course/player/updateTime',
                type : "POST",
                dataType: "json",
                contentType : "application/json",
                data: JSON.stringify(jsonObj),
                beforeSend: function(xhr) {
                },
                success: function(result) {
                    console.log(result)
                },
                error: function(request,msg,error) {
                }
            });
        },
        error: function(request,msg,error) {
        }
    });
    /*

    var jsonObj = {
        "user": token,
        "course": course,
        "player": code,
        "data": "1",
    }

    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course/player/updateTime',
        type : "POST",
        dataType: "json",
        contentType : "application/json",
        data: JSON.stringify(jsonObj),
        beforeSend: function(xhr) {
        },
        success: function(result) {
        },
        error: function(request,msg,error) {
        }
    });
    */
}

function updatePlayerStatus(user,course,player,play, status, duration, uid, video, timer, course, title, new_status)
{   
    //
    console.log( new_status + " : Player");
    var jsonObj = {
        "user": user,
        "course": course,
        "player": player,
        "data": {
            "play": play,
            "status": new_status,
            "duration": duration,
            "uid": uid,
            "video": video,
            "timer": timer,
            "course": course,
            "title": title
        }
    }

    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course/player',
        type : "POST",
        dataType: "json",
        contentType : "application/json",
        data: JSON.stringify(jsonObj),
        beforeSend: function(xhr) {
        },
        success: function(result) {
        },
        error: function(request,msg,error) {
        }
    });
}

function renderResult()
{   
    var mode    = $.urlParam('mode');
    var course  = $.urlParam('session');
    var token   = Cookies.get('__session');
    $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course/score/?user=' + token + '&course=' + course + '&score=' + mode,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
        },
        success: function(result) {
            $.isLoading( "hide" );
            $("#result-score").html(result.data.result + " คะแนน");
        },
        error: function(request,msg,error) {
        }
    });
}

function renderOrderReceipt() {
    var code = $.urlParam('token');
    var course  = $.urlParam('session');
    var token   = Cookies.get('__session');
    $.ajax({
        url: 'https://api.fti.academy/api/order_receipt/' + code,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            if(result.status ==="true")
            {   
                $.ajax({
                    url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/bill/?user=' + token + '&bill=' + course,
                    type : "GET",
                    dataType: "json",
                    contentType : "text/plain",
                    beforeSend: function(xhr) {
                    },
                    success: function(result2) 
                    {
                        console.log(result2);

                        if(result2.data.type==="corp")
                        {
                            $(".receipt-name").html("ลูกค้านิติบุคคล : <strong>" + result2.data.corp_name + "</strong> </br>เลขประจำตัวผู้เสียภาษี : " + result2.data.corp_tax);
                            $(".receipt-address").html("อาคาร " + result2.data.tax_address.mailinG_BUILDING_TH + " เลขที่ " + result2.data.tax_address.mailinG_NO + " หมู่ที่ " + result2.data.tax_address.mailinG_MOO + " ซอย " + result2.data.tax_address.mailinG_SOI_TH + " ถนน " + result2.data.tax_address.mailinG_ROAD_TH + " ตำบล " + result2.data.tax_address.mailinG_SUB_DISTRICT_TH + " อำเภอ " + result2.data.tax_address.mailinG_DISTRICT_TH + " จังหวัด " + result2.data.tax_address.mailinG_PROVINCE_TH + " รหัสไปรษณีย์ " + result2.data.tax_address.mailinG_POST_CODE);
                        }
                        else if(result2.data.type==="personal")
                        {
                            $(".receipt-name").html("ลูกค้าบุคคลธรรมดา : <strong>" + result.name + "</strong>");
                            $(".receipt-address").html("อาคาร " + result2.data.tax_address.mailinG_BUILDING_TH + " เลขที่ " + result2.data.tax_address.mailinG_NO + " หมู่ที่ " + result2.data.tax_address.mailinG_MOO + " ซอย " + result2.data.tax_address.mailinG_SOI_TH + " ถนน " + result2.data.tax_address.mailinG_ROAD_TH + " ตำบล " + result2.data.tax_address.mailinG_SUB_DISTRICT_TH + " อำเภอ " + result2.data.tax_address.mailinG_DISTRICT_TH + " จังหวัด " + result2.data.tax_address.mailinG_PROVINCE_TH + " รหัสไปรษณีย์ " + result2.data.tax_address.mailinG_POST_CODE);
                        }
                        else
                        {
                            $(".receipt-name").html("ลูกค้าบุคคลธรรมดา : <strong>" + result.name + "</strong>");
                            $(".receipt-address").html("อาคาร " + result2.data.tax_address.mailinG_BUILDING_TH + " เลขที่ " + result2.data.tax_address.mailinG_NO + " หมู่ที่ " + result2.data.tax_address.mailinG_MOO + " ซอย " + result2.data.tax_address.mailinG_SOI_TH + " ถนน " + result2.data.tax_address.mailinG_ROAD_TH + " ตำบล " + result2.data.tax_address.mailinG_SUB_DISTRICT_TH + " อำเภอ " + result2.data.tax_address.mailinG_DISTRICT_TH + " จังหวัด " + result2.data.tax_address.mailinG_PROVINCE_TH + " รหัสไปรษณีย์ " + result2.data.tax_address.mailinG_POST_CODE);
                        }

                        $(".receipt-ref1").html(result2.data.ref1);
                        $(".receipt-ref2").html(result2.data.ref2);
                        $(".receipt-date").html(result.date);
                        $(".receipt-phone").html(result.phone);
                        $(".receipt-item").html(result2.data.title);
                        $(".receipt-code").html(result2.data.ref1);
                    },
                    error: function(request,msg,error) {
                        output = JSON.stringify(request.responseJSON)
                        // Login undefined
                        if(request.status===0){
                            renderOrderReceipt(token);
                        }
                        else if(request.status===500){
                            renderOrderReceipt(token);
                        }
                        else{
                            errorMSG = request.responseJSON;
                        }
                    }
                });
            }
        },
        error: function(request,msg,error) {
            
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
                renderOrderReceipt(token);
            }
            else if(request.status===500){
                renderOrderReceipt(token);
            }
            else{
                errorMSG = request.responseJSON;
            }
        }
    });
}

function renderOrderPrintReceipt() {
    var code = $.urlParam('token');
    var course  = $.urlParam('session');
    var token   = Cookies.get('__session');
    $.ajax({
        url: 'https://api.fti.academy/api/order_receipt/' + code,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            if(result.status ==="true")
            {
                $.ajax({
                    url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/bill/?user=' + token + '&bill=' + course,
                    type : "GET",
                    dataType: "json",
                    contentType : "text/plain",
                    beforeSend: function(xhr) {
                    },
                    success: function(result2) 
                    {
                        console.log(result2);

                        if(result2.data.type==="corp")
                        {
                            $(".receipt-name").html("ลูกค้านิติบุคคล : <strong>" + result2.data.corp_name + "</strong> </br>เลขประจำตัวผู้เสียภาษี : " + result2.data.corp_tax);
                            $(".receipt-address").html("อาคาร " + result2.data.tax_address.mailinG_BUILDING_TH + " เลขที่ " + result2.data.tax_address.mailinG_NO + " หมู่ที่ " + result2.data.tax_address.mailinG_MOO + " ซอย " + result2.data.tax_address.mailinG_SOI_TH + " ถนน " + result2.data.tax_address.mailinG_ROAD_TH + " ตำบล " + result2.data.tax_address.mailinG_SUB_DISTRICT_TH + " อำเภอ " + result2.data.tax_address.mailinG_DISTRICT_TH + " จังหวัด " + result2.data.tax_address.mailinG_PROVINCE_TH + " รหัสไปรษณีย์ " + result2.data.tax_address.mailinG_POST_CODE);
                        }
                        else if(result2.data.type==="personal")
                        {
                            $(".receipt-name").html("ลูกค้าบุคคลธรรมดา : <strong>" + result.name + "</strong>");
                            $(".receipt-address").html("อาคาร " + result2.data.tax_address.mailinG_BUILDING_TH + " เลขที่ " + result2.data.tax_address.mailinG_NO + " หมู่ที่ " + result2.data.tax_address.mailinG_MOO + " ซอย " + result2.data.tax_address.mailinG_SOI_TH + " ถนน " + result2.data.tax_address.mailinG_ROAD_TH + " ตำบล " + result2.data.tax_address.mailinG_SUB_DISTRICT_TH + " อำเภอ " + result2.data.tax_address.mailinG_DISTRICT_TH + " จังหวัด " + result2.data.tax_address.mailinG_PROVINCE_TH + " รหัสไปรษณีย์ " + result2.data.tax_address.mailinG_POST_CODE);
                        }
                        else
                        {
                            $(".receipt-name").html("ลูกค้าบุคคลธรรมดา : <strong>" + result.name + "</strong>");
                            $(".receipt-address").html("อาคาร " + result2.data.tax_address.mailinG_BUILDING_TH + " เลขที่ " + result2.data.tax_address.mailinG_NO + " หมู่ที่ " + result2.data.tax_address.mailinG_MOO + " ซอย " + result2.data.tax_address.mailinG_SOI_TH + " ถนน " + result2.data.tax_address.mailinG_ROAD_TH + " ตำบล " + result2.data.tax_address.mailinG_SUB_DISTRICT_TH + " อำเภอ " + result2.data.tax_address.mailinG_DISTRICT_TH + " จังหวัด " + result2.data.tax_address.mailinG_PROVINCE_TH + " รหัสไปรษณีย์ " + result2.data.tax_address.mailinG_POST_CODE);
                        }

                        $(".receipt-ref1").html(result2.data.ref1);
                        $(".receipt-ref2").html(result2.data.ref2);
                        
                        $(".receipt-date").html(result.date);
                        $(".receipt-phone").html(result.phone);
                        $(".receipt-item").html(result2.data.title);
                        $(".receipt-code").html(result2.data.ref1);
                        download_receipt();
                    },
                    error: function(request,msg,error) {
                        output = JSON.stringify(request.responseJSON)
                        // Login undefined
                        if(request.status===0){
                            renderOrderReceipt(token);
                        }
                        else if(request.status===500){
                            renderOrderReceipt(token);
                        }
                        else{
                            errorMSG = request.responseJSON;
                        }
                    }
                });
            }
        },
        error: function(request,msg,error) {
            
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
                renderOrderReceipt(token);
            }
            else if(request.status===500){
                renderOrderReceipt(token);
            }
            else{
                errorMSG = request.responseJSON;
            }
        }
    });
}

function renderEditBilling() {
    var code = $.urlParam('token');
    var course  = $.urlParam('session');
    var token   = Cookies.get('__session');
    $.ajax({
        url: 'https://api.fti.academy/api/order_receipt/' + code,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            if(result.status ==="true")
            {
                $.ajax({
                    url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/bill/?user=' + token + '&bill=' + course,
                    type : "GET",
                    dataType: "json",
                    contentType : "text/plain",
                    beforeSend: function(xhr) {
                    },
                    success: function(result) 
                    {
                        if(result.data.type ==="corp")
                        {
                            $('input:radio[name="receipt_type"]').filter('[value="corp"]').attr('checked', true);
                            $("#corp_tax").val(result.data.corp_tax);
                            $("#corp_name").val(result.data.corp_name);
                            $("#corp-form-input").show();
                        }
                        else if(result.data.type ==="personal")
                        {
                            $('input:radio[name="receipt_type"]').filter('[value="personal"]').attr('checked', true);
                            $("#corp_tax").val("");
                            $("#corp_name").val("");
                            $("#corp-form-input").hide();
                        }
                        else
                        {
                            $('input:radio[name="receipt_type"]').filter('[value="personal"]').attr('checked', true);
                            $("#corp_tax").val("");
                            $("#corp_name").val("");
                            $("#corp-form-input").hide();
                        }
                        console.log(result);
                        $("#token").val(result.data.uid);
                        $("#lesson").val(course);
                        $('#taX_PROVINCE_TH option:contains(' + result.data.bill_address.taX_PROVINCE_TH + ')').attr('selected', 'selected');
                        $("#taX_BUILDING_TH").val(result.data.bill_address.taX_BUILDING_TH);
                        $("#taX_COUNTRY").val(result.data.bill_address.taX_COUNTRY);
                        $("#taX_DISTRICT_TH").val(result.data.bill_address.taX_DISTRICT_TH);
                        $("#taX_MOO").val(result.data.bill_address.taX_MOO);
                        $("#taX_NO").val(result.data.bill_address.taX_NO);
                        $("#taX_POST_CODE").val(result.data.bill_address.taX_POST_CODE);
                        $("#taX_ROAD_TH").val(result.data.bill_address.taX_ROAD_TH);
                        $("#taX_SOI_TH").val(result.data.bill_address.taX_SOI_TH);
                        $("#taX_SUB_DISTRICT_TH").val(result.data.bill_address.taX_SUB_DISTRICT_TH);

                        $('#mailinG_PROVINCE_TH option:contains(' + result.data.tax_address.mailinG_PROVINCE_TH + ')').attr('selected', 'selected');
                        $("#mailinG_BUILDING_TH").val(result.data.tax_address.mailinG_BUILDING_TH);
                        $("#mailinG_COUNTRY").val(result.data.tax_address.mailinG_COUNTRY);
                        $("#mailinG_DISTRICT_TH").val(result.data.tax_address.mailinG_DISTRICT_TH);
                        $("#mailinG_MOO").val(result.data.tax_address.mailinG_MOO);
                        $("#mailinG_NO").val(result.data.tax_address.mailinG_NO);
                        $("#mailinG_POST_CODE").val(result.data.tax_address.mailinG_POST_CODE);
                        $("#mailinG_ROAD_TH").val(result.data.tax_address.mailinG_ROAD_TH);
                        $("#mailinG_SOI_TH").val(result.data.tax_address.mailinG_SOI_TH);
                        $("#mailinG_SUB_DISTRICT_TH").val(result.data.tax_address.mailinG_SUB_DISTRICT_TH);
                    },
                    error: function(request,msg,error) {
                        output = JSON.stringify(request.responseJSON)
                        // Login undefined
                        if(request.status===0){
                            renderEditBilling(token);
                        }
                        else if(request.status===500){
                            renderEditBilling(token);
                        }
                        else{
                            errorMSG = request.responseJSON;
                        }
                    }
                });
                
            }
        },
        error: function(request,msg,error) {
            
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
                renderEditBilling(token);
            }
            else if(request.status===500){
                renderEditBilling(token);
            }
            else{
                errorMSG = request.responseJSON;
            }
        }
    });
}

function getUserBilling() {
    var course  = $.urlParam('session');
    var token   = Cookies.get('__session');
    $.ajax({
        url: 'https://api.fti.academy/api/order_billing/' + course + "/" + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            
        },
        error: function(request,msg,error) {
            output = JSON.stringify(request.responseJSON)
        }
    });
}

function createUserBilling(course) {
    var token   = Cookies.get('__session');
    $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://api.fti.academy/api/order_billing/' + course + "/" + token,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            $.isLoading( "hide" );
            location.reload();
        },
        error: function(request,msg,error) {
            output = JSON.stringify(request.responseJSON)
        }
    });
}

function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s / 3600); //Get whole hours
    s -= h * 3600;
    var m = Math.floor(s / 60); //Get remaining minutes
    s -= m * 60;
    return h + ":" + (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s); //zero padding on minutes and seconds
}

function page(url) {
    location.href = url;
}

function printerPopup(url){
    console.log("Printer");
    $("<iframe id='printabel'>")
    .attr("src", url)
    .appendTo("body");
}

function hideAlert()
{
    $.isLoading( "hide" );
}

function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform ?? window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

function addLogs(user,page,type,status,mode)
{   
    var date   = new Date().getTime()/1000;
    //
    console.log( "Add Logs : " + user);
    var jsonObj = {
        "user": user,
        "data": {
            "date": date,
            "page": page,
            "status": status,
            "type": type,
            "mode": mode
        }
    }

    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/log',
        type : "POST",
        dataType: "json",
        contentType : "application/json",
        data: JSON.stringify(jsonObj),
        beforeSend: function(xhr) {},
        success: function(result) {},
        error: function(request,msg,error) {}
    });
}