import React from "react";
import { storiesOf } from "@storybook/react";
import Cards from "../src/Cards";
import LoadingMockedProvider from "../src/utils/LoadingMockedProvider";

storiesOf("6: LoadingMockedProvider", module).add("default", () => (
  <LoadingMockedProvider>
    <Cards />
  </LoadingMockedProvider>
));
