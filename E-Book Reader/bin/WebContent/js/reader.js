$(function () {
	let newBody = $("main").html();
  	let fontStyle = "verdana";
  	let fontSize = "20px";
	const getBookID=localStorage.getItem("bookID");
	const api = "http://localhost:8070/book_test1/rest/BookView/book?bookID="+getBookID;
	$.get(api, function (data) {
    const obj = JSON.parse(data);
    console.log(obj);
	renderBook(obj);
    renderTableOfContent(obj);
  });

   const gethighlight = localStorage.getItem("body");

  if (gethighlight) {
    $(".container").replaceWith(gethighlight);
  }
  $("body").on("click", ".download", function () {});
  $(".sizes").change(function () {
    $(".text").css("font-size", $(this).val());
    fontSize = $(".text").css("font-size");
    console.log(fontSize);
    localStorage.setItem("size", fontSize);
  });
  $("#fs").change(function () {
    let fontStyle = $(this).val();
    console.log(fontStyle);
    $(".text").css("font-family", fontStyle);
    localStorage.setItem("personalize", fontStyle);
  });

  $("body").on("click", ".save", function () {
    if (typeof Storage !== "undefined") {
      newBody = $("main").html();
      localStorage.setItem("body", newBody);
      checkStorage(newBody);
    }
  });
  $("body").on("click", ".toolbar-setting", function () {
    let getAttrName = $(this).attr("name");
    textAction(getAttrName);
  });
});

const checkStorage = (data) => {
  const name = localStorage.getItem("body");
  //console.log(JSON.stringify(name));
  if (name) {
    $(".container").replaceWith(data);
  }
};
const renderTableOfContent = (data) => {
  data.bookInfo.map((val) => {
    $(
      `<a href="#${val.ID}"><h3 class="chapter">${val.title}</h3></a>`
    ).appendTo(".chapter-container");
  });
};
const renderFootnote = (data, index) => {
  console.log(data);
  console.log(index);
  data.map((value) => {
    console.log(value);
    $(`<div class="${value.contentID}">
        ${value.content}
    </div>`).appendTo("section");
  });
};

const renderBook = (data) => {
  data.bookInfo.map((val) => {
    //let re = /\(([^)]+)\)/;
    //let matched = re.exec(val.content);
    $(`<section class="chapter${val.chapterID}">
        <h1 id="${val.ID}">${val.title}</h1>
            <p class=text>${val.content}</p>

      </section>
      `).appendTo(".book-container");
    //console.log(matched);
  });
};
function getSelectedText() {
  if (window.getSelection) {
    console.log(window.getSelection().toString());
    return window.getSelection().toString();
  } else if (document.getSelection) {
    console.log(document.getSelection());
    return document.getSelection();
  } else if (document.selection) {
    console.log(document.selection.createRange().text);
    return document.selection.createRange().text;
  }
}
const textAction = (name) => {
  let setClass = "";
  if (name === "highlight") {
    setClass = "hl";
  } else if (name === "bold") {
    setClass = "bold-style";
  } else {
    setClass = "italic-style";
  }
  $(`input[name="${name}"]`).change(function () {
    if ($(this).is(":checked")) {
      $("body").on("mouseup", ".text", function () {
        let selection = getSelectedText();
        if (selection.length >= 3) {
          console.log(selection);

          let replacement = $("<span></span>")
            .attr({ class: setClass })
            .html(selection);
          console.log(replacement);

          let replacementHtml = $("<p>")
            .append(replacement.clone())
            .remove()
            .html();
          console.log($(replacement.clone()).remove().html());
          console.log($("<div>").append(replacement.clone()).html());
          console.log($("<div>").append(replacement.clone()).remove());
          console.log($("<div>").append(replacement.clone()).html());
          console.log(replacementHtml);
          console.log($(this).html($(this).html()));
          $(this).html($(this).html().replace(selection, replacementHtml));
        }
      });
    }
  });
};
