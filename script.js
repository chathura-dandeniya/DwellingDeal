document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('addProductForm');
  
    productForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const formData = new FormData(productForm);
  
      fetch('/api/addproduct', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.statusCode === 201) {
            alert('Product added successfully!');
            // You can optionally redirect the user or perform other actions here.
          } else {
            alert('Error adding the product.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while adding the product.');
        });
    });
  });
  