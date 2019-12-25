import React from "react";
import { create, act } from "react-test-renderer";
import wait from "waait";
import waitForExpect from "wait-for-expect";
import Episodes from "./Episodes";
import AutoMockedProviderMerged from "utils/AutoMockedProviderMerged";

it("renders", async () => {
  const component = create(
    <AutoMockedProviderMerged>
      <Episodes />
    </AutoMockedProviderMerged>
  );

  await act(() => wait(0));

  await waitForExpect(() => {
    expect(component).toMatchSnapshot();
  });
});
