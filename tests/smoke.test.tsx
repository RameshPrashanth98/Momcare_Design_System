import React from "react";
import { render } from "@testing-library/react-native";
// Will resolve once Plan 01 creates this file
import { SmokeTest } from "../src/components/SmokeTest";

describe("SmokeTest component", () => {
  it("renders without throwing", () => {
    const { getByText } = render(<SmokeTest />);
    expect(getByText(/NativeWind/i)).toBeTruthy();
  });
});
