import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { createDocument as createDocumentMutation } from "../../graphql/mutations/Documents.gql";

import { StyledCreateDocument } from "./styles";

const CreateDocument = () => {
  const router = useRouter();
  const [createDocument] = useMutation(createDocumentMutation);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createDocument({
      variables: {
        document: {
          title,
          content,
        },
      },
    })
      .then(({ error, data }) => {
        if (error) {
          console.log(error);
        }

        if (data && data.createDocument && data.createDocument._id) {
          router.push(`/documents/${data.createDocument._id}`);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <StyledCreateDocument>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12">
            <div className="field">
              <label className="input-label">Document Title</label>
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Document Title"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="field">
              <label className="input-label">Document Content</label>
              <textarea
                className="input"
                name="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Document Content"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="button button-success">
          Create Document
        </button>
      </form>
    </StyledCreateDocument>
  );
};

CreateDocument.propTypes = {};

export default CreateDocument;
