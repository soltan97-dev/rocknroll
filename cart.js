function updateCart() {
  const cartTableBody = document.querySelector(".cart-table tbody");
  cartTableBody.innerHTML = ""; // Очищаем таблицу перед заполнением
  let total = 0;

  cart.forEach((item, index) => {
    // Создаем строку HTML для каждого товара
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <input type="number" class="cart-quantity" data-index="${index}" value="${
      item.quantity
    }" min="1">
        </td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
        <td>
          <button class="btn-remove" data-index="${index}">Remove</button>
        </td>
      </tr>
    `;
    cartTableBody.innerHTML += row;

    // Обновляем общую сумму
    total += item.price * item.quantity;
  });

  // Обновляем общую стоимость в таблице
  document.querySelector(".cart-total h3").innerText =
    "Total: $${total.toFixed(2)}";

  // Сохраняем корзину в localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Удаление товара из корзины
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-remove")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1); // Удаляем товар из массива
    updateCart(); // Обновляем таблицу
  }
});

// Обновление количества товаров
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("cart-quantity")) {
    const index = e.target.dataset.index;
    const quantity = parseInt(e.target.value);
    cart[index].quantity = quantity > 0 ? quantity : 1; // Обновляем количество
    updateCart(); // Обновляем таблицу
  }
});
