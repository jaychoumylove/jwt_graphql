import React from "react";
import { useByeQuery } from "../generated/graphql";

export interface IByeProps {}

const Bye: React.FC<IByeProps> = () => {
  const { data, loading, error } = useByeQuery();

  if (loading) return <div>loading...</div>;

  if (error) {
    console.log(error.message);
    return <div>error</div>;
  }

  console.log(data);

  return <div>{data?.bye}</div>;
};

export { Bye };
