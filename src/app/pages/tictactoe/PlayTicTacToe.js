import React, { useEffect, useState } from 'react';
import { Flex, Text, Box, Button } from '@chakra-ui/react';
import { useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TicTacToeBoard } from './components/TicTacToeBoard';
import { ActivityLog } from './components/ActivityLog';
import { GameHistory } from './components/GameHistory';
import EnterPlayerNameModal from './components/EnterPlayerNameModal';
import CongratsModal from './components/CongratsModal';
import GameHistoryModal from './components/GameHistoryModal';

import { update, updateBoard, checkIfAnyMatchingCombination, saveGames, saveActivities, clearSession } from './actions';
import { copyObj, getCurrentTimestamp } from '../../services/Utility';
import { BaseBorderColor, BASE_RED, BASE_BLUE, BASE_GREEN } from '../../constants';

function PlayTicTacToe ({players, activeBoard, currentGameActivities, activePlayer, previousGames}) {
  const [showPlayerNameEntryModal, setShowPlayerNameEntryModal] = useState(true);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
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
    if (players.playerOne.name && players.playerTwo.name) {
      setShowPlayerNameEntryModal(false);
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
    checkResultAndUpdateHistory(activities);
  }

  const checkResultAndUpdateHistory = async(activities) => {
    let result = checkIfAnyMatchingCombination(activeBoard);
    if (result.verdict || activities.length === 9) {
      let lastGameDetails = {
        gameId: previousGames.length,
        playerOne: players.playerOne,
        playerTwo: players.playerTwo,
        activities: copyObj(activities),
        finalBoard: copyObj(activeBoard),
        verdict: result.verdict ? result.verdict : 'draw',
        matchedCombinationTiles: result.matchedCombinationTiles,
        createdAt: getCurrentTimestamp(),
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

  const resetSession = () => {
    dispatch(clearSession());
    setShowPlayerNameEntryModal(true);
  }

  return (
    <Flex>
      <Flex flex="1" direction="column" border="1px" borderColor={BaseBorderColor()} mr={5} bg={BaseBorderColor()}>
        <Text align="center" fontSize={'lg'} fontWeight={900} bg={BaseBorderColor()} p={5} px={3} color={BASE_GREEN}>
          -----------Board-----------
        </Text>
        {
          !showPlayerNameEntryModal ?
          <Text align="center" fontSize={'lg'} fontWeight={900} pb="8" px={3} color={BASE_BLUE}>
          {`${players.playerOne.name} VS ${players.playerTwo.name}`}
          </Text> : <></>
        }

        <TicTacToeBoard board={activeBoard} onChange={onChangeBoard} />

        {
          !showPlayerNameEntryModal && !showCongratsModal ?
          <Text align="center" fontSize="20" fontWeight={900} p={5} color={BASE_RED}>{`${players[activePlayer].name}'s turn to play`}</Text>
          :
          <Box mb={5}/>
        }
        <ActivityLog activities={currentGameActivities} />
        <Button onClick={resetSession} colorScheme="blue" m="5">
          Reset Session!
        </Button>
      </Flex>
      <GameHistory previousGames={previousGames} showGameDetails={showGameDetails}/>
      <EnterPlayerNameModal isOpen={showPlayerNameEntryModal} onClose={() => setShowPlayerNameEntryModal(false)}/>
      <CongratsModal isOpen={showCongratsModal} onClose={() => setShowCongratsModal(false)}/>
      {selectedGameHistory && <GameHistoryModal isOpen={showGameHistory} onClose={() => setShowGameHistory(false)} game={selectedGameHistory}/>}
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
