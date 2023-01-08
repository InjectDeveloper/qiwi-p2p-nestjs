import { ModuleMetadata, Type } from '@nestjs/common';

export interface QiwiP2POptions {
  publicKey: string
  secretKey: string
};

export interface QiwiP2POptionsFactory {
  createQiwiP2POptions(): Promise<QiwiP2POptions> | QiwiP2POptions;
}

export interface QiwiP2PAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<QiwiP2POptionsFactory>;
  useClass?: Type<QiwiP2POptionsFactory>;
  useFactory?: (...args: any[]) => Promise<QiwiP2POptions> | QiwiP2POptions;
}

// ---- FEATURES ----

export interface ICreateBillParams {
  billId: string
  successUrl: string
  data: ICreateBillFields
}

export interface ICreateBillFields {
  amount: {
    currency: string;
    value: number;
  };
  expirationDateTime: Date;
  coment?: string;
  customer?: {
    phone?: string;
    email?: string;
    account?: string;
  }
  customFields?: {
    paySourcesFilter?: string;
    themeCode?: string;
    [key: string]: any;
  }
}

export interface IBillInfoSuccessResponce {
  siteId:             string;
  billId:             string;
  value:              Amount;
  status:             Status;
  customer?:          Customer;
  customFields?:      CustomFields;
  comment?:           string;
  creationDateTime:   Date;
  expirationDateTime: Date;
  payUrl:             string;
}
interface Amount {
  currency: string;
  value:    string;
}

interface CustomFields {
  paySourcesFilter?: string;
  themeCode?:        string;
  [key: string]: any;
}

interface Customer {
  phone?:   string;
  email?:   string;
  account?: string;
}

interface Status {
  value:           string;
  changedDateTime: Date;
}

export interface IRecipient {
  recipientPhoneNumber?: string
  recipient?: {
    requisitesType?: string,
    requisitesValue?: string
    [key: string]: any
  }
  [key: string]: any
}

// ---- ERROR ----
export interface IResponceWithError {
  serviceName: string;
  errorCode: string;
  description: string;
  userMessage: string
  dateTime: string
  traceId: string
}