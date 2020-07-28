import React from 'react'
import PropTypes from 'prop-types'

// Custom React hook
function useInputValue(defaultValue = '') {
  const [value, setValue] = React.useState(defaultValue)

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(''),
    value: () => value
  }
}


function AddTodo({ onCreate }) {
  const input = useInputValue('')

  // const [value, setValue] = React.useState('')

  function submitHandler(event) {
    event.preventDefault()
    
    if (input.value().trim()) {
      onCreate(input.value())
      input.clear()
      // setValue('')
    }
  }

  return (
    <form 
      style={ {marginBottom: '1rem'} }
      onSubmit={ submitHandler }
    >
      <input 
        { ...input.bind }
        // value={value} 
        // onChange={ event => setValue(event.currentTarget.value) } 
      />
      
      <button 
        type='submit'
      >
        Добавить ToDo
      </button>
    </form>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
}

export default AddTodo