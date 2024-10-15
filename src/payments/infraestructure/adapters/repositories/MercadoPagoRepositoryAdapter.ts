import { MP_ACCESS_TOKEN, TUNEL_URL, API_VERSION } from 'src/config/index';

import { MercadoPagoRepositoryPort } from "src/payments/domain/ports/out/MercadoPagoRepositoryPort";
import { ProductDTO } from "src/payments/domain/dtos/ProductDto";

import { MercadoPagoConfig, Preference, MerchantOrder, Payment } from 'mercadopago';
import { MerchantOrderResponse } from "mercadopago/dist/clients/merchantOrder/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

import { Injectable } from "@nestjs/common";

@Injectable()
export class MercadoPagoRepositoryAdapter implements MercadoPagoRepositoryPort {
    private client: MercadoPagoConfig;
    private preference: Preference;
    private merchant_order: MerchantOrder;
    private payment: Payment;

    constructor() {
        this.client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN as string });
        this.preference = new Preference(this.client);
        this.merchant_order = new MerchantOrder(this.client);
        this.payment = new Payment(this.client);
    }

    public async createPreferences(product: ProductDTO): Promise<string> {
        const url = TUNEL_URL + `/api/${API_VERSION}/mercadopago/`;
        const createPreference = await this.preference.create({
            body: {
                back_urls: {
                    success: url + 'success',
                },
                notification_url: url + 'notification',
                auto_return: 'approved',
                items: [
                    {
                        id: product.productId,
                        title: product.title,
                        quantity: product.quantity,
                        unit_price: product.unitPrice,
                        currency_id: product.currencyId,
                    }
                ],
                payer: {
                    name: 'Chanona',
                    surname: 'TEST',
                    email: 'test_user_1779072673@testuser.com',
                },
                payment_methods: {
                    default_payment_method_id: 'account_money',
                },
                purpose: 'wallet_purchase',
                external_reference: 'ABC',
            }
        });
        return createPreference.init_point as string;
    }

    public async getPaymentOrder(id_payment: string): Promise<PaymentResponse> {
        try {
            const paymentFound = await this.payment.get({ id: id_payment });
            return paymentFound;
        } catch (error) {
            throw new Error('Error getting payment');
        }
    }

    public async getMerchantOrder(id_order: string): Promise<MerchantOrderResponse> {
        try {
            const merchantOrderFound = await this.merchant_order.get({ merchantOrderId: id_order });
            return merchantOrderFound;
        } catch (error) {
            throw new Error('Error getting merchant order');
        }
    }
}