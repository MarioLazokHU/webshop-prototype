import { createAdminPage } from "../view/createAdminPage.js";
import { itemsPostHandler } from "../controller/itemsPostHandler.js";
import { fillContent } from "./fillConItems.js";
import { removeBtnHandler } from "../controller/removeBtnHandler.js";
import { getOrders } from "./getOrders.js";
import { statusSwitchHandler } from "../controller/statusSwitchHandler.js";
import { modifyHandler } from "../controller/modifyHandler.js";
import { filterOrders } from "../controller/filterOrders.js";
import { productStatusSwitchHandler } from "../controller/productStatusSwitchHandler.js";

export function adminLoginHandler() {
  const form = document.querySelector(".adminForm");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.querySelector(".user").value;
    const pw = document.querySelector(".pw").value;
    const data = { username: username, pw: pw };
    const req = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (req.status === 202) {
      const root = document.getElementById("root");
      root.innerHTML = "";
      createAdminPage();
      itemsPostHandler();
      fillContent();
      removeBtnHandler();
      root.append(await getOrders());
      statusSwitchHandler();
      modifyHandler();
      filterOrders();
      productStatusSwitchHandler();
    } else {
      console.log(req);
      alert("Wrong Password");
    }
  });
}
