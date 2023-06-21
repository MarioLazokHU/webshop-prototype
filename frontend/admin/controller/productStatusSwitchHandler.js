export function productStatusSwitchHandler() {
  const checks = document.querySelectorAll(".card>label>.check");
  checks.forEach((onCheck, index) => {
    onCheck.addEventListener("change", async () => {
      const ids = document.querySelectorAll(".ids");
      const id = ids[index].textContent.split(" ")[1];
      const status = onCheck.checked ? "active" : "inactive";
      const response = await fetch(`/coffee/status/${status}/${id}`, {
        method: "PUT",
      });

      if (response.status === 202) {
        getUpdatedProduct(id, index);
      }
    });
  });
}

export function updateProductItem(coffee, index) {
  const item = document.querySelector(
    `#card${index + 1}-container .item-status`
  );
  if (item) {
    item.textContent = `Status: ${coffee.status}`;
  }
}

export async function getUpdatedProduct(id, index) {
  try {
    const response = await fetch(`/coffees/${id}`);
    if (response.status === 404) {
      throw new Error("Product not found");
    }
    const data = await response.json();
    updateProductItem(data, index);
  } catch (error) {
    console.log(error);
  }
}
