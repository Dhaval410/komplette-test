class ProductFormExtended extends ProductForm {
  constructor() {
    super();
  }

  async onSubmitHandler(evt) {
    evt.preventDefault();
    if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

    this.handleErrorMessage();

    this.submitButton.setAttribute('aria-disabled', true);
    this.submitButton.classList.add('loading');
    this.querySelector('.loading__spinner').classList.remove('hidden');

    const addonProducts = await this.getAddonProducts();

    if (addonProducts.length > 0) {
      try {
        await this.addAddonProductsToCart(addonProducts);
        this.addMainProductToCart();
      } catch (error) {
        console.error('Error adding addon products to cart:', error);
      }
    } else {
      this.addMainProductToCart();
    }
  }

  getAddonProducts = async () => {
    const addonProductInputs = document.querySelectorAll('input[name="add_on_products[]"]:checked'),
      addonProducts = [];

    if (addonProductInputs.length > 0) {
      addonProductInputs.forEach((input) => {
        addonProducts.push({
          id: input.value,
          quantity: 1,
        });
      });
    }

    return addonProducts;
  }

  addAddonProductsToCart = async (addonProducts) => {
    const formData = {
      items: addonProducts.map((addonProduct) => ({
        id: addonProduct.id,
        quantity: addonProduct.quantity
      })),
    };

    const config = fetchConfig('javascript');
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(formData);

    try {
      const response = await fetch(`${routes.cart_add_url}`, config);
      const jsonResponse = await response.json();

      if (jsonResponse.status) {
        publish(PUB_SUB_EVENTS.cartError, {
          source: 'addon-product-form',
          errors: jsonResponse.errors || jsonResponse.description,
          message: jsonResponse.message,
        });
        throw new Error(jsonResponse.description);
      }

      document.querySelectorAll('input[name="add_on_products[]"]:checked').forEach((checkbox) => {
        checkbox.checked = false;
      });

      return jsonResponse;
    } catch (error) {
      console.error('Error adding addon products to cart:', error);
      throw error;
    }
  };

  addMainProductToCart = () => {
    const formData = new FormData(this.form);

    if (this.cart) {
      formData.append(
        'sections',
        this.cart.getSectionsToRender().map((section) => section.id)
      );
      formData.append('sections_url', window.location.pathname);
      this.cart.setActiveElement(document.activeElement);
    }

    const config = fetchConfig('javascript');
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    delete config.headers['Content-Type'];
    config.body = formData;

    fetch(`${routes.cart_add_url}`, config)
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          this.handleErrorMessage(response.description);
          const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
          if (soldOutMessage) {
            this.submitButton.setAttribute('aria-disabled', true);
            this.submitButtonText.classList.add('hidden');
            soldOutMessage.classList.remove('hidden');
            this.error = true;
          }
          return;
        }

        if (!this.cart) {
          window.location = window.routes.cart_url;
          return;
        }

        if (!this.error) {
          publish(PUB_SUB_EVENTS.cartUpdate, {
            source: 'product-form',
            productVariantId: formData.get('id'),
            cartData: response,
          });
        }

        this.cart.renderContents(response);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        this.submitButton.classList.remove('loading');
        if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
        if (!this.error) this.submitButton.removeAttribute('aria-disabled');
        this.querySelector('.loading__spinner').classList.add('hidden');
      });
  }
}

// Define the custom element if not already defined
if (!customElements.get('product-form-extended')) {
  customElements.define('product-form-extended', ProductFormExtended);
}
