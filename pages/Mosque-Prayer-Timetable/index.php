<?php
	/**
	 * @package TimeTable
	 *
	 *
	 * Plugin Name: Mosque Prayer Timetable
	 * Plugin URI: singh.sukhjinder40atgmail.com
	 * Description: Show Mosque Prayer Timetable For mobile and Desktop with full and partial view.
	 * Version: 1.0
	 * Author: Sukhjinder singh
	 * Author URI: singh.sukhjinder40 at gmail.com
	 * License: GPLv2 or later
	*/
	@ini_set( 'max_input_vars' , 500000 );
    //Plugin admin menu
	function mptt_menu() {

		//Adding Menu Links
		add_menu_page('Mosque Prayer Timetable', 'Mosque Prayer Timetable', 'manage_options', 'mosque-prayer-timetable', 'mosque_prayer_timetable', '');
		add_submenu_page( 'mosque-prayer-timetable', 'Upload Timetable', 'Upload Timetable', 'manage_options', 'import-timetable', 'import_data');
		add_submenu_page( 'mosque-prayer-timetable', 'Settings', 'Settings', 'manage_options', 'mptt-settings', 'mptt_settings');
		add_submenu_page( 'mosque-prayer-timetable', 'Help', 'Help', 'manage_options', 'mptt-help', 'mptt_help');			
	}
	add_action('admin_menu', 'mptt_menu');

    //Creating table for the pluign while pluign activation
	function mptt_installation_process() {

		register_setting( 'mpttsettings', 'mptt_settings' );

        $settings = array(
            'mobile-widget' => array (
                'borderwidth' => '1',
                "bgcolor" => '#004940',
                'bordercolor' => '#134a43',
                'titlecolor' => '#d3b362',
                'iconcolor' => '#ffffff',
                'textcolor' => '#d3b362',
                'iconcolor' => '#ffffff',
                'iconsize' => '30',
                'textsize' => '18',
                'timesize' => '14',
                'headingsize' => '29',
                'cdatecolor' => '#d3b362',
                'cdatesize' => '18'
            ),
            'mobile-widget-timer' => array (
                'borderwidth' => '2',
                'bordercolor' => '#d3b362',
                'borderradius' => '100',
                'titlecolor' => '#d3b362',
                'titlesize' => '18',
            ),
            'mobile-widget-highlight' => array (
                "bgcolor" => '#004038',
                'titlecolor' => '#ffffff',
                'iconcolor' => '#ffffff',
                'textcolor' => '#ffffff',
                'iconcolor' => '#ffffff',
            ),
            'full-view' => array(
                'borderwidth'=> '1',
                'bordercolor'=> '#d3d3d3',
                'tbhdcolor'=> '#ffffff',
                'tbhdbgcolor'=> '#004940',
                'jamatbgcolor'=> '#eaeaea',
				'jumuahcolor'=> '#000000',
				'jumuahbgcolor' => '#d3b362'
            ),
            'links' => array(
                'mobilewidget' =>'',
                'fulltable' => ''
			),
            'other-settings' => array(
                'ramadanbgcolor' => '#f3f3f3',
                'ramadantextcolor' => '#000000',
                'todaybgcolor' => '#cecece',
                'todaytextcolor' => '#000000',
				'timerleftcolor' => '#ff0000',
                'mobileicon' => ''
            )
        );
		update_option( 'mptt_settings', $settings );

		global $wpdb;
        global $mptt_db_version;

        $table_name = $wpdb->prefix . 'mptt';
        
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id int(9) NOT NULL AUTO_INCREMENT,
			daydate text NOT NULL,
			dayname text NOT NULL,
			Fajr_begins text NOT NULL,
			Fajr_jamat text NOT NULL,
			Fajr_sunrise text NOT NULL,
			Zawal text NOT NULL,
			Zuhr_begins text NOT NULL,
			Zuhr_jamat text NOT NULL,
			Asr_begins text NOT NULL,
			Asr_jamat text NOT NULL,
			Asr_mithl_1 text NOT NULL,
			Asr_mithl_2 text NOT NULL,
			Maghrib_begins text NOT NULL,
			Maghrib_jamat text NOT NULL,
			Isha_begins text NOT NULL,
			Isha_jamat text NOT NULL,
			is_ramadan int(11) NOT NULL,
			currentyear text NOT NULL,
			currentmonth text NOT NULL,
			createdat datetime NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta( $sql );

        add_option( 'mptt_db_version', $mptt_db_version );
	}
	register_activation_hook( __FILE__,'mptt_installation_process');

	//Displaying the all the data in admin
	function mosque_prayer_timetable() {
		include('all-data.php');
		return;
	}

	//Importing the Timetbale sheet 
	function import_data() {
		include('import_data.php');
		return;

	}
	function mptt_settings() {
		include('settings.php');
	}
	function mptt_help() {
		include('mptt-help.php');
	}
	
	//Loading pluign frontend scripts and stylesheet
	function mptt_scripts() {
		wp_register_style( 'mptt-style', plugin_dir_url(__FILE__). '/assets/css/mptt-style.css', array(), '1.0.0', 'all' );
		wp_enqueue_style('mptt-style');

		wp_register_style( 'mptt-icon-style', plugin_dir_url(__FILE__). '/assets/weather-icons/css/weather-icons.min.css', array(), '1.0.0', 'all' );
		wp_enqueue_style('mptt-icon-style');

		wp_register_style( 'mptt-icon-wind-style', plugin_dir_url(__FILE__). '/assets/weather-icons/css/weather-icons-wind.min.css', array(), '1.0.0', 'all' );
		wp_enqueue_style('mptt-icon-wind-style');

		/*wp_enqueue_script( 'mptt-script', plugin_dir_url( __FILE__). '/assets/js/mptt-script.js', array('jquery'), '1.0.', true );
		wp_localize_script( 'mptt-script', 'mptt_Ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ));
		wp_enqueue_script( 'mptt-script' );*/

		wp_enqueue_script( 'moment-js', plugin_dir_url(__FILE__).'/assets/js/moment.js', array('jquery'), null, true );
		wp_enqueue_script( 'moment-timezone-js', plugin_dir_url(__FILE__).'/assets/js/moment-timezone-with-data.js', array('jquery'), null, true );
		//wp_enqueue_script( 'sticky-header-js', plugin_dir_url(__FILE__).'/assets/js/bundle.min.js', array('jquery'), null, true );
		wp_enqueue_script( 'my-script', plugin_dir_url(__FILE__).'/assets/js/mptt-script.js', array('jquery'), null, true );
		$variables = array(
			'ajaxurl' => admin_url( 'admin-ajax.php' )
		);
		wp_localize_script('my-script', "mptt_Ajax", $variables);

	}
	add_action( 'wp_enqueue_scripts', 'mptt_scripts' );


	//Loding pluign abckend scripts nedded in admin
	add_action( 'admin_enqueue_scripts', 'mptt_enqueue_admin_scripts' );
	function mptt_enqueue_admin_scripts( $hook_suffix ) {
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker');
		wp_enqueue_script( 'iris', admin_url( 'js/iris.min.js' ), array( 'jquery-ui-draggable', 'jquery-ui-slider', 'jquery-touch-punch' ), false, 1 );
		wp_enqueue_script( 'mptt-admin-script', plugin_dir_url( __FILE__). '/assets/js/admin/mptt-admin-script.js', array('jquery'), '1.0.', true );
		wp_localize_script( 'mptt-admin-script', 'mpttAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ));
		wp_enqueue_script( 'mptt-admin-script' );

		wp_enqueue_script( 'datatable-js', plugin_dir_url( __FILE__). '/assets/js/admin/datatables.min.js', array('jquery'), '1.0.', true );		
		wp_register_style( 'datatable-css', plugin_dir_url(__FILE__). '/assets/css/admin/datatables.min.css', array(), '1.0.0', 'all' );
		wp_enqueue_style('datatable-css');
		wp_register_style( 'mptt-admin-style', plugin_dir_url(__FILE__). '/assets/css/admin/mptt-admin-style.css', array(), '1.0.0', 'all' );
		wp_enqueue_style('mptt-admin-style');
		

	}

	add_action('wp_head', 'mptt_add_dynamic_css');
	function mptt_add_dynamic_css(){
		require('assets/css/dynamic-css.php');
	}

	function deletedata() {
	
		if(	isset($_POST['id'])) {
			global $wpdb;
			$table = $wpdb->prefix . 'mptt';
				$dlid = $_POST['id'];
				$dr = $wpdb->delete( $table, array( 'id' => $dlid ) );
		
		}
		
		echo $dr;
		exit;
	}
	add_action( 'wp_ajax_deletedata', 'deletedata' );
	add_action( 'wp_ajax_nopriv_deletedata', 'deletedata' );

	//Record edit function
	function editdata() {
	
		if(	isset($_POST['id'])) {
			global $wpdb;
			$table = $wpdb->prefix . 'mptt';
			$edid = $_POST['id'];
			$dr = $wpdb->get_results( "SELECT * FROM $table WHERE id='$edid'" );
		}
		
		echo wp_json_encode($dr);
		exit;
	}
	add_action( 'wp_ajax_editdata', 'editdata' );
	add_action( 'wp_ajax_nopriv_editdata', 'editdata' );

	function importdata() {
	
		if(	isset($_POST['data'])) {
			
			global $wpdb;
			
			$arr = $_POST['data'];
			
			$table = $wpdb->prefix . 'mptt';
			$wpdb->query("TRUNCATE TABLE $table");
			$format = array('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%d','%d','%d');
			$currentdate = date('Y-m-d H:i:s A');
			
			for($j = 1; $j < count($arr); $j++) {
				//print_r($arr[$j]);exit;
				if(!empty($arr[$j][0])) {
					
					$d = str_replace('/', '-',strval($arr[$j][0])); 

					$date =  date('jS F Y', strtotime($d));
					//$date1 = $arr[$j][11];
					$dayname = date('D', strtotime($d));

					$wpdb->insert($table, array(
						'daydate' => strval($date), 
						'dayname' => $dayname, 
						'Fajr_begins' => strval(date("g:i A", strtotime($arr[$j][1]))), 
						'Fajr_jamat' => strval(date("g:i A", strtotime($arr[$j][2]))), 
						'Fajr_sunrise' => strval(date("g:i A", strtotime($arr[$j][3]))), 
						'Zawal' => strval(date("g:iA", strtotime($arr[$j][4]))), 
						'Zuhr_begins' => strval(date("g:i A", strtotime($arr[$j][5]))), 
						'Zuhr_jamat' => strval(date("g:i A", strtotime($arr[$j][6]))),
						'Asr_mithl_1' => strval(date("g:i A", strtotime($arr[$j][7]))), 
						'Asr_mithl_2' => strval(date("g:i A", strtotime($arr[$j][8]))),  
						'Asr_begins' => strval(date("g:i A", strtotime($arr[$j][8]))), 
						'Asr_jamat' => strval(date("g:i A", strtotime($arr[$j][9]))), 
						'Maghrib_begins'=> strval(date("g:i A", strtotime($arr[$j][10]))), 
						'Maghrib_jamat' => strval(date("g:i A", strtotime($arr[$j][11]))), 
						'Isha_begins' => strval(date("g:i A", strtotime($arr[$j][12]))), 
						'Isha_jamat' => strval(date("g:i A", strtotime($arr[$j][13]))), 
						'is_ramadan' => strval($arr[$j][14]), 
						'currentyear' => date("Y", strtotime($date)), 
						'currentmonth' => date("F", strtotime($date)), 
						'createdat'=>  $currentdate
					)
					);
					//echo $wpdb->last_error;
				}

			}	
		
		}
		
		echo $wpdb->insert_id;
		//print_r($test);
		//echo $days;
		exit;
	}
	add_action( 'wp_ajax_importdata', 'importdata' );
	add_action( 'wp_ajax_nopriv_importdata', 'importdata' );


	function mobilewidget() {
		$global_settings = get_option( 'mptt_settings');
		global $wpdb;
		$table = $wpdb->prefix . 'mptt';
		$date = date('jS F Y');
		$sql = "SELECT * FROM $table WHERE daydate ='$date'";
		$result = $wpdb->get_results($sql);
		/*echo "<pre>result";
		echo 'fgldfgkdfgdfg';
		print_r(count($result));
		echo "</pre>";*/
			$data = '
				<div class="mobile-widget">
					<div class="current-date">'.$date.'</div>
					<div class="timer">
						<span class="tmm dptScNextPrayer">
							<span class="">
								<span class="nextPrayer"></span> 
								<span class="timeLeftCountDown timeLeft red">
									<span class="hoursLeft">0</span><span class="dots-hrs">&nbsp;hrs</span>
									<span class="minsLeft">0</span><span class="dots-min">&nbsp;mins</span>
									<span class="secLeft">0</span><span class="dots-sec">&nbsp;secs</span>
								</span>
							</span>
						</span>
					</div>
					<div class="mptt-wrapper-container">
						<div class="prayer-time prayer-fajr highlight">
							<i class="wi wi-horizon-alt"></i>
							<h3 class="mptt-sec-title" "id="fajrRamadhan">Fajr</h3>
							<div class="prayer-start">'.$result[0]->Fajr_begins.'</div>
							<div class="prayer-jamaat">'.$result[0]->Fajr_jamat.'</div>
						</div>
						<div class="prayer-time prayer-sunrise">
							<i class="wi wi-sunrise"></i>
							<h3 class="mptt-sec-title" "id="Sunrise">Sunrise</h3>
							<div class="prayer-start">'.$result[0]->Fajr_sunrise.'</div>
						</div>
						<div class="prayer-time prayer-zuhr">
							<i class="wi wi-day-sunny"></i>
							<h3 class="mptt-sec-title" "id="Zuhr">Zuhr</h3>
							<div class="prayer-start">'.$result[0]->Zuhr_begins.'</div>
							<div class="prayer-jamaat">'.$result[0]->Zuhr_jamat.'</div>
						</div>
						<div class="prayer-time prayer-asr">
							<i class="wi wi-day-light-wind"></i>
							<h3 class="mptt-sec-title" "id="Asr">Asr</h3>
							<div class="prayer-start">'.$result[0]->Asr_begins.'</div>
							<div class="prayer-jamaat">'.$result[0]->Asr_jamat.'</div>
						</div>
						<div class="prayer-time prayer-maghrib">
							<i class="wi wi-sunset"></i>
							<h3 class="mptt-sec-title" "id="Maghrib">Maghrib</h3>
							<div class="prayer-start">'.$result[0]->Maghrib_begins.'</div>
							<div class="prayer-jamaat">'.$result[0]->Maghrib_jamat.'</div>
						</div>					
						<div class="prayer-time prayer-isha">
							<i class="wi wi-moon-alt-waxing-crescent-3"></i>
							<h3  class="mptt-sec-title" id="Isha">Isha</h3>
							<div class="prayer-start">'.$result[0]->Isha_begins.'</div>
							<div class="prayer-jamaat">'.$result[0]->Isha_jamat.'</div>
						</div>
					</div>
					<div class="bottomlinks"><a href="/">Visit main site</a> | <a href="'.$global_settings["links"]['fulltable'].'">Full timetable</a></div>
				</div>
			';
		return $data;

	}
	add_shortcode('mobile-widget','mobilewidget');

	function homewidget() {
		$global_settings = get_option( 'mptt_settings');
		global $wpdb;
		$table = $wpdb->prefix . 'mptt';
		$date = date('jS F Y');
		$sql = "SELECT * FROM $table WHERE daydate ='$date'";
		$result = $wpdb->get_results($sql);
		/*echo "<pre>result";
		echo 'fgldfgkdfgdfg';
		print_r(count($result));
		echo "</pre>";*/
			$data = '
				<div class="home-widget">
						<div class="current-date">
						<span class="tdate">'.$date.'</span>
						<span>
							<a id="link-59-30" class="ct-link mobileTimetable-button" href="'.$global_settings["links"]['mobilewidget'].'">
								<img src="'.$global_settings["other-settings"]["mobileicon"].'"></a></span><span class="link">
							</a>
							<a href="'.$global_settings["links"]['fulltable'].'">Full Timetable</a>
						</span>
					</div>
					<div class="mptt-wrapper-container">
						<div class="prayer-time prayer-fajr highlight">
							<i class="wi wi-horizon-alt"></i>
							<h3 class="mptt-sec-title" "id="fajrRamadhan">Fajr</h3>
							<div class="prayer-start">'.$result[0]->Fajr_begins.'</div>
							<div class="prayer-jamaat">'.$result[0]->Fajr_jamat.'</div>
						</div>
						<div class="prayer-time prayer-sunrise">
							<i class="wi wi-sunrise"></i>
							<h3 class="mptt-sec-title" "id="Sunrise">Sunrise</h3>
							<div class="prayer-start">'.$result[0]->Fajr_sunrise.'</div>
						</div>
						<div class="prayer-time prayer-zuhr">
							<i class="wi wi-day-sunny"></i>
							<h3 class="mptt-sec-title" "id="Zuhr">Zuhr</h3>
							<div class="prayer-start">'.$result[0]->Zuhr_begins.'</div>
							<div class="prayer-jamaat">'.$result[0]->Zuhr_jamat.'</div>
						</div>
						<div class="prayer-time prayer-asr">
							<i class="wi wi-day-light-wind"></i>
							<h3 class="mptt-sec-title" "id="Asr">Asr</h3>
							<div class="prayer-start">'.$result[0]->Asr_begins.'</div>
							<div class="prayer-jamaat">'.$result[0]->Asr_jamat.'</div>
						</div>
						<div class="prayer-time prayer-maghrib">
							<i class="wi wi-sunset"></i>
							<h3 class="mptt-sec-title" "id="Maghrib">Maghrib</h3>
							<div class="prayer-start">'.$result[0]->Maghrib_begins.'</div>
							<div class="prayer-jamaat">'.$result[0]->Maghrib_jamat.'</div>
						</div>					
						<div class="prayer-time prayer-isha">
							<i class="wi wi-moon-alt-waxing-crescent-3"></i>
							<h3  class="mptt-sec-title" id="Isha">Isha</h3>
							<div class="prayer-start">'.$result[0]->Isha_begins.'</div>
							<div class="prayer-jamaat">'.$result[0]->Isha_jamat.'</div>
						</div>
					</div>
				</div>
			';
		return $data;

	}
	add_shortcode('home-widget','homewidget');

	function full_timetable_widget() {
		$months = array('January','February','March','April','May','June','July','August','September','October','November','December');
		$currentmnts = array();
		global $wpdb;
		$table = $wpdb->prefix . 'mptt';
		$date = date('jS F Y');
		$month = date('F', strtotime($date));
		
		$year = date('Y', strtotime($date));

		$sql = "SELECT * FROM $table WHERE currentyear = '$year' AND currentmonth = '$month'";
		$result = $wpdb->get_results($sql);

		$sql1 = "SELECT DISTINCT currentyear FROM $table ORDER BY currentyear ASC";
		$result1 = $wpdb->get_results($sql1);

		$sql2 = "SELECT DISTINCT currentmonth FROM $table WHERE currentyear= '$year' ORDER BY currentmonth ASC";
		$result2 = $wpdb->get_results($sql2);

		
		if($result2) {
			for($f=0; $f < count($result2); $f++) {
				array_push($currentmnts, $result2[$f]->currentmonth);
			}
		}

		$sorted = array_intersect(array_map('strtolower',$months),array_map('strtolower', $currentmnts));
		$finalmonts = array_values($sorted);

		$data = '
		<div class="mptt-full-timetable">
		<form id="monthAjax">
			<select class="otherYear" id="year" name="year">';
			for($i=0; $i < count($result1); $i++) {

					$data .= '<option value="'.$result1[$i]->currentyear.'"';
					$selected = $result1[$i]->currentyear == $year ? "selected": "";
					$data .= $selected.'>'.$result1[$i]->currentyear.'</option>';

			}
			$data .='</select>';

			$data .= '<select class="otherMonth" id="month" name="month">';
					for($h=0; $h < count($finalmonts); $h++) {
						$data.= '<option value="'.ucfirst($finalmonts[$h]).'"';
						$selected1 = strtolower($month) == strtolower($finalmonts[$h]) ? "selected": "";
						$data .= $selected1.'>'.ucfirst($finalmonts[$h]).'</option>';

					}
		
				
			$data .='</select>';


		
		$data .= '</form><div class="table">
		<table class="dttable">
			<thead>
				<tr>
					<th></th>
					<th></th>
					<th colspan="2">Fajr</th>
					<th></th>
					<th></th>
					<th colspan="2">Zuhr</th>
					<th colspan="2">Asr</th>
					<th colspan="2">Maghrib</th>
					<th colspan="2">Isha</th>
				</tr>
				<tr class="mt-head">
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

				</tr>
			</thead>
			<tbody>';
		for($i=0; $i < count($result); $i++) {
			if(strtolower($result[$i]->dayname) == 'sun') {
				$class = 'sun';
			}
			elseif (strtolower($result[$i]->dayname) == 'sat') {
				$class = "sat";
			}
			else {
				$class = "";
			}

			$jm  = strtolower($result[$i]->dayname) == 'fri' || strtolower($result[$i]->dayname) == 'friday' ?  "Jumuah" : "";

			$ramadan = intval($result[$i]->is_ramadan) > 0 ? 'ramadan' : '';

			$today = $date == $result[$i]->daydate ? 'today' :'';

			$data .='<tr class="'.$jm.' '.$ramadan.' '.$today.'">
						<td>'.$result[$i]->daydate.'</td>
						<td class="'.$class.'">'.$result[$i]->dayname.'</td>
						<td>'.$result[$i]->Fajr_begins.'</td>
						<td class="jamat">'.$result[$i]->Fajr_jamat.'</td>
						<td>'.$result[$i]->Fajr_sunrise.'</td>
						<td>'.$result[$i]->Zawal.'</td>
						<td>'.$result[$i]->Zuhr_begins.'</td>
						<td class="jamat">'.$result[$i]->Zuhr_jamat.'</td>
						<td>'.$result[$i]->Asr_begins.'</td>
						<td class="jamat">'.$result[$i]->Asr_jamat.'</td>
						<td>'.$result[$i]->Maghrib_begins.'</td>
						<td class="jamat">'.$result[$i]->Maghrib_jamat.'</td>
						<td>'.$result[$i]->Isha_begins.'</td>
						<td class="jamat">'.$result[$i]->Isha_jamat.'</td>
					</tr>';
		}
	
			$data .='</tbody>
			<tfoot></tfoot>
		</table>
		<script src="'.site_url().'/wp-content/plugins/Mosque-Prayer-Timetable/assets/js/bundle.min.js" type="module"></script>
		<script>
			document.addEventListener("DOMContentLoaded", () => {
				const tableElements = document.querySelectorAll(".dttable");
			
				tableElements.forEach(tableElement => {
					new window.StickyTable(tableElement);
				})
			});
			jQuery(document).ready(function(){
				jQuery("div.table table").addClass("dttable");
			});
		</script>
		</div>
		<div class="loader hide"><span class="message">Please Wait!</span></div>
	</div>';
		return $data;

	}
	add_shortcode('full-timetable','full_timetable_widget');


	function fulltabledata() {
		global $wpdb;
		$table = $wpdb->prefix . 'mptt';
		$date = date('jS F Y');

		if(isset($_POST['year']) && isset($_POST['month']) ) {

			$year = $_POST['year'];
			$month = $_POST['month'];

			$sql = "SELECT count(currentyear) as redcount FROM $table WHERE currentyear = '$year' AND currentmonth = '$month'";
			$result = $wpdb->get_results($sql) or die(mysql_error());

			if($result[0]->redcount > 0) {
				
				$data='';

				$sql4 = "SELECT * FROM $table WHERE currentyear = '$year' AND currentmonth = '$month'";

				$result2 = $wpdb->get_results($sql4) or die(mysql_error());

				if(count($result2) > 0 ) {
					//echo json_encode($result2);
					foreach ($result2 as $res) {
						if(strtolower($res->dayname) == 'sun') {
							$class = 'sun';
						}
						elseif (strtolower($res->dayname) == 'sat') {
							$class = "sat";
						}
						else {
							$class = "";
						}
						$jm  = strtolower($res->dayname) == 'fri' || strtolower($res->dayname) == 'friday' ?  "Jumuah" : "";

						$ramadan = intval($res->is_ramadan) > 0 ?'ramadan' : ''; 
	
						$today = $date == $res->daydate ? 'today' : '';
			
						$data.='
							<tr class="'.$jm.' '.$ramadan.' '.$today.'">
								<td class="'.$ramadan.'">'.$res->daydate.'</td>
								<td class="'.$class.' '.$ramadan.'">'.$res->dayname.'</td>
								<td class="'.$ramadan.'">'.$res->Fajr_begins.'</td>
								<td class="jamat '.$ramadan.'">'.$res->Fajr_jamat.'</td>
								<td class="'.$ramadan.'">'.$res->Fajr_sunrise.'</td>
								<td>'.$res->Zawal.'</td>
								<td>'.$res->Zuhr_begins.'</td>
								<td class="jamat '.$ramadan.'">'.$res->Zuhr_jamat.'</td>
								<td class="'.$ramadan.'">'.$res->Asr_begins.'</td>
								<td class="jamat '.$ramadan.'">'.$res->Asr_jamat.'</td>
								<td class="'.$ramadan.'">'.$res->Maghrib_begins.'</td>
								<td class="jamat '.$ramadan.'">'.$res->Maghrib_jamat.'</td>
								<td class="'.$ramadan.'">'.$res->Isha_begins.'</td>
								<td class="jamat '.$ramadan.'">'.$res->Isha_jamat.'</td>
							</tr>
						';
					}
					echo $data;exit;
					
				}
				else{
					echo 'no result found';exit;
				}
			}
			else{
				echo '0';exit;
			}		
		}
		else{
			echo '0';exit;
			
		}
		exit;
	}
	add_action( 'wp_ajax_fulltabledata', 'fulltabledata' );
	add_action( 'wp_ajax_nopriv_fulltabledata', 'fulltabledata' );

	function getmonts() {
		global $wpdb;
		$table = $wpdb->prefix . 'mptt';

		if(isset($_POST['year']) && isset($_POST['month'])  ) {
			$year = $_POST['year'];
			$month = $_POST['month'];

			$sql = "SELECT DISTINCT currentmonth FROM $table WHERE currentyear = '$year'";
			$result = $wpdb->get_results($sql);

			if($result) {
				
				$data= '';
				$selected = '';
				foreach ($result as $res) {
					$selected = ucfirst($res->currentmonth) == ucfirst($month) ? 'selected' : '';
					
					$data .= '<option value="'.ucfirst($res->currentmonth).'" '.$selected.'>'.ucfirst($res->currentmonth).'</option>';
				}

				echo $data;exit;
			}	
			else{
				echo '0';
			
			}
		}
		exit;
	}
	add_action( 'wp_ajax_getmonts', 'getmonts' );
	add_action( 'wp_ajax_nopriv_getmonts', 'getmonts' );