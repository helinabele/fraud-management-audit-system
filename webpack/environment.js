// export const environment = {
//   production: false,
//   firebaseConfig: {
//     apiKey: '<your-api-key>',
//     authDomain: '<your-auth-domain>',
//     projectId: '<your-project-id>',
//     storageBucket: '<your-storage-bucket>',
//     messagingSenderId: '<your-messaging-sender-id>',
//     appId: '<your-app-id>',
//   }
// };

module.exports = {
  I18N_HASH: 'generated_hash',
  SERVER_API_URL: '',
  __VERSION__: process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV',
  __DEBUG_INFO_ENABLED__: false,
//  firebaseConfig: JSON.stringify(firebaseConfig),
};
