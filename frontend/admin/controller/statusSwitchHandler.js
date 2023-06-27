import { getOrders } from "../model/getOrders.js";

export function statusSwitchHandler() {
  const checks = document.querySelectorAll(".order-status-con>label>.check");
  checks.forEach((onCheck) => {
    onCheck.addEventListener("change", async () => {
      const id = onCheck.parentElement.parentElement.getAttribute("name");
      const status = onCheck.checked ? "active" : "inactive";
      const response = await fetch(`/orders/status/${status}/${id}`, {
        method: "PUT",
      });

      if (response.status === 202) {
        getUpdatedOrder(id);
      }
    });
  });
}

export function updateOrderItem(order) {
  const orderItem = document.querySelector(
    `div[name="${order.id}"] .order-status`
  );
  if (orderItem) {
    orderItem.textContent = `Status: ${order.status}`;
  }
}

export async function getUpdatedOrder(id) {
  try {
    const response = await fetch(`/orders/${id}`);
    const data = await response.json();
    updateOrderItem(data);
  } catch (error) {
    console.log(error);
  }
}
