import React, { Component } from 'react';
import { Dialog } from '@reach/dialog';
import { Button } from '../../Utils/Utils';

import '@reach/dialog/styles.css';

class Confirm extends Component {
  state = { 
    open: false,
    callback: null
   }

   show = callback => e => {
     e.preventDefault()

     e = {
       ...e,
       target: { 
         ...e.target, 
         value: e.target.value 
       }
     }

     this.setState({
       open: true,
       callback: () => callback(e)
     });
   }

   hide = () => this.setState({
     open: false,
     callback: null
   })

   confirm = () => {
     this.state.callback();
     this.hide();
   }

  render() { 
    return ( 
      <React.Fragment>
        {this.props.children(this.show)}

        {this.state.open && (
          <Dialog aria-label='confirm'>
            <h1>{this.props.title}</h1>
            <p>{this.props.description}</p>

            <Button onClick={this.hide}>Cancel</Button>
            <Button onClick={this.confirm}>OK</Button>
          </Dialog>
        )}
      </React.Fragment>
     );
  }
}
 
export default Confirm;