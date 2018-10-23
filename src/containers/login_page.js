import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { authenticateUser } from '../actions/index';

class LoginPage extends Component {
  renderField(field) {
    const { meta : { touched, error } } = field;
    const className = `form-group login-input ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}: </label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.authenticateUser(values,
      () => {
        this.props.history.push('/pnlsummary');
      },
      () => {
        this.props.history.push('/');
      }
    );
  }

  render() {
    const { handleSubmit } = this.props
    const { authenticated } = this.props.user
    var error_message = '';
    if (authenticated == false) {
      error_message = this.props.user.error_message;
    }
    return (
      <div>
        <div className="login-label">
          <h3>Login Page</h3>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="email" label="Email" type="text" component={this.renderField}/>
          <Field name="password" label="Password" type="password" component={this.renderField}/>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        {error_message}
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Enter an email."
  }
  if (!values.password) {
    errors.password = "Enter a password."
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default reduxForm({
  validate,
  form: 'LoginForm'
})(
  connect(mapStateToProps, {authenticateUser})(LoginPage)
);
