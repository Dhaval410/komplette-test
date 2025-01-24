class AddonProducts extends HTMLElement {
  constructor() {
    super();
    this.mainListContainer = this.querySelector(".add-on-products ul");
    this.modalBody = document.querySelector(".popup-model-body");
    this.showMoreButton = this.querySelector("#addon-submit");
    this.modalCloseButtons = document.querySelectorAll("#ModalClose-addon.add-selected");

    this.allListItems = this.mainListContainer ? [...this.mainListContainer.children] : [];
    this.initialize();
  }

  initialize() {
    if (!this.mainListContainer || this.allListItems.length === 0) return;

    if (this.allListItems.length <= 3) {
      this.showMoreButton.style.display = "none";
    }

    this.displayInitialProducts();

    this.modalCloseButtons?.forEach(modalCloseButton => {
      modalCloseButton?.addEventListener("click", () => this.handleModalClose());
    });

    document.querySelectorAll('.add-on-product-item.variants').forEach(productElement => {
      this.initProductVariantLogic(productElement);
    });
  }

  displayInitialProducts() {
    let display = false;
    const visibleItems = this.allListItems.slice(0, 3);
    const hiddenItems = this.allListItems.slice(3);
    this.mainListContainer.innerHTML = "";

    visibleItems.forEach((item) => {
      this.mainListContainer.appendChild(item);
      display = true;
    });

    if (display) {
      this.mainListContainer.parentElement.classList.remove('hidden');
    }

    if (this.modalBody) {
      this.modalBody.innerHTML = "<ul></ul>";
      const modalList = this.modalBody.querySelector("ul");
      hiddenItems.forEach((item) => {
        modalList.appendChild(item);
      });
    }
  }

  handleModalClose() {
    [...this.modalBody.querySelectorAll("li")].filter((item) => {
      const checkbox = item.querySelector(".add-on-product");

      if (![...this.mainListContainer.children].includes(item) && checkbox?.checked) {
        this.mainListContainer.appendChild(item);
      }

      return checkbox?.checked;
    });

    if (!this.modalBody.querySelectorAll("li").length) {
      this.showMoreButton.style.display = "none";
    }
  }

  handleVariantChange(event) {
    const selectedVariant = event.target.value,
      price = event.target.options[event.target.selectedIndex]?.dataset.price;

    const parentLi = event.target.closest(".add-on-product-item"),
      checkbox = parentLi?.querySelector(".add-on-product"),
      mainPrice = parentLi?.querySelector(".addon-price");

    if (mainPrice) {
      mainPrice.innerHTML = `<div class="price"> ${price} </div>`;
    }

    if (checkbox) {
      checkbox.value = selectedVariant;
    }
  }

  initProductVariantLogic(productElement) {
    const optionSelectors = productElement.querySelectorAll('.single-option-selector');
    const productId = JSON.parse(productElement.dataset.productId);
    let productVariantData = window.productData[productId];

    if (typeof productVariantData !== 'object' || productVariantData === null) {
      return;
    }

    const optionSizes = productVariantData.options.map(option => option["values"].length);
    const variants = productVariantData?.variants;


    function optionsToVariantIndex(_options) {
      let variantIndex = 0;

      // Iterate through each option
      for (let i = 0; i < _options.length; i++) {
        const weight = optionSizes.slice(i + 1).reduce((acc, size) => acc * size, 1);
        variantIndex += _options[i] * weight;
      }
      return variantIndex;
    }

    function updateSelectedVariant() {
      const selectedOptions = Array.from(optionSelectors).map(selector => selector.selectedIndex);

      // Calculate variant index and find the variant
      const variantIndex = optionsToVariantIndex(selectedOptions);
      const selectedVariant = variants[variantIndex];

      if (selectedVariant) {
        const checkbox = productElement?.querySelector(".add-on-product");
        const mainPrice = productElement?.querySelector(".addon-price");

        if (checkbox) {
          checkbox.value = selectedVariant.id;
        }

        if (mainPrice) {
          const formattedPrice = selectedVariant.formatted_price;
          mainPrice.innerHTML = `<div class="price">${formattedPrice}</div>`;
        }
      }
    }

    optionSelectors.forEach(selector => {
      selector.addEventListener('change', updateSelectedVariant);
    });
  }
}

customElements.define("addon-products", AddonProducts);
