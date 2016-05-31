import { compose, pure, withProps } from 'recompose'
import h from 'react-hyperscript'
import Content, { MainBlock } from 'ws/markdown/Content'

const enhance = compose(
  withProps(props => {
    return { endContent: h(MainBlock, { }, [ 'meow' ]) }
  }),
  pure
)

export default enhance(Content)
