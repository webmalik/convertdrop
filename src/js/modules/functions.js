//import Siema from "siema";
import $ from "jquery";
import Swiper from 'swiper/bundle';

export function isWebp() {
	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}

export function onCard() {
	$('.sytem-card').on('click', function (event) {
		$('.sytem-card').removeClass('active');
		$(this).addClass('active');
	});
}

export function onSelectC() {
	$('#sytem-country').on('change', function () {
		var val = $(this).val();
		$('.sytem__list-img img').attr('src', 'img/' + val + '.webp');
		$('.sytem__list-img source').attr('srcset', 'img/' + val + '.webp');
		console.log(val);
	});
}

export function burger() {
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').on('click', function () {
		$(this).toggleClass('open');
		$('.menu nav').toggleClass('active');
		$('.menu .right').toggleClass('active');
	});
}

export function slider() {
	const swiper = new Swiper('.swiper', {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		slidesPerView: 'auto',
		loop: true,
		speed: 400,
	});

	swiper.on('reachEnd', function () {
		swiper.slideTo(0, 0);
	});
}

export function casejs() {
	$(document).ready(function () {
		$(".carousel").hide();
		$(".quan").on("click", function (event) {
			event.preventDefault();
			$(".quan").removeClass("active");
			$(this).addClass("active");
		});
		$("#quick").on("click", function () {
			$(this).toggleClass("active");
		});
		$("#open").on("click", function () {
			$(".cases").hide();
			$(".carousel").fadeIn();
			start();
		});

		const cells = 100;
		const items = [
			{ name: "Headphones", img: "img/images/item.png", chance: 100 }
		];

		function getItem() {
			let item;

			while (!item) {
				const chance = Math.floor(Math.random() * 100);
				$.each(items, function (index, elm) {
					if (chance < elm.chance && !item) item = elm;
				});
			}

			return item;
		}

		function generateItems() {
			$(".carousel .scope .item").remove();

			const scope = $(".scope");

			for (let i = 0; i < cells; i++) {
				const item = getItem();
				const div = $("<div></div>");
				div.addClass("item");
				div.attr("data-item", JSON.stringify(item));
				div.html('<img src="' + item.img + '" alt="" />');

				scope.append(div);
			}
		}

		generateItems();

		let isStarted = false;
		let isFirstStart = true;

		function start() {
			if (isStarted) return;
			else isStarted = true;

			if (!isFirstStart) generateItems();
			else isFirstStart = false;

			var gapSum = 0;
			$(".scope").each(function () {
				var containerWidth = $(this).width();
				var itemsCount = $(this).children().length;
				var gapWidth = (itemsCount - 1) * 2; // Учитываем ширину "gap" между элементами
				var totalGap = containerWidth - gapWidth;
				gapSum += totalGap;
			});

			console.log("Сумма gap в блоке .scope: " + gapSum + "px");

			const scope = $(".scope");
			const carouselWidth = $(".scope").width();
			const itemWidth = $(".scope .item").first().outerWidth();
			const gap = $(".scope").css('gap');
			const iw = Math.floor(((itemWidth * cells) - gapSum) / 2 - itemWidth / 2);
			const targetPosition = Math.floor(carouselWidth / 2 - itemWidth / 2);
			console.log(iw);
			console.log(carouselWidth);
			console.log(itemWidth);
			console.log(targetPosition);

			scope.css({
				transform: "translate3d(-" + iw + "px, 0, 0)",
				transition: "transform 7s cubic-bezier(.31,.46,.28,1)",
			});

			setTimeout(function () {
				scope.addClass("active");
			}, 0);

			// setTimeout(function() {
			// scope.removeClass("active");
			// const currentPosition = parseInt(scope.css("transform").split(",")[4]);
			// const correction = targetPosition - currentPosition % itemWidth;
			// scope.css({
			// transform: "translate3d(-" + (currentPosition + correction) + "px, 0, 0)",
			// transition: "none"
			// });
			// }, 0);
		}
	});

}

export function faq() {
	$(document).ready(function () {
		$('.accordion-header').click(function () {
			// Скрываем все открытые панели
			$('.accordion-content').slideUp();
			$('.accordion-header').removeClass('active');

			// Проверяем, является ли текущая панель открытой
			if ($(this).next('.accordion-content').is(':hidden')) {
				// Открываем текущую панель с плавной анимацией
				$(this).next('.accordion-content').slideDown();
				$(this).addClass('active');
			}
		});
	});
}