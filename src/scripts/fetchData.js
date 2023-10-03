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
