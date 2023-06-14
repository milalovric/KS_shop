let productsInCart = localStorage.getItem("productsInCart");
productsInCart = JSON.parse(productsInCart);

const cartEmpty = document.querySelector("#cart-empty");
const cartProducts = document.querySelector("#cart-products");
const cartActions = document.querySelector("#cart-actions");
const cartBuyer = document.querySelector("#cart-buyer");
let buttonEliminate = document.querySelectorAll(".cart-product-eliminate");
const buttonEmpty = document.querySelector(".cart-actions-empty");
const containerTotal = document.querySelector("#total");
const buttonBuy = document.querySelector(".cart-actions-buy");

function loadProductsCart() {
  if (productsInCart && productsInCart.length > 0) {
    cartEmpty.classList.add("disabled");
    cartProducts.classList.remove("disabled");
    cartActions.classList.remove("disabled");
    cartBuyer.classList.add("disabled");

    cartProducts.innerHTML = "";

    productsInCart.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("cart-product");
      div.innerHTML = `
        <img class="cart-product-img"src="${product.img}" alt="${product.title}">
        <div class="cart-product-name">
            <small>Name</small>
            <h3>${product.title}</h3>
        </div>
        <div class="cart-product-amount">
            <small>Amount</small>
            <p>${product.quantity}</p>
        </div>
        <div class="cart-product-price">
            <small>Price</small>
            <p>$${product.price}</p>
        </div>
        <div class="cart-product-subtotal">
            <small>Subtotal</small>
            <p>$${product.price * product.quantity}</p>
        </div>
        <button class="cart-product-eliminate" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
      `;

      cartProducts.append(div);
    });
  } else {
    cartEmpty.classList.remove("disabled");
    cartProducts.classList.add("disabled");
    cartActions.classList.add("disabled");
    cartBuyer.classList.add("disabled");
  }

  updateButtonEliminate();
  updateTotal();
}

loadProductsCart();

function updateButtonEliminate() {
  buttonEliminate = document.querySelectorAll(".cart-product-eliminate");

  buttonEliminate.forEach((button) => {
    button.addEventListener("click", eliminateProduct);
  });
}

function eliminateProduct(e) {
  const idButton = e.currentTarget.id;
  const indexProduct = productsInCart.findIndex((product) => product.id === idButton);

  productsInCart.splice(indexProduct, 1);
  loadProductsCart();

  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}

buttonEmpty.addEventListener("click", emptyCart);

function emptyCart() {
  productsInCart.length = 0;
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  loadProductsCart();
}

function updateTotal() {
  const totalCalculator = productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  containerTotal.innerText = `$${totalCalculator}`;
}

buttonBuy.addEventListener("click", buyProducts);

function buyProducts() {
    window.location.href = "file:///C:/Users/DT%20User6/Desktop/web_shop/checkout.html";
}

function redirectToThankYouPage() {
    window.location.href = "thankyou.html";
  }
  
  function buyProduct() {
    productsInCart.length = 0;
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    redirectToThankYouPage();
  }
  
  