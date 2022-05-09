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

function __session(pagename){
    var token   = Cookies.get('__session');

    var pathname = window.location.pathname;
    pathname = pathname.replace("/", "");
    pathname = pathname.replace(".html", "");
    console.log(pathname);
    if (token == undefined) {
        //window.location.href="index.html";
    } else {
        if(pathname!=pagename)
        {
            //window.location.href="student.html";
        }
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
                
                /*
                var permissionData = readPermission(student.permission.student_id);
                if(permissionData == student.permission.student_id){
                    //console.log("Student Has Data");
                }else{
                    var permission = {};
                    permission['sid'] = student.permission.student_id;
                    permission['pid'] = student.permission.permission_id;
                    permission['code'] = student.permission.permission_code;
                    permission['student'] = student.permission.student_id;
                    permission['lesson'] = student.permission.lesson_id;
                    permission['timer'] = student.permission.permission_timer;
                    permission['percent'] = student.permission.permission_percent;
                    permission['adddate'] = student.permission.permission_adddate;
                    permission['expire'] = student.permission.permission_expire;
                    addPermission(permission);
                }
                */
                
                // Clear Answer
                localStorage.removeItem("__exam");
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
                window.location.href="register_confirm.php?token=" + result.token;
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

function openPaymentURL()
{
    var url = $("#payment_url").val();
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
            window.location.href="student.php";
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

function getFirebasePlayer()
{   
    var token   = Cookies.get('__session');
    var course  = localStorage.getItem('__course');
    $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course?user=' + token + '&course=215',
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
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

            console.log(result.data.players)

            $.each(result.data.players, function (key, item){
                $("#topic-table").append(
                "<tr class='topic-" + item.status + "' id='" + item.uid + "'>"
                    +"<th class='p-3'>"
                        +"<div class='align-items-center'>"
                            +"<i class='" + item.typeicon + " h6'></i>"
                            +"<p class='mb-0 d-inline fw-normal h6 ms-1'><a href='play.html?token=" + item.uid + "' class='' title='" + item.title + "' data-bs-toggle='tooltip' data-bs-placement='top'>" + item.title + "</a></p>"
                            +"<p class='mb-0 d-inline fw-normal'> " + item.current + " </p>"
                            +"<p class='mb-0 d-inline fw-normal topic-duration-badge'> " + item.duration + " </p>"
                        +"</div>"
                    +"</th>"
                    +"<td class='p-3 text-end'><i class='" + item.icon + "'></i> <span class='icon_percent'>" + item.status + "</span></td>"
                +"</tr>"
                )
            });
        },
        error: function(request,msg,error) {
        }
    });
}


function getFirebasePlayerTopic()
{   
    var code    = $.urlParam('token');
    var token   = Cookies.get('__session');
    var course  = localStorage.getItem('__course');
    $.isLoading({text: "กำลังดึงข้อมูล ขั้นตอนนี้อาจจะใช้เวลา 1-2 นาที</br>กรุณารอสักครู่ ..."});
    $.ajax({
        url: 'https://asia-southeast1-academy-f0925.cloudfunctions.net/api/user/course/player?user=' + token + '&course=215&player=' + code,
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            $.isLoading( "hide" );
            // handle success
            $("#topic_video_source").val(result.data.video);
        },
        error: function(request,msg,error) {
        }
    });
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

function getCerification(){   

    var token  = $.urlParam('token');
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});

    $.ajax({
        url: 'https://api.fti.academy/api/getcertification/' + token,
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

            $(".certdata").html("65-01-" + result.certification.cert_id );

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

function renderProfile(){
    var student = Cookies.get('__student');
    var student = JSON.parse(student);

    if(student.exam_round_date !== null && student.exam_round_date !== ''  && student.exam_round_date!==undefined){
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
    }else{
        getProfile();

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
    }
    //--- Student Notification
    notification();
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
    if(student.exam_round==="รอบที่ 1"){
        $("input[name=order_exam_round][value='1']").prop("checked",true);
    }else if(student.exam_round==="รอบที่ 2"){
        $("input[name=order_exam_round][value='2']").prop("checked",true);
    }
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
    var access      = localStorage.getItem('__access');
    var access      = JSON.parse(access);
    var student     = Cookies.get('__student');
    var student     = JSON.parse(student);
    var studentID   = student.permission.student_id;

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
                var answer = {};
                answer['quiz']    = root;
                answer['answer']  = inner;
                addAnswer(dataRow.key,studentID,answer);
              }
            });
        });
    });

    */

    /*
    var ref         = firebase.database().ref('data/' + studentID + '/exam/');
    var query       = ref.orderByChild('contest').equalTo(access.contest_id);
    query.once('value', function(snapshot) {
        if (snapshot.exists()){
            var arr = snapshot.val();
            var arr2 = Object.keys(arr);
            var key = arr2[0];
            var answer = {};
            answer['quiz']    = root;
            answer['answer']  = inner;
            addAnswer(key,studentID,answer);
        }
    });

    */
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