import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({onAdd, showAdd}) => {

  return (
    <header className='header'>
      <h1> Task Tracker </h1>
      <Button 
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Done' : 'Add'} 
        onClick={onAdd}/>
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
