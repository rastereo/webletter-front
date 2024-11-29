import { Text } from '@chakra-ui/react';
import CountUp from 'react-countup';
import UserContext from '../../contexts/UserContext';
import { useContext } from 'react';

interface CounterProps {
  quantity: number;
  text: string;
}

function Counter({ quantity, text }: CounterProps) {
  const { isStartCounter, setIsStartCounter } = useContext(UserContext);

  return (
    <Text fontSize="sm" color="#a4a3a3" padding="0 0 20px">
      {text}{' '}
      {isStartCounter ? (
        <CountUp
          end={quantity}
          duration={0.6}
          onEnd={() => setIsStartCounter(false)}
        />
      ) : (
        quantity
      )}
    </Text>
  );
}

export default Counter;
