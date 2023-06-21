import { post } from "../utils/utils.js";
import { clearCartData } from "./cart.js";

export function saveData() {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const newData = {};

    const formElements = Array.from(form.elements);
    for (let element of formElements) {
      if (element.tagName === "INPUT" && element.type !== "submit") {
        newData[element.name] = element.value;
      }
    }

    const h1 = document.querySelector("#input-type");
    const h6 = document.querySelector("#input-price");
    const orderCon = document.querySelector(".orderCon");

    newData["Product"] = orderCon.textContent;
    if (orderCon.textContent === "") {
      alert("Please select a product!");
      return;
    }

    const res = await post(`/orders/`, newData);
    if (res.status === 200) {
      alert("Your order has been sent.");
    }
    form.reset();
    orderCon.innerHTML = "";

    clearCartData();
  });
}
