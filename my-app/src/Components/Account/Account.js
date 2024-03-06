import React from 'react';

export default class Account extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: this.props.email.trim(),
      currPass: '',
      newPass: '',
      newPassConfirm: '',
      showMessage: this.props.showMessage
    }
  }

  onCurrentPasswordChange = (event) => {
    this.setState({ currPass: event.target.value });
  }

  onNewPasswordChange = (event) => {
    this.setState({ newPass: event.target.value });
  }

  onNewPasswordConfirmChange = (event) => {
    this.setState({ newPassConfirm: event.target.value });
  }


  onSubmit = () => {
    console.log(this.state);
    fetch('http://localhost:3000/changePassword', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        currPass: this.state.currPass,
        newPass: this.state.newPass,
        newPassConfirm: this.state.newPassConfirm
      })
    })
      .then(response => response.json())
      .then(email => {
        console.log(email);
        if (email === this.state.email) {
          this.setState({ showMessage: false })
          this.props.onButtonRedirect('signin')
        } else {
          this.setState({ showMessage: true })
          this.refs.currPass.value = '';
          this.refs.newPass.value = '';
          this.refs.newPassConfirm.value = '';
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      { this.state.showMessage ?
            <div className="alert alert-warning">
                <strong>The password is incorrect!</strong>
            </div>
            : <div>
            </div>
          }
      <article className="br3 shadow-5 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw7 center">
        <div>
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="password_change" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Change Password</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="current-password">Current Password</label>
                  <input
                    ref = "currPass"
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="current-password"
                    id="current-password"
                    onChange={this.onCurrentPasswordChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="new-password">New Password</label>
                  <input
                  ref = "newPass"
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="new-password"
                  id="new-password"
                  onChange={this.onNewPasswordChange}
                />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="new-password">Confirm New Password</label>
                  <input
                  ref = "newPassConfirm"
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="new-password-confirm"
                  id="new-password-confirm"
                  onChange={this.onNewPasswordConfirmChange}
                />
                </div>
              </fieldset>
              <div className="center">
                <input
                onClick={this.onSubmit}
                className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6.1 dib"
                type="submit"
                value="Submit"
                />
              </div>
            </div>
          </main>
        </div>
      </article>
      </div>
    );
  }

}
