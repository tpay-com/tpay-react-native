import type { CertificatePinningConfiguration } from "./certificate_configuration";
import type { MerchantAuthorization } from "./merchant_authorization";
import type { TpayEnvironment } from "./tpay_environment";
import type { WalletConfiguration } from "./wallet_configuration";

/**
 * Class responsible for storing merchant information
 */
export class Merchant {
  authorization: MerchantAuthorization;
  environment: TpayEnvironment;
  certificatePinningConfiguration: CertificatePinningConfiguration;
  blikAliasToRegister: string;
  walletConfiguration: WalletConfiguration | null;

  /**
   * @param authorization - merchant credentials
   * @param environment - environment that the module will use
   * @param certificatePinningConfiguration - encryption information
   * @param blikAliasToRegister - BLIK that will be registered with payment
   * @param walletConfiguration - configuration of digital wallets
   */
  constructor(
    authorization: MerchantAuthorization,
    environment: TpayEnvironment,
    certificatePinningConfiguration: CertificatePinningConfiguration,
    blikAliasToRegister: string,
    walletConfiguration: WalletConfiguration | null
  ) {
    this.authorization = authorization;
    this.environment = environment;
    this.certificatePinningConfiguration = certificatePinningConfiguration;
    this.blikAliasToRegister = blikAliasToRegister;
    this.walletConfiguration = walletConfiguration;
  }
}
