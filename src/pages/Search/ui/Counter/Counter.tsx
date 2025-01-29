import { Text } from '@chakra-ui/react';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@app/store';
import { setIsStartCounter } from '@entities/searchConfig';

interface CounterProps {
  quantity: number;
  text: string;
}

export function Counter({ quantity, text }: CounterProps) {
  const { isStartCounter } = useSelector(
    (state: RootState) => state.searchConfig
  );

  const dispatch = useDispatch();

  return (
    <Text fontSize="sm" color="#a4a3a3" padding="0 0 10px">
      {text}{' '}
      {isStartCounter ? (
        <CountUp
          end={quantity}
          duration={0.8}
          onEnd={() => dispatch(setIsStartCounter(false))}
        />
      ) : (
        quantity
      )}
    </Text>
  );
}
