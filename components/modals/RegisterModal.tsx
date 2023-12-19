import React, { useCallback, useState } from 'react';
import axios from 'axios';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

import Input from '../Input';
import Modal from '../commons/Modal';

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/auth/signup', {
        email,
        password,
        username,
        name,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
        value={name}
      />
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        value={email}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        value={username}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        value={password}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account ?
        <span
          onClick={onToggle}
          className="
          text-white
            cursor-pointer
            hover:underline
            transition
          "
        >
          {' '}
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Sign Up"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
