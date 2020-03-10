import React, { Component } from 'react';
import moment from 'moment';
import { Button, Input, Textarea, Required } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';

class PunishForm extends Component {
  static defaultProps = {
    onPunishSuccess: () => {}
  }

  state = {
    type: 'h',
    error: null
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, reason, proof, length, type } = e.target;

    this.setState({ error: null });

    let expires = null;
    if(type.value !== 'Permanent')
      expires = moment(new Date()).add(parseInt(length.value), type.value).utc().toISOString();
    
    AuthApiService.postPunishment({
      name: name.value,
      reason: reason.value,
      proof: proof.value,
      punished_by: 'me hahahaha',
      expires
    })
      .then(punishment => {
        this.setState({type: 'h'})
        name.value = '';
        reason.value = '';
        proof.valie = '';
        length.value = '1';
        type.value = 'h';
        this.props.onPunishSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      })
  }

  handleTypeChange = e => {
    let type = e.target.value;
    this.setState({
      type
    });
  }

  render() { 
    const { error } = this.state;
    return ( 
      <form
        className="PunishForm"
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='name'>
          <label htmlFor='PunishForm__name'>
            Username <Required />
          </label>
          <Input
            name='name'
            type='text'
            required
            id='PunishForm__name'
          >
          </Input>
        </div>
        <div className='reason'>
        <label htmlFor='PunishForm__reason'>
            Reason <Required />
          </label>
          <Textarea
            required
            aria-label='Type a reason...'
            name='reason'
            id='PunishForm__reason'
            cols='30'
            rows='3'
            placeholder='Type a reason..'>
          </Textarea>
        </div>
        <div className='proof'>
          <label htmlFor='PunishForm__proof'>
            Proof <Required />
          </label>
          <Input
            name='proof'
            type='url'
            required
            id='PunishForm__proof'
          >
          </Input>
        </div>
        <div className='length'>
          <label htmlFor='PunishForm__length'>
            Length <Required />
          </label>
          <Input
            name='length'
            type='number'
            required
            id='PunishForm__length'
            placeholder='1'
            disabled={this.state.type === 'Permanent' ? 'disabled' : undefined}
          >
          </Input>
          <select name='type' className='PunishForm__length-type' onChange={this.handleTypeChange}>
            <option value='h'>Hours</option>
            <option value='d'>Days</option>
            <option value='w'>Weeks</option>
            <option value='Permanent'>Permanent</option>
          </select>
        </div>
        <Button type='submit'>
          Execute
        </Button>
      </form>
    );
  }
}
 
export default PunishForm;