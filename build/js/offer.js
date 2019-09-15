'use strict';
(function () {
  var listOffers = document.querySelector('.offers__list')
  var buttonAddBasket = listOffers.querySelectorAll('.offers__button-add-basket');

  var templateOffer = document.querySelector('#offer').content.querySelector('.basket__item');

  var listBasket = document.querySelector('.basket__list');
  var totalPrice = document.querySelector('.basket__value');
  var basketButton = document.querySelector('.basket__button');

  var basket = [];

  // Проверка наличия корзины в localStorage
  if (JSON.parse(localStorage.getItem('basket')) !== null) {
    var dataBasket = JSON.parse(localStorage.getItem('basket'));
    basket = dataBasket;
  };

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

  // Функция подсчёта итоговой цены
  var getTotalPrice = function (dataPrice, plus) {
    var addedPrice = dataPrice.price;
    var startPrice = totalPrice.innerHTML;
    if (plus) {
      var total = parseInt(startPrice) + parseInt(addedPrice);
    } else {
      var total = parseInt(startPrice) - parseInt(addedPrice);
    }
    totalPrice.innerHTML = total;

    localStorage.setItem('totalPrice', total);
  };

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
    remove.addEventListener('click', function (evt) {
      evt.preventDefault();
      var numberBasket = listBasket.querySelectorAll('.basket__item');

      for (var i = 0; i < numberBasket.length; i++) {
        if (numberBasket[i] === this.parentElement.parentElement) {
          var numberElem = i;
          break
        }
      };
      
      listBasket.removeChild(generatedElem);
      getTotalPrice(offer, false);

      var localData = JSON.parse(localStorage.getItem('basket'));
      localData.splice(numberElem, 1);

      basket = localData;
      localStorage.setItem('basket', JSON.stringify(localData));
    });

    fragment.appendChild(generatedElem);
    listBasket.appendChild(fragment);
  };

  // Отрисовка корзины из localStorage
  if (localStorage.getItem('basket') !== null) {
    var data = JSON.parse(localStorage.getItem('basket'));
    var dataPrice = localStorage.getItem('totalPrice');

    for (var i = 0; i < data.length; i++) {
      addOfferToBasket(data[i]);
    }

    totalPrice.innerHTML = dataPrice;
  };

  // Обработчики для кнопок добавления в корзину
  for (var i = 0; i < buttonAddBasket.length; i++) {
    buttonAddBasket[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      var data = getData(this.parentElement.parentElement);
      addOfferToBasket(data);
      getTotalPrice(data, true);
      basket.push(data);
      localStorage.setItem('basket', JSON.stringify(basket));
    });
  };

  basketButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (basket.length !== 0) {
      var listProducts = "";
      for (var i = 0; i < basket.length; i++) {
        if (basket.length === i + 1) {
          listProducts += '\r\n' + "- " + basket[i].title + '\r\n';
        } else {
          listProducts += '\r\n' + "- " + basket[i].title + ", ";
        }
      }
      alert("Вы добавили в корзину: " + listProducts + " на сумму " + totalPrice.innerHTML + " руб.");
    }

  });


})();
