import React from "react";
import renderer from "react-test-renderer";
import wait from "waait";
import App from "./App";
import AutoMockedProvider from "utils/AutoMockedProvider";

it("renders", async () => {
  const tree = renderer.create(
    <AutoMockedProvider>
      <App />
    </AutoMockedProvider>
  );

  await wait(0);

  expect(tree).toMatchSnapshot();
});
