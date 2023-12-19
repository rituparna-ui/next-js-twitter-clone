import useLoginModal from '@/hooks/useLoginModal';
import React, { useCallback, useState } from 'react';
import Input from '../Input';
import Modal from '../commons/Modal';
import useRegisterModal from '@/hooks/useRegisterModal';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // TODO: Add login

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        value={email}
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
        Don&apos;t have an account ?
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
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
