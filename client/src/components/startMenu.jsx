import React from 'react';

const startMenu = (props) => {
  return(
    <div id="startMenu">
      <form>
        <p>Player 1</p>
        <input name="red" type="text" 
          value={props.formVals[0]} 
          onChange={props.handleChange}
          />
        <p>Player 2</p>
        <input name="blue" type="text"
          value={props.formVals[1]} 
          onChange={props.handleChange}
          />
      </form>
      <button onClick={props.handleSubmit}>Submit</button>
    </div>
  )
}

export default startMenu;