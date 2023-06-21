import { createEl } from "../../scripts/utils/utils.js";
import { createSwitch } from "../view/createSwitch.js";

export async function getOrders() {
  const reqA = await fetch("/orders/availableIds");
  const resA = await reqA.json();

  const orderListCon = document.querySelector(".orderListCon");
  orderListCon.innerHTML = "";

  const orderListTitle = createEl("p", {
    className: "title",
    textContent: "Order List",
  });
  orderListCon.append(orderListTitle);

  const filterCon = createEl("div", { className: "filter-con" });
  const filterSelect = createEl("select", { className: "filter" });
  const optionNone = createEl("option", { textContent: "All", value: "all" });
  const optionTrue = createEl("option", {
    textContent: "Active",
    value: "active",
  });
  const optionFalse = createEl("option", {
    textContent: "Inactive",
    value: "inactive",
  });

  filterSelect.append(optionNone, optionTrue, optionFalse);
  filterCon.append(filterSelect);

  for (const data of resA) {
    const reqB = await fetch(`/orders/${data}`);
    const resB = await reqB.json();

    if (reqB.status === 200) {
      const orderCard = createEl("div", { className: "order-card" });
      const orderStatusCon = createEl("div", { className: "order-status-con" });
      orderStatusCon.setAttribute("name", resB.id);
      const orderStatus = createEl("p", {
        className: "order-status",
        innerHTML: "Status: " + resB.status,
      });
      const orderDate = createEl("p", {
        className: "order-data",
        innerHTML: "Date: " + resB.date,
      });
      const orderId = createEl("p", {
        className: "order-id",
        innerHTML: "Id: " + resB.id,
      });
      const customer = createEl("div", { className: "customer" });
      const switcher = createSwitch();
      if (resB.status === "active") {
        switcher.querySelector("input").checked = true;
      }
      if (resB.status === "inactive") {
        switcher.querySelector("input").checked = false;
      }
      orderStatusCon.append(orderStatus, switcher);

      for (const [formKey, formValue] of Object.entries(resB.formData)) {
        const formDataItem = createEl("p", {
          innerHTML: `${formKey}: ${formValue}`,
        });
        customer.append(formDataItem);
      }

      orderCard.append(orderStatusCon, orderDate, orderId, customer);
      orderListCon.append(filterCon, orderCard);
    } else {
      const noOrders = createEl("h1", { innerHTML: "No orders" });
      orderListCon.append(noOrders);
    }
  }
}
