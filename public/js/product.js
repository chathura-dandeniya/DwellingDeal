document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('addProductForm');
    const deleteProductForm = document.getElementById('deleteProductForm');
    const updateProductform = document.getElementById('updateProductForm');
  
    addProductForm.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log("Form Submitted");
  

      const productName = document.getElementById('title').value;
      const productDescription = document.getElementById('description').value;
      const productPrice = document.getElementById('price').value;
      const productCategory = document.getElementById('category').value;
      const productLocation = document.getElementById('location').value;
      const productImage = document.getElementById('image').files[0];

      const productData = {
        title: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
        location: productLocation,
        image: productImage,
      };

      fetch('/', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(productData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.statusCode === 201) {
            alert('Product added successfully.');
            // Clearn the form fields
            addProductForm.reset();
          } else {
            alert('Error adding the product.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while adding the product.');
        });
    });
  
    //update
    
  
    // Add the code for updating a product by name
    updateProductForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const prevName = document.getElementById('prevName').value;
      const newName = document.getElementById('newName').value;
      const newDescription = document.getElementById('newDescription').value;
      const newPrice = document.getElementById('newPrice').value;
  
      const productData = {
        prevName: prevName,
        newName: newName,
        newDescription: newDescription,
        newPrice: parseFloat(newPrice), // Convert to a number if needed
      };
  
      // Send a PUT request to the server to update the product
      fetch(`/api/product/${prevName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
        .then((response) => {
          if (response.status === 200) {
            // Product updated successfully
            alert('Product updated successfully.');
            // You can perform any other necessary actions here
          } else if (response.status === 404) {
            // Product not found
            alert('Product not found.');
          } else {
            // Error updating the product
            alert('Error updating the product.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while updating the product.');
        });
    });
    
    //
  // Add the code for deleting a product here
    deleteProductForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const productname = document.getElementById('productname').value;
      
  
      // Send a DELETE request to the server
      fetch(`/api/product/${productname}`, {
        method: 'DELETE',
        
      })
      .then((response) => {
        if (response.status === 200) {
          // Product deleted successfully
          alert('Product deleted successfully.');
          // You can perform any other necessary actions here
        } else if (response.status === 404) {
          // Product not found
          alert('Product not found.');
        } else {
          // Error deleting the product
          alert('Error deleting the product.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while deleting the product.');
        });
    });
  
  });