<?php
	@ini_set( 'max_input_vars' , 50000 );
    $message = '';
    global $wpdb;
    $table = $wpdb->prefix . 'mptt';

    $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

    

    if(isset($_POST['updatedate'])) {

        $id = $_POST['id'];
        $Fajr_begins = $_POST['Fajr_begins'];
        $Fajr_jamat = $_POST['Fajr_jamat'];
        $Fajr_sunrise = $_POST['Fajr_sunrise'];
        $Zawal = $_POST['Zawal'];
        $Zuhr_begins = $_POST['Zuhr_begins'];
        $Zuhr_jamat = $_POST['Zuhr_jamat'];
        $Asr_begins = $_POST['Asr_begins'];
        $Asr_jamat = $_POST['Asr_jamat'];
        $Asr_mithl_1 = $_POST['Asr_mithl_1'];
        $Asr_mithl_2 = $_POST['Asr_mithl_2'];
        $Maghrib_begins = $_POST['Maghrib_begins'];
        $Maghrib_jamat = $_POST['Maghrib_jamat'];
        $Isha_begins = $_POST['Isha_begins'];
        $Isha_jamat = $_POST['Isha_jamat'];
        $currentmonth = $_POST['currentmonth'];
        $currentyear = $_POST['currentyear'];
        $daydate = $_POST['daydate'];
        $is_ramadan = $_POST['is_ramadan'];
        $dayname = $_POST['dayname'];
        
        $data = array(
            'Fajr_begins' => $_POST['Fajr_begins'],
            'Fajr_jamat' => $_POST['Fajr_jamat'],
            'Fajr_sunrise' => $_POST['Fajr_sunrise'],
            'Zawal' => $_POST['Zawal'],
            'Zuhr_begins' => $_POST['Zuhr_begins'],
            'Zuhr_jamat' => $_POST['Zuhr_jamat'],
            'Asr_begins' => $_POST['Asr_begins'],
            'Asr_jamat' => $_POST['Asr_jamat'],
            'Asr_mithl_1' => $_POST['Asr_mithl_1'],
            'Asr_mithl_2' => $_POST['Asr_mithl_2'],
            'Maghrib_begins' => $_POST['Maghrib_begins'],
            'Maghrib_jamat' => $_POST['Maghrib_jamat'],
            'Isha_begins' => $_POST['Isha_begins'],
            'Isha_jamat' => $_POST['Isha_jamat'],
            'currentmonth' => $_POST['currentmonth'],
            'currentyear' => $_POST['currentyear'],
            'daydate' => $_POST['daydate'],
            'is_ramadan' => $_POST['is_ramadan'],
            'dayname' => $_POST['dayname']
        );

        $where = array(
            'id' => $id
        );
        $updated = $wpdb->update( $table, $data, $where );

        if ( false === $updated ) {
            $message = "<span style='color:red;font-size:20px;'>Something went wrong, please try again.</span>";
        } else {
            $message = "<span style='color:green;font-size:20px;'>Record updated.</span>";
        }
    }

    $result = $wpdb->get_results( "SELECT * FROM $table ORDER BY id DESC" );

?>
<div class="mptt-admin">
    <h2>Mosque Prayer Timetable List</h2>
    <div class="message" style="font-size:20px;text-align:center;"><?php echo $message; ?></div>
    <table class="dttable">
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th colspan="2">Fajr</th>
                <th></th>
				<th></th>
                <th colspan="2">Zuhr</th>
                <th colspan="2">Asr</th>
                <th colspan="2">Maghrib</th>
                <th colspan="2">Isha</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>Day</th>
                <th>Begins</th>
                <th>Jamat</th>
                <th>Sunrise</th>
                <th>Zawal</th>
                <th>Begins</th>
                <th>Jamat</th>
                <th>Begins</th>
                <th>Jamat</th>
                <th>Begins</th>
                <th>Jamat</th>
                <th>Begins</th>
                <th>Jamat</th>
                <th>Ramadan</th>
                <th>Month</th>
                <th>Year</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
<?php
    if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        $url = "https://";   
    }
    else  {
        $url = "http://";   
    }
    // Append the host(domain name, ip) to the URL.   
    $url.= $_SERVER['HTTP_HOST'];   

    // Append the requested resource location to the URL   
    $url.= $_SERVER['REQUEST_URI'];
    $data = '';
    $count = 1;
    for($i=0; $i < count($result); $i++) {

        $data .='<tr>
                    <td>'.$count++.'</td>
                    <td>'.$result[$i]->daydate.'</td>
                    <td>'.$result[$i]->dayname.'</td>
                    <td>'.$result[$i]->Fajr_begins.'</td>
                    <td>'.$result[$i]->Fajr_jamat.'</td>
                    <td>'.$result[$i]->Fajr_sunrise.'</td>
                    <td>'.$result[$i]->Zawal.'</td>
                    <td>'.$result[$i]->Zuhr_begins.'</td>
                    <td>'.$result[$i]->Zuhr_jamat.'</td>
                    <td>'.$result[$i]->Asr_begins.'</td>
                    <td>'.$result[$i]->Asr_jamat.'</td>
                    <td>'.$result[$i]->Maghrib_begins.'</td>
                    <td>'.$result[$i]->Maghrib_jamat.'</td>
                    <td>'.$result[$i]->Isha_begins.'</td>
                    <td>'.$result[$i]->Isha_jamat.'</td>
                    <td>'.$result[$i]->is_ramadan.'</td>
                    <td>'.$result[$i]->currentmonth.'</td>
                    <td>'.$result[$i]->currentyear.'</td>
                    <td><a class="editmptt" href="javascript:void();" data-id="'.$result[$i]->id.'">EDIT</a> | <a class="deletemptt" href="'.$url.'?dlid='.$result[$i]->id.'" data-id="'.$result[$i]->id.'">DELETE</a></td>
                </tr>';
    }

    echo $data;
?>

        </tbody>
        <tfoot></tfoot>
    </table>
    <div class="popup-container hide">
        <span class="closepopup">&times;</span>
        <div class="editpopup">
            <div class="editdate"></div>
            <form class="editform" method="post" action="<?php echo $actual_link ; ?>">
                <div class="popupbody">
                    <div class="">
                        <input type="hidden" name="id" id="rid">
                    </div>
                    <div class="form-field">
                        <label>Fajr begins</label>
                        <input type="text" name="Fajr_begins" id="Fajr_begins">
                    </div>
                    <div class="form-field">
                        <label>Fajr jamat</label>
                        <input type="text" name="Fajr_jamat" id="Fajr_jamat">
                    </div>
                    <div class="form-field">
                        <label>Sunrise</label>
                        <input type="text" name="Fajr_sunrise" id="Fajr_sunrise">
                    </div>
                    <div class="form-field">
                        <label>Zawal</label>
                        <input type="text" name="Zawal" id="Zawal">
                    </div>
                    <div class="form-field">
                        <label>Zuhr begins</label>
                        <input type="text" name="Zuhr_begins" id="Zuhr_begins">
                    </div>
                    <div class="form-field">
                        <label>Zuhr jamat</label>
                        <input type="text" name="Zuhr_jamat" id="Zuhr_jamat">
                    </div>
                    <div class="form-field">
                        <label>Asr begins</label>
                        <input type="text" name="Asr_begins" id="Asr_begins">
                    </div>
                    <div class="form-field">
                        <label>Asr jamat</label>
                        <input type="text" name="Asr_jamat" id="Asr_jamat">
                    </div>
                    <div class="form-field">
                        <label>Asr mithl 1</label>
                        <input type="text" name="Asr_mithl_1"  id="Asr_mithl_1">
                    </div>
                    <div class="form-field">
                        <label>Asr mithl 2</label>
                        <input type="text" name="Asr_mithl_2" id="Asr_mithl_2">
                    </div>
                    <div class="form-field">
                        <label>Maghrib begins</label>
                        <input type="text" name="Maghrib_begins" id="Maghrib_begins">
                    </div>
                    <div class="form-field">
                        <label>Maghrib jamat</label>
                        <input type="text" name="Maghrib_jamat" id="Maghrib_jamat">
                    </div>
                    <div class="form-field">
                        <label>Isha begins</label>
                        <input type="text" name="Isha_begins" id="Isha_begins">
                    </div>
                    <div class="form-field">
                        <label>Isha jamat</label>
                        <input type="text" name="Isha_jamat" id="Isha_jamat">
                    </div>
                    <div class="form-field">
                        <label>Current month</label>
                        <input type="text" name="currentmonth" id="currentmonth" readonly>
                    </div>
                    <div class="form-field">
                        <label>Current year</label>
                        <input type="text" name="currentyear" id="currentyear" readonly>
                    </div>
                    <div class="form-field">
                        <label>Date</label>
                        <input type="text" name="daydate" id="daydate"  readonly>
                    </div>
                    <div class="form-field">
                        <label>Ramadan</label>
                        <input type="text" name="is_ramadan" id="is_ramadan">
                    </div>
                    <div class="form-field">
                        <label>Day name</label>
                        <input type="text" name="dayname" id="dayname" readonly>
                    </div>
                </div>
                <div class="popupfooter">
                    <div class="form-field field-submit">
                        <input type="submit" value="Update" name="updatedate" class="updatedate">
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
