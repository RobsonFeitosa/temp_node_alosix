export interface ICreateTransactionDTO {
  order_id: string
  card_hash: string
  amount: number
  card_id?: string
  customer: {
    external_id: string
    name: string
    type: string
    country: string
    email: string
    documents: [
      {
        type: string
        number: string
      },
    ]
    phone_numbers: string[]
  }
  billing: {
    name: string
    address: {
      country: string
      state: string
      city: string
      neighborhood: string
      street: string
      street_number: string
      zipcode: string
    }
  }
  items: [
    {
      id: string
      title: string
      unit_price: number
      quantity: number
      tangible: boolean
    },
  ]
}

export interface ITransactionDTO {
  object: string
  status: string
  refuse_reason: string | null
  status_reason: string
  acquirer_response_code: string
  acquirer_name: string
  acquirer_id: string
  authorization_code: string
  soft_descriptor: string | null
  tid: number
  nsu: number
  date_created: string
  date_updated: string
  amount: number
  authorized_amount: number
  paid_amount: number
  refunded_amount: number
  installments: number
  id: number
  cost: number
  card_holder_name: string
  card_last_digits: string
  card_first_digits: string
  card_brand: string
  card_pin_mode: string | null
  postback_url: string | null
  payment_method: string
  capture_method: string
  antifraud_score: string | null
  boleto_url: string | null
  boleto_barcode: string | null
  boleto_expiration_date: string | null
  referer: string
  ip: string
  subscription_id: string | null
  phone: string | null
  address: string | null
  customer: {
    object: string
    id: number
    external_id: string
    type: string
    country: string
    document_number: string | null
    document_type: string
    name: string
    email: string
    phone_numbers: string[]
    born_at: string | null
    birthday: string
    gender: string | null
    date_created: string
    documents: [
      {
        object: string
        id: string
        type: string
        number: string
      },
    ]
  }
  billing: {
    address: {
      object: string
      street: string
      complementary: string | null
      street_number: string
      neighborhood: string
      city: string
      state: string
      zipcode: string
      country: string
      id: number
    }
    object: string
    id: number
    name: string
  }
  shipping: {
    address: {
      object: string
      street: string
      complementary: string | null
      street_number: string
      neighborhood: string
      city: string
      state: string
      zipcode: string
      country: string
      id: number
    }
    object: string
    id: number
    name: string
    fee: number
    delivery_date: string
    expedited: boolean
  }
  items: []
  card: {
    object: string
    id: string
    date_created: string
    date_updated: string
    brand: string
    holder_name: string
    first_digits: string
    last_digits: string
    country: string
    fingerprint: string
    valid: string | null
    expiration_date: string
  }
  split_rules: [
    {
      object: string
      id: string
      liable: boolean
      amount: string | null
      percentage: number
      recipient_id: string
      charge_remainder: boolean
      charge_processing_fee: true
      date_created: string
      date_updated: string
    },
    {
      object: string
      id: string
      liable: boolean
      amount: string | null
      percentage: number
      recipient_id: string
      charge_remainder: boolean
      charge_processing_fee: boolean
      date_created: string
      date_updated: string
    },
  ]
  antifraud_metadata: Record<string, unknown>
  reference_key: string | null
  metadata: Record<string, unknown>
}
