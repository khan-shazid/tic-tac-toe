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
  Text,
  Flex,
  Box
} from '@chakra-ui/react';

import { TicTacToeBoard } from './TicTacToeBoard';
import { ActivityLog } from './ActivityLog';

import { EMPTY_BOARD } from '../../../constants';
import { copyObj } from '../../../services/Utility';

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
    setBoard(game.finalBoard);
    setActivities(game.activities);
  }, [game])

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
  }, [showReplay, replayStepCounter]);

  const replay = async() => {
    await setBoard(copyObj(EMPTY_BOARD));
    await setActivities([]);
    await setReplayStepCounter(0);
    await setShowReplay(true);
  };

  const mapActivityToBoard = (data) => {
    let temp = copyObj(EMPTY_BOARD);
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
          <Text pr="5" fontWeight="900">Result: {game.verdict === `draw` ? `Match drawn` : `${game[game.verdict].name} won the match!`}</Text>
          <Flex justify="space-between" align="center">
            <TicTacToeBoard board={board} matchedCombinationTiles={game.matchedCombinationTiles} isHistory={true}/>
            <Box width="5"/>
            <ActivityLog activities={activities} />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={replay} colorScheme="blue" disabled={showReplay}>
            Show Replay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
