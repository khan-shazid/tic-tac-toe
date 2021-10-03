import React, { useEffect, useState } from 'react';
import { Flex, Spacer, Grid, Center, Text, useToast, Input, Stack } from '@chakra-ui/react';
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

import { getCachedAllPokemons, getCachedMyPokemons } from '../common/actions';
import { CACHED_ALL_POKEMON_KEY, CACHED_MY_POKEMON_KEY } from '../../constants';

export default function PlayTicTacToe (props) {
  const [board, setBoard] = useState([[0, 1, 0], [1, 2, 0], [0, 2, 1]]);
  useEffect(() => {

  }, []);

  return (
    <Stack>
      <Center>
        <Grid templateColumns="repeat(3, 1fr)" borderWidth="1px" borderRadius="lg">
        {
          board.map((row) => {
            return row.map((item) => {
              if (item === 1) {
                return (
                  <Collapse in={true} animateOpacity>
                    <Flex align="center" justify="center" height="20" width="20" border="1px" borderColor="gray.200">
                      <Text fontSize="60">O</Text>
                    </Flex>
                  </Collapse>
                )
              }
              if (item === 2) {
                return (
                  <Flex align="center" justify="center" height="20" width="20" border="1px" borderColor="gray.200">
                    <CloseIcon  w={10} h={10} color="red.500"/>
                  </Flex>
                )
              }
              return (
                <Flex align="center" justify="center" height="20" width="20" bg="gray.300" border="1px" borderColor="gray.200" cursor="pointer">
                </Flex>
              )
            })
          })
        }
        </Grid>
      </Center>
    </Stack>
  )
}
