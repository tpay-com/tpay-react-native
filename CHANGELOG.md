## UNRELEASED

## 1.3.22

- Change: Update Android SDK to 1.2.8

## 1.3.21

- Fix: Updated iOS SDK to 1.3.16
- Feature: Back button (chevron) on 3DS screen during card tokenization on iOS — analogous to Android
- Fix: BLIK alias `isRegistered` flag mapping on iOS — checkbox for alias registration now works correctly
- Fix: Empty `blikAliasToRegister` no longer creates an unwanted alias
- Fix: screenlessTransferPayment error when payer address field is null on iOS

## 1.3.20

- Fix: Updated iOS SDK to 1.3.14 (fix race condition crash v2 — serial queue + handler cleanup)

## 1.3.19

- Fix: Updated iOS SDK to 1.3.13 (fix Apple Pay radiobox dot alignment, add close button to bank transfer payment webview)

## 1.3.18

- Fix: Updated iOS SDK to 1.3.12 (fix crash: NetworkRequestResult premature deallocation on background queue)

## 1.3.17

- Change: Updated Android SDK to 1.2.7

## 1.3.16

- Change: Updated iOS SDK to 1.3.10
- Change: Updated Android SDK to 1.2.6

## 1.3.15

- Change: Updated iOS SDK to 1.3.9
- Fix: Payers information reset on language change on iOS
- Fix: Lack of redirection for token transactions on iOS

## 1.3.14

- Change: Updated iOS SDK to 1.3.8
- Fix: Using callbacks internally to configure notifications & redirects

## 1.3.13

- Change: Updated iOS SDK to 1.3.7
- Fix: Passing success & error redirect urls to the API on Screenless transaction creation on iOS

## 1.3.12

- Fix: Updated iOS SDK to version 1.3.6 to support exact channel in screenless mode for `TransferPayment`
- Change: Updated iOS SDK to version 1.3.6 to handle passing `notifications` parameter
- Change: **_REMOVED_** `bankName` parameter for `TransferPayment`

## 1.3.11

- Fixed: Screenless transfer payments on iOS
- Change: Screenless payments now **_REQUIRES_** `callbacks` to be provided
- Change: TransferPayment now **_REQUIRES_** `bankName` to be provided
