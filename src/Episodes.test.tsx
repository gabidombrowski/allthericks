import React from "react";
import { create, act } from "react-test-renderer";
import wait from "waait";
import waitForExpect from "wait-for-expect";
import Episodes from "./Episodes";
import AutoMockedProvider from "utils/AutoMockedProvider";

const mockResolvers = {
  Query: () => ({
    episodes: () => ({
      info: () => ({
        count: 20
      })
    })
  })
};

it("renders", async () => {
  const component = create(
    <AutoMockedProvider mockResolvers={mockResolvers}>
      <Episodes />
    </AutoMockedProvider>
  );

  await act(() => wait(0));

  await waitForExpect(() => {
    expect(component).toMatchSnapshot();
  });
});
