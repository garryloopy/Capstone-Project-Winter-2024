// //Apple Pay feature

// function buildPaymentRequest(payments) {
//   return payments.paymentRequest({
//     countryCode: "CA",
//     currencyCode: "CAD",
//     total: {
//       amount: "1.00",
//       label: "Total",
//     },
//   });
// }

// async function initializeApplePay(payments) {
//   const paymentRequest = buildPaymentRequest(payments);
//   const applePay = await payments.applePay(paymentRequest);
//   // Note: You don't need to `attach` applePay.

//   return applePay;
// }

// let applePay;
// try {
//   applePay = await initializeApplePay(payments);
// } catch (e) {
//   console.error("Initializing Apple Pay failed", e);
// }

// export default ApplePayButton;
