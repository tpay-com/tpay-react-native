## UNRELEASED

## 1.3.13
- Change: Updated iOS SDK to 1.3.7
- Fix: Passing success & error redirect urls to the API on Screenless transaction creation on iOS

## 1.3.12
- Fix: Updated iOS SDK to version 1.3.6 to support exact channel in screenless mode for `TransferPayment`
- Change: Updated iOS SDK to version 1.3.6 to handle passing `notifications` parameter
- Change: ___REMOVED___ `bankName` parameter for `TransferPayment` 

## 1.3.11
- Fixed: Screenless transfer payments on iOS
- Change: Screenless payments now ___REQUIRES___ `callbacks` to be provided
- Change: TransferPayment now ___REQUIRES___ `bankName` to be provided
