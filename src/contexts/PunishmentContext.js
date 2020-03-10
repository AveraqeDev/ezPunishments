import React, { Component } from 'react';

export const nullPunishment = {
  name: '',
  reason: '',
  proof: '',
  punished_by: '',
  expires: ''
}

const PunishmentContext = React.createContext({
  punishment: nullPunishment,
  error: null,
  setError: () => {},
  clearError: () => {},
  setPunishment: () => {},
  clearPunishment: () => {}
});

export default PunishmentContext;

export class PunishmentProvider extends Component {
  state = {
    punishment: nullPunishment,
    error: null
  };

  setError = error => {
    console.error(error);
    this.setState({ error })
  };

  clearError = () => {
    this.setState({ error: null })
  };

  setPunishment = punishment => {
    this.setState({ punishment })
  };

  clearPunishment = () => {
    this.setPunishment(nullPunishment);
  };

  render() {
    const value = {
      punishment: this.state.punishment,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setPunishment: this.setPunishment,
      clearPunishment: this.clearPunishment
    };

    return (
      <PunishmentContext.Provider value={value}>
        {this.props.children}
      </PunishmentContext.Provider>
    )
  }
}