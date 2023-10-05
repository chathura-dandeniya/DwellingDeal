document.addEventListener('DOMContentLoaded', function () {
    const addUserForm = document.getElementById('addUserForm');

    addUserForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form input values
        const FirstName = document.getElementById('Firstname').value;
        const LastName = document.getElementById('Lastname').value;
        const Email = document.getElementById('Email').value;
        const Password = document.getElementById('Password').value;
        const PhoneNumber = document.getElementById('Phonenumber').value;

        // Create a FormData object to send the form data
        const userData = {
            firstname: FirstName,
            lastname: LastName,
            email: Email,
            password: Password,
            phonenumber: PhoneNumber,
          };

        // Send a POST request to the server to add the User
        fetch('/api/adduser', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData),        
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.statusCode === 201) {
                alert('user added successfully.');
                // Clear the form fields
                addUserForm.reset();
            } else {
                alert('Error adding the user.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while adding the user.');
        });
    });
});
