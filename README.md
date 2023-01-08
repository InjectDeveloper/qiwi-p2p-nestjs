<h1 align="center"></h1>

<div align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<br/>
<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/InjectDeveloper/qiwi-p2p-nestjs/blob/main/LICENSE)
[![Built with NestJS](https://img.shields.io/badge/built%20with-NestJs-red.svg)](https://nestjs.com)
[![Built with @nestjsplus/dyn-schematics](https://img.shields.io/badge/Built%20with-%40nestjsplus%2Fdyn--schematics-brightgreen)](https://github.com/nestjsplus/dyn-schematics)

</div>

<br/>

## About

The module is a wrapper api for the [Qiwi P2P](https://developer.qiwi.com/ru/p2p-payments).

<br/>

## Installation

```bash
npm i @inject_dev/qiwi-p2p-nestjs
```

<br/>

## Quick Start

Import the module and pass your api keys to it

```TypeScript
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QiwiP2PModule } from '@inject_dev/qiwi-p2p-nestjs';

@Module({
  imports: [QiwiP2PModule.forRoot({
    secretKey: "apiSecretKey",
    publicKey: "apiPublicKey",
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
<br/>

..or use forRootAsync({ })

```TypeScript
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QiwiP2PModule } from '@inject_dev/qiwi-p2p-nestjs';

@Module({
  imports: [
    QiwiP2PModule.forRootAsync({
      imports: [/* ConfigModule */]
      /* 
        useExisting 
        useFactory 
        useClass 
      */
      useFactory: async () => /* API_KEYS */, 
      inject: [/* ConfigService */]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
<br/>

Use library in your service

```TypeScript
// app.service.ts
import { QiwiP2PService } from '@inject_dev/qiwi-p2p-nestjs'
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly p2pService: QiwiP2PService
  ) {}
  
  async createBill(paymentInfo): Promise<any> {
    // paymentInfo: ICreateBillParams
    return this.p2pService.createBill(paymentInfo);
  }
}
```

## Contributing

Any suggestions for improving the project are welcome.

1. Fork the repository
2. Create your branch (git checkout -b my-branch)
3. Commit any changes to your branch
4. Push your changes to your remote branch
5. Open a pull request

<br/>

## License

Distributed under the MIT License. See [LICENSE](https://github.com/InjectDeveloper/qiwi-p2p-nestjs/blob/main/LICENSE) for more information.

<br/>

## Acknowledgements

* [nestjs](https://nestjs.com/)

* [@nestjsplus/dyn-schematics](https://github.com/nestjsplus/dyn-schematics)

* [QIWI P2P API](https://developer.qiwi.com/ru/p2p-payments)