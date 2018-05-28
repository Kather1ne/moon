$(function(){


	var timer1;
	var timer2;

	function allScroll() {

		// скрол для картинок
		$(".el-scroll").each(function(){
			var pagePos = $(document).scrollTop(); // место до которого уже проскроллено
			var parent = $(this).parent(); // родительский контейнер прокручеваемого элемента
			var speed = $(this).data("speed"); // скорость прокрутки
			var blockEnd = parent.offset().top + parent.height(); // блок заканчивается в точке экрана, равной сумме его нулевой координаты и его высоты
			var delta = (2*parent.height() - ((pagePos + parent.height()) - parent.offset().top))/(2*parent.height())*100; // процент прокрутки родительского контейнера
			var procent = 50 - 50*speed + delta*speed; // процент прокрутки объекта в зависимости от прокрутки родителя
			
			// считаем проценты, пока родительский блок находится в видимости экрана
			if ((pagePos > parent.offset().top)  && (pagePos < blockEnd)) { 
				$(this).css({						
					transform: "translate(-50%, " + (-procent) + "%)",
					top: procent + "%"
				});
				
			}
		});

		// анимация главной навигации по ссылкам на странице
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

		// анимация подложки для главной навигации
		if ($(".main-header").offset().top > 0) {
			$(".nav-bg-scroll").addClass("show");
		}
		else {
			$(".nav-bg-scroll").removeClass("show");		
		}
	}


	$(document).on("scroll", allScroll);	
	$(document).ready(allScroll);

	// анимация кнопок прокрутки изображений
	$(".description-btn").on("mouseenter", function() {
		var buttParrentClass = $(this).parent().attr("class");
		buttParrentClass = buttParrentClass.split(" ");
		buttParrentClass = "." + buttParrentClass[0] + "." + buttParrentClass[1];
		var currentButtClass = $(this).attr("class");
		$(buttParrentClass+" .description-btn").each(function() {
			
			if (currentButtClass != $(this).attr("class")) {
				$(this).css("opacity", "0.6");
			}			
		});		
	});

	$(".description-btn").on("mouseleave", function() {
		$(".description-btn").each(function() {
			$(this).css("opacity", "1");
		});
	});


	var i = 1;
	function imgChange(element, dir)  {
		var elem = $("." + element + " .myimg");
		
		if (i < 1) {
			i++;
		}
		else {
			i = 0;
		}
		var value = ((i==1)?0:1);
		var allElements = $(elem).toArray();

		$(allElements[i]).css({
			left: "100%",
			"animation-name": ((dir == "next")?"posOneNext":"posOnePrev")
		});
		$(allElements[value]).css({
			left: "0",
			"animation-name": ((dir == "next")?"posTwoNext":"posTwoPrev")
		});
				
	}

	function timerFunction() {
		timer1 = setInterval(function() { imgChange("img-right", "next"); }, 5000);
		setTimeout(function() { 
			timer2 = setInterval( function() { imgChange("img-left", "next");}, 3000)
		}, 3000);
	}

	$(document).ready(timerFunction);	

	$(".description-btn").on("click", function() {
		var elemClass = "img-left";
		var delay = 3000;
		var slideDirection = "next";
		if ($(this).parent().hasClass("desc-left")) {
			clearInterval(timer1);
			elemClass = "img-right";
			delay = 5000;
			timer1 = setInterval(function() { imgChange(elemClass, "next"); }, delay);			
		}
		else {
			clearInterval(timer2);
			timer2 = setInterval(function() { imgChange(elemClass, "next"); }, delay);
		}

		if ($(this).hasClass("btn-next")) {
			slideDirection = "prev";
		}
		
		imgChange(elemClass, slideDirection);
	});


});