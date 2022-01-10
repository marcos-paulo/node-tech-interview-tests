export default {
  articles: [
    { id: 1, name: "water", price: 100 },
    { id: 2, name: "honey", price: 200 },
    { id: 3, name: "mango", price: 400 },
    { id: 4, name: "tea", price: 1000 },
    { id: 5, name: "ketchup", price: 999 },
    { id: 6, name: "mayonnaise", price: 999 },
    { id: 7, name: "fries", price: 378 },
    { id: 8, name: "ham", price: 147 },
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
      items: [
        { article_id: 5, quantity: 1 },
        { article_id: 6, quantity: 1 },
      ],
    },
    {
      id: 4,
      items: [{ article_id: 7, quantity: 1 }],
    },
    {
      id: 5,
      items: [{ article_id: 8, quantity: 3 }],
    },
  ],
};
