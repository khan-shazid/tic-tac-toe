import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';

import { useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updatePlayers } from '../actions';
import { savePlayerNameInSession } from '../../common/actions';

const EnterPlayerNameModal = ({isOpen, onClose, players}) => {
  const { playerOne, playerTwo } = players;
  const dispatch = useDispatch();

  const onChange = async(e) => {
    let temp = {...players};
    temp[e.target.name].name = e.target.value;
    await dispatch(updatePlayers(temp));
  }

  const start = () => {
    savePlayerNameInSession(playerOne.name, playerTwo.name);
    onClose();
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please insert player names</ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>First player (Symbol - O)</FormLabel>
            <Input placeholder="First Player" name="playerOne" value={playerOne.name} onChange={onChange}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Second player (Symbol - X)</FormLabel>
            <Input placeholder="Second Player" name="playerTwo" value={playerTwo.name} onChange={onChange}/>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={start} colorScheme="blue" disabled={!playerOne.name || !playerTwo.name}>
            Start!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const mapStateToProps = (store) => {
	return {
		players: store.gameplay.players
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterPlayerNameModal);
