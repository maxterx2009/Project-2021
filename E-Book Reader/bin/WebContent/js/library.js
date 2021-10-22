$(function () {
	const api = "rest/BookView/allbook";
	$.get(api, function (data) {
    const obj = JSON.parse(data);
	console.log(obj);
	$(window).scroll(function () {
    const navPos = $("html").scrollTop();
	console.log(navPos);
    if (navPos > 50) {
      $(".nav-bar-adj").fadeIn(50);
      $(".nav-bar-adj").css("position", "fixed");
      $(".nav-bar-adj").css(
        "box-shadow",
        " rgba(136, 136, 136, 0.65) 0px 0px 15px 0px"
      );
    } else {
      $(".nav-bar-adj").css("position", "relative");
      $(".nav-bar-adj").css("box-shadow", "none");
    }
  });
    obj.map((val)=>{
		$(`
				<div class="item col-sm-4">
				<div class="books">
					<h1 ><a id="${val.bookID}" class="book"  href="reader.html">${val.bookName}</a></h1>
					<h3>${val.author}</h3>
					</div>
				</div>
			
		`).appendTo(".row")
	});
	
  });

	$("body").on("click", ".book", function () {
    	let id = $(this).attr("id");
    	localStorage.setItem("bookID",id)
    	console.log(id);
  	});
	
 });