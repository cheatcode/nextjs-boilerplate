import React from "react";
import { useRouter } from "next/router";

const Error = (props) => {
  const router = useRouter();

  return (
    <>
      <div className="blank-state transparent">
        <h5>Page Not Found</h5>
        <p>
          This page does not exist. Please double-check the URL and try again.
        </p>
        <button
          className="button button-primary"
          onClick={() => router.push("/")}
        >
          Go Back to Home
        </button>
      </div>
    </>
  );
};

Error.propTypes = {};

export default Error;
