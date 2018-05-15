// Type definitions for the Contiamo Sunburst visualization
import Breadcrumb from "./breadcrumb"
import Renderer from "./renderer"
import RootLabel from "./root_label"
import * as d3 from "d3-selection"
import { HierarchyRectangularNode } from "d3-hierarchy"
import { Accessor, Config, Object, Focus, Facade } from "../utils/typings"

export {
  Accessor,
  Accessors,
  Dimensions,
  EventBus,
  Object,
  State,
  Partial,
  Point,
  Position,
  D3Selection,
  SeriesEl,
  StateWriter,
  Canvas,
} from "../utils/typings"

export interface SunburstConfig extends Config {
  arrowOffset: number
  centerCircleRadius: number
  disableAnimations: boolean
  focusOffset: number
  maxRings: number
  maxTotalFontSize: number
  minTotalFontSize: number
  numberFormatter: (x: number) => string
  outerBorderMargin: number
  palette: string[]
  propagateColors: boolean
  sort: boolean
  zoomNode?: Object<any>
}

export interface RawData {
  empty?: boolean
  id?: string
  name?: string
  value?: number
  children?: RawData[]
  [key: string]: any
}

export interface Datum extends HierarchyRectangularNode<RawData> {
  color?: string
  name?: string
  zoomable?: boolean
  parent: Datum | null
}

export interface DataAccessors {
  data: Accessor<any, RawData>
}

export interface SeriesAccessors {
  color: Accessor<Datum, string>
  id: Accessor<Datum, string>
  name: Accessor<Datum, string>
  value: Accessor<Datum, number>
}

export interface AccessorsObject {
  data: DataAccessors
  series: SeriesAccessors
}

export interface Computed {
  canvas: Object<any>
  focus: Object<any>
  renderer: Object<any>
}

export interface FocusPoint {
  centroid: [number, number]
  labelPosition: string
}

export interface HoverPayload {
  d: Datum
  hideLabel: boolean
  focusPoint: FocusPoint
}

export interface ClickPayload {
  d?: Datum
  force?: boolean
}

export type Focus = Focus<HoverPayload>

export type Facade = Facade<SunburstConfig, AccessorsObject, Computed, Components, RawData>

export interface Components {
  breadcrumb: Breadcrumb
  focus: Focus<HoverPayload>
  renderer: Renderer
  rootLabel: RootLabel
}
