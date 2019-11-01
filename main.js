Vue.config.devtools = true;

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
    },
    template: `
        <div class="product">
            <div class="product-image">
                <a :href="href">
                    <img v-bind:src="image">
                </a>
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1> <!-- computed property -->
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <h3>Colors</h3>
                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)">
                </div>

                <h3>Sizes</h3>
                <li v-for="size in sizes">{{ size }}</li>
                <h3>In Cart: {{ inCart }}</h3>
            </div>
            <div>
                <button v-on:click="addToCart" 
            <button v-on:click="addToCart" 
                <button v-on:click="addToCart" 
            <button v-on:click="addToCart" 
                <button v-on:click="addToCart" 
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">Add to Cart</button>
            </div>
            <div>
                <button v-on:click="removeFromCart"
                        class="remove">-</button>
            </div>
        </div>
    `,
    data() {
        return {
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
                    variantQuantity: 10,
                    isInCart: false,
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 10,
                    isInCart: false,
                }
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
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
            return stock
        },
        inCart() {
            return this.variants[this.selectedVariant].isInCart;
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            for (var i=0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                };
            };
        }
    },
    mode: 'development'
});