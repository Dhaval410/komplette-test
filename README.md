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