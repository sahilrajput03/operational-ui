import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "../theme"

export interface IProps {
  css?: any
  className?: string
  children?: React.ReactNode
  id?: string
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  display: "flex",
  alignItems: "center",
  height: 36,
  margin: theme.spacing * -1,
  marginBottom: theme.spacing * 4 / 3,
  padding: `0 ${theme.spacing}px`,
  borderBottom: `1px solid ${theme.colors.usage.contentSeparatorLine}`,
  fontWeight: 700,
  lineHeight: 1,
  color: theme.colors.usage.emphasizedText,
  "* + &": {
    marginTop: theme.spacing
  },
  "&:not(:first-child)": {
    borderBottomStyle: "dashed"
  }
}))

const CardHeader: React.SFC<IProps> = ({ css, className, children, id }) => (
  <Container id={id} css={css} className={className}>
    {children}
  </Container>
)

export default CardHeader
