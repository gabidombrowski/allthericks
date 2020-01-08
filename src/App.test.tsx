import React from "react";
import renderer from "react-test-renderer";
import wait from "waait";
import App from "./App";
import AutoMockedProviderMerged from "utils/AutoMockedProviderMerged";

const mockResolvers = {
  Query: () => ({
    episodes: () => ({
      info: () => ({
        count: 10
      })
    })
  })
};

it("renders", async () => {
  const tree = renderer.create(
    <AutoMockedProviderMerged mockResolvers={mockResolvers}>
      <App />
    </AutoMockedProviderMerged>
  );

  await wait(0);

  expect(tree).toMatchSnapshot();
});
