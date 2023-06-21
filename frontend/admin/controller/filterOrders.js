export function filterOrders() {
  const filter = document.querySelector(".filter");
  const cards = document.querySelectorAll(".order-card");
  filter.addEventListener("change", () => {
    if (filter.value === "active") {
      for (const card of cards) {
        if (
          card.querySelector("div>div>p").textContent === "Status: inactive"
        ) {
          card.style.display = "none";
        } else {
          card.style.display = "block";
        }
      }
    }
    if (filter.value === "inactive") {
      for (const card of cards) {
        if (card.querySelector("div>div>p").textContent === "Status: active") {
          card.style.display = "none";
        } else {
          card.style.display = "block";
        }
      }
    }
    if (filter.value === "all") {
      for (const card of cards) {
        card.style.display = "block";
      }
    }
  });
}
