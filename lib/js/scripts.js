jQuery(document).ready(function($) {

	///////////////////////// START COUNTER//
  console.log("yes");

	var $container = $('#counter');

	$container.counter({
		from: 0,  // the number the element should start at
    to: 1018305,  // the number the element should end at
		ease: 'easeInOut', // add easing functionality to counter
    duration: 10000,  // how long it should take to count between the target numbers
    decimals: 0,  // the number of decimal places to show
	});

	//END COUNTER ///////////////////////////

});
