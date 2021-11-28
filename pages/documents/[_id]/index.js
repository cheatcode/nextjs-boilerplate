import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { document as documentQuery } from "../../../graphql/queries/Documents.gql";
import authenticatedRoute from "../../../components/AuthenticatedRoute";

import StyledViewDocument from "./index.css";

const ViewDocument = () => {
  const router = useRouter();
  const documentId = router.query && router.query._id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data } = useQuery(documentQuery, { variables: { documentId }, fetchPolicy: 'network-only' });

  useEffect(() => {
    if (data && data.document) {
      setTitle(data.document && data.document.title);
      setContent(data.document && data.document.content);
    }
  }, [data]);

  return (
    <StyledViewDocument>
      <div className="page-header">
        <h5>{title}</h5>
        <button
          className="btn btn-primary"
          onClick={() => router.push(`/documents/${documentId}/edit`)}
        >
          Edit Document
        </button>
      </div>
      <div className="content">{content}</div>
    </StyledViewDocument>
  );
};

ViewDocument.propTypes = {};

export default authenticatedRoute(ViewDocument);
