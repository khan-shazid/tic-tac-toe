import React, { useEffect, useState } from 'react';
import { Flex, Spacer, Grid, Center, Text, useToast, Input, Stack } from '@chakra-ui/react';
// import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';

// import { getCachedAllPokemons, getCachedMyPokemons } from '../common/actions';
import { TicTacToeBoard } from './components/TicTacToeBoard';
import { EnterPlayerNameModal } from './components/EnterPlayerNameModal';

export default function PlayTicTacToe (props) {
  const [board, setBoard] = useState([[0, 1, 0], [1, 2, 0], [0, 2, 1]]);
  useEffect(() => {

  }, []);

  return (
    <Stack>
      <Center>
        <TicTacToeBoard board={board} />
      </Center>
      <EnterPlayerNameModal isOpen={true} />
    </Stack>
  )
}
