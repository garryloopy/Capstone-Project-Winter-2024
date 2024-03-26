function buildPaymentRequest(payments) {
  return payments.paymentsRequest({
    countryCode: "CA",
    currencyCode: "CAD",
    total: {
      amount: "1.0",
      label: "Test amount",
    },
  });
}

async function initializeApplePay(payments) {
  const paymentRequest = buildPaymentRequest(payments);
  const applePay = await payments.applePay(paymentRequest);

  return applePay;
}

document.addEventListener("DOMContentLoaded", async function () {
  let applePay;
  try {
    applePay = await initializeApplePay(payments);
  } catch (e) {
    console.error("Initialization failed", e);
  }

  if (applePay != undefined) {
    const applePayButton = document.getElementById("apple-pay-button");
    applePayButton.addEventListener("click", async function (event) {
      await handlePaymentMethodSubmission(event, applePay);
    });
  }
});
