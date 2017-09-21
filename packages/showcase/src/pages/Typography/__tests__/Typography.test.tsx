import * as React from "react"
import { render } from "enzyme"

import ThemelessTypography from "../Typography"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Typography = wrapDefaultTheme(ThemelessTypography)

describe("Tooltips Page", () => {
  it("Should render correctly", () => {
    expect(render(<Typography />)).toMatchSnapshot()
  })
})