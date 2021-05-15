import PropTypes from 'prop-types';

const Header = ({verb, name, times}) => {
  return (
    <header>
      <h1 style={headingStyle}>
        Say {verb} to {name} {times} times.
      </h1>
    </header>
  )
}

Header.defaultProps = {
  verb: 'hello',
  name: 'favourite user',
  times: '2'
}

Header.propTypes = {
  verb: PropTypes.string.isRequired,
  name: PropTypes.string,
  times: PropTypes.number
}

// CSS in JS
const headingStyle = {
  color: 'red',
  backgroundColor: 'black'
}

export default Header
