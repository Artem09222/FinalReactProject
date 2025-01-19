import { useState } from "react";
import styled from "styled-components";
import image from '../../assets/image.jpg';

const Main = styled.main`
  background-image: url(${image});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const Form = styled.form`
  box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(100px);
  background:rgb(137, 88, 182);
  border-radius: 8px;
  width: 500px;
  padding: 30px;
  margin: 10px;
`;

const FormTitle = styled.h1`
  text-align: center;
  color: rgb(251, 251, 251);
  font-family: Poppins;
  font-size: 30px;
  font-weight: 400;
  letter-spacing: 0.5%;

   &:hover {
   color: red;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  width: 100%;
`;

const InputRegister = styled.input`
  padding: 10px;
  width: 85%;
  font-size: 18px;
  border-radius: 4px;
  border: none;
  background: rgba(210, 196, 196, 0.9);
  color: rgba(133, 23, 23, 0.97);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); 
  }
`;


const FormBtnRegister = styled.button`
  padding: 13px 102px;
  border: none;
  width: fit-content;
  color: rgb(255, 255, 255);
  align-self: center;
  background: linear-gradient(
    166.82deg,
    rgb(255, 199, 39) -16.418%,
    rgb(158, 64, 186) 97.035%,
    rgb(112, 0, 255) 150.711%
  );
  border-radius: 20px;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  letter-spacing: 10%;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 1px 9px 15px 0px rgba(0, 0, 0, 0.2);
  font-size: 15px;
  font-weight: 200;
  text-align: center;
  margin: 5px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transform: rotateZ100deg);
  @keyframes rotateButton {
    0% {
      transform: rotateZ(10deg);
    }
    50% {
      transform: rotateZ(-10deg);
    }
    100% {
      transform: rotateZ(10deg);
    }
  }

  animation: rotateButton 3s infinite ease-in-out;
`;


function RegisterForm({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);

  const validateForm = (name, email, password) => {
    if (name && email.includes('@') && password.length >= 5) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    validateForm(e.target.value, email, password);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    validateForm(name, e.target.value, password);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    validateForm(name, email, e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formValid) {
      const userData = { name, email, password };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(name);
    } else {
      alert("Будь ласка, заповніть всі поля правильно.");
    }
  };

  return (
    <Main>
      <Form onSubmit={handleRegister}>
        <FormTitle>Money Guard</FormTitle>
        <FlexContainer>
          <InputRegister onChange={nameHandler} value={name} type="text" name="name" placeholder="Enter your name..." />
          <InputRegister onChange={emailHandler} value={email} type="text" name="email" placeholder="Enter your email..." />
          <InputRegister onChange={passwordHandler} value={password} type="password" name="password" placeholder="Enter your password..." />
          <FormBtnRegister type="submit" disabled={!formValid}>REGISTER</FormBtnRegister>
        </FlexContainer>
      </Form>
    </Main>
  );
}

export default RegisterForm;
