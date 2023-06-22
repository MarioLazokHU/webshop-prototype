import { createEl } from "../../scripts/utils/utils.js";
export function createAdminPage() {
  const con = createEl("main", { className: "con" });
  const conTitle = createEl("p", {
    className: "title",
    textContent: "Create New Product",
  });
  const newCoffee = createEl("form", { className: "newCoffee" });
  const coffeeName = createEl("input", {
    className: "coffeeName",
    placeholder: "Coffee Name",
    type: "text",
    name: "name",
  });
  const coffeeDesc = createEl("textarea", {
    className: "coffeeDesc",
    name: "type",
    placeholder: "Description",
  });
  const components = createEl("textarea", {
    className: "coffeeDesc",
    name: "components",
    placeholder: "List of components (use ',' if add more than 1)",
  });
  const price = createEl("input", {
    type: "text",
    placeholder: "Price",
    className: "price",
    name: "price",
  });
  const image = createEl("input", {
    type: "file",
    className: "fileInput",
    name: "fileInput",
  });
  const button = createEl("button", { innerHTML: "SAVE" });

  const backBtn = createEl("button", {
    innerHTML: "Go Back",
    className: "btnBack",
  });
  const back = createEl("a", { href: "/", className: "admin" });

  const productLink = createEl("a", { href: "#avProdListCon" });
  const btnProd = createEl("button", { innerHTML: "Product List" });
  productLink.append(btnProd);

  const ordersLink = createEl("a", { href: "#orderListCon" });
  const btnOrders = createEl("button", { innerHTML: "Orders List" });
  ordersLink.append(btnOrders);

  const header = createEl("nav");
  const h1 = createEl("h1", { innerHTML: "Coffee Admin Page" });

  const h2Del = createEl("h2", {
    className: "h2Del",
    innerHTML: "Delete products",
  });
  const delForm = createEl("form", { className: "delForm" });
  const delInput = createEl("input", {
    type: "number",
    className: "delINput",
    placeholder: "Please enter product id!",
  });
  const delBtn = createEl("button", {
    className: "delBtn",
    innerHTML: "Delete",
  });
  const root = document.getElementById("root");
  const avProdListCon = createEl("div", {
    className: "avProdListCon",
    id: "avProdListCon",
  });
  const orderListCon = createEl("div", {
    className: "orderListCon",
    id: "orderListCon",
  });
  const btnCon = createEl("div", { className: "btn-con" });
  back.append(backBtn);
  btnCon.append(productLink, ordersLink, back);
  header.append(h1, btnCon);
  newCoffee.append(
    coffeeName,
    coffeeDesc,
    components,
    price,
    image,
    button
  );
  delForm.append(h2Del, delInput, delBtn);
  con.append(conTitle, newCoffee);
  root.append(header, con, avProdListCon, orderListCon);
}
