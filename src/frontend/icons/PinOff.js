import React from 'react'
import SvgIcon from 'material-ui/SvgIcon'
import pure from 'recompose/pure'

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon

let PinOff = (props) =>
  <SvgIconCustom {...props}>
    <path d='M2,5.27L3.28,4L20,20.72L18.73,22L12.8,16.07V22H11.2V16H6V14L8,12V11.27L2,5.27M16,12L18,14V16H17.82L8,6.18V4H7V2H17V4H16V12Z' />
  </SvgIconCustom>

PinOff = pure(PinOff)
PinOff.muiName = 'SvgIcon'

export default PinOff
