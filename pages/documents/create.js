import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { createDocument as createDocumentMutation } from "../../graphql/mutations/Documents.gql";
import authenticatedRoute from "../../components/AuthenticatedRoute";
import ValidatedForm from "../../components/ValidatedForm";

import { StyledCreateDocument } from "./styles";

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
