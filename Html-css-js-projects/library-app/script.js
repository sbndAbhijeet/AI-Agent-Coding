document.addEventListener('DOMContentLoaded', function () {
    const bookTableBody = document.querySelector('#book-table tbody');
    const searchInput = document.getElementById('search-input');

    let books = JSON.parse(localStorage.getItem('books')) || [];

    // Function to render book table
    function renderBookTable(bookList) {
        bookTableBody.innerHTML = ''; // Clear existing table
        bookList.forEach(function (book, index) {
            const newRow = bookTableBody.insertRow();
            const titleCell = newRow.insertCell(0);
            const authorCell = newRow.insertCell(1);
            const isbnCell = newRow.insertCell(2);
            const actionCell = newRow.insertCell(3);

            titleCell.textContent = book.title;
            authorCell.textContent = book.author;
            isbnCell.textContent = book.isbn;

            // Review button
            const reviewBtn = document.createElement('a');
            reviewBtn.textContent = 'Review';
            reviewBtn.className = 'review-btn';
            reviewBtn.href = './pages/review.html';
            actionCell.appendChild(reviewBtn);

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            editBtn.addEventListener('click', function () {
                editBook(index);
            });
            actionCell.appendChild(editBtn);

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function () {
                deleteBook(index);
            });
            actionCell.appendChild(deleteBtn);
        });
    }

   
    // Function to add a book to the table and local storage
    function addBookToTable(title, author, isbn) {
        const book = { title: title, author: author, isbn: isbn };
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        renderBookTable(books);
    }
    
    // Function to clear input fields
    function clearInputFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

   // Function to delete a book
   function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    renderBookTable(books);
   }

    // Function to edit a book
    function editBook(index) {
        const book = books[index];
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;

         // After populating the form, delete the book from the array and update local storage
         books.splice(index, 1);
         localStorage.setItem('books', JSON.stringify(books));
         renderBookTable(books);
    }

     // Add book button event listener
     const addBookBtn = document.getElementById('add-book');

     if(addBookBtn){
        addBookBtn.addEventListener('click', function () {
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const isbn = document.getElementById('isbn').value;
    
            if (title && author && isbn) {
                addBookToTable(title, author, isbn);
                clearInputFields();
            } else {
                alert('Please fill in all fields.');
            }
        });
     }

    // Function to search books
    searchInput.addEventListener('keyup', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredBooks = books.filter(function (book) {
            return (
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm) ||
                book.isbn.toLowerCase().includes(searchTerm)
            );
        });
        renderBookTable(filteredBooks);
    });

    // Initial render of book table
    renderBookTable(books);
});
