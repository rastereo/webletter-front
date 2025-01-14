import { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import CountUp from 'react-countup';

import { UserContext } from '@shared/contexts';

interface CounterProps {
  quantity: number;
  text: string;
}

export function Counter({ quantity, text }: CounterProps) {
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
