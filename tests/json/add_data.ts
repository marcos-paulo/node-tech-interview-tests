export default {
  articles: [
    { id: 1, name: "water", price: 100 },
    { id: 2, name: "honey", price: 200 },
    { id: 3, name: "mango", price: 400 },
    { id: 4, name: "tea", price: 1000 },
  ],
  carts: [
    {
      id: 1,
      items: [
        { article_id: 1, quantity: 6 },
        { article_id: 2, quantity: 2 },
        { article_id: 4, quantity: 1 },
      ],
    },
    {
      id: 2,
      items: [
        { article_id: 2, quantity: 1 },
        { article_id: 3, quantity: 3 },
      ],
    },
    {
      id: 3,
      items: [],
    },
  ],
};
