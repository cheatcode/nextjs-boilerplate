import React from "react";
import { useRouter } from "next/router";
import BlankState from "../../components/BlankState";

const Error = () => {
  const router = useRouter();

  return (
    <BlankState
      bordered
      title="Page Not Found"
      subtitle="This page does not exist. Please double-check the URL and try again."
      action={{
        style: "primary",
        label: "Go Back to Home",
        onClick: () => router.push("/"),
      }}
    />
  );
};

Error.propTypes = {};

export default Error;
