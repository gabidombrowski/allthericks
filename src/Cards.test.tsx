import React from "react";
import renderer, { act } from "react-test-renderer";
import wait from "waait";
import Cards from "./Cards";
import AutoMockedProvider from "utils/AutoMockedProvider";

it("renders", async () => {
  const tree = renderer.create(
    <AutoMockedProvider>
      <Cards />
    </AutoMockedProvider>
  );

  await act(() => wait(0));

  expect(tree).toMatchSnapshot();
});
