// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: "http://localhost:4200",
  URL: "http://localhost:8000/api", // Change only the domain part, keeping "/api" intact
  storageURL: "http://localhost:4200", // Change only the laravel primary domain
  payment_return_rul: "http://localhost:4200/account/order/details", // Change only the laravel primary domain
  payment_cancel_url: "http://localhost:4200",

  // production: true,
  // baseURL: "https://camera04.nokorweb.com", // This represents the base URL for running our frontend project.
  // URL: "https://camera04.nokorweb.com/api/public/api", // Change only the domain part, keeping "/api" intact
  // storageURL: "https://camera04.nokorweb.com/api/public", // Change only the laravel primary domain
  // payment_return_url: "https://camera04.nokorweb.com/account/order/details",
  // payment_cancel_url: "https://camera04.nokorweb.com",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
