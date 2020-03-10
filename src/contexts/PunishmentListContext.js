import React, { Component } from 'react';

const PunishmentListContext = React.createContext({
  punishmentList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setPunishmentList: () => {}
});
export default PunishmentListContext;

export class PunishmentListProvider extends Component {
  state = { 
    punishmentList: [],
    error: null
   };

   setPunishmentList = punishmentList => {
     this.setState({ punishmentList });
   }

   setError = error => {
     console.error(error);
     this.setState({ error });
   }

   clearError = () => {
     this.setState({ error: null });
   }

  render() { 
    const value = {
      punishmentList: this.state.punishmentList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setPunishmentList: this.setPunishmentList
    }
    
    return ( 
      <PunishmentListContext.Provider value={value}>
        {this.props.children}
      </PunishmentListContext.Provider>
     );
  }
}