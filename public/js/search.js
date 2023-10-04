function search(){
    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById('searchInput');
        const searchForm = document.querySelector("searchForm");
    
        form.addEventListener("submit", function (event){
            event.preventDefault();
            const searchTerm = searchInput.value.trim();
            console.log(searchTerm);
            if(searchTerm) {
                fetch(`/searchResults${searchTerm}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })
                .then(response => response.json())
                .then (data => {
                    console.log(data);
                })
                .catch(error =>{
                    console.error('Error', error);
                })
            }
    })}
    )};
