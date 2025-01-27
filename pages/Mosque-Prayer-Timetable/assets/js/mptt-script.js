jQuery(document).ready(function(){
    
    jQuery(document).on('change', '.otherYear', function(){

        jQuery('.loader').toggleClass('hide');
        sel_year = jQuery(this).find(':selected').val();
        sel_month = jQuery('.otherMonth').find(':selected').val();
        
        data = {'action':'fulltabledata', 'year': sel_year, 'month': sel_month };
        jQuery.ajax({
            url:mptt_Ajax.ajaxurl,
            type: 'post',
            data: data,
            dataType: '',
            success: function(response){
                if(response == 0) {
                    //jQuery('.dttable tbody').html('<tr><td colspan="13">No Record Found</td></tr>');
                    jQuery('.dttable');
                    //jQuery('.loader').toggleClass('hide');
					getmonts(sel_year, sel_month);
                }
                else {
                    jQuery('.dttable tbody').html(response); 
                    jQuery('.loader').toggleClass('hide');
                }
            }
        });

    });

    jQuery(document).on('change', '.otherMonth', function(){

        jQuery('.loader').toggleClass('hide');
        sel_month = jQuery(this).find(':selected').val();
        sel_year = jQuery('.otherYear').find(':selected').val();
        
        data = {'action':'fulltabledata', 'year': sel_year, 'month': sel_month };
        jQuery.ajax({
            url:mptt_Ajax.ajaxurl,
            type: 'post',
            data: data,
            dataType: '',
            success: function(response){
                if(response == 0) {
                    jQuery('.dttable tbody').html('<tr><td colspan="13">No Record Found</td></tr>');
                    jQuery('.dttable');
                    jQuery('.loader').toggleClass('hide');
					getmonts(sel_year, sel_month);
                }
                else {
                    jQuery('.dttable tbody').html(response); 
                    jQuery('.loader').toggleClass('hide');
                }
            }
        });

    });
	
	function getmonts(year, month) {
        data = {'action':'getmonts', 'year': year, 'month': month };
        jQuery.ajax({
            url:mptt_Ajax.ajaxurl,
            type: 'post',
            data: data,
            dataType: '',
            success: function(response){
                if(response == 0) {
                    jQuery('.dttable tbody').html('<tr><td colspan="13">No Record Found</td></tr>');
                    jQuery('.dttable');
                    jQuery('.loader').toggleClass('hide');
                }
                else {
                    jQuery('.loader').toggleClass('hide');
                    jQuery('.otherMonth').html(response);
                    jQuery('.otherYear').trigger('change');
                }
            }
        });
    }
	
    // Conveting Current time to 12 Hrs Format time
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    //Getting Time Diffrence
    function startTimer (current, compare) {

        dd = moment(compare,"DD-MM-YYYY HH:mm:ss A").diff(moment(current,"DD-MM-YYYY HH:mm:ss A").format('YYYY-MM-DD hh:mm:ss'));
        //tt = moment.utc(dd).format('YYYY-MM-DD hh:mm:ss');
        ttsc = dd/1000;

        hours = Math.floor(ttsc / 3600);
        ttsc %= 3600;
        minutes = Math.floor(ttsc / 60);
        seconds = ttsc % 60;
        /*console.log('hours ' + hours);
        console.log('totalSeconds ' + ttsc);
        console.log('minutes ' + minutes);
        console.log('seconds ' + seconds);*/

       /* myArray = tt.split(" ");
        time = myArray[1].split(":");*/

        /*if(parseInt(time[2]) == 00 || parseInt(time[2]) == 0) {
            var d = new Date(); 
            time[2] = 60 - parseInt(d.getSeconds());
        }*/
		if(seconds == 00 || seconds == 0) {
            var d = new Date(); 
            seconds = 60 - parseInt(d.getSeconds());
        }
        runtime(hours, minutes, seconds);
        
    }
    //Time Calculations
    function timersetup() {
        if(jQuery('div').hasClass('mobile-widget') == true || jQuery('div').hasClass('home-widget') == true) {

            date = new Date(new Date().toLocaleString('en', {timeZone: 'Europe/London'}));
			//console.log(date);
            current_time = formatAMPM(date);
			//console.log(current_time);
            var year = date.getFullYear();
            var month = date.getMonth();
			var month = parseInt(date.getMonth())+1;
            var day = date.getDate();

            current_date = new Date(new Date(year +'/'+ month +'/'+ day +' ' + current_time + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));
			//console.log(current_date);
            fajr_start_time = new Date(new Date(year +'/'+ month +'/'+ day +' ' + jQuery('.prayer-fajr .prayer-start').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));
            fajr_end_time = new Date(new Date(year +'/'+ month +'/'+ day +' ' + jQuery('.prayer-fajr .prayer-jamaat').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));

            sunrise_start_time = new Date(new Date(year +'/'+ month +'/'+ day +' ' + jQuery('.prayer-sunrise .prayer-start').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));

            zuhr_start_time = new Date(new Date(year +'/'+ month +'/'+ day +' ' + jQuery('.prayer-zuhr .prayer-start').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));
            zuhr_end_time = new Date(new Date(year +' '+ month +'/'+ day +' ' + jQuery('.prayer-zuhr .prayer-jamaat').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));

            asr_start_time = new Date(new Date(year +'/'+ month +'/'+ day +' ' + jQuery('.prayer-asr .prayer-start').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));
            asr_end_time = new Date(new Date(year +'/'+ month +'/'+ day +' ' + jQuery('.prayer-asr .prayer-jamaat').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));

            maghrib_start_time = new Date(new Date(year +'/'+ month +'/'+ day +' ' + jQuery('.prayer-maghrib .prayer-start').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));
            maghrib_end_time = new Date(new Date(year +'/'+ month +'/'+ day +' ' + jQuery('.prayer-maghrib .prayer-jamaat').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));

            isha_start_time = new Date(new Date(year +'/'+ month +'/'+ day +' ' + jQuery('.prayer-isha .prayer-start').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));
            isha_end_time = new Date(new Date(year +'/'+ month +'/'+ day +' ' + jQuery('.prayer-isha .prayer-jamaat').text() + ' GMT+0100').toLocaleString('en', {timeZone: 'Europe/London'}));
            
            if ( current_date <  fajr_start_time) {
                startTimer(current_date,  fajr_start_time);
                jQuery('.nextPrayer').html('Fajr starts in');
                jQuery('.prayer-time').removeClass('highlight');
                jQuery('.prayer-fajr').addClass('highlight');
                jQuery('.timeLeftCountDown').removeClass('red');
            }
            else if ( current_date <  fajr_end_time) {
                startTimer(current_date,  fajr_end_time);
                jQuery('.nextPrayer').html('Fajr ends in');
                jQuery('.prayer-time').removeClass('highlight');
                jQuery('.prayer-fajr').addClass('highlight');
                jQuery('.timeLeftCountDown').addClass('red');
            }
            else if ( current_date <  sunrise_start_time) {
                startTimer(current_date,  sunrise_start_time);
                jQuery('.nextPrayer').html('Sunrise in');
                jQuery('.prayer-time').removeClass('highlight');
                jQuery('.prayer-sunrise').addClass('highlight');
            }
            else if ( current_date <  zuhr_start_time) {
                if(current_date.getDay() == 5) {
                    clearInterval;
                    jQuery('.tmm.dptScNextPrayer').html("<span>Jumu'ah</span>");
					jQuery('.prayer-time').removeClass('highlight');
                }
                else{
                    startTimer(current_date,  zuhr_start_time);
                    jQuery('.nextPrayer').html('Zuhr starts in');
                    jQuery('.prayer-time').removeClass('highlight');
                    jQuery('.prayer-zuhr').addClass('highlight');
                    jQuery('.timeLeftCountDown').removeClass('red');
                }
            }
            else if ( current_date <  zuhr_end_time) {
                startTimer(current_date,  zuhr_end_time);
                jQuery('.nextPrayer').html('Zuhr ends in');
                jQuery('.prayer-time').removeClass('highlight');
                jQuery('.prayer-zuhr').addClass('highlight');
                jQuery('.timeLeftCountDown').addClass('red');
            }
            else if ( current_date <  asr_start_time) {
                startTimer(current_date,  asr_start_time);
                jQuery('.nextPrayer').html('Asr starts in');
                jQuery('.prayer-time').removeClass('highlight');
                jQuery('.prayer-asr').addClass('highlight');
                jQuery('.timeLeftCountDown').removeClass('red');
            }
            else if ( current_date <  asr_end_time) {
                startTimer(current_date,  asr_end_time);
                jQuery('.nextPrayer').html('Asr ends in');
                jQuery('.prayer-time').removeClass('highlight');
                jQuery('.prayer-asr').addClass('highlight');
                jQuery('.timeLeftCountDown').addClass('red');
            }
            else if ( current_date <  maghrib_start_time) {
                startTimer(current_date,  maghrib_start_time);
                jQuery('.nextPrayer').html('Maghrib starts in');
                jQuery('.prayer-time').removeClass('highlight');
                jQuery('.prayer-maghrib').addClass('highlight');
                jQuery('.timeLeftCountDown').removeClass('red');
            }
            else if ( current_date <  maghrib_end_time) {
                startTimer(current_date,  maghrib_end_time);
                jQuery('.nextPrayer').html('Maghrib ends in');
                jQuery('.prayer-time').removeClass('highlight');
                jQuery('.prayer-maghrib').addClass('highlight');
                jQuery('.timeLeftCountDown').addClass('red');
            }
            else if ( current_date <  isha_start_time) {
                startTimer(current_date,  isha_start_time);
                jQuery('.nextPrayer').html('Isha starts in');
                jQuery('.prayer-time').removeClass('highlight');
                jQuery('.prayer-isha').addClass('highlight');
                jQuery('.timeLeftCountDown').removeClass('red');

            }
            else if ( current_date <  isha_end_time) {
                startTimer(current_date,  isha_end_time);
                jQuery('.nextPrayer').html('Isha ends in');
                jQuery('.prayer-time').removeClass('highlight');
                jQuery('.prayer-isha').addClass('highlight');
                jQuery('.timeLeftCountDown').addClass('red');
            }
            else {
                jQuery('.prayer-time').removeClass('highlight');
            }
        }
    }
    
    //Starting Timer
    function runtime(hours, minutes, seconds) {
       
        /*hrs = parseInt(time[0]);
        mins = parseInt(time[1]);
        secs = parseInt(time[2]);*/
        hrs = hours;
        mins = minutes;
        secs = seconds;

        if(hrs == 12 ) {
            hrs = 0;
        }

        setInterval(function(){
            secs = secs-1;
            if(secs < 0) {
                secs = 0;
            }
            if(secs == 0 && mins != 0) {
                mins = mins - 1;
                secs= 59;
            }
            if(mins == 0 && hrs != 0) {
                mins = 59
            }
            if(mins == 59 && hrs > 0 && secs == 59) {
                hrs--;
            }
            if(mins != 0 && hrs == 0) {
                hrs = 0;
            }
            if(mins == 0 && hrs == 0 && secs == 0) {
                clearInterval;
                timersetup();
            }
			if(hrs < 2 ){
				jQuery('.mobile-widget .dots-hrs').html('&nbsp;hr');
			   
			}
			if(mins < 2 ){
				jQuery('.mobile-widget .dots-min').html('&nbsp;min');
			   
			}
            jQuery('.hoursLeft').html(hrs);
            jQuery('.minsLeft').html(mins);
            jQuery('.secLeft').html(secs);
        },1000);
    }
    
    //Intilizing the Whole Process
    timersetup();
});