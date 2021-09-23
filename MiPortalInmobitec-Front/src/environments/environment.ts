// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://54.86.129.40',
  // url: 'http://inmueble-backend.com',
  // url: 'http://52.87.247.210',
  // url: 'http://portal-inmobisoft-backend.com',
  // url: 'http://portal-inmobitec-api.com',
  defaultAvatar: 'assets/images/users/usuario.png',
  googleMapsApiKey: 'GOOGLE_MAPS_API_KEY',
  bankAccount: 2,
  webPaymentCheckoutJS:
    'https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
