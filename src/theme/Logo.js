import h from './Logo.styl'
import { pure, compose, defaultProps } from 'recompose'
import React from 'react'
import cx from 'classnames'

const enhance = compose(
  defaultProps({ width: 248 }),
  pure
)

export const Logo = ({ children, width, monochrome }) => (
  h('svg', {
    width: width,
    height: Math.ceil(width * 142 / 238),
    viewBox: '0 0 238 142',
    styleName: cx({ isMonochrome: monochrome })
  }, [
    h('path.brackets', { d: 'M27.238 105.032l-4.501 3.174 5.465.424 43.843 2.656 5.332 19.9-72.21-9.536L.74 105.127l57.768-44.364L63.82 80.59l-36.582 24.442zm136.987-51.424l-5.293-19.753 73.292 9.168 4.466 16.67-58.869 44.658-5.313-19.827 38.3-25.374 4.086-2.669-4.8-.288-45.87-2.585z' }),
    h('path.wand', { d: 'M128.82 8.375l22.952 7.017-38.593 126.233-22.951-7.017z' }),
    h('path.wand-fill', { d: 'M133.468 17.116l9.563 2.924-8.186 26.776-9.563-2.923z' }),
    h('path.stars', { d: 'M101.989 23.984l-8.052 6.933-.605-10.608-9.082-5.514 9.901-3.854L96.59.599l6.725 8.226 10.589-.876-5.745 8.937 4.105 9.8zM67.03 26.743l-7.682 5.679 1.737-9.393-5.678-7.68 9.392 1.736 7.68-5.678-1.736 9.392 5.679 7.68zM42.616 40.389l.068 8.103-5.58-5.876-8.104.068 5.876-5.58L34.808 29l5.58 5.876 8.104-.068z' })
  ])
)

Logo.propTypes = {
  children: React.PropTypes.node,
  width: React.PropTypes.number
}

export default enhance(Logo)
