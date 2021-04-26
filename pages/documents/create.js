import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { createDocument as createDocumentMutation } from "../../graphql/mutations/Documents.gql";
import authenticatedRoute from "../../components/AuthenticatedRoute";
import ValidatedForm from "../../components/ValidatedForm";
import handleApolloResponse from "../../lib/handleApolloResponse";
import pong from "../../lib/pong";

import StyledCreateDocument from "./create.css";

const CreateDocument = () => {
  const router = useRouter();
  const [createDocument] = useMutation(createDocumentMutation);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    createDocument({
      variables: {
        document: {
          title,
          content,
        },
      },
    }).then((response) => {
      return handleApolloResponse({
        queryName: "createDocument",
        response,
        onSuccess: (data) => {
          router.push(`/documents/${data._id}`);
        },
        onError: (error) => {
          pong.danger(error);
        },
      });
    });
  };

  return (
    <StyledCreateDocument>
      <ValidatedForm
        rules={{
          title: {
            required: true,
          },
          content: {
            required: true,
          },
        }}
        messages={{
          title: {
            required: "Title is required.",
          },
          content: {
            required: "Content is required.",
          },
        }}
        onSubmit={handleSubmit}
      >
        <form>
          <div className="row">
            <div className="col-xs-12">
              <div className="mb-3">
                <label className="form-label">Document Title</label>
                <input
                  className="form-control"
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
              <div className="mb-4">
                <label className="form-label">Document Content</label>
                <textarea
                  className="form-control"
                  name="content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Document Content"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Document
          </button>
        </form>
      </ValidatedForm>
    </StyledCreateDocument>
  );
};

CreateDocument.propTypes = {};

export default authenticatedRoute(CreateDocument);
