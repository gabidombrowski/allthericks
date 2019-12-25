import React from "react";
import { storiesOf } from "@storybook/react";
import CardsMorty from "../src/CardsMorty";
import LocalStateProvider from "../src/utils/LocalStateProvider";

storiesOf("9: LocalStateProvider", module).add("default", () => (
  <LocalStateProvider>
    <CardsMorty />
  </LocalStateProvider>
));
