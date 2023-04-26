import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressScreen = () => {
  const { state, dispatch: ctxDispath } = useContext(Store);
  const { userInfo,cart:{shippingAddress} } = state;


  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode ||"");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const navigate = useNavigate();
 useEffect(() => {
   if (!userInfo) {
     navigate("/signin?redirect=/shipping");
   }
 }, [userInfo]);




  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispath({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        country,
        postalCode,
      },
    });

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        country,
        postalCode,
      })
    );

    navigate("/payment");
  };

  return (
    <div>
      <h1>ShippingAddressScreen</h1>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <Form onSubmit={submitHandler}>
          <FormGroup className="mb-3" id="fullName">
            <FormLabel>Full Name</FormLabel>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></Form.Control>
          </FormGroup>
          <FormGroup className="mb-3" id="address">
            <FormLabel>Address</FormLabel>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </FormGroup>
          <FormGroup className="mb-3" id="city">
            <FormLabel>City</FormLabel>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </FormGroup>
          <FormGroup className="mb-3" id="postalCode">
            <FormLabel>Postal Code</FormLabel>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </FormGroup>
          <FormGroup className="mb-3" id="country">
            <FormLabel>Country</FormLabel>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </FormGroup>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddressScreen;



//3.54hr