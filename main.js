var app = new Vue({
    el: '#app',
    data: {
        brand: 'Dermstore',
        product: 'Socks',
        selectedVariant: 0,
        href: 'https://www.nickarocho.com',
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        sizes: ["xs", "small", "medium", "large", "xl"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        removeFromCart() {
            this.cart -= 1;
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            let stock = this.variants[this.selectedVariant].variantQuantity;
            console.log(stock)
            return stock
        }
    }
});