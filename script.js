document.querySelector('#year').textContent = new Date().getFullYear();


(function () {
  const addBookBtn = document.querySelector('#addBookBtn');
  const cancelButton = document.querySelector('#cancel');
  const dialog = document.querySelector('#dialog');

  addBookBtn.addEventListener('click', function () {
    const inputs = document.querySelectorAll('input:not([name="read"])');
    inputs.forEach(input => {
      input.value = '';
    });
    document.querySelector('#notRead').checked = true;

    dialog.showModal();
  });

  cancelButton.addEventListener('click', function () {
    dialog.close();
  });
})()

const myLibrary = [];
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', addBookToLibrary);

function addBookToLibrary(){
  const bookNameInput = document.querySelector('#bookTitle').value;
  const bookAuthorInput = document.querySelector('#bookAuthor').value;
  const bookPagesInput = document.querySelector('#bookPages').value;
  const readInput = document.querySelector('input[name="read"]:checked');

  const newBook = new Book(bookNameInput, bookAuthorInput, bookPagesInput, readInput.value);
  myLibrary.push(newBook);
}

