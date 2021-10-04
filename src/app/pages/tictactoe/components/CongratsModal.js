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
} from '@chakra-ui/react';

import { useDispatch, useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { update, updateBoard, saveActivities } from '../actions';

const CongratsModal = ({isOpen, onClose, players, previousGames}) => {
  const lastGame = previousGames.length ? previousGames[previousGames.length - 1] : {};
  const dispatch = useDispatch();

  const onContinue = async() => {
    await dispatch(saveActivities([]));
    await dispatch(updateBoard([[0,0,0],[0,0,0],[0,0,0]]));
    if (lastGame.activities.length) {
      let activePlayer = lastGame.activities[0].player.symbol === 'O' ? 'playerTwo' : 'playerOne';
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
