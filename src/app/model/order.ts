export class Order{
  userId!:number;
  homeAddress!:string;
  comment!:string;
  orderPrice!:number;
  products!: {productId : number, quantity: number} [];
}

export class OrderResponseDto{
  id!: number;
  userId!:number;
  delivererId!:number;
  homeAddress!:string;
  comment!:string;
  orderPrice!:number;
  status!:string;
  deliveryTime!: string;
  deliveryTime2!: number;
  products!: {ingredient:string, name : string, quantity: number} [];
}
