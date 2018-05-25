$(function(){

	function allScroll() {

		if ($(".main-header").offset().top > 0) {
			$(".nav-bg-scroll").addClass("show");

		}
		else {
			$(".nav-bg-scroll").removeClass("show");		
		}


		$(".el-scroll").each(function(){
			var maxPix = $(this).parent().offset().top + $(this).parent().height();
			var pagePos = $(document).scrollTop();
			var blockEnd = $(this).parent().offset().top + $(this).parent().height();
			var speed = $(this).data("speed");	
			var parrent = $(this).parent();
			// console.log(speed);
			var delta = (2*parrent.height() - (($(document).scrollTop()+ parrent.height()) - parrent.offset().top))/(2*parrent.height())*100;
			console.log("delta: " + delta, "speed:" + speed);
			// var procent = 50 - 50*speed + delta*speed;	
			var procent = 50 - 50*speed + delta*speed;
			console.log("procent: ", procent);
			console.log(" ");


			if ((pagePos > $(this).parent().offset().top)  && (pagePos < blockEnd)) { 
				$(this).css({						
					transform: "translate(-50%, " + (-procent) + "%)",
					top: procent + "%"
				});
				
			}
		});

		$(".block").each(function () {
			var currentPos = $(document).scrollTop() + 75;
			var blockEnd = $(this).offset().top + $(this).height();
			var blockId = $(this).attr("id");

			if ((currentPos > $(this).offset().top) && (currentPos < blockEnd) && (blockId != "intro")) {
				$("a[href$='#" + blockId + "'").parent().addClass("active");
			}

			else {
				$("a[href$='#" + blockId + "'").parent().removeClass("active");
			}

		});
		


	}


	$(document).on("scroll", allScroll);	
	$(document).ready(allScroll);

	$(".description-btn").on("mouseenter", function() {
		var buttParrentClass = $(this).parent().attr("class");
		buttParrentClass = buttParrentClass.split(" ");
		buttParrentClass = "." + buttParrentClass[0] + "." + buttParrentClass[1];
		var currentButtClass = $(this).attr("class");
		console.log(currentButtClass);
		console.log(buttParrentClass+" .description-btn");
		$(buttParrentClass+" .description-btn").each(function() {
			
			if (currentButtClass != $(this).attr("class")) {
				console.log("hi");
				$(this).css("opacity", "0.6");
			}			
		});		
	});

	$(".description-btn").on("mouseleave", function() {
		$(".description-btn").each(function() {
			$(this).css("opacity", "1");
		});
	});

});