import React from "react";
import { storiesOf } from "@storybook/react";
import Cards from "../src/Cards";
import NoDataMockedProvider from "../src/utils/NoDataMockedProvider";

storiesOf("8: NoDataMockedProvider", module).add("default", () => (
  <NoDataMockedProvider>
    <Cards />
  </NoDataMockedProvider>
));
