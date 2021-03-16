import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { document as documentQuery } from "../../../graphql/queries/Documents.gql";
import { updateDocument as updateDocumentMutation } from "../../../graphql/mutations/Documents.gql";

import { StyledViewDocument } from "./styles";

const ViewDocument = () => {
  const router = useRouter();
  const documentId = router.query && router.query._id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data } = useQuery(documentQuery, { variables: { documentId } });

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
          className="button button-primary"
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

export default ViewDocument;
