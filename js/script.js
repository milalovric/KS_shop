// PRODUCTs
const products = [
    // Coats
    {
        id: "jakna-01",
        title: "Jakna 01",
        img: "./img/coats/01.jpg",
        categoria: {
            name: "Jakna",
            id: "jakna"
        },
        price: 1000
    },
    {
        id: "jakna-02",
        title: "Jakna 02",
        img: "./img/coats/02.jpg",
        categoria: {
            name: "Jakna",
            id: "jakna"
        },
        price: 1000
    },
    {
        id: "jakna-03",
        title: "Jakna 03",
        img: "./img/coats/03.jpg",
        categoria: {
            name: "Jakna",
            id: "jakna"
        },
        price: 1000
    },
    {
        id: "jakna-04",
        title: "Jakna 04",
        img: "./img/coats/04.jpg",
        categoria: {
            name: "Jakna",
            id: "jakna"
        },
        price: 1000
    },
    {
        id: "jakna-05",
        title: "Jakna 05",
        img: "./img/coats/05.jpg",
        categoria: {
            name: "Jakna",
            id: "jakna"
        },
        price: 1000
    },
    // T-shirts
    {
        id: "majica-01",
        title: "Majica 01",
        img: "./img/Tshirts/01.jpg",
        categoria: {
            name: "Majica",
            id: "majica"
        },
        price: 1000
    },
    {
        id: "majica-02",
        title: "Majica 02",
        img: "./img/Tshirts/02.jpg",
        categoria: {
            name: "Majica",
            id: "majica"
        },
        price: 1000
    },
    {
        id: "majica-03",
        title: "Majica 03",
        img: "./img/Tshirts/03.jpg",
        categoria: {
            name: "Majica",
            id: "majica"
        },
        price: 1000
    },
    {
        id: "majica-04",
        title: "Majica 04",
        img: "./img/Tshirts/04.jpg",
        categoria: {
            name: "Majica",
            id: "majica"
        },
        price: 1000
    },
    {
        id: "majica-05",
        title: "Majica 05",
        img: "./img/Tshirts/05.jpg",
        categoria: {
            name: "Majica",
            id: "majica"
        },
        price: 1000
    },
    {
        id: "majica-06",
        title: "Majica 06",
        img: "./img/Tshirts/06.jpg",
        categoria: {
            name: "Majica",
            id: "majica"
        },
        price: 1000
    },
    {
        id: "majica-07",
        title: "Majica 07",
        img: "./img/Tshirts/07.jpg",
        categoria: {
            name: "Majica",
            id: "majica"
        },
        price: 1000
    },
    {
        id: "majica-08",
        title: "Majica 08",
        img: "./img/Tshirts/08.jpg",
        categoria: {
            name: "Majica",
            id: "majica"
        },
        price: 1000
    },
    // Pants
    {
        id: "hlače-01",
        title: "Hlače 01",
        img: "./img/pants/01.jpg",
        amount: 1,
        categoria: {
            name: "Hlače",
            id: "hlače"
        },
        price: 1000
    },
    {
        id: "hlače-02",
        title: "Hlače 02",
        img: "./img/pants/02.jpg",
        categoria: {
            name: "Hlače",
            id: "hlače"
        },
        price: 1000
    },
    {
        id: "hlače-03",
        title: "Hlače 03",
        img: "./img/pants/03.jpg",
        categoria: {
            name: "Hlače",
            id: "hlače"
        },
        price: 1000
    },
    {
        id: "hlače-04",
        title: "Hlače 04",
        img: "./img/pants/04.jpg",
        categoria: {
            name: "Hlače",
            id: "hlače"
        },
        price: 1000
    },
    {
        id: "hlače-05",
        title: "Hlače 05",
        img: "./img/pants/05.jpg",
        categoria: {
            name: "Hlače",
            id: "hlače"
        },
        price: 1000
    }
];

const containerProducts = document.querySelector("#container-products");
const buttonCategorias = document.querySelectorAll(".button-categoria");
const titleMain = document.querySelector("#title-main");
let buttonAdd = document.querySelectorAll(".product-add");
const number = document.querySelector("#number");
const aside = document.querySelector(".aside");
function loadProducts(productsChosen) {

    containerProducts.innerHTML = "";

    productsChosen.forEach(product => {
       
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
        <img class="product-img" src="${product.img}" alt="${product.title}">
        <div class="product-details">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price}</p>
            <button class="product-add" id ="${product.id}">ADD</button>
        </div>
        `;
        containerProducts.append(div);
    })
    updateButtonAdd();

}
loadProducts(products);

buttonCategorias.forEach(button => {
    button.addEventListener("click", (e) => {

        buttonCategorias.forEach(button => button.classList.remove("activate"));
        e.currentTarget.classList.add("activate");
        if (e.currentTarget.id != "all") {
            const productCategory = products.find(product => product.categoria.id === e.currentTarget.id);
            titleMain.innerText = productCategory.categoria.name;

            const productsButton = products.filter(product => product.categoria.id === e.currentTarget.id);
            loadProducts(productsButton);
        }
        else {
            titleMain.innerText = "All products";
            loadProducts(products);
        }
    })
});

function updateButtonAdd() {
    buttonAdd = document.querySelectorAll(".product-add");

    buttonAdd.forEach(button => {
        button.addEventListener("click", addToCart);
    });
}
let productsInCart;

let productsInCartLS = localStorage.getItem("productsInCart");


if (productsInCartLS){
    productsInCart =JSON.parse(productsInCartLS);
    addNumber();
}else {
    productsInCart = [];

}

function addToCart(e) {
    const idButton = e.currentTarget.id;
    const productToAdd = products.find(product => product.id === idButton);

    if (productsInCart.some(product => product.id === idButton)) {
        const index = productsInCart.findIndex(product => product.id === idButton);
        productsInCart[index].quantity++;
    }else{
        productToAdd.quantity = 1;
        productsInCart.push(productToAdd);
    }
    addNumber();

    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}

function addNumber() {
    let newnumber = productsInCart.reduce((acc, product) => acc + product.quantity, 0);
    number.innerText = newnumber;

}