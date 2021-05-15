import Header from './components/Header'

const App = () => {
  return (
    <div className='container'>
     <Header verb='thanks' name='me' times={4} />
    </div>
  )
};

export default App;