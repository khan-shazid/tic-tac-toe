import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Text,
} from '@chakra-ui/react';

import { useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { update, updateBoard, saveActivities } from '../actions';
import { EMPTY_BOARD } from '../../../constants';
import { copyObj } from '../../../services/Utility';

const CongratsModal = ({isOpen, onClose, players, previousGames}) => {
  const lastGame = previousGames.length ? previousGames[previousGames.length - 1] : {};
  const dispatch = useDispatch();

  const onContinue = async() => {
    await dispatch(saveActivities([]));
    await dispatch(updateBoard(copyObj(EMPTY_BOARD)));
    if (lastGame.activities.length) {
      let activePlayer = lastGame.activities[0].player.symbol === 1 ? 'playerTwo' : 'playerOne';
      dispatch(update('activePlayer', activePlayer));
    }
    onClose();
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb={6}>
        {
          lastGame.verdict === 'draw' ?
          <Text align="center" fontWeight={900} fontSize='xl'>Match drawn :(</Text>
          :
          <Text align="center" fontWeight={900} fontSize='xl' color='green.400'>Congrats {lastGame.verdict ? players[lastGame.verdict].name : ''}!</Text>
        }
        </ModalBody>

        <ModalFooter>
          <Button onClick={onContinue} colorScheme="blue">
            Play again?
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const mapStateToProps = (store) => {
	return {
		players: store.gameplay.players,
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

export default connect(mapStateToProps, mapDispatchToProps)(CongratsModal);
