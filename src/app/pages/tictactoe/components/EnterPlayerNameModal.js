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
  Input
} from '@chakra-ui/react';

export const EnterPlayerNameModal = ({isOpen, onClose}) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please insert player names</ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>First player (Symbol - O)</FormLabel>
            <Input placeholder="First name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Second player (Symbol - X)</FormLabel>
            <Input placeholder="Last name" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue">
            Start!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
