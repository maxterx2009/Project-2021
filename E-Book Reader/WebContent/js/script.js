let resultAPI;
let bookSetting = {};
const getBookID=localStorage.getItem("bookID");
fetch("rest/BookView/book?bookID="+getBookID)
  .then((res) => res.json())
  .then((data) => {
    resultAPI = data;

    init();
  });
function init() {
	
const saveTextFormat=()=>{
    let bookID = $("div.container").attr("id");
    let numberPattern = /\d+/g;
    let getBookID = bookID.match(numberPattern);
    let getChapterID = $("h1.chapter").attr("id");
    const content = $("p.text").html();
    const postJSON = {
      bookID: getBookID[0],
      chapterID: getChapterID,
      content: content,
    };
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "rest/BookView/createBook",
      data: JSON.stringify(postJSON),
      dataType: "text",
      error: function (e) {
      },

      success: function (data, textStatus, jqXHR) {
      },
    });
  }
  renderTableOfContent(resultAPI);

  $("#zoom-in").click(function () {
    
    updateZoom(1); 
	
  });

 $("#zoom-out").click(function () {
   
    updateZoom(-1);
	
  });

  
 let sizeArray = [];
  let sizeObj = {};
  let updateZoom = function (zoom) {
    let details = [
      ...document.querySelectorAll(".size_5,.size_10,.size_20,.size_30"),
    ];
    let spanInitial = document.querySelector(".initial-size");
    let spanInitialClass = spanInitial.className.split(" ")[1];
    
    let result2 = sizeArray.some((e) => e.hasOwnProperty(spanInitialClass));
    let chapterSize = document.querySelector(".chapter");
    let chapterSizeClass = chapterSize.className;

    let result3 = sizeArray.some((e) => e.hasOwnProperty(chapterSizeClass));
    details.forEach((element) => {

      let sizeKey = element.className
      var result = sizeArray.some((e) => e.hasOwnProperty(sizeKey));


      if (!result) {
        let sizeString = "";
        let newSizeString = sizeString + "." + sizeKey;
        let sizes = parseInt($(newSizeString).css("font-size"));
        sizes += zoom;
        sizeObj = { [sizeKey]: sizes };
        sizeArray.push(sizeObj);

        $(newSizeString).css("font-size", sizes);
        let itemString = localStorage.getItem($(".container").attr("id"));
        let json = JSON.parse(itemString);
        json.size = sizeArray;
        localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
      } else {

        let sizeString = "";
        let newSizeString = sizeString + "." + sizeKey;
        let sizes = parseInt($(newSizeString).css("font-size"));
        sizes += zoom;
        $(newSizeString).css("font-size", sizes);
        sizeArray.map((val) => {
          for (let i in val) {
            if (i == sizeKey) {
              val[i] = sizes;
              break;
            }
          }
        });

        let itemString = localStorage.getItem($(".container").attr("id"));
        let json = JSON.parse(itemString);
        json.size = sizeArray;
        localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
      }
    });
    if (!result2) {
      let zoomLevel = parseInt($(".initial-size").css("font-size"));
      zoomLevel += zoom;
      $(".initial-size").css("font-size", zoomLevel);
      sizeObj = { "initial-size": zoomLevel };
      sizeArray.push(sizeObj);
      let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);
      json.size = sizeArray;
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    } else {
      zoomLevel = parseInt($(".initial-size").css("font-size"));
      zoomLevel += zoom;
      $(".initial-size").css("font-size", zoomLevel);
      sizeArray.map((val) => {
        for (let i in val) {
          if (i == "initial-size") {
            val[i] = zoomLevel;
            break;
          }
        }
      });
      let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);
      json.size = sizeArray;
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    }
    if (!result3) {
      let zoomLevel = parseInt($(".chapter").css("font-size"));
      zoomLevel += zoom;
      $(".chapter").css("font-size", zoomLevel);
      sizeObj = { chapter: zoomLevel };
      sizeArray.push(sizeObj);
      let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);
      json.size = sizeArray;
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    } else {
      zoomLevel = parseInt($(".chapter").css("font-size"));
      zoomLevel += zoom;
      $(".chapter").css("font-size", zoomLevel);
      sizeArray.map((val) => {
        for (let i in val) {
          if (i == "chapter") {
            val[i] = zoomLevel;
            break;
          }
        }
      });
      let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);
      json.size = sizeArray;
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    }
  };
  function isOrContains(node, container) {
    while (node) {
      if (node === container) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  function elementContainsSelection(el) {
    var sel;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount > 0) {
        for (var i = 0; i < sel.rangeCount; ++i) {
          if (!isOrContains(sel.getRangeAt(i).commonAncestorContainer, el)) {
            return false;
          }
        }
        return true;
      }
    } 
    return false;
  }
  $("body").on("click", ".highlight", function () {
    if (elementContainsSelection(document.getElementById("text"))) {
      let selection = getSelectedText();
      let mark = document.createElement("MARK");
      let range = selection.getRangeAt(0);
      mark.appendChild(range.extractContents());
      selection.removeAllRanges();
      range.insertNode(mark);
		let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);
      json.body = $("#text").html();
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    }
  });
  $("body").on("click", ".bold", function () {
    if (elementContainsSelection(document.getElementById("text"))) {
      let selection = getSelectedText();
      let bold = document.createElement("B");
      let range = selection.getRangeAt(0);
      bold.appendChild(range.extractContents());
      selection.removeAllRanges();
      range.insertNode(bold);
	let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);

      json.body = $("#text").html();
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    }
  });
  $("body").on("click", ".italic", function () {
    if (elementContainsSelection(document.getElementById("text"))) {
      let selection = getSelectedText();
      let italic = document.createElement("I");
      let range = selection.getRangeAt(0);
      italic.appendChild(range.extractContents());
      selection.removeAllRanges();
      range.insertNode(italic);
		let itemString = localStorage.getItem($(".container").attr("id"));
      let json = JSON.parse(itemString);

      json.body = $("#text").html();
      localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
    }
  });



$("#fs").change(function () {
    let fontStyle = $(this).val();
    let itemString = localStorage.getItem($(".container").attr("id"));
    let json = JSON.parse(itemString);
    json.fontStyle = fontStyle;
    $(".text, .chapter").css("font-family", fontStyle);
    localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
  });
  $("body").on("click", ".chapters", function () {
    let getChapterName = $(this).attr("id");
    let numberPattern = /\d+/g;
    let getChapter = getChapterName.match(numberPattern);
    renderBookByChapter(resultAPI, getChapter[0], getChapterName);
    let size = [...document.querySelectorAll(".size-change")];
    size.forEach((element) => {
      let zoomTag = parseInt($(element).css("font-size"));
    });
    let itemString = localStorage.getItem($(".container").attr("id"));
    if (itemString) {
      let json = JSON.parse(itemString);
      if (!(json.chapterID == getChapterName)) {
        json.chapterID = getChapterName;
        json.size = 16;
        localStorage.setItem($(".container").attr("id"), JSON.stringify(json));
      }
    } else {
      setBookSetting(getChapterName);
    }
    
   	let json = JSON.parse(itemString);
    if (json.chapterID == getChapterName) {
	if (json.fontStyle !== "") {
        $("#text,.chapter").css("font-family", JSON.stringify(json.fontStyle));
      }
     // if (json.body !== "") {
	
     //   $("#text").html(json.body);
		
     // }
      const size = json.size;
		if (size.length > 0) {
        size.map((val) => {
          for (let i in val) {
            let sizeClass = "";
            sizeClass = "." + i;
            $(sizeClass).css("font-size", val[i]);        
          }
        });
    }
}
    function checkInView(elem, partial) {
      var container = $(".book-container");
      var contHeight = container.height();
      var contTop = container.scrollTop();
      var contBottom = contTop + contHeight;

      var elemTop = $(elem).offset().top - container.offset().top;
      var elemBottom = elemTop + $(elem).height();

      var isTotal = elemTop >= 0 && elemBottom <= contHeight;
      var isPart =
        ((elemTop < 0 && elemBottom > 0) ||
          (elemTop > 0 && elemTop <= container.height())) &&
        partial;

      return isTotal || isPart;
    }
    let nodeParagraph;
    let paraObj = {};
    $(".book-container").scroll(function () {
	const getBox = document.getElementsByClassName("box");
      let result = "";
      let result2;
      for (let e of getBox) {
        const boxID = $(e).attr("id");
        const getBoxNode = document.getElementById(boxID);
        result =checkInView($(getBoxNode), false);
        result2 = checkInView($(getBoxNode), true);
        if (result || result2) {
          const paraString = e.innerHTML.length;
          const newParaString = e.innerHTML.substring(0, paraString / 2);
          paraObj = { [boxID]: newParaString };
          let itemString = localStorage.getItem($(".container").attr("id"));
          let json = JSON.parse(itemString);
          json.bookmark = paraObj;
          localStorage.setItem(
            $(".container").attr("id"),
            JSON.stringify(json)
          );
			break;
        }

      };
    });
	
    if (json.bookmark && json.chapterID==getChapterName) {
       const getBox = document.getElementsByClassName("box");
      const paraObj = json.bookmark;
      const boxID = Object.keys(paraObj)[0];
      for (let i of getBox) {
        const getBoxID = $(i).attr("id");
        if (getBoxID == boxID) {
          if (i.innerHTML.includes(paraObj[getBoxID])) {
            nodeParagraph = i;
            
            break;
          }
        }
      }
		
      setTimeout(function () {
        scrollToPara(nodeParagraph);
      }, 35);
    }
	 
    
  });
 };
const renderTableOfContent = (data) => {
  $(".container").attr({ id: `book${data.bookID}` });

  data.bookInfo.map((val) => {
    $(
      `<a href="#${val.chapterID}"><h3 class="chapters" id=chapter${val.chapterID}>${val.title}</h3></a>`
    ).appendTo(".chapter-container");
  });
};

const renderBookByChapter = (data, id, selectedChapter) => {
$(".book-container").empty();
  $("#text").empty();
  data.bookInfo.map((val, index) => {
    if (val.chapterID == id) {
      $(`<section id="chapter${val.chapterID}" class="chapter${val.chapterID} zoom">
        <h1 class="chapter" id="${val.chapterID}">${val.title}</h1>
       
           <p id="text" class=text></p> 
      </section>
      `).appendTo(".book-container");
      ++index;

    }
  });
  let test = $(".zoom").attr("id");
  let numberPattern = /\d+/g;
  let getChapter = test.match(numberPattern);
	//
let index = 0;
  data.bookInfo.map((val) => {
   
 if (val.chapterID == getChapter[0]) {

  let str = val.content;
  let clone =str;

 let lines = clone.split(/\r?\n/);
  

  let html="";
  for(var i=0;i<lines.length;i++){
	let arr1 = lines[i].split(" ");

	if(lines[i] == ""){
		html+= '<br></br>'
	}
     else{ 

       html += `<p id="box${++index}" class="box initial-size"> ${
            lines[i]
          }  </p>`;
  }}
		$("#text").append(html)
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
}
});
      
	
  $(".book-container").css({ border: "1px solid black" });
  $(".book-container").css(
    "box-shadow",
    " rgba(136, 136, 136, 0.65) 0px 0px 15px 0px"
  );

  let book = localStorage.getItem($(".container").attr("id"));

  if (book == null) {
    setBookSetting(selectedChapter);
    book = localStorage.getItem($(".container").attr("id"));
  }
  const bookObj = JSON.parse(book);
  
  const chapterID = bookObj.chapterID;
  const size = bookObj.size;

  if ($(".container").attr("id") == bookObj.bookCode) {
    
    if (selectedChapter === chapterID) {
      if (size.length > 0) {
        size.map((val) => {
          for (let i in val) {
            let sizeClass = "";
            sizeClass = "." + i;
           
            $(sizeClass).css("font-size", val[i]);
           
          }
        });
      }
    }
  
   
  }


};
const scrollToPara = (el) => {
  el.scrollIntoView({
    block: "start",
    inline: "nearest",
  });

  el.scrollIntoView = function () {};
};
const setBookSetting = (chapterID) => {
  const bookID = $(".container").attr("id");
  const bookSetting = {
    bookCode: bookID,
    chapterID: chapterID,
    size: "",
    fontStyle: "",
    bookmark: "",
    body: "",
  };
  localStorage.setItem($(".container").attr("id"), JSON.stringify(bookSetting));
};
function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection();
  }
}