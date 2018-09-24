import * as React from "react"
import styled from "../utils/styled"

interface Props {
  size: number
  logo: React.ReactElement<any> | null
  color?: string
}

interface State {
  rotation: number
}

const Container = styled("div")<{ size_: number }>`
  ${({ size_ }) => `
    width: ${size_};
    height: ${size_};
  `};
  display: flex;
  align-items: center;
  justify-content: center;
`

class OperationalLogo extends React.Component<Props, State> {
  public state: State = {
    rotation: 0,
  }

  public static defaultProps = {
    color: "currentColor",
    logo: null,
  }

  public rotationInterval?: number

  public componentDidMount() {
    this.rotationInterval = window.setInterval(() => {
      this.setState(prevState => ({
        rotation: 180 - prevState.rotation,
      }))
    }, 1000)
  }

  public componentWillUnmount() {
    window.clearInterval(this.rotationInterval)
  }

  public render() {
    const { size, color, logo: Logo } = this.props
    const { rotation } = this.state

    const svgProps = {
      width: size,
      height: size,
      viewBox: "0 0 1000 1000",
      style: {
        transform: `rotate(${rotation || 0}deg)`,
        transition: "1s transform ease",
      },
      fill: color,
    }

    if (Logo) {
      return <Container size_={size}>{React.cloneElement(Logo, { ...svgProps, ...Logo.props })}</Container>
    }

    return (
      <svg {...svgProps}>
        <path d="M500.743,40.001c88.918,0.211 178.355,26.868 252.941,76.306c112.296,74.434 189.545,199.47 203.79,335.26c8.805,83.934 -5.812,170.352 -42.271,246.55c-48.304,100.952 -134.846,183.347 -238.145,226.515c-111.421,46.563 -241.073,46.834 -352.822,0.539c-103.597,-42.919 -190.259,-125.05 -238.835,-225.798c-41.96,-87.027 -55.511,-187.399 -37.697,-283.566c17.252,-93.127 64.421,-180.453 132.496,-246.336c77.417,-74.923 181.333,-121.449 289.561,-128.49c10.307,-0.671 20.664,-0.989 30.982,-0.98Zm-1.423,40c-81.015,0.192 -162.718,24.451 -230.905,69.647c-92.956,61.615 -160.034,161.222 -181.017,271.516c-16.687,87.708 -4.676,180.552 34.034,260.837c44.39,92.066 123.679,167.093 218.113,206.216c75.207,31.156 159.683,39.656 239.936,24.262c104.039,-19.956 199.574,-81.384 261.528,-167.378c51.253,-71.14 79.411,-158.798 78.986,-247.138c-0.427,-88.883 -29.892,-177.322 -83.093,-248.667c-63.458,-85.102 -159.585,-144.986 -265.165,-163.185c-23.885,-4.117 -48.124,-6.13 -72.417,-6.11Z" />
        <path d="M500.839,240.001c65.085,0.31 130.602,26.146 178.514,71.828c59.282,56.523 89.48,141.633 78.235,223.684c-10.11,73.775 -53.522,141.939 -116.157,182.641c-55.592,36.125 -125.3,49.717 -190.607,37.19c-63.412,-12.162 -121.61,-49.01 -160.065,-101.06c-49.046,-66.384 -63.902,-156.817 -37.591,-236.127c26.096,-78.659 91.683,-143.29 172.613,-167.388c23.814,-7.091 48.889,-10.651 73.38,-10.768c0.559,-0.001 1.119,-0.001 1.678,0Zm-1.552,40c-68.545,0.327 -135.542,34.243 -176.356,89.484c-39.204,53.062 -52.856,124.084 -35.129,188.761c17.621,64.287 65.904,119.208 127.847,144.981c64.428,26.807 141.441,20.744 201.192,-16.827c54.118,-34.029 92.319,-92.123 101.118,-156.318c7.677,-56.014 -7.061,-114.81 -40.89,-160.597c-39.615,-53.619 -103.988,-87.917 -172.095,-89.43c-1.896,-0.042 -3.794,-0.057 -5.687,-0.054Z" />
        <g>
          <path d="M381.163,687.88c1.029,0.09 1.291,0.09 2.31,0.27c11.663,2.057 19.88,16.053 14.891,27.618c-0.41,0.95 -0.553,1.168 -1.044,2.078l-100,173.205c-0.542,0.88 -0.66,1.113 -1.278,1.943c-5.541,7.444 -16.663,10.126 -25.018,5.93c-9.66,-4.851 -13.758,-17.833 -8.345,-27.873l100,-173.205c3.916,-6.348 11.029,-10.183 18.484,-9.966Z" />
          <path d="M721.163,98.983c1.03,0.09 1.291,0.09 2.31,0.27c11.748,2.071 19.816,16.201 14.891,27.617c-0.409,0.951 -0.553,1.169 -1.043,2.079l-100.001,173.205c-0.542,0.88 -0.66,1.113 -1.278,1.943c-5.542,7.444 -16.663,10.126 -25.018,5.93c-9.66,-4.852 -13.758,-17.834 -8.345,-27.873l100.001,-173.205c3.915,-6.348 11.029,-10.183 18.483,-9.966Z" />
        </g>
      </svg>
    )
  }
}

export default OperationalLogo
