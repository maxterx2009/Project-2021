
author.onselect = function(){
    from.value = author.selectionStart;
    to.value = author.selectionEnd;
}

//Reset button
$("#reset").click(function(){
// remove all tag from selected text
  let selected = author.value.slice(author.selectionStart, author.selectionEnd);
    const tmp = selected.replace(/(<([^>]+)>)/gi, "");
    author.setRangeText(tmp);
})
// render button
$("#render").click(function(){
// remove all previous tag when render
var myNode = document.getElementById("author-result");
while(myNode.hasChildNodes())
{
   myNode.removeChild(myNode.lastChild);
}
// reconstruct html
  var str = $("#author").val();
  var clone =str;
//  var lines = clone.split(/\r\n|\r|\n/g);
 var lines = clone.split(/\r?\n/);  
// create html
  var html="";
  for(var i=0;i<lines.length;i++){
	var arr1 = lines[i].split(" ");
	if(lines[i] == ""){
		html+= '<br></br>'
	}
     else{
      html+='<p>'+lines[i]+'</p>';
  }}
  $("#author-result").append(html);
  $(".align_center").parent().css("text-align","center");
  $(".align_left").parent().css("text-align","left");
  $(".align_right").parent().css("text-align","right");

 let footnote = 1;
  var cite, title;
  $("q[title]").addClass("footnote");
  $(".footnote").each(function() {
    $(this).append("<sup>"+ "[" +footnote + "]"+ "</sup>");
	cite = "<li>";
    title = $(this).attr("title");
	if (title) {
      cite += title;
    }
    cite += "</li>";

    $(this).click(function(){
    if(this.title){
      window.alert(this.title)
    }
        })
    footnote++;
  });

  const lastSelectionStart = author.selectionStart;
  const lastSelectionEnd = author.selectionEnd;
author.onfocus = () =>  {
  // zero delay setTimeout to run after browser "focus" action finishes
  setTimeout(() => {
    // we can set any selection
    // if start=end, the cursor is exactly at that place
    author.selectionStart = author.selectionEnd = lastSelectionStart;
  });
};
})

// color
var color = [];
$("#color").change(function(){
  var currentColor = $("#color :selected").val(); 
if (author.selectionStart == author.selectionEnd)  {
    return; // nothing is selected
  }
   if(currentColor==""){
     return;
   }
   let selected = author.value.slice(author.selectionStart, author.selectionEnd);
   author.setRangeText(`<span class="${currentColor}">${selected}</span>`);

})
$("#size").change(function(){
  var currentSize = $("#size :selected").val();
  if(currentSize == ""){
    return;
  }
  if (author.selectionStart == author.selectionEnd)  {
    return; // nothing is selected
  }
  let selected = author.value.slice(author.selectionStart, author.selectionEnd);
  author.setRangeText(`<span class="${currentSize}">${selected}</span>`);
})
$("#align").change(function(){
  var currentAlign = $("#align :selected").val();
  if(currentAlign == ""){
    return;
  }
  if (author.selectionStart == author.selectionEnd)  {
    return; // nothing is selected
  }
// because align will accepted by parents so we need to create a child node.
  let selected = author.value.slice(author.selectionStart, author.selectionEnd);
  author.setRangeText(`<span class = "${currentAlign}">${selected}</span>`);	
})
$("#font_style").change(function(){
  var currentFontStyle = $("#font_style :selected").val();
  if(currentFontStyle == ""){
    return;
  }
  if (author.selectionStart == author.selectionEnd)  {
    return; // nothing is selected
  }
// because align will accepted by parents so we need to create a child node.
  let selected = author.value.slice(author.selectionStart, author.selectionEnd);
  author.setRangeText(`<span class="${currentFontStyle}">${selected}</span>`);
})
$("#font_type").change(function(){
  var currentFontType = $("#font_type :selected").val();
  if(currentFontType == ""){
    return;
  }
  if (author.selectionStart == author.selectionEnd)  {
    return; // nothing is selected
  }
// because align will accepted by parents so we need to create a child node.
  let selected = author.value.slice(author.selectionStart, author.selectionEnd);
  author.setRangeText(`<span class="${currentFontType}">${selected}</span>`);
})
// foot node create
$("#footnote_button").click(function(){
    let title = prompt('Please enter a content for booknote');
    if(title == null || title == ""){
        window.alert("content is NOT accepted");
    }else{
    if (author.selectionStart == author.selectionEnd) {
		let selected = "";
   		author.setRangeText(`<q title="${title}">${selected}</q>`);
    }
}
})

function bookOption() {
	$.ajax({
		type: 'GET',
		contentType: "application/json",
		url: "rest/BookView/books",
		error: function(e) {
		   window.alert(e);
		},
		success : function(book, textStatus, jqXHR){
			obj = JSON.parse(book)
	        for (var i = 0; i < obj.length; i++) {    
				    
	        	$("#books").append(new Option(`${obj[i].BName}`, obj[i].BCode));
		    }
		}
	})
}

function chapterOption(bookCodee) {
	$.ajax({
		type: 'GET',
		contentType: "application/json",
		url: "rest/BookView/book?bookID="+bookCodee,
		error: function(e) {
		   window.alert(e);
		},
		success : function(book, textStatus, jqXHR){
			obj = JSON.parse(book);
			$("#chapter").find('option').not(':first').remove();
	        for (var i = 0; i < obj.bookInfo.length; i++) {
				$("#chapter").append(new Option(`${obj.bookInfo[i].title}`, obj.bookInfo[i].chapterID));
			}
		}
	})
}

function getAuthor(bookCode) {
	$.ajax({
		type: 'GET',
		contentType: "application/json",
		url: "rest/BookView/authorName?bookID="+bookCode,
		error: function(e) {
		   window.alert(e);
		},
		success : function(book, textStatus, jqXHR){
			$("#authorname").val(book)
		}
	})
}

bookOption()

$("#books").change(function() {
	if ($(this).val() != "") {
		$("#author").val("")
		chapterOption($(this).val())
		getAuthor($(this).val())
	} else {
		return
	}
})

$("#chapter").change(function() {
	if ($(this).val() != "") {
		$.ajax({
			type: 'GET',
			contentType: "application/json",
			url: "rest/BookView/book?bookID="+$("#books").val(),
			error: function(e) {
			   window.alert(e);
			},
			success : function(book, textStatus, jqXHR){
				obj = JSON.parse(book);
		        for (var i = 0; i < obj.bookInfo.length; i++) {
					if (obj.bookInfo[i].chapterID == $("#chapter").val()) {
						$("#author").val(obj.bookInfo[i].content)
						content = obj.bookInfo[i].content
					}
				}
			}
		})
	} else {
		return
	}
})

$("#newbook").on("click", function() {
	if($("#newbookname").val() != "" & $("#newauthor") != "") {
		
		let bookchapter1 = {
			"bname" : $("#newbookname").val(),
			"aname" : $("#newauthor").val()
		}
		$.ajax({
			type: 'POST',
			contentType: "application/json",
			url: "rest/BookView/createBook",
			data: JSON.stringify(bookchapter1),
			dataType: 'text',
			error: function(e) {
	 		   window.alert(e);
	 		 },
	
			success : function(data, textStatus, jqXHR){
				$("#newbookname").val("")
				$("#author").val("")
				$("#newauthor").val("")
				$("#books").find('option').not(':first').remove();
				$("#authorname").val("")
				bookOption()
				
				$("#chapter").find('option').not(':first').remove();	
			}
		})
	} else {
		alert("The input book name is empty or the input author is empty")
	}
})

$("#changeauthor").on("click", function() {
	if ($("#authorname").val() != "" & $("#books").val() != "") {
		
		let bookchapter1 = {
			"bcode" : $("#books").val(),
			"author" : $("#authorname").val()
		}
		$.ajax({
			type: 'POST',
			contentType: "application/json",
			url: "rest/BookView/updateAuthor",
			data: JSON.stringify(bookchapter1),
			dataType: 'text',
			error: function(e) {
	 		   window.alert(e);
	 		},
	
			success : function(data, textStatus, jqXHR){
				alert(data)
			}
		})
	} else {
		alert("Input author is empty or book is not selected")
	}
})

$("#newchapter").on("click", function() {
	if($("#books").val() != "" & $("#chaptername").val() != "") {
		
		let bookchapter1 = {
			"bcode" : $("#books").val(),
			"ctitle" : $("#chaptername").val(),
			"ccontent" : ""
		}
		$.ajax({
			type: 'POST',
			contentType: "application/json",
			url: "rest/BookView/createChapter",
			data: JSON.stringify(bookchapter1),
			dataType: 'text',
			error: function(e) {
	 		   window.alert(e);
	 		},
	
			success : function(data, textStatus, jqXHR){
				$("#author").val("")
				$("#chaptername").val("")
				$("#chapter").find('option').not(':first').remove();	
				chapterOption($("#books").val())
			}
		})
	} else {
		alert("No book is selected")
	}
})

$("#deletebook").on("click", function() {
	if ($("#books").val() != "") {
		let bookchapter1 = {
			"bcode" : $("#books").val()
		}
		$.ajax({
			type: 'POST',
			contentType: "application/json",
			url: "rest/BookView/deleteBook",
			data: JSON.stringify(bookchapter1),
			dataType: 'text',
			error: function(e) {
	 			window.alert(e);
	 		},
			success : function(data, textStatus, jqXHR){
				alert(data);
				$("#author").val("")
				$("#authorname").val("")
				$("#chapter").find('option').not(':first').remove();
				$("#books").find('option').not(':first').remove();
				bookOption()
			}
		})
	} else {
		alert("No book is selected")
	}
})

$("#deletechapter").on("click", function() {
	if ($("#chapter").val() != "" & $("#books").val() != "") {
		let bookchapter1 = {
			"bcode" : $("#books").val(),
			"cid": $("#chapter").val()
		}
		$.ajax({
			type: 'POST',
			contentType: "application/json",
			url: "rest/BookView/deleteChapter",
			data: JSON.stringify(bookchapter1),
			dataType: 'text',
			error: function(e) {
	 			window.alert(e);
	 		},
			success : function(data, textStatus, jqXHR){
				alert(data);
				$("#author").val("")
				chapterOption($("#books").val())
			}
		})
	} else {
		alert("No chapter or book is selected")
	}
})

$("#save").on("click", function() {
	if ($("#chapter").val() != "" & $("#books").val() != "") {
		let bookchapter1 = {
			"content" : $("#author").val(),
			"bcode" : $("#books").val(),
			"cid" : $("#chapter").val()
		}
		$.ajax({
			type: 'POST',
			contentType: "application/json",
			url: "rest/BookView/updateContent",
			data: JSON.stringify(bookchapter1),
			dataType: 'text',
			error: function(e) {
	 			window.alert(e);
	 		},
			success : function(data, textStatus, jqXHR){
				alert(data);
			}
		})
	} else {
		alert("Book or Chapter is not selected")
	}
})