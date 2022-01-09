export default {
  delivery_fees: [
    {
      eligible_transaction_volume: {
        min_price: 0,
        max_price: 1000,
      },
      price: 800,
    },
    {
      eligible_transaction_volume: {
        min_price: 1000,
        max_price: 2000,
      },
      price: 400,
    },
    {
      eligible_transaction_volume: {
        min_price: 2000,
        max_price: null,
      },
      price: 0,
    },
  ],
};
