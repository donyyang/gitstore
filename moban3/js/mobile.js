
$(function () {
	var Obj = {
		render: function () {
			var firstDom = '<section class = "swiper-slide"><img class = "logo ani" swiper-animate-effect = "shake" swiper-animate-duration="0.2s"  src = '+data.firstSection.logo+'><img src = '+data.firstSection.bg+'><img class = "cont01 ani" swiper-animate-effect = "rotateInDownLeft" swiper-animate-duration=".5s" swiper-animate-delay=".5s" src="'+data.firstSection.img1+'"><img class = "cont02 ani" swiper-animate-effect = "lightSpeedIn" swiper-animate-duration=".5s" swiper-animate-delay=".5s" src="'+data.firstSection.img2+'" alt=""><img class = "move" src="'+data.firstSection.img3+'"></section>',
				btnsDom = '<div class="swiper-button-prev"><img src="'+data.btns.left+'" ></div><div class="swiper-button-next"><img src="'+data.btns.right+'"></div>',
				middleDom = '',
				lastDom = '<section class = "pagelast swiper-slide"><img src="'+data.lastSection.bg+'"><img class = "cont80 ani" swiper-animate-effect = "bounceInLeft" swiper-animate-duration="1s" src="'+data.lastSection.img1+'"><img class = "cont81 ani" swiper-animate-effect = "bounceInRight" swiper-animate-duration="1s" src="'+data.lastSection.img2+'"><a id = "relay" href="javascript:void(0)"><img class = "cont82 ani" swiper-animate-effect = "bounceInLeft" swiper-animate-duration="1s" swiper-animate-delay=".5s" src="'+data.lastSection.relay+'"></a><a id = "share" href="javascript:void(0)"><img class = "cont83 ani" swiper-animate-effect = "bounceInRight" swiper-animate-duration="1s" swiper-animate-delay=".5s" src="'+data.lastSection.share+'"></a><img class = "cont84" src="'+data.lastSection.erweima+'"><img class = "cont85 ani" swiper-animate-effect = "rotateInDownRight" swiper-animate-duration="1s" swiper-animate-delay="1s" src="'+data.lastSection.logo1+'"><div class="other ani" swiper-animate-effect = "rotateInUpLeft" swiper-animate-duration="1s" swiper-animate-delay="1s" >'+data.lastSection.text+'</p></div><img id = "mark" src="'+data.lastSection.mark+'"></section>';

			for (var i = 0,len = data.middleSections.length; i <len; i++) {
				middleDom += '<section class = "swiper-slide"><img src="'+data.middleSections[i].bg+'"><img src="'+data.middleSections[i].bg1+'"><img class = "common-img ani" swiper-animate-effect = "rotateInDownLeft"swiper-animate-duration=".5s" class = "common-img ani" swiper-animate-effect = "rotateInDownLeft" swiper-animate-duration=".5s"  src="'+data.middleSections[i].img1+'"><p class = "cont scale">'+data.middleSections[i].text+'</p></section>' 
			};

			var wrapper = $(".swiper-wrapper"),
				container = $(".swiper-container");

			wrapper.append(firstDom);
			wrapper.append(middleDom);
			wrapper.append(lastDom);

			container.append(btnsDom);
		},

		swipers: function () {
			var mySwiper = new Swiper(".swiper-container",{
				direction:"horizontal",
				mousewheelControl:true,
				prevButton:".swiper-button-prev",
				nextButton:".swiper-button-next",
				onInit:function (swiper) {

					var pre = $(".swiper-button-prev"),
						next = $(".swiper-button-next");

					swiperAnimateCache(swiper);
					swiperAnimate(swiper);
					pre.hide();
					next.css("top","80%");
				},
				onSlideChangeStart:function (swiper) {
					var sections = $("section"),
						pre = $(".swiper-button-prev"),
						next = $(".swiper-button-next"),
					    len = sections.length;
					
					if(mySwiper.activeIndex == 0) {
						pre.hide();
						next.css("top","80%");
					}else if(mySwiper.activeIndex == len-1) {
						next.hide();
					}else {
						pre.show();
						next.show();
						next.css("top","90%");
					}
				},
				onSlideChangeEnd:function (swiper) {
					swiperAnimate(swiper);
				}
			})
		},

		init: function () {
			var sizeRatio = $(window).width() / 640;
			var size = sizeRatio > 1 ? 1 : sizeRatio;
			$("body").css("font-size",size * 6.25 + "%");

			var share = $("#share"),
				pre = $(".swiper-button-prev"),
				mark = $("#mark");
			share.click(function () {
				mark.show();
				pre.hide();
			});
			mark.click(function () {
				$(this).hide();
				pre.show();
			})
		},

		// 音乐
		music:function () {
			if (data.musicUrls) {
			  (function(onSrc, offSrc, musicScr) {
			    var str = '<audio src="' + musicScr + '" loop="loop" id="autoplay" autoplay="autoplay"></audio><div class="musicBtn">' + '<img src="' + onSrc + '" class="onImg">' + '<img src="' + offSrc + '" class="offImg">' + '</div>';
			    $('body').append(str);
			    var audio = document.getElementById('autoplay');
			    $('.musicBtn').on('click', function() {
			      if (audio.paused) {
			        audio.play();
			        $('.musicBtn').removeClass('musicOff');
			      } else {
			        audio.pause();
			        $('.musicBtn').addClass('musicOff');
			      }
			    });
			  })(data.musicUrls.onSrc, data.musicUrls.offSrc, data.musicUrls.musicSrc);
			}
		},

		loads: function () {
			var that = this;
			function initView() {
				$(".loading").hide();

				that.render();
				that.init();
	 			that.swipers();
	 			that.music();
			}

			var loader = new resLoader( {
				resources:data.allImages,
				onStart:function (total) {}, 
				onProgress:function (current, total) {
					var percent = parseInt(current / total * 100) + "%";
					$(".pace-progress").text(percent);
				},
				onComplete: function (total) {
					initView();
				}
			})
			loader.start();
		}
	}
	Obj.loads();

	// Obj.render();
	// Obj.swiper();
	// Obj.init();
})
