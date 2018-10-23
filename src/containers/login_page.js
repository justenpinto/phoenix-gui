import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticateUser } from '../actions/index';

class LoginPage extends Component {

  renderField(field) {
    const { meta : { touched, error } } = field;
    const className = `form-group login-input ${touched && error ? 'has-danger' : ''}`
    const placeholder = `Enter ${field.input.name}`
    return (
      <div className={className}>
        <label>{field.label}: </label>
        <input
          className="form-control"
          type={field.type}
          placeholder={placeholder}
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.authenticateUser(values);
  }

  render() {
    const { authenticated } = this.props.user
    if (authenticated) {
      return <Redirect to='/pnlsummary'/>
    }
    var error_message = '';
    if (authenticated == false) {
      error_message = this.props.user.error_message;
    }
      const { handleSubmit } = this.props
    return (
      <div >
        <div className="page-header">
          <h3>Login Page</h3>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="email" label="Email" type="text" component={this.renderField}/>
          <Field name="password" label="Password" type="password" component={this.renderField}/>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div className="login-error-msg text-danger">
          {error_message}
        </div>
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
