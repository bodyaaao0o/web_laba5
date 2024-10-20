let books = [];
let editIndex = -1;

class Book {
    constructor(title, author, pages, price) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.price = parseFloat(price); 
    }
}

function addBook() {
    const title = document.getElementById('title-create').value;
    const author = document.getElementById('author-create').value;
    const pages = document.getElementById('pages-create').value;
    const price = document.getElementById('price-create').value;

    if (title && author && pages && price) {
        const book = new Book(title, author, pages, price);
        books.push(book);
        renderBooks();
        updateTotalPrice();
        clearInputFields('create');
        document.getElementById('create-error').style.display = 'none';
    } else {
        document.getElementById('create-error').style.display = 'block';
    }
}

function startEdit(index) {
    const book = books[index];
    document.getElementById('title-edit').value = book.title;
    document.getElementById('author-edit').value = book.author;
    document.getElementById('pages-edit').value = book.pages;
    document.getElementById('price-edit').value = book.price;

    editIndex = index;
    openTab(null, 'edit');
}

function saveChanges() {
    const title = document.getElementById('title-edit').value;
    const author = document.getElementById('author-edit').value;
    const pages = document.getElementById('pages-edit').value;
    const price = document.getElementById('price-edit').value;

    if (title && author && pages && price) {
        books[editIndex] = new Book(title, author, pages, price);
        renderBooks();
        updateTotalPrice();
        clearInputFields('edit');
        document.getElementById('edit-error').style.display = 'none';
        openTab(null, 'book-list');
    } else {
        document.getElementById('edit-error').style.display = 'block';
    }
}

function renderBooks(filteredBooks = books) {
    const bookList = document.getElementById('book-list-content');
    bookList.innerHTML = filteredBooks.length > 0 
        ? filteredBooks.map((book, index) => `
            <div class="book-item">
                <span><b>Назва:</b> ${book.title}</span><br>
                <span><b>Автор:</b> ${book.author}</span><br>
                <span><b>Кількість сторінок:</b> ${book.pages}</span><br>
                <span><b>Ціна:</b> ${book.price} грн</span><br>
                <button onclick="startEdit(${index})">Редагувати</button>
                <button onclick="deleteBook(${index})">Видалити</button>
            </div>
        `).join('') 
        : `<p>Книги не знайдено</p>`;
}

function deleteBook(index) {
    books.splice(index, 1);
    renderBooks();
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPrice = books.reduce((total, book) => total + book.price, 0);
    document.getElementById('total-price').innerText = totalPrice;
}

function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    if (evt) {
        evt.currentTarget.classList.add("active");
    }
}

function clearInputFields(type) {
    document.getElementById(`${type === 'create' ? 'title-create' : 'title-edit'}`).value = '';
    document.getElementById(`${type === 'create' ? 'author-create' : 'author-edit'}`).value = '';
    document.getElementById(`${type === 'create' ? 'pages-create' : 'pages-edit'}`).value = '';
    document.getElementById(`${type === 'create' ? 'price-create' : 'price-edit'}`).value = '';
}

function searchBook() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
}

function resetSearch() {
    document.getElementById('search').value = ''; 
    renderBooks(); 
}

function sortBooks() {
    books.sort((a, b) => a.price - b.price);
    renderBooks();
}

openTab(null, 'book-list');
