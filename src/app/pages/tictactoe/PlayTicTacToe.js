import React, { useEffect, useState } from 'react';
import { Flex, Spacer, Grid, Center, Text, useToast, Input, Stack, useColorModeValue, Box, Button } from '@chakra-ui/react';
// import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { update, updateBoard, checkIfAnyMatchingCombination, saveGames, saveActivities } from './actions';
import { TicTacToeBoard } from './components/TicTacToeBoard';
import { ActivityLog } from './components/ActivityLog';
import EnterPlayerNameModal from './components/EnterPlayerNameModal';
import CongratsModal from './components/CongratsModal';
import GameHistoryModal from './components/GameHistoryModal';

function PlayTicTacToe ({players, activeBoard, currentGameActivities, activePlayer, previousGames}) {
  const [showPlayerNameEntryModal, setShowPlayerNameEntryModal] = useState(true);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [isCurrentGameFinished, setIsCurrentGameFinished] = useState(false);
  const [showGameHistory, setShowGameHistory] = useState(false);
  const [selectedGameHistory, setSelectedGameHistory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentGameActivities.length) {
      if (currentGameActivities[currentGameActivities.length - 1].player.symbol === 1) {
        dispatch(update('activePlayer', 'playerTwo'));
      } else {
        dispatch(update('activePlayer', 'playerOne'));
      }
    }
  }, []);

  const onChangeBoard = async(row, column) => {
    let board = [...activeBoard];
    board[row][column] = activePlayer === 'playerOne' ? 1 : 2;
    await dispatch(update('activePlayer', activePlayer === 'playerOne' ? 'playerTwo' : 'playerOne'));
    await dispatch(updateBoard(board));
    let activity = {
      player: players[activePlayer],
      row, column
    }
    let activities = [...currentGameActivities, activity];
    await dispatch(saveActivities(activities));
    let result = checkIfAnyMatchingCombination(board);
    if (result.verdict || activities.length === 9) {
      let lastGameDetails = {
        playerOne: players.playerOne,
        playerTwo: players.playerTwo,
        activities: activities,
        finalBoard: board,
        verdict: result.verdict ? result.verdict : 'draw',
        matchedCombinationTiles: result.matchedCombinationTiles,
        createdAt: new Date(),
      }
      let temp = [...previousGames, lastGameDetails];
      await dispatch(saveGames(temp));
      setShowCongratsModal(true);
    }
  }

  const showGameDetails = (game) => {
    setSelectedGameHistory(game);
    setShowGameHistory(true);
  }

  return (
    <Flex>
      <Flex flex="1" direction="column" border="1px" borderColor={useColorModeValue('green.100', 'green.900')} mr={5} bg={useColorModeValue('green.50', 'green.900')}>
        <Text align="center" fontSize={'lg'} fontWeight={900} bg={useColorModeValue('green.50', 'green.900')} p={10} px={3} color={'green.500'}>
          -----------Board-----------
        </Text>
        <TicTacToeBoard board={activeBoard} onChange={onChangeBoard} />
        {
          !showPlayerNameEntryModal && !showCongratsModal ?
          <Text align="center" fontWeight={600} p={5} color="red.500">{`${players[activePlayer].name}'s turn to play`}</Text>
          :
          <Box mb={5}/>
        }
        <ActivityLog activities={currentGameActivities} />
      </Flex>
      <Flex flex="1" border="1px" borderColor="gray.200" direction="column">
        <Text align="center" fontSize="30" fontWeight={600} p={5} color="red.500">History</Text>
        {
          previousGames.map((game, i) => {
            return (
              <Flex justify="space-between" align="center">
                <Text align="center" fontWeight={600} p={5}>#Game {i + 1} - </Text>
                <Text fontSize='11' color='blue.400' fontWeight="800">{new Date(game.createdAt.toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]}</Text>
                <Button mr={5} onClick={() => showGameDetails(game)}>View</Button>
              </Flex>
            )
          })
        }
      </Flex>
      <EnterPlayerNameModal isOpen={showPlayerNameEntryModal} onClose={() => setShowPlayerNameEntryModal(false)} />
      <CongratsModal isOpen={showCongratsModal} onClose={() => setShowCongratsModal(false)} />
      {selectedGameHistory && <GameHistoryModal isOpen={showGameHistory} onClose={() => setShowGameHistory(false)} game={selectedGameHistory} />}
    </Flex>

  )
}

const mapStateToProps = (store) => {
	return {
		players: store.gameplay.players,
    activeBoard: store.gameplay.activeBoard,
    currentGameActivities: store.gameplay.currentGameActivities,
    activePlayer: store.gameplay.activePlayer,
    previousGames: store.gameplay.previousGames
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayTicTacToe);
