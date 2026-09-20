import "./styles/main.scss";

function formatPrice(value) {
  const number = Number(value);
  const formatted = number.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatted}\u00A0₽`;
}

function initProductCard() {
  const form = document.querySelector(".purchase");
  if (!form) return;

  const inputs = form.querySelectorAll(".packaging__input");
  const priceOutput = form.querySelector("[data-price-output]");
  const oldPriceOutput = form.querySelector("[data-old-price-output]");
  const articleOutput = form.querySelector("[data-article-output]");

  function update(input) {
    const { article, price, oldPrice } = input.dataset;

    priceOutput.textContent = formatPrice(price);
    articleOutput.textContent = article;

    if (oldPrice && Number(oldPrice) > Number(price)) {
      oldPriceOutput.textContent = formatPrice(oldPrice);
      oldPriceOutput.hidden = false;
    } else {
      oldPriceOutput.hidden = true;
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("change", () => update(input));
  });

  const checked = form.querySelector(".packaging__input:checked");
  if (checked) update(checked);
}

initProductCard();
