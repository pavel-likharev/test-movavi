'use strict';

// 1. При нажатии на кнопку "В корзину" - извлекаются заголовок и цена товара в объект offerData.
// 2. Создаётся копия шаблона товара для корзины. В неё добавляется заголовок и цена.
// 3. На кнопку удаления товара из корзины добавляется обработчик с удалением этого элемента из корзины при клике.
// 4. Если в корзину добавляется товар, то пустому элементу добавляется класс basket__item--hidden.
// 5. Если в корзине нет товаров, класс basket__item--hidden убирается.
// 6. При нажатии на кнопку "Оформить заказ" - выводить alert с текстом "Вы добавили в корзину [список продуктов] на сумму [итоговая сумма]".
// 7. При перезагрузке страницы сохранять состояние корзины.


(function () {
  var listBasket = document.querySelector('.basket__list');
  var emptyBasket = document.querySelector('.basket__item--empty');
  var listOffers = document.querySelector('.offers__list')
  var buttonAddBasket = listOffers.querySelectorAll('.offers__button-add-basket');

  var templateOffer = document.querySelector('#offer').content.querySelector('.basket__item');

  var listBasket = document.querySelector('.basket__list');
  var totalPrice = document.querySelector('.basket__value');

  // Функция поиска названия и цены товара
  var getData = function (item) {
    var title = item.querySelector('.offers__title').textContent;
    var price = item.querySelector('.offers__price').textContent;

    var offer = {
      'title': title,
      'price': price
    }
    return offer;
  };

  var getTotalPrice = function (dataPrice, plus) {
    var addedPrice = dataPrice.price;
    var startPrice = totalPrice.innerHTML;
    if (plus) {
      var total =  parseInt(startPrice) + parseInt(addedPrice);
    } else {
      var total =  parseInt(startPrice) - parseInt(addedPrice);
    }
    totalPrice.innerHTML = total;
  }

  // Функция создания элемента с товаром для корзины
  var createElem = function (data) {
    var offerElement = templateOffer.cloneNode(true);
    var offerTitle = offerElement.querySelector('.basket__offer-title');
    var offerPrice = offerElement.querySelector('.basket__offer-price');

    offerTitle.textContent = data.title;
    offerPrice.textContent = data.price;

    offerElement.classList.add('create-offer');
    return offerElement;
  };

  // Функция добавления товара в корзину
  var addOfferToBasket = function (offer) {
    var fragment = document.createDocumentFragment();
    var generatedElem = createElem(offer);

    var remove = generatedElem.querySelector('.basket__button-remove');
    remove.addEventListener('click', function () {
      listBasket.removeChild(generatedElem);
      getTotalPrice(offer, false);
    });

    remove.addEventListener('click', function () {
      var elem = listOffers.querySelector('.create-offer');
      if (!elem) {
        emptyBasket.classList.remove('basket__item--hidden');
      }
    });

    fragment.appendChild(generatedElem);
    listBasket.appendChild(fragment);

    emptyBasket.classList.add('basket__item--hidden');
  };

  for (var i = 0; i < buttonAddBasket.length; i++) {
    buttonAddBasket[i].addEventListener('click', function () {
      var data = getData(this.parentElement.parentElement);
      addOfferToBasket(data);
      getTotalPrice(data, true);
    });
  }



})();
