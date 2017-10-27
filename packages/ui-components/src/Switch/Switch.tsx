import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "../theme"

export interface IProps {
  on: boolean
  onChange: (on: boolean) => void
  className?: string
  style?: any
}

export interface IStyleProps {
  on: boolean
  theme: Theme
}

const width: number = 32
const height: number = 16
const railHeight: number = 6
const railOffset: number = 4

const Container = glamorous.div({
  width,
  height,
  position: "relative",
  cursor: "pointer"
})

const Button = glamorous.div(
  {
    height,
    transition: "transform .3s",
    position: "absolute",
    top: 0,
    left: 1,
    content: " ",
    width: height,
    borderRadius: "50%"
  },
  ({ on, theme }: IStyleProps) => ({
    transform: `translate3d(${on ? width - height - 2 : 0}px, 0, 0)`,
    backgroundColor: theme.colors.palette.white,
    border: `1px solid ${theme.colors.palette.grey70}`,
    zIndex: theme.baseZIndex + 2
  })
)

const Rail = glamorous.div(
  {
    width: width - 2 * railOffset,
    height: railHeight,
    backgroundColor: "black",
    position: "absolute",
    top: (height - railHeight) / 2,
    left: railOffset,
    borderRadius: railHeight / 2,
    overflow: "hidden"
  },
  ({ on, theme }: IStyleProps) => ({
    backgroundColor: theme.colors.palette.grey60,
    "&:after": {
      content: " ",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: theme.colors.palette.success,
      transition: "transform .3s",
      transform: `translate3d(${on ? "0" : "-100%"}, 0, 0)`,
      zIndex: theme.baseZIndex + 1
    }
  })
)

const Switch: React.SFC<IProps> = ({ className, style, on, onChange }: IProps) => (
  <Container
    style={style}
    className={className}
    onClick={() => {
      onChange(!on)
    }}
  >
    <Button on={on} />
    <Rail on={on} />
  </Container>
)

export default Switch
