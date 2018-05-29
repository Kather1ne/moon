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
			if (( $(window).height() > parent.offset().top - pagePos)  && (pagePos < blockEnd)) { 
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

	// события слайдера

	function ImgChange() {
		var i = 0;
		var timer;
		var value = 1;

		this.imgShift = function (element, dir) {

			var elem = $("." + element + " .myimg");
			if (i < 1) {
				i++;
			}
			else {
				i = 0;
			}

			value = ((i==1)?0:1);
			var allElements = $(elem).toArray();


			$(allElements[i]).animate({
				left: ((dir == "prev")?"-100%":"100%")				
			}, 1000);

			$(allElements[value]).animate({
				left: ((dir == "prev")?"100%":"-100%")
			}, 0);

			$(allElements[value]).animate({
				left: "0"				
			}, 1000);	

		}
 
		this.stopTimer = function() {
			if(timer != null) {
				clearInterval(timer);
			}
		}

		this.setTimer = function(element) {
			var localFunc = this.imgShift;
			timer = setInterval( function() { localFunc(element, "prev"); }, 4000);
		}
	}

	var firstSlider = new ImgChange();
	firstSlider.setTimer("img-right");

	var secondSlider = new ImgChange();
	setTimeout(function() { secondSlider.setTimer("img-left")}, 3000);

	$(".description-btn").on("click", function() {
		var slideDirection = "prev";

		if ($(this).hasClass("btn-next")) {
			slideDirection = "next";
		}

		if ($(this).parent().hasClass("desc-left")) {
			firstSlider.stopTimer();
			firstSlider.imgShift("img-right", slideDirection);
			firstSlider.setTimer("img-right");					
		}
		else {
			secondSlider.stopTimer();
			secondSlider.imgShift("img-left", slideDirection);
			secondSlider.setTimer("img-left");
		}	
		
	});


});