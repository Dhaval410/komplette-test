# komplette-test

### Sub Collection Section

The files responsible for rendering `sub-collection` section in store.

- `snippets/card-sub-collection.liquid`
- `sections/sub-collection.liquid`
- `locales/en.default.schema.json`
- Note: Need to create the one collection's meta field `Sub Collection List` with the namespace and key (custom.sub_collection_list) of type `Collection` with `List of collections`.

### Products Carousel Section

The files responsible for rendering `products-carousel` section in store.

- `sections/products-carousel.liquid`
- In this section, there are options in the `Display Products` setting to choose `Best Seller` and `Most Popular` products to show in frontend.
- Note: For Best Seller, need to create the collection with the default sorting as `best-selling`.


### Addon Products

This functionality allows customers to add multiple products to their cart with a single click on the "Add to Cart" button.

To use this functionality, some changes are required in the default files. If it's not working, please check the following files:

- `main-product.liquid` :  Ensure it renders the snippet files.
```
{% render 'custom-options' %}
{% render 'add-on-products' %}
```

- `buy-buttons.liquid` : Update the product-form tag to product-form-extended.
```
<product-form-extended></product-form-extended>
```

- `product-form.liquid` :  This file includes minor changes for this functionality, but it will not affect the default behavior.

- Note: Need to create product metafields with namespace and key `custom.add_on_product` with multiple select products.

#### New files responsible for addon Products

- `snippets/custom-option.liquid`
- `snippets/add-on-products.liquid`
- `assets/addon-products.js`
- `assets/modal-dialog-extended.js`
- `assets/modal-opener-extended.js`
- `assets/addons-products.css`
- `assets/product-form-extended.js`

### Inventory Status

This functionality show inventory status on product page and collection page.

- `config/settings_schema.json`
- `sections/main-product.liquid`
- `snippets/card-product.liquid`

### Price format

This functionality change price as per country code with suffix.

- `config/settings_schema.json`
- `sections/main-product.liquid`
- `snippets/card-product.liquid`

### Product Technical Specifications

- sections/product-specification.liquid
- Note: Need to create product metafields with namespace `tech_specification` and key as per the specification group name like general, Features, etc. Type: `inline-text`.

### Footer Section

- sections/footer.liquid
- assets/section-footer.css
- Note: Add Menu links in footer and information about company.

### Logo Section

- sections/logo-section.liquid
- Note: Add block for each logo.