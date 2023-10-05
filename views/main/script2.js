function handlePaymentRequest(event) {
    event.preventDefault();
    console.log("Clicked Happened");
    fetch("http://localhost:3001/api/ecommerceservices/payment/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify([
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 2 },
        ])
    })
        .then(res => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        })
        .then(({ url }) => {
            window.location = url;
        })
        .catch(e => {
            console.error(e.error);
        });
}

const button2 = document.querySelector("#retry_Btn");
button2.addEventListener("click", handlePaymentRequest);