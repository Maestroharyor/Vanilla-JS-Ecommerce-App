import { fetchData } from "./fetchData.js";
import { renderLoader, renderProductCard } from "./renderProducts.js";
("use strict");

// Define Data
let allProducts = [];
let cart = [];

// Query DOM Elements
const cartButton = document.querySelector(".cart_btn");
const cartModal = document.querySelector(".cart_modal");
const cartModalOverlay = document.querySelector(".cart_modal_overlay");
const cartModalCloseButton = document.querySelector(".cart_modal_close_btn");
const productContainer = document.querySelector("main.product_list");

// Event Listeners
cartButton.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
});

cartModalCloseButton.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

cartModalOverlay.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

productContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add_to_cart")) {
    console.log(e.target.dataset);
    const product = allProducts.find(
      (product) => product.id === Number(e.target.dataset.id)
    );
    console.log(product);
  }
});

const init = async () => {
  renderLoader();
  const data = await fetchData();
  const { products } = data;
  if (products) {
    allProducts = products;
    productContainer.innerHTML = `  <div class="py-4 col-span-3">
        <h1 class="text-4xl font-bold text-gray-900 text-center">
          All Products
        </h1>
      </div>`;
    allProducts.forEach((product) => renderProductCard(product));
  }
};

init();
