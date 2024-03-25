import React, { useEffect } from "react";

const GooglePayButton = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pay.google.com/gp/p/js/pay.js";
    script.async = true;

    script.onload = () => {
      const baseRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
      };

      const tokenizationSpecification = {
        type: "PAYMENT_GATEWAY",
        parameters: {
          gateway: "example",
          gatewayMerchantId: "exampleGatewayMerchantId",
        },
      };

      const allowedCardNetworks = ["INTERAC", "MASTERCARD", "VISA"];
      const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

      const baseCardPaymentMethod = {
        type: "CARD",
        parameters: {
          allowedAuthMethods: allowedCardAuthMethods,
          allowedCardNetworks: allowedCardNetworks,
        },
      };

      const cardPaymentMethod = Object.assign(
        { tokenizationSpecification: tokenizationSpecification },
        baseCardPaymentMethod
      );

      const paymentsClient = new window.google.payments.api.PaymentsClient({
        environment: "TEST",
      });

      const isReadyToPayRequest = Object.assign({}, baseRequest);
      isReadyToPayRequest.allowedPaymentMethods = [baseCardPaymentMethod];

      paymentsClient
        .isReadyToPay(isReadyToPayRequest)
        .then(function (response) {
          if (response.result) {
            const container = document.getElementById("container");
            container.innerHTML = "";
            const button = paymentsClient.createButton({
              onClick: () => {
                paymentsClient
                  .loadPaymentData(createPaymentDataRequest())
                  .then((paymentData) => {
                    console.log("Payment data received:", paymentData);
                  })
                  .catch((error) => {
                    console.error("Error loading payment data:", error);
                  });
              },
              buttonType: "long",
              buttonColor: "default",
            });
            container.appendChild(button);
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createPaymentDataRequest = () => {
    const baseRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
    };

    const paymentDataRequest = Object.assign({}, baseRequest);

    paymentDataRequest.allowedPaymentMethods = [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["VISA", "MASTERCARD"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId",
          },
        },
      },
    ];

    paymentDataRequest.transactionInfo = {
      totalPriceStatus: "FINAL",
      totalPrice: "10.00",
      currencyCode: "CAD",
    };

    return paymentDataRequest;
  };

  return <div id="container"></div>;
};

export default GooglePayButton;
