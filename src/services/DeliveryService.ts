interface IDelivery {
  delivery_next_day: boolean;
  address: {
    state: string;
    city: string;
    district: string;
    street: string;
    number: number;
  };
}

class ProcessDeliveryService {
  async execute({
    delivery_next_day,
    address: { state, city, district, street, number },
  }: IDelivery) {
    return true;
  }
}

export { ProcessDeliveryService, IDelivery };
