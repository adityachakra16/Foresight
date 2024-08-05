import { Button } from "@/components/atoms/Button";
import { Flex } from "@/components/atoms/Flex";
import Input from "@/components/atoms/Input";
import Modal from "@/components/atoms/Modal";
import { Typography } from "@/components/atoms/Typography";
import { validateEmail } from "@/utils";
import { FormEvent, useEffect, useState } from "react";
import { useAuthenticate, useSignerStatus } from "@alchemy/aa-alchemy/react";

const { Heading, Text } = Typography;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState<string | null>(null);
  const { isInitializing, isAuthenticating, isConnected, status } =
    useSignerStatus();
  const { authenticate } = useAuthenticate();
  const login = () => {
    authenticate({ type: "email", email });
  };

  const isAwaitingEmail = status === "AWAITING_EMAIL_AUTH";
  const isLoading =
    isInitializing || (isAuthenticating && status !== "AWAITING_EMAIL_AUTH");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    if (isConnected) {
      onClose();
    }
  }, [isConnected]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading level={3}>Login</Heading>
      {isAwaitingEmail ? (
        <Flex vertical gap="large">
          <Text
            style={{
              color: "gray",
            }}
          >
            Check your email for a login link
          </Text>
        </Flex>
      ) : (
        <Flex vertical gap="large">
          <Flex
            vertical
            gap="small"
            style={{
              paddingTop: "1rem",
            }}
          >
            <Text
              style={{
                color: "gray",
              }}
            >
              Login with your email below
            </Text>
            <Flex gap="small" vertical>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  const validatedEmail = validateEmail(email);
                  if (email && !validatedEmail) {
                    setError("email");
                  } else {
                    setError(null);
                  }
                }}
                onKeyDown={handleKeyDown}
              />
              {error === "email" && (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  Please enter a valid email
                </Text>
              )}
            </Flex>
          </Flex>
          <Button onClick={login} disabled={!email} loading={isLoading}>
            Log in
          </Button>
        </Flex>
      )}
    </Modal>
  );
};
