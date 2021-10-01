import React, { useEffect, useState } from 'react';
import { Flex, Spacer, Grid, Center, Text, useToast, Input, Stack } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

import { getCachedAllPokemons, getCachedMyPokemons } from '../common/actions';
import { CACHED_ALL_POKEMON_KEY, CACHED_MY_POKEMON_KEY } from '../../constants';

export default function PlayTicTacToe (props) {
  const [board, setBoard] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  useEffect(() => {

  }, []);

  return (
    <Stack>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {
        board.map((row) => {
          return row.map((item) => {
            return (
              <Center>
                <Text color={'gray.500'} fontSize={'md'}>
                {item}
                </Text>
              </Center>
            )
          })
        })
      }
      </Grid>
    </Stack>
  )
}
