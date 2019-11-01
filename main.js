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

                <div>
                    <button v-on:click="addToCart" 
                            :disabled="!inStock"
                            :class="{ disabledButton: !inStock }">Add to Cart</button>
                    <button v-on:click="removeFromCart"
                            class="remove">-</button>
                </div>
            </div>

            <product-review @review-submitted="addReview"></product-review>
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
            ],
            reviews: []
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
        },
        addReview(productReview) {
            this.reviews.push(productReview);
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

Vue.component('product-review', {
    template: `
        <form class="review-form" @sumbit.prevent="onSubmit">

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>
            
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <input type="submit" value="Submit">
            </p>

        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null
        }
    },
    methods: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
})

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