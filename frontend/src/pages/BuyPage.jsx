import { Link, useParams } from "react-router-dom";
import { useState  } from 'react';
import { useNavigate} from "react-router-dom";
import GooglePayButton from "@google-pay/button-react";

const BuyPage = () => {
  let { ticket_id } = useParams();
  let navigate = useNavigate();
  //temp assign till backend connected
  ticket_id = 1;
  const [paymentStatus, setPaymentStatus] = useState('');
  const handlePaymentSuccess = (paymentData) => {
    console.log("load payment data", paymentData);
    setPaymentStatus('Payment Successful! Redirecting in a few seconds')
    setTimeout(() => {
      navigate(`/ticket/${ticket_id}`);
    }, 3000); 
  };
 
  //google stuff
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA", "AMEX"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US",
    },
  };

 

  return (
    <>
      <h3>Buy ticket</h3>
      {/* contain details about buying and connect to api to complete purchase
      will link to tthe correct ticketpage */}
       {paymentStatus && <div>{paymentStatus}</div>}
      <GooglePayButton
        environment="TEST"
        paymentRequest={paymentRequest}
        onLoadPaymentData={handlePaymentSuccess}
        
      />
      <Link to={`/ticket/${ticket_id}`}>View Ticket</Link>
    </>
  );
};


export default BuyPage;
