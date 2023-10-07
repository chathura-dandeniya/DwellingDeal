function search() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    console.log(searchTerm);
    if (searchTerm) {
        fetch(`/searchResults?searchTerm=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error', error);
        });
    }
}

