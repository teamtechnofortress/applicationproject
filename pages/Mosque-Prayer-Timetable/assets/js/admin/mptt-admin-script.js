jQuery(document).ready(function(){
    
    //Admin Recodrs datatable
    jQuery('.dttable').DataTable({
        "lengthChange": false,
        "pageLength": 31
    });
    jQuery('.color-picker').each(function(){
        jQuery(this).wpColorPicker();
});

       //deleting single record
    jQuery(document).on('click', '.deletemptt', function(e){
        e.preventDefault();
        id = jQuery(this).attr('data-id');

        data = {'action':'deletedata', 'id': id };
       	text = "Do you want to delete?";
        if(confirm(text) == true) {
            jQuery.ajax({
                url:ajaxurl,
                type: 'post',
                data: data,
                dataType: 'json',
                success: function(response){
                    if(response == 1) {
                        alert('Record Deleted');
                        location.reload();
                    }
                    else {
                        alert('Something went wrong please try again!');
                    }
                }
            });
        }
    });
	
	
	//editing single record
	jQuery(document).on('click', '.editmptt', function(e){
		e.preventDefault();
		id = jQuery(this).attr('data-id');

		data = {'action':'editdata', 'id': id };

		jQuery.ajax({
			url:ajaxurl,
			type: 'post',
			data: data,
			dataType: 'json',
			success: function(response){
				if(response != 0 ) {
					jQuery('.popup-container').removeClass('hide');

					jQuery('.popup-container .editdate').html(response[0]['daydate']);

					jQuery('.popup-container #rid').val(response[0]['id']);
					jQuery('.popup-container #Fajr_begins').val(response[0]['Fajr_begins']);
					jQuery('.popup-container #Fajr_jamat').val(response[0]['Fajr_jamat']);
					jQuery('.popup-container #Fajr_sunrise').val(response[0]['Fajr_sunrise']);
					jQuery('.popup-container #Zawal').val(response[0]['Zawal']);
					jQuery('.popup-container #Zuhr_begins').val(response[0]['Zuhr_begins']);
					jQuery('.popup-container #Zuhr_jamat').val(response[0]['Zuhr_jamat']);
					jQuery('.popup-container #Asr_begins').val(response[0]['Asr_begins']);
					jQuery('.popup-container #Asr_jamat').val(response[0]['Asr_jamat']);
					jQuery('.popup-container #Asr_mithl_1').val(response[0]['Asr_mithl_1']);
					jQuery('.popup-container #Asr_mithl_2').val(response[0]['Asr_mithl_2']);
					jQuery('.popup-container #Maghrib_begins').val(response[0]['Maghrib_begins']);
					jQuery('.popup-container #Maghrib_jamat').val(response[0]['Maghrib_jamat']);
					jQuery('.popup-container #Isha_begins').val(response[0]['Isha_begins']);
					jQuery('.popup-container #Isha_jamat').val(response[0]['Isha_jamat']);
					jQuery('.popup-container #currentmonth').val(response[0]['currentmonth']);
					jQuery('.popup-container #currentyear').val(response[0]['currentyear']);
					jQuery('.popup-container #daydate').val(response[0]['daydate']);
					jQuery('.popup-container #is_ramadan').val(response[0]['is_ramadan']);
					jQuery('.popup-container #dayname').val(response[0]['dayname']);
					//console.log(response);
				}
				else {
					alert('Something went wrong please try again!');
				}
			}
		});
	});

	//close dit popup
	jQuery(document).on('click', '.closepopup', function(e){
		jQuery('.popup-container').toggleClass('hide');

	});

    //importing the timetable records 
    jQuery(document).on('click', '#importmptt', function(e){

        e.preventDefault();
        jQuery('.processing').removeClass('hide');

        var fileUpload = document.getElementById("file");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                        
                data2 = [];
                
                var reader = new FileReader();
                reader.readAsText(fileUpload.files[0]);
                reader.onload = function (e) {
                    //console.log(reader.result);
                    //console.log(reader.result.split("\n"));

                    dt = reader.result.split("\n");
                    console.log(dt.length);
                    for(i=0; i < dt.length; i++ ) {
                        dr = dt[i].split(",");
                        //console.log('dr');
                        //console.log(dr);
                        queryStr = { i : dr };
                        data2.push(dr);
                        
                    }
                    //console.log('data2');
             
				   console.log(data2.length);
                   data1 = {'action':'importdata', 'data': data2 };
                    jQuery.ajax({
                        url:ajaxurl,
                        type: 'post',
                        data: data1,
                        dataType: '',
                        success: function(response){
                            console.log(response);
                            if(response > 0 ) {
                                jQuery('.processing').addClass('hide');
                                setTimeout(function(){
                                    alert('Import Successful.');
                                    jQuery('#mpttform')[0].reset();
                                },1000);
                            }
                        }
                    });
                    
                }
                
            } else {
                jQuery('.processing').addClass('hide');
                alert("This browser does not support HTML5.");
            }
        } else {
            jQuery('.processing').addClass('hide');
            alert("Please upload a valid CSV file.");
        }
    });

});