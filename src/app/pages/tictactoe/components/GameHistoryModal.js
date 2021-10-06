import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Box
} from '@chakra-ui/react';

import { useDispatch, useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { useInterval } from '../../../customHooks';
import { TicTacToeBoard } from './TicTacToeBoard';
import { ActivityLog } from './ActivityLog';

const EMPTY_BOARD = [[0,0,0],[0,0,0],[0,0,0]];

export default function GameHistoryModal({isOpen, onClose, game}) {
  let [board, setBoard] = useState(game.finalBoard);
  let [activities, setActivities] = useState(game.activities);
  let [showReplay, setShowReplay] = useState(false);
  let [replayStepCounter, setReplayStepCounter] = useState(0);

  const closeModal = () => {
    setShowReplay(false);
    setReplayStepCounter(0);
    onClose();
  };

  useEffect(() => {
    let timer = null;
    if (showReplay) {
      timer = setInterval(() => {
        if (replayStepCounter < game.activities.length) {
          mapActivityToBoard(game.activities);
          setReplayStepCounter(replayStepCounter + 1);
        } else {
          clearInterval(timer);
          setShowReplay(false);
        }
      }, 1300);
    } else {
      setReplayStepCounter(0);
      setBoard(game.finalBoard);
      setActivities(game.activities);
    }
    return () => clearInterval(timer);
  }, [showReplay, replayStepCounter])

  const replay = async() => {
    await setBoard(EMPTY_BOARD);
    await setActivities([]);
    await setReplayStepCounter(0);
    await setShowReplay(true);
  };

  const mapActivityToBoard = (data) => {
    let temp = JSON.parse(JSON.stringify(EMPTY_BOARD));
    for (let i = 0; i <= replayStepCounter; i++) {
      temp[data[i].row][data[i].column] = data[i].player.symbol;
    }
    setBoard(temp);
    setActivities(game.activities.slice(0, replayStepCounter + 1))
  };

  return (
    <Modal size='xl' isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Game histoy</ModalHeader>
        <ModalCloseButton  onClick={closeModal}/>
        <ModalBody pb={6}>
          <Flex justify="space-between" align="center">
            <TicTacToeBoard board={board} matchedCombinationTiles={game.matchedCombinationTiles}/>
            <Box width="5"/>
            <ActivityLog activities={activities} />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Text pr="5">Result: {game.verdict === `draw` ? `Match drawn` : `${game[game.verdict].name} won the match!`}</Text>
          <Button onClick={replay} colorScheme="blue" disabled={showReplay}>
            Show Replay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}