import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const GET_USER_QUERY = gql`
  {
    User(id: 1) {
      id
      name
    }
  }
`;

export default () => (
  <Query query={GET_USER_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return <p>読み込み中</p>;
      }
      if (error) {
        return <p>エラー発生！</p>;
      }

      return (
        <div key={data.User.id}>
          <p>{`${data.User.id}: ${data.User.name}`}</p>
        </div>
      );
    }}
  </Query>
);
