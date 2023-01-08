import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { QiwiP2P_OPTIONS, QiwiP2P_TOKEN } from './qiwi-p2p.constants';
import {
  QiwiP2PAsyncOptions,
  QiwiP2POptions,
  QiwiP2POptionsFactory,
} from './qiwi-p2p.interfaces';
import { QiwiP2PService } from './qiwi-p2p.service';

@Global()
@Module({
  providers: [QiwiP2PService],
  exports: [QiwiP2PService],
})
export class QiwiP2PModule {
  /**
   * Registers a configured QiwiP2P Module for import into the current module
   */
  public static forRoot(options: QiwiP2POptions): DynamicModule {
    return {
      module: QiwiP2PModule,
      providers: [{ provide: QiwiP2P_OPTIONS, useValue: options }],
    };
  }

  /**
   * Registers a configured QiwiP2P Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static forRootAsync(options: QiwiP2PAsyncOptions): DynamicModule {
    return {
      module: QiwiP2PModule,
      imports: options.imports ?? [],
      providers: [...this.createProviders(options)],
    };
  }

  private static createProviders(options: QiwiP2PAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(
    options: QiwiP2PAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: QiwiP2P_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: QiwiP2P_OPTIONS,
      useFactory: async (optionsFactory: QiwiP2POptionsFactory) =>
        await optionsFactory.createQiwiP2POptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
