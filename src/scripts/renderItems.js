// Query DOM Elements
const productContainer = document.querySelector("main.product_list");
const cartModalContainer = document.querySelector("ul.cart_modal_container");
const cartCounter = document.querySelector(".cart_counter");

export const renderLoader = () => {
  for (let i = 0; i < 3; i++) {
    const skeletonElement = document.createElement("div");
    skeletonElement.innerHTML = `<div
        role="status"
        class="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 h-full flex flex-col justify-between"
      >
        <div
          class="flex items-center justify-center h-64 mb-4 bg-gray-300 rounded"
        >
          <svg
            class="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path
              d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
            />
            <path
              d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
            />
          </svg>
        </div>
        <div>
          <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full"></div>
          <div class="flex items-center mt-4 space-x-3">
            <div class="w-full">
              <div class="h-10 bg-gray-200 rounded w-full mb-2"></div>
            </div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      </div>`;
    productContainer.appendChild(skeletonElement);
  }
};

export const renderProductCard = (product) => {
  const productCard = document.createElement("div");
  productCard.dataset.id = product.id;
  productCard.classList.add(
    "group",
    "relative",
    "block",
    "overflow-hidden",
    "sm:max-w-[400px]",
    "rounded"
  );
  productCard.innerHTML = `
  

        <img
          src=${product.thumbnail}
          alt=${product.title}
          class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div class="relative border border-gray-100 bg-white p-6">
          <span
            class="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"
          >
            New
          </span>

          <h3 class="mt-4 text-lg font-medium text-gray-900">${product.title}</h3>

          <p class="mt-1.5 text-sm text-gray-700">$${product.price}</p>

          <div class="inline-flex items-center mt-2 justify-center w-full">
            <button
              class="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200 remove_button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-4 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                />
              </svg>
            </button>
            <div
              class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none quantity_display"
            >
              0
            </div>
            <button
              class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200 add_button"
          >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-4 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <div class="mt-4">
            <button
              class="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105 add_to_cart"  data-id=${product.id} 
            >
              Add to Cart
            </button>
          </div>
        </div>`;

  productContainer.appendChild(productCard);
};

// Function to add a product to the cart
export const addToCart = (allProducts, cart, productId, quantity = 1) => {
  const product = allProducts.find(
    (product) => Number(product.id) === Number(productId)
  );

  // Check if the product is already in the cart
  const existingCartItem = cart.find(
    (item) => Number(item.id) === Number(productId)
  );

  if (existingCartItem !== undefined) {
    // If the product is in the cart, update its quantity
    existingCartItem.quantity += quantity;
  } else {
    // If the product is not in the cart, add it with the specified quantity
    cart.push({ ...product, quantity });
  }
  // Update the cart count and any other necessary UI
  updateProductCardCount(cart, productId);
  updateCartCount(cart);
  renderCartProducts(cart);
};

// Function to reduce the quantity of a product in the cart
export const reduceQuantity = (cart, productId) => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }
  const existingCartItem = cart.find(
    (item) => Number(item.id) === Number(productId)
  );

  if (existingCartItem) {
    // If the product is in the cart with a quantity greater than 1, reduce its quantity by 1
    if (existingCartItem.quantity > 1) {
      existingCartItem.quantity -= 1;
    } else {
      // If the product's quantity is 1, remove it from the cart
      removeFromCart(cart, productId);
    }

    // Update the cart count and any other necessary UI
    updateProductCardCount(cart, productId);
    updateCartCount(cart);
    renderCartProducts(cart);
  }
};

// Function to remove an item from the cart completely
export const removeFromCart = (cart, productId) => {
  const index = cart.findIndex((item) => Number(item.id) === Number(productId));

  if (index !== -1) {
    // Remove the item from the cart array
    cart.splice(index, 1);

    // Update the cart count and any other necessary UI
    updateProductCardCount(cart, productId);
    updateCartCount(cart);
    renderCartProducts(cart);
  }
};

export const updateProductCardCount = (cart, productId) => {
  const productCardCount = document.querySelector(
    `[data-id="${productId}"] .quantity_display`
  );
  const cartItem = cart.find((item) => Number(item.id) === Number(productId));
  productCardCount.innerHTML = cartItem?.quantity || 0;
};

export const updateCartCount = (cart) => {
  if (cart.length > 0) {
    cartCounter.classList.remove("hidden");
    cartCounter.classList.add("flex");
    cartCounter.innerHTML = cart.length;
  } else {
    cartCounter.classList.add("hidden");
    cartCounter.classList.remove("flex");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const renderCartProducts = (cart) => {
  if (cart.length) {
    document.querySelector(".checkout_button").classList.remove("hidden");
    cartModalContainer.innerHTML = "";
    cart.forEach((product) => {
      const cartProductCard = document.createElement("li");
      cartProductCard.classList.add("flex", "items-center", "gap-4");
      cartProductCard.innerHTML = `
              <img
                src=${product.thumbnail}
                alt=""
                class="h-16 w-16 rounded object-cover"
              />

              <div>
                <h3 class="text-[14px] text-gray-900">${product.title}</h3>

                <dl class="mt-0.5 space-y-px text-[12px] text-gray-600">
                  <div>
                    <dt class="inline">Qty:</dt>
                    <dd class="inline">${product.quantity}</dd>
                  </div>
                  <div>
                    <dt class="inline">Price:</dt>
                    <dd class="inline">$${product.price * product.quantity}</dd>
                  </div>
                </dl>
              </div>

              <div class="flex flex-1 items-center justify-end gap-2">
                <button class="text-gray-600 transition hover:text-red-600 remove_from_cart" data-id=${
                  product.id
                }>
                  <span class="sr-only">Remove item</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4 pointer-events-none"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            `;

      cartModalContainer.appendChild(cartProductCard);
    });
  } else {
    cartModalContainer.innerHTML =
      " <p>You haven't added any products to cart...</p>";
    document.querySelector(".checkout_button").classList.add("hidden");
  }
};
