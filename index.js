//If user adds a note add it to local storage
  
let addBtn = document.getElementById("addBtn");
showNotes();

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");

if (addTxt.value.length < 2 || addTitle.value.length < 2) {
  alert("You cannot add this Note!")
  addTxt.value="";
  addTitle.value="";

} 
else{
 
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };

  notesObj.push(myObj);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  console.log(notesObj);

  showNotes();
}});


function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";

  notesObj.forEach(function (element, index) {
    
      html =
        html +
        `
      <div class="noteCard my-2 mx-2 card" style="width: 18rem;" >
        <div class="card-body">
          <h5 class="card-title"> Note ${index + 1}: ${element.title}</h5>
          <p class="card-text">${element.text} </p>
          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">
            Delete Note
          </button>
        </div>
      </div>`;
     
    
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show use "Add a Note" to add notes.`;
  }
}

//function to delete node
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value;
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("h5")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });
});

