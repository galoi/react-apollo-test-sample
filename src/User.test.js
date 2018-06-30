import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import wait from "waait";

import User, { GET_USER_QUERY } from "./User";

it("should render without error", () => {
  renderer.create(
    <MockedProvider mocks={[]}>
      <User />
    </MockedProvider>
  );
});

it("should render loading state initially", () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <User />
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree.children).toContain("読み込み中");
});

it("should render User 太郎", async () => {
  const UserMock = {
    request: {
      query: GET_USER_QUERY
    },
    result: {
      data: {
        User: {
          id: 1,
          name: "太郎"
        }
      }
    }
  };

  const component = renderer.create(
    <MockedProvider mocks={[UserMock]} addTypename={false}>
      <User />
    </MockedProvider>
  );

  await wait(0); // wait for response

  const p = component.root.findByType("p");
  expect(p.children).toContain("1: 太郎");
});

it("should show error UI", async () => {
  const UserMock = {
    request: {
      query: GET_USER_QUERY
    },
    error: new Error()
  };

  const component = renderer.create(
    <MockedProvider mocks={[UserMock]} addTypename={false}>
      <User />
    </MockedProvider>
  );

  await wait(0); // wait for response
  const tree = component.toJSON();
  expect(tree.children).toContain("エラー発生！");
});
