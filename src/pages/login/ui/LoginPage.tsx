import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { BiSolidShow, BiHide } from 'react-icons/bi';

import logo from '@/../assets/images/logo.png';
import { signIn } from '../api/signIn';
import useDocumentTitle from '@shared/lib/useDocumentTitle';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const from: string = location.state?.from?.pathname || '/';

  useDocumentTitle('Login', true);

  return (
    <Flex
      flexDirection="column"
      width="100vw"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      as="main"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={logo}
          width="80px"
          alt="Gefera Logo"
          style={{ padding: '10px 0' }}
        />
        <Box minW={{ base: '90%', md: '368px' }}>
          <form
            onSubmit={(evt) =>
              signIn(
                evt,
                setErrorMessage,
                setLoading,
                navigate,
                username,
                password,
                from
              )
            }
          >
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius="16px"
            >
              <FormControl className="ym-hide-content">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    min={3}
                    onChange={(e) => {
                      setUsername(e.target.value.trim());
                      setErrorMessage('');
                    }}
                    required
                    data-ym-disable-track="true"
                  />
                </InputGroup>
              </FormControl>
              <FormControl className="ym-hide-content">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Пароль"
                    value={password}
                    min={3}
                    onChange={(e) => {
                      setPassword(e.target.value.trim());
                      setErrorMessage('');
                    }}
                    required
                  />
                  <InputRightElement width="3.3rem">
                    <IconButton
                      type="button"
                      icon={showPassword ? <BiSolidShow /> : <BiHide />}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Show password"
                      h="1.75rem"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius="16px"
                type="submit"
                variant="solid"
                colorScheme="red"
                width="full"
                disabled={!(username && password) || loading}
              >
                {loading ? <Spinner /> : 'Войти'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Text
        textAlign="center"
        color="red"
        display="block"
        fontSize="1rem"
        minHeight="24px"
      >
        {errorMessage}
      </Text>
    </Flex>
  );
}
