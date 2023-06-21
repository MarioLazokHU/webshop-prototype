import { get, createEl } from "../../scripts/utils/utils.js";
import { removeBtnHandler } from "../controller/removeBtnHandler.js";
import { modifyHandler } from "../controller/modifyHandler.js";
import { createSwitch } from "../view/createSwitch.js";
import { productStatusSwitchHandler } from "../controller/productStatusSwitchHandler.js"; 

export async function fillContent() {
  const avProdListCon = document.querySelector(".avProdListCon");
  avProdListCon.innerHTML = "";
  const avProdTitle = createEl("p", {
    className: "title",
    textContent: "My Products",
  });
  avProdListCon.prepend(avProdTitle);
  const availableIds = await get("/coffees/availableIds");

  const data = await get("/coffees");

  availableIds.forEach((id, index) => {
    const coffee = data.find((item) => item.id === id);

    const cardContainer = createEl("div", {
      id: `card${index + 1}-container`,
      className: "card",
    });
    const img = createEl("img", {
      id: `img${index + 1}`,
      src: `/coffees/pictures/${id}.jpg`,
    });
    const container = createEl("div", {
      className: "id",
      id: `container${index + 1}`,
    });
    const components = createEl("div", { id: `comp${index + 1}` });

    if (coffee.components) {
      for (const key of coffee.components) {
        const comp = createEl("div", { className: "comp" });
        const p = createEl("p", { textContent: key, className: key[1] });
        const compInput = createEl("input", {
          type: "text",
          name: "component",
          placeholder: "New value",
          className: "modify-input",
        });
        const compBtn = createEl("button", {
          className: "modify",
          type: "submit",
          innerHTML: "Modify",
        });
        comp.append(p, compInput, compBtn);
        components.append(comp);
      }
    }
    const button = createEl("button", {
      className: "remove",
      id: `button${index + 1}`,
      type: "submit",
      textContent: "Remove",
    });
    const name = createEl("p", { textContent: coffee.name });
    const price = createEl("p", { textContent: coffee.price });
    const ids = createEl("p", {
      className: "ids",
      textContent: "id: " + coffee.id,
    });
    const status = createEl("p", {
      textContent: "Status: " + coffee.status,
      className: "item-status",
    });
    const switcher = createSwitch();
    if (coffee.status === "active") {
      switcher.querySelector("input").checked = true;
    }
    if (coffee.status === "inactive") {
      switcher.querySelector("input").checked = false;
    }

    container.append(status, price, ids, button, components);
    cardContainer.append(img, container);
    cardContainer.prepend(switcher, name);
    avProdListCon.append(cardContainer);
  });
  modifyHandler();
  removeBtnHandler();
  productStatusSwitchHandler();
}
