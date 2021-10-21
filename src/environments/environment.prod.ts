export const environment = {
  production: true,
  url: 'https://backend.inmobitec.pe',
  googleMapsApiKey: 'GOOGLE_MAPS_API_KEY',
  bankAccount: 2,
  echoConfig: {
    key: 'PUSHER_APP_KEY',
    cluster: 'us2',
    wsHost: 'WS_HOST',
    wsPort: 6001,
    wssPort: 6001,
    disableStats: true,
    encrypted: true,
    enabledTransports: ['ws'],
    forceTLS: false,
  },
  social: 'https://wa.link/kodiap',
  defaultAvatar: 'assets/images/users/usuario.png',
  webPaymentCheckoutJS:
    'https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js',
};
