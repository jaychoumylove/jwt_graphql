import React from "react";
import { useByeQuery } from "../generated/graphql";

export interface IByeProps {}

const Bye: React.FC<IByeProps> = () => {
  const { data, loading, error } = useByeQuery();

  if (loading) return <div>loading...</div>;

  if (error) {
    return <div>{error.message}</div>;
  }

  return <div>{data?.bye}</div>;
};

export { Bye };
