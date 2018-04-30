import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  id?: string
  css?: {}
  className?: string
  type?: string
  children?: React.ReactNode
}

const getGridCSSProperties = (gridType: string): {} => {
  if (gridType === "IDE") {
    return {
      gridTemplateColumns: "200px auto",
      gridTemplateRows: "auto"
    }
  }
  // Handle NxM case
  const gridNumbers = String(gridType).split("x")
  const cols = Number(gridNumbers[0])
  const rows = Number(gridNumbers[1])
  if (!isNaN(cols) && !isNaN(rows)) {
    return {
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`
    }
  }
  throw new Error(
    "Grid type can be either 'IDE' or of an `MxN` format, e.g. `1x2` or `5x6`. See https://ui.contiamo.com/components/grids/."
  )
}

const Container = glamorous.div(({ theme, gridType }: { theme: Theme; gridType: string }): {} => ({
  label: "Grid",
  width: "100%",
  height: "100%",
  display: "grid",
  padding: theme.spacing * 4 / 3,
  gridColumnGap: theme.spacing * 4 / 3,
  gridRowGap: theme.spacing * 4 / 3,
  ...getGridCSSProperties(gridType)
}))

const Grid = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className} gridType={props.type ? props.type : "3x2"}>
    {props.children}
  </Container>
)

export default Grid
