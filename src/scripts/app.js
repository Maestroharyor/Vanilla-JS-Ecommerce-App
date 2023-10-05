("use strict");
import { fetchData, checkoutUsers } from "./fetchData.js";
import {
  renderLoader,
  renderProductCard,
  addToCart,
  reduceQuantity,
  removeFromCart,
  renderCartProducts,
  updateCartCount,
} from "./renderItems.js";

// Define Data
let allProducts = [];
let cart = [];

// Query DOM Elements
const cartButton = document.querySelector(".cart_btn");
const cartModal = document.querySelector(".cart_modal");
const cartModalOverlay = document.querySelector(".cart_modal_overlay");
const cartModalCloseButton = document.querySelector(".cart_modal_close_btn");
const productContainer = document.querySelector("main.product_list");
const pageHeader = document.querySelector("section.page_header");
const continueShoppingButton = document.querySelector(".continue_shopping");
const cartModalContainer = document.querySelector("ul.cart_modal_container");
const checkoutButton = document.querySelector(".checkout_button");

// Event Listeners
cartButton.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
});

cartModalCloseButton.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

continueShoppingButton.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

cartModalOverlay.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

checkoutButton.addEventListener("click", () => {
  checkoutUsers(cart);
});

productContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add_to_cart")) {
    const productId = e.target.dataset.id;
    addToCart(allProducts, cart, productId);
  }

  if (
    e.target.classList.contains("add_button") ||
    e.target.parentElement.classList.contains("add_button")
  ) {
    const productId =
      e.target.parentElement.parentElement.parentElement.dataset.id ||
      e.target.parentElement.parentElement.parentElement.parentElement.dataset
        .id;
    addToCart(allProducts, cart, productId);
  }

  if (
    e.target.classList.contains("remove_button") ||
    e.target.parentElement.classList.contains("remove_button")
  ) {
    const productId =
      e.target.parentElement.parentElement.parentElement.dataset.id ||
      e.target.parentElement.parentElement.parentElement.parentElement.dataset
        .id;
    reduceQuantity(cart, productId);
  }
});

cartModalContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove_from_cart")) {
    const productId = e.target.dataset.id;
    removeFromCart(cart, productId);
  }
});

const init = async () => {
  renderLoader();
  const data = await fetchData();
  const { products } = data;
  if (products) {
    allProducts = products;
    productContainer.innerHTML = "";
    pageHeader.innerHTML = `  <div class="pt-20 pb-5 ">
        <h1 class="text-4xl font-bold text-gray-900 text-center">
          All Products
        </h1>
      </div>`;
    allProducts.forEach((product) => renderProductCard(product));
  }

  const cartfromStorage = JSON.parse(localStorage.getItem("cart"));
  if (cartfromStorage) {
    cart = cartfromStorage;
    renderCartProducts(cart);
    updateCartCount(cart);
  }
};

init();
