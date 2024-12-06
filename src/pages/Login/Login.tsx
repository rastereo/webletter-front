import { FormEvent, useContext, useState } from 'react';
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

import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import logo from '../../assets/logo.png';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { mainApi } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from: string = location.state?.from?.pathname || '/';

  useDocumentTitle('Login', true);

  function handleShowClick() {
    setShowPassword(!showPassword);
  }

  async function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setErrorMessage('');

    setLoading(true);

    try {
      if (!mainApi) {
        throw new Error('MainApi not found');
      }

      await mainApi.signIn(username, password);

      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

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
          <form onSubmit={(evt) => onSubmit(evt)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius="16px"
            >
              <FormControl>
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
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
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
                      onClick={handleShowClick}
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

export default Login;
