<?php
$global_settings = get_option( 'mptt_settings' );
/*echo "<pre>";
print_r($global_settings);
echo "</pre>";*/
?>
<style>
    .mptt-wrapper-container {
        background: <?php echo $global_settings['mobile-widget']['bgcolor'];?>!important;
    }
	 .mobile-widget {
        background: <?php echo $global_settings['mobile-widget']['bgcolor'];?>!important;
		padding:20px 0px;
    }
	.home-widget {
        background: <?php echo $global_settings['mobile-widget']['bgcolor'];?>!important;
		padding:10px 0px 0px;
    }
    .mptt-wrapper-container .prayer-time {
        border-right: <?php echo $global_settings['mobile-widget']['borderwidth'];?>px solid <?php echo $global_settings['mobile-widget']['bordercolor'];?>!important;
        border-color:<?php echo $global_settings['mobile-widget']['bordercolor'];?>!important;
        transition: all .3s;
    }
    .home-widget .mptt-wrapper-container .prayer-time {
        border-right: <?php echo $global_settings['mobile-widget']['borderwidth'];?>px solid <?php echo $global_settings['mobile-widget']['bordercolor'];?>!important;
        border-top: <?php echo $global_settings['mobile-widget']['borderwidth'];?>px solid <?php echo $global_settings['mobile-widget']['bordercolor'];?>!important;
        border-bottom:0px !important;
        transition: all .3s;
    }
    .home-widget .mptt-wrapper-container .prayer-time:last-child {
        border-right: 0px !important;
    }
    .mptt-wrapper-container .prayer-time .mptt-sec-title {
        color:<?php echo $global_settings['mobile-widget']['titlecolor'];?>!important;
        font-size:<?php echo $global_settings['mobile-widget']['textsize'];?>px !important;
        margin-bottom:10px;
    }
    .mptt-wrapper-container .prayer-time i {
        color:<?php echo $global_settings['mobile-widget']['iconcolor'];?>!important;
        font-size:<?php echo $global_settings['mobile-widget']['iconsize'];?>px !important;  
        margin-bottom:5px;
    }
    .mptt-wrapper-container .prayer-time .prayer-start, .mptt-wrapper-container .prayer-time .prayer-jamaat {
        color:<?php echo $global_settings['mobile-widget']['textcolor'];?>!important;
        font-size:<?php echo $global_settings['mobile-widget']['timesize'];?>px !important;  
    }

    .mptt-wrapper-container .prayer-time.highlight {
        border-right: <?php echo $global_settings['mobile-widget-highlight']['borderwidth'];?>px solid <?php echo $global_settings['mobile-widget-highlight']['bordercolor'];?>!important;
        border-color:<?php echo $global_settings['mobile-widget-highlight']['bordercolor'];?>!important;
        background: <?php echo $global_settings['mobile-widget-highlight']['bgcolor'];?>!important;
        transition: all .3s;
    }
    .mptt-wrapper-container .prayer-time.highlight .mptt-sec-title {
        color:<?php echo $global_settings['mobile-widget-highlight']['titlecolor'];?>!important;
    }
    .mptt-wrapper-container .prayer-time.highlight i {
        color:<?php echo $global_settings['mobile-widget-highlight']['iconcolor'];?>!important;
    }
    .mptt-wrapper-container .prayer-time.highlight .prayer-start, .mptt-wrapper-container .prayer-time.highlight .prayer-jamaat {
        color:<?php echo $global_settings['mobile-widget-highlight']['textcolor'];?>!important;
    }
    .mobile-widget .current-date {
        color:<?php echo $global_settings['mobile-widget']['cdatecolor'];?>!important;
        font-size:<?php echo $global_settings['mobile-widget']['cdatesize'];?>px !important;
        padding-bottom:20px;
		font-weight:bold;
    }
    .home-widget .current-date, .home-widget .current-date a {
        color:<?php echo $global_settings['mobile-widget']['cdatecolor'];?>!important;
    }
    #link-59-30 {
        background: <?php echo $global_settings['mobile-widget']['cdatecolor'];?>!important;
    }
    .mobile-widget .timer span.tmm {
        border:<?php echo $global_settings['mobile-widget-timer']['borderwidth'];?>px solid <?php echo $global_settings['mobile-widget-timer']['bordercolor'];?> !important;
        border-radius:<?php echo $global_settings['mobile-widget-timer']['borderradius'];?>px !important;
        font-size:<?php echo $global_settings['mobile-widget-timer']['titlesize'];?>px !important;
        color:<?php echo $global_settings['mobile-widget-timer']['titlecolor'];?> !important;
        padding:5px 20px;
        display: inline-block;
        margin:auto;
        margin-bottom:10px;
		min-width:400px
    }
    .mptt-full-timetable .dttable{
        border:<?php echo $global_settings['full-view']['borderwidth'];?>px solid <?php echo $global_settings['full-view']['bordercolor'];?> !important;
    }
    .mptt-full-timetable .dttable tbody tr td {
        border-bottom:<?php echo $global_settings['full-view']['borderwidth'];?>px solid <?php echo $global_settings['full-view']['bordercolor'];?> !important;
    }
    .mptt-full-timetable .dttable tbody tr td.jamat {
        background:<?php echo $global_settings['full-view']['jamatbgcolor'];?> !important;
        font-weight:bold;
    }
    .mptt-full-timetable .dttable th {
        border:<?php echo $global_settings['full-view']['borderwidth'];?>px solid <?php echo $global_settings['full-view']['bordercolor'];?> !important;

    }
    .mptt-full-timetable .dttable .mt-head th { 
        background:<?php echo $global_settings['full-view']['tbhdbgcolor'];?> !important;
        color:<?php echo $global_settings['full-view']['tbhdcolor'];?> !important;
    }
    .mptt-full-timetable .dttable td.Sat, .mptt-full-timetable .dttable td.Sun {
        font-weight: bold;
        color: #004940;
    }
    .mptt-full-timetable .loader {
        width: 100%;
        border: 2px solid #cecece;
        position: fixed;
        top: 0%;
        left: 0;
        text-align: center;
        font-size: 30px;
        padding: 10px;
        background: #3232329c !important;
        color: #ffffff !important;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #monthAjax select {
        border:0px;
    border-bottom:2px solid <?php echo $global_settings['full-view']['tbhdbgcolor'];?> !important;
}
    .mptt-full-timetable .loader span.message {
        width: 300px;
        border: 2px solid #cecece;
        text-align: center;
        font-size: 30px;
        padding: 10px;
        background:<?php echo $global_settings['full-view']['tbhdbgcolor'];?> !important;
        color:<?php echo $global_settings['full-view']['tbhdcolor'];?> !important;
    }
    .mptt-full-timetable .loader.hide {
        display:none;
    } 
    tr.Jumuah {
        /*background:<?php //echo $global_settings['full-view']['jamatbgcolor'];?> !important;*/
    }
    .bottomlinks {
        text-align: center;
        color:<?php echo $global_settings['mobile-widget-timer']['titlecolor'];?> !important;
        font-size: 15px;
        margin-top: 40px;
    }
    .bottomlinks a {
        color:<?php echo $global_settings['mobile-widget-timer']['titlecolor'];?> !important;
        font-size: 18px;
    }
    .mptt-full-timetable .dttable tbody tr.ramadan, .mptt-full-timetable .dttable tbody tr.ramadan td.jamat {
        background: <?php echo $global_settings['other-settings']['ramadanbgcolor'];?> !important;
        color: <?php echo $global_settings['other-settings']['ramadantextcolor'];?> !important;
    }
    .mptt-full-timetable .dttable tbody tr.today, .mptt-full-timetable .dttable tbody tr.today td {
        background: <?php echo $global_settings['other-settings']['todaybgcolor'];?> !important; 
        color: <?php echo $global_settings['other-settings']['todaytextcolor'];?> !important; 
        font-weight: bold;
    }
    .mptt-full-timetable .dttable tbody td.sat,  .mptt-full-timetable .dttable tbody td.sun{ 
       color:<?php echo $global_settings['full-view']['tbhdbgcolor'];?> !important;
       font-weight: 600;
    }
    .red {
        color:<?php echo $global_settings['other-settings']['timerleftcolor'];?> !important;
    }
    @media screen and (min-width: 500px) {

        .home-widget .mptt-wrapper-container .prayer-time:nth-child(3n) {
            border-right: <?php echo $global_settings['mobile-widget']['borderwidth'];?>px solid <?php echo $global_settings['mobile-widget']['bordercolor'];?>!important;
            border-top: <?php echo $global_settings['mobile-widget']['borderwidth'];?>px solid <?php echo $global_settings['mobile-widget']['bordercolor'];?>!important;
        }
        .home-widget .mptt-wrapper-container .prayer-time:last-child {
            border-right: 0px !important;
        }
    }
</style>