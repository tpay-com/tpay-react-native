#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(TpayRNModule, NSObject)
    RCT_EXTERN_METHOD(configure: (NSString *)json
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
    RCT_EXTERN_METHOD(startPayment: (NSString *)json
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
    RCT_EXTERN_METHOD(startCardTokenPayment: (NSString *)json
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
    RCT_EXTERN_METHOD(tokenizeCard: (NSString *)json
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
    RCT_EXTERN_METHOD(screenlessCreditCardPayment: (NSString *)json
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
    RCT_EXTERN_METHOD(screenlessBLIKPayment: (NSString *)json
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
    RCT_EXTERN_METHOD(screenlessTransferPayment: (NSString *)json
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
    RCT_EXTERN_METHOD(screenlessAmbiguousBLIKPayment: (NSString *)json
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
    RCT_EXTERN_METHOD(paymentWithApplePay: (NSString *)json
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
    RCT_EXTERN_METHOD(availablePaymentMethods: (NSString *)json
                      resolve:(RCTPromiseResolveBlock)resolve
                      reject:(RCTPromiseRejectBlock)reject)
@end
