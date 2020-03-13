import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import UserApiService from '../../services/user-api-service';
import PunishmentApiService from '../../services/punishment-api-service';

class UserPage extends Component {
  state = {
    user: {},
    punishments: [],
    executedPunishments: [],
    error: null
  }

  componentDidMount() {
    this.setState({error: null});
    UserApiService.getById(this.props.match.params.userId)
      .then(user => {
        PunishmentApiService.getUserPunishments(user)
          .then(punishments => {
            PunishmentApiService.getPunishmentsByUser(user)
              .then(executedPunishments => {
                this.setState({
                  user,
                  punishments,
                  executedPunishments
                })
              })
              .catch(error => this.setState({error}));
          })
          .catch(error => this.setState({error}));
      })
      .catch(error => this.setState({error}));
  }

  renderPunishments() {

  }

  renderPunishmentsBy() {

  }

  renderUser() {
    
    return (
      <>
        <div className='UserPage__user_heading'>
          
        </div>
      </>
    )
  }

  render() { 
    const { error, user } = this.state;
    let content;
    if(error) {
      content = (error.error === 'User doesn\'t exist')
        ? <p className='red'>User not found</p>
        : <p className='red'>There was an error</p>
    } else if(!user) {
      content = <div className='loading' />
    } else {
      content = this.renderUser();
    }
    return ( 
      <Section className='UserPage'>
        {content}
      </Section>
    );
  }
}
 
export default UserPage;