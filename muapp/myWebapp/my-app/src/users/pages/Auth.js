import React, {useState} from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import './Auth.css';

const Auth = () => {
const [isLoginMode, setIsLoginMode] = useState(true);

const [formState, inputHandler, setFormData] = useForm({
  login: {
    value: '',
    isValid: false
  },
  password: {
    value: '',
    isValid: false
  }
}, false);

const switchModeHandler = () => {
  if (!isLoginMode) {
    setFormData(
    {
      ...formState.inputs,
      name: undefined
    },
    formState.inputs.login.isValid && formState.inputs.password.isValid
    );
  } else {
    setFormData({
      ...formState.inputs,
      name: {
        value: '',
        isValid: false
      }
    }, false);
  }
  setIsLoginMode(prevMode => !prevMode);
};

const authSubmitHandler = event => {
  event.preventDefault();
  console.log(formState.inputs);
};

  return <Card calssName="authentication">
  <h2>Login Required</h2>
  <hr />
  <form onSubmit={authSubmitHandler}>
    {!isLoginMode &&  (
      <Input
      elemnt="input"
    id="name"
    type="text"
    label="Your Name"
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a name."
    onInput={inputHandler}
    />
    )}
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
    <Button type="submit" disabled={!formState.isValid}>
    {isLoginMode ? 'LOGIN' : 'SIGNUP'}
    </Button>
  </form>
  <Button inverse onClick={switchModeHandler}>
  SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
  </Button>
  </Card>;
};

export default Auth;
