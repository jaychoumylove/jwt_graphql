import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";

export interface IRegisterProps extends RouteComponentProps {}

const Register: React.FC<IRegisterProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await register({
            variables: {
              email,
              password,
            },
          });

          history.push("/");
        }}
      >
        <div>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div>
          <button type="submit">register</button>
        </div>
      </form>
    </div>
  );
};

export { Register };
