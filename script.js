// Получаем корзину из localStorage или создаем пустую
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Добавляем обработчики кликов на кнопки "Add to Cart"
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name; // Название товара
    const price = parseFloat(button.dataset.price); // Цена товара

    // Проверяем, есть ли товар уже в корзине
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      // Увеличиваем количество, если товар уже в корзине
      existingItem.quantity++;
    } else {
      // Добавляем новый товар в корзину
      cart.push({ name, price, quantity: 1 });
    }

    // Сохраняем корзину в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Уведомление пользователя
    alert("${name} has been added to your cart!");
  });
});
document.querySelector(".logo img").addEventListener("click", () => {
  const logo = document.querySelector(".logo img");
  logo.style.animation = "none"; // Сбрасываем текущую анимацию
  setTimeout(() => {
    logo.style.animation = "logoGlow 3s infinite"; // Перезапускаем анимацию
  }, 100); // Небольшая задержка
});
document.addEventListener("scroll", () => {
  const parallaxSections = document.querySelectorAll(".parallax");

  parallaxSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add("visible");
    } else {
      section.classList.remove("visible");
    }
  });
});
const slider = document.querySelector(".testimonial-slider");
let scrollAmount = 0;

// function autoScrollTestimonials() {
//   scrollAmount += 100; // Прокручиваем на ширину одного отзыва
//   if (scrollAmount >= slider.scrollWidth) {
//     scrollAmount = 0; // Возвращаемся в начало
//   }
//   slider.scrollTo({
//     left: scrollAmount,
//     behavior: "smooth",
//   });
// }

// setInterval(autoScrollTestimonials, 1000); // Прокрутка каждые 2 секунды
// const fadeInElements = document.querySelectorAll(".fade-in");

// document.addEventListener("scroll", () => {
//   fadeInElements.forEach((el) => {
//     const rect = el.getBoundingClientRect();
//     if (rect.top < window.innerHeight && rect.bottom > 0) {
//       el.classList.add("visible");
//     } else {
//       el.classList.remove("visible");
//     }
//   });
// });
const categoryButtons = document.querySelectorAll(".category-btn");
menuItems = document.querySelectorAll(".menu-item");

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Удаляем класс active у всех кнопок
    categoryButtons.forEach((button) => button.classList.remove("active"));
    // Добавляем класс active выбранной кнопке
    btn.classList.add("active");

    // Получаем выбранную категорию
    const category = btn.dataset.category;

    // Показываем или скрываем блюда
    menuItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
menuItems.forEach((item) => {
  if (category === "all" || item.dataset.category === category) {
    item.classList.add("show");
  } else {
    item.classList.remove("show");
  }
});
// const modal = document.getElementById("menuModal");
// const modalImage = document.getElementById("modalImage");
// const modalTitle = document.getElementById("modalTitle");
// const modalDescription = document.getElementById("modalDescription");
// const modalPrice = document.getElementById("modalPrice");
// const closeModal = document.querySelector(".close");

// const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imgSrc = item.querySelector("img").src;
    const title = item.querySelector("h3").textContent;
    const description = item.querySelector("p").textContent;
    const price = item.querySelector("span").textContent;

    modalImage.src = imgSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalPrice.textContent = price;

    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
// let cart = []; // Хранит товары в корзине

// Обновление корзины
function updateCart() {
  const cartContainer = document.querySelector(".cart-container");
  const cartTotal = document.getElementById("cartTotal");

  cartContainer.innerHTML = ""; // Очистить текущий HTML корзины

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>$${item.price.toFixed(2)}</span>
      </div>
      <div class="cart-controls">
        <button class="decrease" data-index="${index}">-</button>
        <span>${item.quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  cartTotal.textContent = total.toFixed(2);

  // Добавляем обработчики событий для кнопок увеличения/уменьшения
  const increaseButtons = document.querySelectorAll(".increase");
  const decreaseButtons = document.querySelectorAll(".decrease");

  increaseButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart[index].quantity++;
      updateCart();
    })
  );

  decreaseButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1); // Удаляем товар, если его количество 0
      }
      updateCart();
    })
  );
}

// Очистка корзины
document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  updateCart();
});

// Добавление товара в корзину
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const item = e.target.closest(".menu-item");
    const name = item.querySelector("h3").textContent;
    const price = parseFloat(
      item.querySelector("span").textContent.replace("$", "")
    );
    const image = item.querySelector("img").src;

    const existingItem = cart.find((cartItem) => cartItem.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    updateCart();
  })
);
document.getElementById("placeOrder").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add some items before placing an order.");
    return;
  }

  // Подготовка данных для отправки
  const orderData = {
    items: cart.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    total: cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2),
  };

  // Отправка данных на сервер
  fetch("https://example.com/api/place-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to place order. Please try again later.");
      }
      return response.json();
    })
    .then((data) => {
      alert("Order placed successfully! Your order ID is ${data.orderId}.");
      cart = []; // Очищаем корзину после успешного заказа
      updateCart();
    })
    .catch((error) => {
      alert(error.message);
    });
});
document
  .getElementById("checkoutForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Останавливаем стандартное поведение формы

    const orderData = {
      name: document.getElementById("name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
      comments: document.getElementById("comments").value.trim(),
    };
  });

function toggleMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("active");
}
