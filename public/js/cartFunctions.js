function removeItem(item_id){
    if(confirm("Are you sure you want to remove item?")){
        window.location.href = `cart/remove_item?id=${item_id}`;
    }
}

const cart = document.getElementById('cart');
const cartButton = document.getElementById('cartButton');

cartButton.addEventListener('click', () =>{
    if(cart.style.display === 'none' || cart.style.display === ''){
        cart.style.display = 'block';
    } else{
        cart.style.display = 'none';
    }
})