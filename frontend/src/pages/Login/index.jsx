import * as yup from 'yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRootStore } from '../../contexts/RootStoreProvider';
import './index.scss';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Wrong email fromat')
    .required('Please enter an email address'),
  password: yup.string().min(6, 'Minimum password length is 6').required()
});

export const Login = observer(() => {
  const history = useHistory();
  const { authStore } = useRootStore();

  useEffect(() => {
    if (authStore.isAuthed && window.location.pathname === '/login') {
      history.push('/admin-panel');
    }
  }, [authStore.isAuthed]);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = ({ email, password }) => {
    authStore.fetchSignInRequest(email, password);
  };

  return (
    <div className="loginForm">
      <div className="loginForm__wrapper">
        <h2>Login To Your Account</h2>
        <form className="loginForm__main" onSubmit={handleSubmit(onSubmit)}>
          <div className="loginForm__fields">
            <input
              type="text"
              name="email"
              className="loginForm__field"
              id="email"
              label="E-Mail"
              placeholder="Email"
              {...register('email')}
            />
            <input
              type="text"
              name="password"
              className="loginForm__field"
              id="password"
              label="Password"
              placeholder="Password"
              {...register('password')}
            />

            <div className="loginForm__actions">
              <button className="loginForm__button" type="submit">
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
