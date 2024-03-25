document.querySelector('#year').textContent = new Date().getFullYear();

(function () {
  const addBookBtn = document.querySelector('#addBookBtn');
  const cancelButton = document.querySelector('#cancel');
  const dialog = document.querySelector('#dialog');

  addBookBtn.addEventListener('click', function () {
    const inputs = document.querySelectorAll('input:not([name="read"])');
    inputs.forEach((input) => {
      input.value = '';
    });
    document.querySelector('#notRead').checked = true;

    dialog.showModal();
  });

  cancelButton.addEventListener('click', function () {
    dialog.close();
  });
})();

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  changeReadStatus() {
    this.read = !this.read;
  }
}

let myLibrary = [];

const storedLibrary = localStorage.getItem('library');
if (storedLibrary) {
  const parsedLibrary = JSON.parse(storedLibrary);
  myLibrary = parsedLibrary.map((bookData) => {
    const book = new Book(
      bookData.title,
      bookData.author,
      bookData.pages,
      bookData.read
    );
    Object.setPrototypeOf(book, Book.prototype);
    return book;
  });
  updateLibrary();
}

const form = document.querySelector('form');
form.addEventListener('submit', () => {
  addBookToLibrary();
  updateLibrary();
});

function addBookToLibrary() {
  const bookNameInput = document.querySelector('#bookTitle').value;
  const bookAuthorInput = document.querySelector('#bookAuthor').value;
  const bookPagesInput = document.querySelector('#bookPages').value;
  const readInput = document.querySelector('input[name="read"]:checked');

  const newBook = new Book(
    bookNameInput,
    bookAuthorInput,
    bookPagesInput,
    readInput.value
  );
  myLibrary.push(newBook);

  saveLibraryToLocalStorage();
}

function saveLibraryToLocalStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function updateLibrary() {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.innerHTML = `<div><h2>Title: </h2> <p>${book.title}</p></div>
    <div><h2>Author: </h2> <p>${book.author}</p></div>
    <div><h2>Pages: </h2> <p>${book.pages}</p></div>
    <div><button class='readBtn' id='num${index}'></button><button class='deleteBtn'>Delete</button></div>`;
    card.classList.add('card');
    cardContainer.appendChild(card);

    const deleteBtn = card.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      updateLibrary();
      saveLibraryToLocalStorage();
    });

    const readBtn = card.querySelector('.readBtn');
    readBtn.addEventListener('click', () => {
      book.changeReadStatus();
      updateLibrary();
      saveLibraryToLocalStorage();
    });

    if (book.read) {
      readBtn.classList.add('readBtnTrue');
    }
  });
}
