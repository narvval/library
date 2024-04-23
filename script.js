// Create array to store books
let myLibrary = [];

// Create a constructor function (this will allow the creation of new Books)
function Book(title, author, status, genre, pages) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.genre = genre;
  this.pages = pages;
}

// Create a function to add a new Book to the Array
function addToLibrary(title, author, status, genre, pages) {
  let length = myLibrary.length;
  if (length < 1) {
    myLibrary[0] = new Book(title, author, status, genre, pages);
    addCard(myLibrary[0], 0);
  } else {
    myLibrary[length] = new Book(title, author, status, genre, pages);
    addCard(myLibrary[length], length);
  }
}

// Append a 'card' child to 'card-container' with the details of a Book object
const cardContainer = document.querySelector(".card-container");
function addCard(bookObject, arrayIndex) {
  // Create the new elements to be inserted
  bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("arrayIndex", arrayIndex);

  card = document.createElement("div");
  card.classList.add("card");

  deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-book-btn");
  deleteBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg>';
  deleteBtn.setAttribute("arrayIndex", arrayIndex);

  // Add delete functionality to delete btn
  deleteBtn.addEventListener("click", () => {
    // Delete the Book that is at the created index
    myLibrary.splice(arrayIndex, 1);

    // Delete the card associated w that index/book
    cardToDelete = bookCard;
    cardToDelete.remove();
  });

  bookTitle = document.createElement("div");
  bookTitle.classList.add("title");
  bookTitle.innerText = bookObject.title;

  bookAuthor = document.createElement("div");
  bookAuthor.classList.add("author");
  bookAuthor.innerText = bookObject.author;

  bookStatus = document.createElement("button");
  bookStatus.classList.add("status");
  bookStatus.innerText = bookObject.status;
  // Add functionality to 'status' button
  bookStatus.addEventListener("click", () => {
    if (bookObject.status === "read") {
      bookStatus.innerText = "Unread";
    } else {
      bookStatus.innerText = "Read";
    }
    toggleStatus(bookObject);
  });

  bookGenre = document.createElement("div");
  bookGenre.classList.add("genre");
  bookGenre.innerText = bookObject.genre;

  bookPages = document.createElement("div");
  bookPages.classList.add("pages");
  bookPages.innerText = bookObject.pages + " pages";

  // Nest them all under 'card'
  card.appendChild(bookTitle);
  card.appendChild(bookAuthor);
  card.appendChild(bookStatus);
  card.appendChild(bookGenre);
  card.appendChild(bookPages);

  // Add the card element to the card-container
  bookCard.appendChild(card);
  bookCard.appendChild(deleteBtn);
  cardContainer.appendChild(bookCard);
}

// 'add-to-library' button opens dialog
const dialog = document.querySelector("dialog");
const dialogOpen = document.querySelector(".add-to-library");
const dialogClose = document.querySelector(".close-dialog-btn");

dialogOpen.addEventListener("click", () => {
  dialog.showModal();
});

dialogClose.addEventListener("click", () => {
  dialog.close();
});

// Get user input from form submission
function getFormInput() {
  title = document.getElementById("title").value;
  titleError = document.querySelector(".title-error");

  author = document.getElementById("author").value;
  authorError = document.querySelector(".author-error");

  genre = document.getElementById("genre").value;
  genreError = document.querySelector(".genre-error");

  pages = document.getElementById("pages").value;
  pagesError = document.querySelector(".pages-error");

  read = document.getElementById("read");
  unread = document.getElementById("unread");
  statusError = document.querySelector(".status-error");
  readStatus = undefined;

  // Make sure inputs are not blank
  if (!title) {
    titleError.innerText = "Title is required.";
  } else {
    titleError.innerText = "";
  }

  if (!author) {
    authorError.innerText = "Author is required.";
  } else {
    authorError.innerText = "";
  }

  if (!genre) {
    genreError.innerText = "Genre is required.";
  } else {
    genreError.innerText = "";
  }

  if (!pages) {
    pagesError.innerText = "Pages is required.";
  } else {
    pagesError.innerText = "";
  }

  if (read.checked === false && unread.checked === false) {
    statusError.innerText = "Status is required.";
  } else {
    statusError.innerText = "";
    if (read.checked === true) {
      readStatus = "read";
    }

    if (unread.checked === true) {
      readStatus = "unread";
    }
  }

  if (title && author && genre && pages && readStatus != undefined) {
    addToLibrary(title, author, readStatus, genre, pages);
    dialog.close();
    form = document.querySelector("#form");
    form.reset();
  }
}

// Prevent default form submission and ensure it adds user's book to array and creates new card in html
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  getFormInput();
});

// Toggle read status in objects
// Create a function that takes a 'book' OBJECT, accesses its status, and changes it to the opposite
function toggleStatus(book) {
  if (book.status === "read") {
    book.status = "unread";
  } else {
    book.status = "read";
  }
}
