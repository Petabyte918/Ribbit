$(document).ready(function(){
    $(document).scroll(function() {
        var gradient = Math.min(0.5 + 0.075 * $(this).scrollTop() / 210, 0.9);
        var green = Math.round(gradient * 255);
        var blue = Math.round(gradient * 255);
		if($(window).width() < 480){
		} else {
			$("#img-logo").css('width', '' + ((3 * (.5 - gradient) + 1) * 500) + '');
			$("#img-logo").css('height', '' + ((3 *(.5 - gradient) + 1) * 500) + '');			
		}
    });
});