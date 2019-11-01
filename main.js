Vue.config.devtools = true;

var eventBus = new Vue();

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: false
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

            <product-tabs :reviews="reviews"></product-tabs>

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
        };
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
        },
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview);
        });
    },
});

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">

            <p v-if="errors.length">
                <b>Please correct the following error(s)</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
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
                <p>Would you recommend this product?</p>
                <div>
                    <label for="recommended-yes">Hell yes</label>
                    <input type="radio" id="recommended-yes" name="recommended" v-model="recommended" value="Yes"></input>
                    <label for="recommended-no">Nope</label>
                    <input type="radio" id="recommended-no" name="recommended" v-model="recommended" value="No"></input>
                </div>
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
            rating: null,
            recommended: null,
            errors: []
        };
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if (this.name && this.review && this.rating && this.recommended) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommended: this.recommended
                };
                eventBus.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommended = null;
            } else {
                if (!this.name) this.errors.push("Name required.");
                if (!this.review) this.errors.push("Review required.");
                if (!this.rating) this.errors.push("Rating required.");
                if (!this.recommended) this.errors.push("Recommendation required.");
            };
        },
    },
});

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab"
                  :class="{ activeTab: selectedTab === tab }"
                  v-for="(tab, index) in tabs" 
                  :key="index"
                  @click="selectedTab = tab">
                  {{ tab }}</span>

            <div v-show="selectedTab === 'Reviews'">
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                        <p>Recommended? {{ review.recommended }}</p>
                    </li>
                </ul>
            </div>

            <product-review v-show="selectedTab === 'Make a Review'"></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
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
        },
    },
    mode: 'development'
});