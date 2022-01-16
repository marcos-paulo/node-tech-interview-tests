interface IPayment {
  card_number: string;
  card_name: string;
  valid: string;
  cvv: string;
  value?: number;
}

class ProcessPaymentService {
  async execute({ card_number, card_name, valid, cvv, value }: IPayment) {
    return true;
  }
}

export { ProcessPaymentService, IPayment };
