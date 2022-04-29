function getdashboard() 
{
    $.isLoading({text: "กำลังโหลดข้อมูลกรุณารอสักครู่ ..."});
    $.ajax(
    {
        url: 'https://player.fti.academy/api/get_all_student/',
        type : "GET",
        dataType: "json",
        contentType : "text/plain",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("API-KEY", "5CB584F5ECFD7");
            xhr.setRequestHeader("SECRET-KEY", "6A5891C7352197F8A5CE8A9B67EF3");
        },
        success: function(result) {
            $.isLoading( "hide" );

            $(".register").html(result.register);
            $(".take_exam").html(result.take_exam);
            $(".take_exam_percent").html(result.take_exam_percent);
            $(".zero").html(result.zero);
            $(".under_49").html(result.under_49);
            $(".under_75").html(result.under_75);
            $(".over_75").html(result.over_75);
            $(".take_exam_round_1").html(result.take_exam_round_1);
            $(".take_exam_round_2").html(result.take_exam_round_2);
            $(".finish_100").html(result.finish_100);
            $(".noaccess").html(result.noaccess);
            
        },
        error: function(request,msg,error) {
                
            output = JSON.stringify(request.responseJSON)
            // Login undefined
            if(request.status===0){
                //location.reload();
                getdashboard()
            }
            else if(request.status===500){
                //location.reload();
                getdashboard()
            }
            else{
                errorMSG = request.responseJSON;
            }
        }

    });
}