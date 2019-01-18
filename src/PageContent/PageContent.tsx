import * as React from "react"
import Confirm, { ConfirmOptions } from "../Internals/Confirm"
import Modal, { ModalOptions } from "../Internals/Modal"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface ModalConfirmContext {
  modal: (modalOptions: ModalOptions) => void
  confirm: <T = undefined>(confirmOptions: ConfirmOptions<T>) => void
}

export interface PageContentProps extends DefaultProps {
  /** Children to render, you */
  children?: React.ReactNode | ((modalConfirmContext: ModalConfirmContext) => React.ReactNode)
  /** Areas template for `PageArea` disposition */
  areas?: "main" | "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
  /** Don't pad */
  noPadding?: boolean
}

const sideSize = 280

const StyledPageContent = styled("div")<{ areas?: PageContentProps["areas"]; fill_: boolean; noPadding: boolean }>(
  props => {
    const gridTemplateColumns = {
      main: props.fill_ ? "100%" : "auto",
      "main side": `auto ${sideSize}px`,
      "side main": `${sideSize}px auto`,
    }[props.areas || "main"]

    return {
      gridTemplateColumns,
      display: props.fill_ ? "block" : "grid",
      alignItems: "start",
      gridTemplateAreas: `"${props.areas || "main"}"`,
      gridGap: props.theme.space.element,
      width: "100%",
      height: "100%",
      minWidth: 800,
      maxWidth: props.fill_ ? "none" : 1150,
      padding: props.noPadding ? 0 : `${props.theme.space.element}px`,

      /**
       * Since PageContent is in a scrollable context,
       * a user often scrolls past the bottom padding
       * on large pages, and the bottom edge of the last
       * child touches the bottom of the container: there
       * _is no padding on the bottom_ because it has been
       * passed.
       *
       * The following hack adds a small piece of pseudo-DOM
       * in order to preserve space on the bottom.
       *
       * The `grid-gap` adds appropriate bottom spacing to
       * PageContent since this pseudo-element is seen as a
       * grid row.
       */
      ...(props.fill_
        ? {}
        : {
            "::after": {
              content: '""',
              display: "block",
              height: 1,
            },
          }),
    }
  },
)

const Container = styled("div")({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "auto",
})

// `fill` must be rename internally to avoid conflict with the native `fill` DOM attribute
const PageContent: React.SFC<PageContentProps> = ({ fill, children, noPadding, ...props }) => {
  return (
    <Modal>
      {modal => (
        <Confirm>
          {confirm => (
            <Container>
              <StyledPageContent {...props} noPadding={Boolean(noPadding)} fill_={Boolean(fill)}>
                {typeof children === "function" ? children({ confirm, modal }) : children}
              </StyledPageContent>
            </Container>
          )}
        </Confirm>
      )}
    </Modal>
  )
}

export default PageContent
