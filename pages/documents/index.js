import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { documents as documentsQuery } from "../../graphql/queries/Documents.gql";
import GraphQLError from "../../components/GraphQLError";
import Loading from "../../components/Loading";
import { monthDayYear, monthDayYearAtTime } from "../../lib/dates";

const Documents = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(documentsQuery);

  if (error) {
    return <GraphQLError error={error} />;
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h4>Documents</h4>
        </div>
        <button
          className="button button-primary"
          onClick={() => router.push(`/documents/create`)}
        >
          Create Document
        </button>
      </div>
      {loading && <Loading />}
      {!loading && data.documents && data.documents.length > 0 && (
        <div className="table striped">
          <table>
            <thead>
              <tr>
                <th>Document Title</th>
                <th className="text-center">Created At</th>
                <th className="text-center">Updated At</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.documents.map(({ _id, title, createdAt, updatedAt }) => {
                return (
                  <tr key={_id}>
                    <td>
                      <Link href={`/documents/${_id}`}>{title}</Link>
                    </td>
                    <td className="text-center">{monthDayYear(createdAt)}</td>
                    <td className="text-center">{monthDayYear(updatedAt)}</td>
                    <td className="text-center">
                      <button
                        className="button button-primary button-small"
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
        <div className="blank-state dashed">
          <h5>No Documents Here.</h5>
          <p>
            To create your first document, click the button below. Once you
            create a document, it will appear here.
          </p>
          <button
            className="button button-primary"
            onClick={() => router.push(`/documents/create`)}
          >
            Create Document
          </button>
        </div>
      )}
    </>
  );
};

Documents.propTypes = {};

export default Documents;
