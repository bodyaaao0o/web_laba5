export async function renderLocalBooks() {
    const response = await fetch('/api/books');
    return response.json();
}

export async function addBookToBackend(book) {
    const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    return response.json();
}

export async function updateBookOnBackend(id, book) {
    const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    return response.json();
}

export async function deleteBookFromBackend(id) {
    await fetch(`/api/books/${id}`, {
        method: 'DELETE'
    });
}

export async function getBookByIdFromBackend(id) {
    const response = await fetch(`/api/books/${id}`);
    return response.json();
}
