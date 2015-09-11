
$(function () {
	var circles = $("#circles a"),
		len = circles.length,
		icons = $("#icons"),
		homePage = $("#homePage"),
		homeBtn = $("#homeBtn"),
		lastPage = $("#last-page"),
		page1 = $("#page1"),
		content = $("#content"),
		num = 2,
		mnum = 0;
	

	homeBtn.click(function () {
		homePage.hide(500);
		// page1.addClass("page1-animate");
		page1.show(500);
		$("#pcont-1").show(500);

		$(circles).eq(1).addClass("showBtn");
		$(".cirImg-2").css("visibility","visible");

		$(circles).eq(0).removeClass("showBtn");
		$(".cirImg-1").css("visibility","hidden");
	})


	// 圆圈移动的
	circles.click(function () {
		
		var index = ($(this).attr("index")*1);
		// 圆圈变红
		circles.removeClass("showBtn");
		$(this).addClass("showBtn");

		// 红字出现
		$(".cir-cont img:nth-child(1)").css("visibility","hidden");
		$(".cirImg-"+index).css("visibility","visible");

		$(".common").hide(500);
		$("#pcont-"+(index-1)).show(500);

		if(index == 1) {
			homePage.show(500);
			// page1.removeClass("page-animate");
			page1.hide(500);
		}else if(index == len){
			page1.hide(500);
			// lastPage.show(500);
			lastPage.addClass("page1-animate");
		}else if(index == num) {
			return;
		}else if(index > num) {
			num++;

			icons.removeClass("move-" + mnum);
			mnum++;
			icons.addClass("move-" + mnum);
			
		}else {
			num--;
			icons.removeClass("move-" + mnum);
			mnum--;
			icons.addClass("move-" + mnum);
		}

		// console.log(index-1);
		/*var leftBtn = $("#btn-"+(index-1)+"-left"),
			rightBtn = $("#btn-"+(index-1)+"-right"),
			pLeft = $("#pLeft-" + (index-1)),
			pRight = $("#pRight-" + (index-1));

		leftBtn.click(function () {
			pLeft.addClass("pAnimate");
		})
		rightBtn.click(function () {
			pRight.addClass("pAnimate");
		})*/
		showCont(index-1);
		hideCont(index-1);
	})
	// 出现两边
	function showCont(num) {
		var leftBtn = $("#btn-"+num+"-left"),
			rightBtn = $("#btn-"+num+"-right"),
			pLeft = $("#pLeft-" + num),
			pRight = $("#pRight-" + num);

		leftBtn.click(function () {
			pLeft.addClass("pAnimate");
		})
		rightBtn.click(function () {
			pRight.addClass("pAnimate");
		})
		$("body").css("overflow","none");
	}
	showCont(1);

	
	// 隐藏两边
	function hideCont(num) {
		var Rbtn = $(".r-btn"),
			pLeft = $("#pLeft-" + num),
			pRight = $("#pRight-" + num);
			Lbtn = $(".l-btn");
			
		Rbtn.eq(num-1).click(function () {
			pRight.removeClass("pAnimate");
			
		})

		Lbtn.eq(num-1).click(function () {
			pLeft.removeClass("pAnimate");
		})
	}
	hideCont(1);



	var lastBtn = $("#last-btn");
	lastBtn.click(function () {
		page1.show(500);
		// lastPage.show(500);
		lastPage.removeClass("page1-animate");
		$("#pcont-5").show(500);

		$(circles).eq(5).addClass("showBtn");
		$(".cirImg-6").css("visibility","visible");

		$(circles).eq(6).removeClass("showBtn");
		$(".cirImg-7").css("visibility","hidden");
	})
})



