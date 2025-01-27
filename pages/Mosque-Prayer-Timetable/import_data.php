<?php 
@ini_set( 'max_input_vars' , 50000 );
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

    if( isset( $_POST['importdata'] ) ) {

    }
?>
<br><h1>Upload timetable</h1><br>
<div class="importpage">
	<form method="post" action="<?php echo $url;?>" id="mpttform" enctype="multipart/form-data"> 
		<input type="file" name="file" id="file">
		<input type="button" value="Upload" name="importdata" id="importmptt" class="button button-primary btn-import">
	</form>
</div>
<div id="dvCSV"></div>
<div class="processing hide">
    <div class="loader"></div>
</div>