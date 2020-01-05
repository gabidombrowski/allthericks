import React from "react";
import { storiesOf } from "@storybook/react";
import CardsLocal from "../src/CardsLocal";
import LocalStateProvider from "../src/utils/LocalStateProvider";

storiesOf("9: LocalStateProvider", module).add("default", () => (
  <LocalStateProvider>
    <CardsLocal />
  </LocalStateProvider>
));
