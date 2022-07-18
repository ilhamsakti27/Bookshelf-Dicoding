// DEFINITION
const dataSemuaBukuLocalStorage = 'Books'; // UBAH INI
let dataSemuaBuku = [];
const RENDER_EVENT = 'render-bookshelf';

function checkForStorage() {
  return typeof (Storage) !== 'undefined';
}

const addBookSubmit = document.querySelector('#addBook');

addBookSubmit.addEventListener('submit', function (event) {
    
    const judulBuku = document.querySelector('#judulBuku').value;
    const penulisBuku = document.querySelector('#penulisBuku').value;
    const tahunBuku = document.querySelector('#tahunBuku').value;
    const selesaiDibaca = document.querySelector('#selesaiDibaca').checked;
    const dataBuku = {
      id : +new Date(),
      title: judulBuku,
      author: penulisBuku,
      year: tahunBuku,
      isComplete: selesaiDibaca
    }
    console.log(dataBuku);
    saveData(dataBuku);
    
    location.reload();
});

document.addEventListener('DOMContentLoaded', function () {
  if (checkForStorage()) {
   loadDataFromStorage();
  }
});

function saveData(dataBuku) {
  if( checkForStorage() ) {
    const dataLocalStorage = localStorage.getItem(dataSemuaBukuLocalStorage);
    let data = JSON.parse(dataLocalStorage);
    if(data !== null){
      console.log('Ada isi');
      data.push(dataBuku);
      dataToLocalStorage = JSON.stringify(data);
      localStorage.setItem(dataSemuaBukuLocalStorage,dataToLocalStorage );

    }
    else {
      console.log('Ga ada isi');
      let data1 = [];
      data1.push(dataBuku);
      dataToLocalStorage = JSON.stringify(data1);
      localStorage.setItem(dataSemuaBukuLocalStorage,dataToLocalStorage );

    }   
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(dataSemuaBukuLocalStorage);
  let data = JSON.parse(serializedData);
 
  if (data !== null) {
    for (const todo of data) {
      dataSemuaBuku.push(todo);
    }
  }
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(bookObject) {
  const {id, title, author, year, isComplete} = bookObject;

  const textTitle = document.createElement('h4');
  textTitle.classList.add('card-title');
  textTitle.innerText = title;

  const textAuthor = document.createElement('p');
  textAuthor.classList.add('card-text', 'text-muted', 'm-0');
  textAuthor.innerText = "Penulis : " + author;

  const textYear = document.createElement('p');
  textYear.classList.add('card-text', 'text-muted', 'm-0');
  textYear.innerText = "Tahun : " + year;

  if (isComplete) {
    // undo
    const undo = document.createElement('a');
    undo.setAttribute('href', '#');
    
    const span = document.createElement('span');
    span.setAttribute('class', 'material-symbols-outlined');
    span.setAttribute('style', 'font-size: 185%; margin-top: 2%;');
    span.innerText = 'undo';
    
    undo.append(span);

    // delete
    const delet = document.createElement('a');
    delet.setAttribute('href', '#');
    
    const span1 = document.createElement('span');
    span1.setAttribute('class', 'material-symbols-outlined');
    span1.setAttribute('style', 'font-size: 185%; margin-top: 2%;');
    span1.innerText = 'delete';

    delet.append(span1);

    const containerIn = document.createElement('div');
    containerIn.classList.add('card-body');
    containerIn.append(textTitle, textAuthor, textYear, undo, delet);

    const containerOut = document.createElement('div');
    containerOut.classList.add('card', 'mt-3');
    containerOut.setAttribute('id', `${id}`);
    containerOut.append(containerIn);

    undo.addEventListener('click', function () {
      undoBook(id);
    });
    delet.addEventListener('click', function () {
      deletBook(id);
    });

    return containerOut;
  }

  else {
    // check
    const check = document.createElement('a');
    check.setAttribute('href', '#');
    
    const span = document.createElement('span');
    span.setAttribute('class', 'material-symbols-outlined');
    span.setAttribute('style', 'font-size: 185%; margin-top: 2%;');
    span.innerText = 'check';
    
    check.append(span);

    // delete
    const delet = document.createElement('a');
    delet.setAttribute('href', '#');
    
    const span1 = document.createElement('span');
    span1.setAttribute('class', 'material-symbols-outlined');
    span1.setAttribute('style', 'font-size: 185%; margin-top: 2%;');
    span1.innerText = 'delete';

    delet.append(span1);

    const containerIn = document.createElement('div');
    containerIn.classList.add('card-body');
    containerIn.append(textTitle, textAuthor, textYear, check, delet);

    const containerOut = document.createElement('div');
    containerOut.classList.add('card', 'mt-3');
    containerOut.append(containerIn);

    check.addEventListener('click', function () {
      // panggil function
      checkBook(id);
    });
    delet.addEventListener('click', function () {
      deletBook(id);
    });

    return containerOut;
  }

}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBooks = document.getElementById('unreadBooks');
  const listCompletedBooks = document.getElementById('readedBooks');

  for (bookItem of dataSemuaBuku) {
    const bookElement = makeBook(bookItem);

    if (bookItem.isComplete) {
      listCompletedBooks.append(bookElement);
    }
    else {
      uncompletedBooks.append(bookElement);
    }
  }
});

function findBook (bookId) {
  const books = localStorage.getItem(dataSemuaBukuLocalStorage);
  const dataBooks = JSON.parse(books);
  
  for(const book of dataBooks) {
    if (book.id === bookId) {
      return book.id;
    }
  }
  
  return null;
}

function undoBook (bookId) {
  const dataLocalStorage = localStorage.getItem(dataSemuaBukuLocalStorage);
  let dataBooks = JSON.parse(dataLocalStorage);
  
  for (let book of dataBooks) {
    if (book.id === bookId) {
      book.isComplete = false;
    }
  }
  dataBooks = JSON.stringify(dataBooks);
  localStorage.setItem(dataSemuaBukuLocalStorage, dataBooks);
  location.reload();
}

function checkBook (bookId) {
  const dataLocalStorage = localStorage.getItem(dataSemuaBukuLocalStorage);
  let dataBooks = JSON.parse(dataLocalStorage);
  
  for (let book of dataBooks) {
    if (book.id === bookId) {
      book.isComplete = true;
    }
  }
  dataBooks = JSON.stringify(dataBooks);
  localStorage.setItem(dataSemuaBukuLocalStorage, dataBooks);
  location.reload();
}

function deletBook(bookId) {
  const dataLocalStorage = localStorage.getItem(dataSemuaBukuLocalStorage);
  let dataBooks = JSON.parse(dataLocalStorage);
  let i = 0;
  for (let book of dataBooks) {
    if (book.id === bookId) {
      // book.isComplete = true;
      dataBooks.splice(i, 1);
      dataBooks = JSON.stringify(dataBooks);
      localStorage.setItem(dataSemuaBukuLocalStorage, dataBooks);
      location.reload();
    }
    ++i;
  }
}

const searchButton = document.getElementById('search');

searchButton.addEventListener('submit', function() {
  const searchTextValue = document.getElementById('searchText').value;
  // console.log(searchTextValue);
  const dataLocalStorage = localStorage.getItem(dataSemuaBukuLocalStorage);
  let dataBooks = JSON.parse(dataLocalStorage);
  // let i = 0;
  for (let book of dataBooks) {
    if (book.title === searchTextValue) {
      // book.isComplete = true;
      const searchResult = document.getElementById('searchResult');
      
      const {id, title, author, year, isComplete} = book;

      const textTitle = document.createElement('h4');
      textTitle.classList.add('card-title');
      textTitle.innerText = title;

      const textAuthor = document.createElement('p');
      textAuthor.classList.add('card-text', 'text-muted', 'm-0');
      textAuthor.innerText = "Penulis : " + author;

      const textYear = document.createElement('p');
      textYear.classList.add('card-text', 'text-muted', 'm-0');
      textYear.innerText = "Tahun : " + year;

      const containerIn = document.createElement('div');
      containerIn.classList.add('card-body');
      containerIn.append(textTitle, textAuthor, textYear);

      const containerOut = document.createElement('div');
      containerOut.classList.add('card', 'mt-3');
      containerOut.setAttribute('id', `${id}`);
      containerOut.append(containerIn);

      searchResult.append(containerOut);
      event.preventDefault();
      }
  }
});
