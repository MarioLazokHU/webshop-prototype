import { get, createEl } from "../utils/utils.js";
import { formHandler } from "../controllers/formHandler.js";
import { refreshAmInput } from "../controllers/refreshAmInput.js";

export async function fillCardsData() {
  const leftContainer = document.querySelector("#left-container");
  const availableIds = await get("/coffees/availableIds");
  const data = await get("/coffees");

  availableIds.forEach(async (id, index) => {
    const coffee = data.find((item) => item.id === id);

    if (coffee.status === "active") {
      const cardContainer = createEl("div", {
        id: `card${index + 1}-container`,
        class: "card",
      });
      const img = createEl("img", {
        id: `img${index + 1}`,
        src: `/coffees/pictures/${id}.jpg`,
      });
      const container = createEl("div", { id: `container${index + 1}` });
      const input = createEl("input", {
        id: `input${index + 1}`,
        type: "number",
        name: "coffee",
        placeholder: "Amount",
        value: 1,
      });
      const button = createEl("button", {
        className: "add",
        id: `button${index + 1}`,
        type: "submit",
        textContent: "Add to cart",
      });

      const stringElements = await coffee.components.map((item) => item[1]);
      const h4 = createEl("h4", {
        textContent: `Ingredients: ${stringElements.join(", ")}`,
      });

      const h1 = createEl("h1", { textContent: coffee.name });
      const h5 = createEl("h5", { textContent: coffee.type });
      const h6 = createEl("h6", { textContent: coffee.price });

      container.append(h6, input, button);
      cardContainer.prepend(img, container);
      cardContainer.prepend(h1, h5, h4);
      leftContainer.appendChild(cardContainer);

      formHandler();
      refreshAmInput();
    }
  });
}
