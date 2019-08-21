var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        href: 'https://www.nickarocho.com',
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        sizes: ["xs", "small", "medium", "large", "xl"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green"
            },
            {
                variantId: 2235,
                variantColor: "blue"
            }
        ]
    }
});