import React from 'react'
import SvgIcon from 'material-ui/SvgIcon'
import pure from 'recompose/pure'

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon

let Pin = (props) =>
  <SvgIconCustom {...props}>
    <path d='M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z' />
  </SvgIconCustom>

Pin = pure(Pin)
Pin.muiName = 'SvgIcon'

export default Pin
