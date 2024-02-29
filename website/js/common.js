jQuery($ => {
	"use strict";
	let $window = $(window);
	let body = $("body");
	let $root = $("html, body");
	$root.animate({
		scrollTop: 0
	}, 0);
	let amountScrolled = 700;
	let $navbar = $("nav.nav-bar");
	let backBtn = $("li.sidetop");
	let sideewmBtn = $("li.sideewm");
	let sideetelBtn = $("li.sideetel");
	if(window.location.pathname.indexOf("news") != -1 || window.location.pathname.indexOf("detail") != -1 || window.location.pathname.indexOf("agreement") != -1  || window.location.pathname.indexOf("privacy") != -1){
		$("nav.nav-bar").addClass("fixedmenu");
		$('.navbar-nav li a').each(function(){
			if($($(this))[0].href==String(window.location))
				$(this).parent().addClass('active');
		});
	}
	$window.on("scroll", function() {
		if(window.location.pathname.indexOf("news") == -1 && window.location.pathname.indexOf("detail") == -1 && window.location.pathname.indexOf("agreement") == -1  && window.location.pathname.indexOf("privacy") == -1){
			if ($window.scrollTop() > 250) {
				$navbar.addClass("fixedmenu");
				$('.navbar-nav li a').each(function(){
					if($($(this))[0].href==String(window.location))
						$(this).parent().addClass('active');
				});
			} else {
				$navbar.removeClass("fixedmenu");
				$('.navbar-nav li').removeClass('active');
			}
		}
		
		if ($window.scrollTop() > amountScrolled) {
			backBtn.addClass("back-top-visible");
			sideewmBtn.addClass("back-top-visible");
			sideetelBtn.addClass("back-top-visible");
		} else {
			backBtn.removeClass("back-top-visible");
			sideewmBtn.removeClass("back-top-visible");
			sideetelBtn.removeClass("back-top-visible");
		}
	});
	backBtn.on("click", function() {
		$root.animate({
			scrollTop: 0
		}, 700);
		return false;
	});
	var t = 10;
	function fun() {
		t--;
		if (t <= 0) {
			clearInterval(inter);
			if (!localStorage.getItem("submitConsultNotShow")) {
				$("#modalSubmit").addClass("visiable");
			}
		}
	}
	var inter = setInterval(fun, 1000);
	var protocol = 'https:' == document.location.protocol ? 'https' : 'http';
	$("body").on("click",".btn-isReg", function() {
		var newWin = window.open("/blank.html", "isRegPage");
		newWin.location.href = protocol + "://" + (window.location.host.toLowerCase().indexOf('sandbox') >= 0 ? 'sandboxsupplier.' : 'supplier.') + 'bcndropshippingelite.com?isReg=2'
	});
	$("body").on("click",".btn-isLog", function() {
		var newWin = window.open("/blank.html", "isLogPage");
		newWin.location.href = protocol + "://" + (window.location.host.toLowerCase().indexOf('sandbox') >= 0 ? 'sandboxsupplier.' : 'supplier.') + 'bcndropshippingelite.com?isReg=1'
	});
	$("body").on("click",".btn-isOpen", function() {
		var newWin = window.open("/blank.html", "isOpenPage");
		newWin.location.href = protocol + "://" + (window.location.host.toLowerCase().indexOf('sandbox') >= 0 ? 'sandboxsupplier.' : 'supplier.') + 'bcndropshippingelite.com?isOpen=1'
	});
	
});
