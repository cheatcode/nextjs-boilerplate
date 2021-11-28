import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { document as documentQuery } from "../../../graphql/queries/Documents.gql";
import {
  updateDocument as updateDocumentMutation,
  deleteDocument as deleteDocumentMutation,
} from "../../../graphql/mutations/Documents.gql";
import authenticatedRoute from "../../../components/AuthenticatedRoute";
import ValidatedForm from "../../../components/ValidatedForm";
import handleApolloResponse from "../../../lib/handleApolloResponse";
import pong from "../../../lib/pong";

import StyledEditDocument from "./edit.css";

const EditDocument = () => {
  const router = useRouter();
  const documentId = router.query && router.query._id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data } = useQuery(documentQuery, { variables: { documentId }, fetchPolicy: 'network-only' });
  const [updateDocument] = useMutation(updateDocumentMutation);
  const [deleteDocument] = useMutation(deleteDocumentMutation);

  useEffect(() => {
    if (data && data.document) {
      setTitle(data.document && data.document.title);
      setContent(data.document && data.document.content);
    }
  }, [data]);

  const handleUpdateDocument = () => {
    updateDocument({
      variables: {
        documentId: router.query && router.query._id,
        document: {
          title,
          content,
        },
      },
    })
      .then((response) => {
        return handleApolloResponse({
          queryName: "updateDocument",
          response,
          onSuccess: (data) => {
            router.push(`/documents/${data._id}`);
          },
          onError: (error) => {
            pong.danger(error);
          },
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleDeleteDocument = (event) => {
    if (confirm("Are you sure? This is permanent!")) {
      deleteDocument({
        variables: {
          documentId: router.query && router.query._id,
        },
      })
        .then(({ error, data }) => {
          if (error) {
            console.log(error);
          }

          router.push(`/documents`);
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  };

  return (
    <StyledEditDocument>
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
        onSubmit={handleUpdateDocument}
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
          <footer>
            <button type="submit" className="btn btn-primary">
              Update Document
            </button>
            <button
              type="button"
              className="btn btn-danger ms-auto"
              onClick={handleDeleteDocument}
            >
              Delete
            </button>
          </footer>
        </form>
      </ValidatedForm>
    </StyledEditDocument>
  );
};

EditDocument.propTypes = {};

export default authenticatedRoute(EditDocument);
