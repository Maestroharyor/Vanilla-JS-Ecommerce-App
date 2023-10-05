export async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// console.log(data);

export const checkoutUsers = async (cart) => {
  const loader = document.createElement("div");
  try {
    loader.innerHTML = `     <section
      class="absolute w-full h-full bg-black bg-opacity-90 top-0 left-0 z-20 flex flex-col justify-center items-center text-white gap-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-24 h-24 animate-spin"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>

      <p class="text-2xl">Redirecting you to checkout...</p>
    </section> `;

    document.body.appendChild(loader);
    const response = await fetch(
      "https://stripe-payment-backend.vercel.app/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          cancel_url: window.location.href,
          success_url: "http://localhost:5500/src/success.html",
        }),
      }
    );

    const parsedResponse = await response.json();
    if (parsedResponse.success) {
      const { data } = parsedResponse;
      window.location.href = data.url;
    } else {
      alert(parsedResponse.message);
      loader.innerHTML = "";
    }
  } catch (error) {
    loader.innerHTML = "";
    alert(
      error?.response?.data?.message ||
        error?.response?.message ||
        "An error occured"
    );
    console.error("Error fetching data:", error);
  }
};
