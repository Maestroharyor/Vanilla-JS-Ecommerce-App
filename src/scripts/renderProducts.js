const productContainer = document.querySelector("main.product_list");

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
  productCard.classList.add(
    "group",
    "relative",
    "block",
    "overflow-hidden",
    "max-w-[400px]",
    "rounded"
  );
  productCard.innerHTML = `
        <button
          class="absolute right-4 top-4 z-[2] rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75 wishlist"
        >
          <span class="sr-only">Wishlist</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

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
                class="h-6 w-4"
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
                class="h-6 w-4"
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
