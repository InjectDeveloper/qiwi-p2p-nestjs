import {Inject, Injectable} from '@nestjs/common';
import {QiwiP2P_OPTIONS} from './qiwi-p2p.constants';
import axios from 'axios';

import {
  IBillInfoSuccessResponce,
  ICreateBillParams, IRecipient, IResponceWithError,
  QiwiP2POptions
} from './qiwi-p2p.interfaces';

export interface IQiwiP2PService {
  createBill(createBillFields: ICreateBillParams): Promise<IBillInfoSuccessResponce>
  getBillInfo(billId: string): Promise<IBillInfoSuccessResponce & IRecipient>

  getLifetimeByDay(days: number)
  normalizeDate(date: Date)
}

@Injectable()
export class QiwiP2PService implements IQiwiP2PService {
  constructor(@Inject(QiwiP2P_OPTIONS) private options: QiwiP2POptions) {
  }

  async createBill(createBillFields: ICreateBillParams): Promise<IBillInfoSuccessResponce> {
    const options = {
      url: createBillFields.billId,
      method: 'PUT',
      body: createBillFields.data,
    }

    const bill = await this.requestSender(options) as IBillInfoSuccessResponce
    if (createBillFields.successUrl) {
      bill.payUrl = `${bill.payUrl}&successUrl=${encodeURIComponent(createBillFields.successUrl)}`
    }

    return bill
  }

  async getBillInfo(billId: string): Promise<IBillInfoSuccessResponce> {
    const options = {
      url: billId,
      method: 'GET'
    }

    return await this.requestSender(options) as IBillInfoSuccessResponce & IRecipient
  }

  getLifetimeByDay (days: number) {
    const date = new Date();

    const timePlused = date.getTime() + days * 24 * 60 * 60 * 1000;

    date.setTime(timePlused);

    return this.normalizeDate(date);
  }
  normalizeDate (date: Date) {
    const tzo = -date.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = function (num) {
      const norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(tzo / 60) +
      ':' + pad(tzo % 60);
  }

  private async requestSender ({ url, method, body = null }) {
    return new Promise((resolve, reject) => {

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
        Authorization: `Bearer ${this.options.secretKey}`
      };

      const options = {
        url: `https://api.qiwi.com/partner/bill/v1/bills/${url}`,
        method,
        headers,
        data: body ? JSON.stringify(body) : undefined,

        validateStatus: function (status) {
          return status < 500;
        }
      };

      axios(options)
        .then((response) => {
          if (response.status.toString()[0] != "2") {
            reject(response.data as IResponceWithError)
          } else {
            resolve(response.data)
          }
        })
    })

  }
}
