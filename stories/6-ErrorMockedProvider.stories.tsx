import React from "react";
import { storiesOf } from "@storybook/react";
import Cards from "../src/Cards";
import ErrorMockedProvider from "../src/utils/ErrorMockedProvider";

storiesOf("6: ErrorMockedProvider", module).add("default", () => (
  <ErrorMockedProvider>
    <Cards />
  </ErrorMockedProvider>
));
