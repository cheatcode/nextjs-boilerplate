import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { documents as documentsQuery } from "../../graphql/queries/Documents.gql";
import authenticatedRoute from "../../components/AuthenticatedRoute";
import GraphQLError from "../../components/GraphQLError";
import Loading from "../../components/Loading";
import BlankState from "../../components/BlankState";
import { monthDayYear } from "../../lib/dates";

import StyledDocuments from "./index.css";

const Documents = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(documentsQuery, {
    fetchPolicy: 'network-only'
  });

  if (error) {
    return <GraphQLError error={error} />;
  }

  return (
    <StyledDocuments>
      <div className="page-header">
        <h5>Documents</h5>
        <button
          className="btn btn-primary"
          onClick={() => router.push(`/documents/create`)}
        >
          Create Document
        </button>
      </div>
      {loading && <Loading />}
      {!loading && data.documents && data.documents.length > 0 && (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th className="text-center">Created At</th>
                <th className="text-center">Updated At</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.documents.map(({ _id, title, createdAt, updatedAt }) => {
                return (
                  <tr key={_id} className="align-middle">
                    <td>
                      <Link href={`/documents/${_id}`}>{title}</Link>
                    </td>
                    <td className="text-center">{monthDayYear(createdAt)}</td>
                    <td className="text-center">{monthDayYear(updatedAt)}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => router.push(`/documents/${_id}/edit`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {!loading && data.documents && data.documents.length === 0 && (
        <BlankState
          bordered
          title="No Documents Here."
          subtitle="To create your first document, click the button below. Once you create a document, it will appear here."
          action={{
            style: "primary",
            label: "Create Document",
            onClick: () => router.push(`/documents/create`),
          }}
        />
      )}
    </StyledDocuments>
  );
};

Documents.propTypes = {};

export default authenticatedRoute(Documents);
