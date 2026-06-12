/* =========================
   CART SYSTEM
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */

function addToCart(name, price) {

let existingItem = cart.find(item => item.name === name);

if(existingItem){
existingItem.quantity++;
}else{
cart.push({
name: name,
price: price,
quantity: 1
});
}

saveCart();

alert(name + " added to cart");
}

/* SAVE CART */

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

/* REMOVE ITEM */

function removeItem(index){

cart.splice(index,1);

saveCart();

loadCart();

}

/* INCREASE QTY */

function increaseQty(index){

cart[index].quantity++;

saveCart();

loadCart();

}

/* DECREASE QTY */

function decreaseQty(index){

if(cart[index].quantity > 1){

cart[index].quantity--;

}else{

cart.splice(index,1);

}

saveCart();

loadCart();

}

/* =========================
   LOAD CART
========================= */

function loadCart(){

const cartContainer =
document.getElementById("cartItems");

if(!cartContainer) return;

cartContainer.innerHTML = "";

let subtotal = 0;

cart.forEach((item,index)=>{

let itemTotal =
item.price * item.quantity;

subtotal += itemTotal;

cartContainer.innerHTML += `

<div class="cart-item">

<div>

<h3>${item.name}</h3>

<p>
₹${item.price}
×
${item.quantity}
=
₹${itemTotal}
</p>

</div>

<div>

<button onclick="decreaseQty(${index})">
-
</button>

<button onclick="increaseQty(${index})">
+
</button>

<button onclick="removeItem(${index})">
🗑
</button>

</div>

</div>

`;

});

/* GST */

let gst =
subtotal * 0.18;

/* GRAND TOTAL */

let grandTotal =
subtotal + gst;

/* SHOW BILL */

const subtotalBox =
document.getElementById("subtotal");

const gstBox =
document.getElementById("gst");

const totalBox =
document.getElementById("grandTotal");

if(subtotalBox)
subtotalBox.innerHTML =
"₹" + subtotal.toFixed(2);

if(gstBox)
gstBox.innerHTML =
"₹" + gst.toFixed(2);

if(totalBox)
totalBox.innerHTML =
"₹" + grandTotal.toFixed(2);

}

/* =========================
   CLEAR CART
========================= */

function clearCart(){

localStorage.removeItem("cart");

cart = [];

loadCart();

}

/* =========================
   BOOKING SYSTEM
========================= */

function bookTable(event){

event.preventDefault();

let customerName =
document.getElementById("name").value;

let customerEmail =
document.getElementById("email").value;

let customerPhone =
document.getElementById("phone").value;

let bookingDate =
document.getElementById("date").value;

let bookingTime =
document.getElementById("time").value;

let guests =
document.getElementById("guests").value;

/* BILL */

let subtotal = 0;

cart.forEach(item => {

subtotal +=
item.price * item.quantity;

});

let gst =
subtotal * 0.18;

let total =
subtotal + gst;

/* ORDER ID */

let orderId =
"CN" +
Math.floor(
100000 + Math.random() * 900000
);

/* SAVE DATA */

localStorage.setItem(
"customerName",
customerName
);

localStorage.setItem(
"customerEmail",
customerEmail
);

localStorage.setItem(
"customerPhone",
customerPhone
);

localStorage.setItem(
"bookingDate",
bookingDate
);

localStorage.setItem(
"bookingTime",
bookingTime
);

localStorage.setItem(
"guests",
guests
);

localStorage.setItem(
"orderId",
orderId
);

localStorage.setItem(
"grandTotal",
total.toFixed(2)
);

/* REDIRECT */

window.location.href =
"order-confirm.html";

}

/* =========================
   ORDER CONFIRM PAGE
========================= */

function loadConfirmation(){

const orderId =
document.getElementById("orderId");

if(!orderId) return;

orderId.innerHTML =
localStorage.getItem("orderId");

document.getElementById(
"customerName"
).innerHTML =
localStorage.getItem(
"customerName"
);

document.getElementById(
"bookingDate"
).innerHTML =
localStorage.getItem(
"bookingDate"
);

document.getElementById(
"bookingTime"
).innerHTML =
localStorage.getItem(
"bookingTime"
);

document.getElementById(
"guestCount"
).innerHTML =
localStorage.getItem(
"guests"
);

document.getElementById(
"amountPaid"
).innerHTML =
"₹" +
localStorage.getItem(
"grandTotal"
);

}

/* =========================
   CART COUNT
========================= */

function updateCartCount(){

const count =
document.getElementById(
"cartCount"
);

if(!count) return;

let totalItems = 0;

cart.forEach(item=>{

totalItems += item.quantity;

});

count.innerHTML =
totalItems;

}

/* =========================
   PAGE LOAD
========================= */

window.onload = function(){

loadCart();

loadConfirmation();

updateCartCount();

};