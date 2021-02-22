import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import './Auth.css';

const Auth = () => {
const [formState, inputHandler] = useForm({
  login: {
    value: '',
    isValid: false
  },
  password: {
    value: '',
    isValid: false
  }
}, false);

const authSubmitHandler = event => {
  event.preventDefault();
  console.log(formState.inputs);
};

  return <Card calssName="authentication">
  <h2>Login Required</h2>
  <hr />
  <form onSubmit={authSubmitHandler}>
    <Input
    element="input"
    id="login"
    type="login"
    label="Login"
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a valid login."
    onInput={inputHandler}
    />
    <Input
    element="input"
    id="password"
    type="password"
    label="Password"
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a valid password."
    onInput={inputHandler}
    />
    <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
  </form>
  </Card>;
};

export default Auth;
