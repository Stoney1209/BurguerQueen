// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlServer: 'http://localhost:3000/api/v2',
  urlServerImages: 'http://localhost:3000/images',
  stripe: {
    publishKey: 'pk_test_51MJkuYDwpaKiJEilq0vDek7WH3ruUejJohfwS2tqQhTeiZuV8kxneSD2L8NIsVCRzMUcRcilGxLFWXe8pRX96XEr00m2SVKbHl',
    secretKey: 'sk_test_51MJkuYDwpaKiJEil853rHx7ARzEEQ74cUqpBuFDpPwBoGiwIQsXQ0j2bGh5GfTgK14F26sUeFe1TKnSaBhXSGOHg00NNR9HCNe',
    customerId: 'cus_O5Y3BpUU9oSHa3'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
