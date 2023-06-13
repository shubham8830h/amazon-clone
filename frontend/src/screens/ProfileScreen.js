import React, { useContext, useState } from "react";

import { Store } from "../Store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useReducer } from "react";
import { toast } from "react-toastify";
import { getError } from "../Utils";
import axios from "axios";
import { BASE_URL } from "../url";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

const ProfileScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [, setConfirmPassword] = useState("");

  const [, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/users/profile`,
        {
          name,
          email,
          password,
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
    } catch (error) {
      dispatch({ type: "UPDATE_FAIL" });
      toast.error(getError(error));
    }
  };

  return (
    <div className="container small-container">
      <h1 className="my-3">User Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label className="my-3" controlId="name">
            Name
          </Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="my-3" controlId="email">
            Email
          </Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>{" "}
        <Form.Group>
          <Form.Label className="my-3" controlId="password">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="my-3" controlId="password">
            Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="my-3">
          <Button type="submit">Update</Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfileScreen;
