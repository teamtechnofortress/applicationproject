<?php
    $test = 0;
    $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

    $global_settings = get_option( 'mptt_settings' );
   /*echo "<pre>";
    print_r($global_settings);
    echo "</pre>";*/
    if(isset($_POST['settingsform'])){
        //add_option( 'my_example_title', 'my_example_value', '', 'yes' );
        $settings = array(
            'mobile-widget' => array (
                'borderwidth' => $_POST['borderwidth'],
                "bgcolor" => $_POST['bgcolor'],
                'bordercolor' => $_POST['bordercolor'],
                'titlecolor' => $_POST['titlecolor'],
                'iconcolor' => $_POST['iconcolor'],
                'textcolor' => $_POST['textcolor'],
                'iconcolor' => $_POST['iconcolor'],
                'iconsize' => $_POST['iconsize'],
                'textsize' => $_POST['textsize'],
                'timesize' => $_POST['timesize'],
                'headingsize' => $_POST['headingsize'],
                'cdatecolor' => $_POST['cdatecolor'],
                'cdatesize' => $_POST['cdatesize']
            ),
            'mobile-widget-timer' => array (
                'borderwidth' => $_POST['tborderwidth'],
                'bordercolor' => $_POST['tbordercolor'],
                'borderradius' => $_POST['tborderradius'],
                'titlecolor' => $_POST['ttitlecolor'],
                'titlesize' => $_POST['ttextsize'],
            ),
            'mobile-widget-highlight' => array (
                "bgcolor" => $_POST['hbgcolor'],
                'titlecolor' => $_POST['htitlecolor'],
                'iconcolor' => $_POST['hiconcolor'],
                'textcolor' => $_POST['htextcolor'],
                'iconcolor' => $_POST['hiconcolor'],
            ),
            'full-view' => array(
                'borderwidth'=> $_POST['fborderwidth'],
                'bordercolor'=> $_POST['fbordercolor'],
                'tbhdcolor'=> $_POST['ftbhdcolor'],
                'tbhdbgcolor'=> $_POST['ftbhdbgcolor'],
                'jamatbgcolor'=> $_POST['jamatbgcolor'],
				'jumuahcolor'=> $_POST['jumuahcolor'],
				'jumuahbgcolor' => $_POST['jumuahbgcolor']
            ),
            'links' => array(
                'mobilewidget' => $_POST['mobilewidget'],
                'fulltable' => $_POST['fulltable']
            ),
            'other-settings' => array(
                'ramadanbgcolor' => $_POST['ramadanbgcolor'],
                'ramadantextcolor' => $_POST['ramadantextcolor'],
                'todaybgcolor' => $_POST['todaybgcolor'],
                'todaytextcolor' => $_POST['todaytextcolor'],
                'timerleftcolor' => $_POST['timerleftcolor'],
                'mobileicon' => $_POST['mobileicon']
            )
        );
        $test = update_option( 'mptt_settings', $settings );

        $global_settings = get_option( 'mptt_settings' );
    }
    ?><br>
    <h1>Services Plugins</h2><br>

    <div style="margin-top:0px;margin-left:auto;margin-right:auto;max-width:1300px;">
        <div class="message" style="padding:20px 0px;">
            <?php
                if($test == 1) {
                    echo "<div style='color:green;font-size:20px;text-align:center;'>Settings Saved</div>";

                } 
            ?>
        </div>
        <h2>Plugins settings</h2><br>
        <form class="quform-form-1" action="<?php echo $actual_link;?>" method="post" >  
                           
            <!-- Mobile Widget -->
            <fieldset>
                <legend><label><b>Mobile Widget Settings</b> </label>	</legend>

                <div class="field per100">
                    <div><small>Border Width <b><output><?php echo $global_settings['mobile-widget']['borderwidth'];?></output></b></small></div>
                    <input type="range" min="0" max="100" data-rangeslider name="borderwidth" id="borderwidth" placeholder="1" value="<?php echo $global_settings['mobile-widget']['borderwidth'];?>">
                </div>

                <div class="field per100">
                    <div><small>Section Title Size <b><output><?php echo $global_settings['mobile-widget']['textsize'];?></output></b></small></div>
                    <input type="range" min="0" max="100" data-rangeslider name="textsize" id="textsize" placeholder="1" value="<?php echo $global_settings['mobile-widget']['textsize'];?>">
                </div>
                
                <div class="field per100">
                    <div><small>heading Size <b><output><?php echo $global_settings['mobile-widget']['headingsize'];?></output></b></small></div>
                    <input type="range" min="0" max="100" data-rangeslider name="headingsize" id="headingsize" placeholder="1" value="<?php echo $global_settings['mobile-widget']['headingsize'];?>">                    
                </div>
                <div class="field per100">
                    <div><small>Icon Size <b><output><?php echo $global_settings['mobile-widget']['iconsize'];?></output></b></small></div>
                    <input type="range" min="0" max="100" data-rangeslider name="iconsize" id="iconsize" placeholder="1" value="<?php echo $global_settings['mobile-widget']['iconsize'];?>">                    
                </div>
                <div class="field per100">
                    <div><small>Text Size <b><output><?php echo $global_settings['mobile-widget']['timesize'];?></output></b></small></div>
                    <input type="range" min="0" max="100" data-rangeslider name="timesize" id="timesize" placeholder="1" value="<?php echo $global_settings['mobile-widget']['timesize'];?>">                    
                </div>

                <div class="field per100">
                    <div><small>Top Date Font Size <b><output><?php echo $global_settings['mobile-widget']['cdatesize'];?></output></b></small></div>
                    <input type="range" min="0" max="100" data-rangeslider name="cdatesize" id="cdatesize" placeholder="1" value="<?php echo $global_settings['mobile-widget']['cdatesize'];?>">                    
                </div>
                
                <div class="field color">
                    <div><small>Background Color</small></div>
                    <input type="text" class="color-picker" name="bgcolor" id="bgcolor" placeholder="#ffffff" data-default-color="#ffffff" value="<?php echo $global_settings['mobile-widget']['bgcolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Border Color</small></div>
                    <input type="text" class="color-picker" name="bordercolor" id="bordercolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['mobile-widget']['bordercolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Title Color</small></div>
                    <input type="text" class="color-picker" name="titlecolor" id="titlecolor" placeholder="#ffffff" data-default-color="#ffffff" value="<?php echo $global_settings['mobile-widget']['titlecolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Text Color</small></div>
                    <input type="text" class="color-picker" name="textcolor" id="textcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['mobile-widget']['textcolor'];?>">
                </div>
                <div class="field color">
                    <div><small>Icon Color</small></div>
                    <input type="text" class="color-picker" name="iconcolor" id="iconcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['mobile-widget']['iconcolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Top Date Color</small></div>
                    <input type="text" class="color-picker" name="cdatecolor" id="cdatecolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['mobile-widget']['cdatecolor'];?>">
                </div>
            </fieldset>

            <!-- Mobile Widget highlight -->
            <fieldset>
                <legend><label><b>Mobile Widget Highlight Settings</b> </label>	</legend>
                
                <div class="field color">
                    <div><small>Background Color</small></div>
                    <input type="text" class="color-picker" name="hbgcolor" id="hbgcolor" placeholder="#ffffff" data-default-color="#ffffff" value="<?php echo $global_settings['mobile-widget-highlight']['bgcolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Title Color</small></div>
                    <input type="text" class="color-picker" name="htitlecolor" id="htitlecolor" placeholder="#ffffff" data-default-color="#ffffff" value="<?php echo $global_settings['mobile-widget-highlight']['titlecolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Text Color</small></div>
                    <input type="text" class="color-picker" name="htextcolor" id="htextcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['mobile-widget-highlight']['textcolor'];?>">
                </div>
                <div class="field color">
                    <div><small>Icon Color</small></div>
                    <input type="text" class="color-picker" name="hiconcolor" id="hiconcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['mobile-widget-highlight']['iconcolor'];?>">
                </div>
            </fieldset>   

            <!-- Mobile Widget Timer -->
            <fieldset>
                <legend><label><b>Mobile Widget Timer Settings</b> </label>	</legend>

                <div class="field per100">
                    <div><small>Border Width <b><output><?php echo $global_settings['mobile-widget-timer']['borderwidth'];?></output></b></small></div>
                    <input type="range" min="0" max="100" data-rangeslider name="tborderwidth" id="tborderwidth" placeholder="1" value="<?php echo $global_settings['mobile-widget-timer']['borderwidth'];?>">
                </div>

                <div class="field per100">
                    <div><small>Title Font Size <b><output><?php echo $global_settings['mobile-widget-timer']['titlesize'];?></output></b></small></div>
                    <input type="range" min="0" max="100" data-rangeslider name="ttextsize" id="ttextsize" placeholder="1" value="<?php echo $global_settings['mobile-widget-timer']['titlesize'];?>">
                </div>

                <div class="field per100">
                    <div><small>Border radius <b><output><?php echo $global_settings['mobile-widget-timer']['borderradius'];?></output></b></small></div>
                    <input type="range" min="0" max="100" data-rangeslider name="tborderradius" id="tborderradius" placeholder="1" value="<?php echo $global_settings['mobile-widget-timer']['borderradius'];?>">
                </div>

                <div class="field color">
                    <div><small>Border Color</small></div>
                    <input type="text" class="color-picker" name="tbordercolor" id="tbordercolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['mobile-widget-timer']['bordercolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Title Color</small></div>
                    <input type="text" class="color-picker" name="ttitlecolor" id="ttitlecolor" placeholder="#ffffff" data-default-color="#ffffff" value="<?php echo $global_settings['mobile-widget-timer']['titlecolor'];?>">
                </div>
            </fieldset>

            <!-- Fullview style -->
            <fieldset>
                <legend><label><b>Full View Style</b></label></legend>
                <div class="field per100">
                    <div><small>Border Width <b><output><?php echo $global_settings['full-view']['borderwidth'];?></output></b></small></div>
                    <input type="range" min="0" max="100" data-rangeslider name="fborderwidth" id="fborderwidth" placeholder="1" value="<?php echo $global_settings['full-view']['borderwidth'];?>">
                </div>

                <div class="field color">
                    <div><small>Border Color</small></div>
                    <input type="text" class="color-picker" name="fbordercolor" id="fbordercolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['full-view']['bordercolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Table heading Color</small></div>
                    <input type="text" class="color-picker" name="ftbhdcolor" id="ftbhdcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['full-view']['tbhdcolor'];?>">
                </div>
                <div class="field color">
                    <div><small>Table heading Background Color</small></div>
                    <input type="text" class="color-picker" name="ftbhdbgcolor" id="ftbhdbgcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['full-view']['tbhdbgcolor'];?>">
                </div>
                <div class="field color">
                    <div><small>Table Jamat Col Background</small></div>
                    <input type="text" class="color-picker" name="jamatbgcolor" id="jamatbgcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['full-view']['jamatbgcolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Jumu'ah Text Color</small></div>
                    <input type="text" class="color-picker" name="jumuahcolor" id="jumuahcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['full-view']['jumuahcolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Jumu'ah Background Color</small></div>
                    <input type="text" class="color-picker" name="jumuahbgcolor" id="jumuahbgcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['full-view']['jumuahbgcolor'];?>">
                </div>
            </fieldset>
            
            <!-- Page Links -->
             <fieldset>
                <legend><label><b>Pages Links</b></label></legend>
                <div class="field color">
                    <div><small>Mobile Widget Page Link</small></div>
                    <input type="text" class="" name="mobilewidget" id="mobilewidget" placeholder=""  value="<?php echo $global_settings['links']['mobilewidget'];?>">
                </div>

                <div class="field color">
                    <div><small>Full Timetable Page Link</small></div>
                    <input type="text" class="" name="fulltable" id="fulltable" placeholder=""  value="<?php echo $global_settings['links']['fulltable'];?>">
                </div>

            </fieldset>
                
            <!-- other style -->
            <fieldset>
                <legend><label><b>Other Settings</b></label></legend>

                <div class="field color">
                    <div><small>Ramadan Text Color</small></div>
                    <input type="text" class="color-picker" name="ramadantextcolor" id="ramadantextcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['other-settings']['ramadantextcolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Ramadan Background Color</small></div>
                    <input type="text" class="color-picker" name="ramadanbgcolor" id="ramadanbgcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['other-settings']['ramadanbgcolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Today Text Color</small></div>
                    <input type="text" class="color-picker" name="todaytextcolor" id="todaytextcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['other-settings']['todaytextcolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Today Background Color</small></div>
                    <input type="text" class="color-picker" name="todaybgcolor" id="todaynbgcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['other-settings']['todaybgcolor'];?>">
                </div>

                <div class="field color">
                    <div><small>TImer Left Color</small></div>
                    <input type="text" class="color-picker" name="timerleftcolor" id="timerleftcolor" placeholder="#000000" data-default-color="#d7d7d7" value="<?php echo $global_settings['other-settings']['timerleftcolor'];?>">
                </div>

                <div class="field color">
                    <div><small>Mobile Icon Image Link</small></div>
                    <input type="text" name="mobileicon" id="mobileicon" placeholder="" value="<?php echo $global_settings['other-settings']['mobileicon'];?>">
                </div>

            </fieldset>
            
            <!-- Save Button -->
            <fieldset>
                <legend><label><b>Save Settings</b> </label></legend>
                <div class="field per100">
                    <center><input type="submit" value="Save" name="settingsform" class="button button-primary"></center>
                </div>
            </fieldset>
        </form>
    </div><br><br>
    <div class="footer-info" style="text-align:right;padding-right:30px;">
        <small style="font-size:14px;vertical-align:middle;">&nbsp; Developed and managed by <a href="mailto:singh.sukhjinder40@gmail.com">singh.sukhjinder40@gmail.com</a></small>
    </div>

    <style>
        .quform-form-1{
            border:1px solid #a19b9b;
            border-radius:5px;
            padding:10px 20px 0px 20px;
            background: linear-gradient(90deg, #ededed, #e9e9e9)
        }
        fieldset {
            border:1px solid #a19b9b;
            border-radius: 5px;
            padding:20px 20px;
            margin-bottom:20px;
            width:100%; 
            background: linear-gradient(90deg, #e9e9e9, #ededed);
			 width:auto; 
        }
        fieldset > legend {
            background: #dbdbdb;
            padding: 5px 5px 7px 5px;
            border-radius: 50px;
        }
        fieldset > legend > label {
            font-size:15px;
            margin-right:10px;
            margin-left:10px;
        }
        fieldset > .field small {
            font-size:14px;
            margin-bottom:5px;
            margin-bottom: 5px;
            display:block;
        }
        fieldset > div.field {
            float:left;
            width:48%;
            margin-bottom:10px;
            margin-right:10px;
        }
        fieldset > div.field.per30 {
            float:left;
            width:30%;
            margin-right:10px;
        } 
        fieldset > div.field.per100 {
            float:left;
            width:100%;
            margin-right:0px;
        }  
        fieldset > div.field input[type="range"] {
            padding:1px 10px 1px 10px;
            width:100%;
        }
        fieldset > div.field input[type="submit"] {
            padding:0px 40px 5px 40px;
            font-size:20px;
        }
        @media screen and (max-width:992px) {
            fieldset > div.field {
                float:left;
                width:100%;
                margin-right:0px;
                margin-bottom: 10px;
            }
            fieldset > div.field.per30 {
                float:left;
                width:30%;
                margin-right:10px;
            }
            fieldset > div.field.color {
                float:left;
                width:48%;
                margin-right:10px;
                margin-bottom: 20px;
            } 
            fieldset > div.field.per100 {
                float:left;
                width:100%;
                margin-right:0px;
            } 
        }
        @media screen and (max-width:552px) {
            fieldset > div.field.per30 {
                float:left;
                width:00%;
                margin-right:0px;
            } 
            fieldset > div.field.color {
                float:left;
                width:100%;
                margin-right:0px;
                margin-bottom: 20px;
            }   
        }
    </style> 