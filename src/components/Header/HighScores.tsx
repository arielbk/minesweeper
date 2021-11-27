import { useDisclosure } from '@chakra-ui/hooks';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/modal';
import { Button, Heading, IconButton } from '@chakra-ui/react';
import { BsAwardFill } from 'react-icons/bs';

const HighScores: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        ml={4}
        variant="ghost"
        onClick={onOpen}
        aria-label="show high scores"
        icon={<BsAwardFill />}
        _focus={{ boxShadow: 'none', outline: '2px solid #ccc ' }}
        fontSize="inherit"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">High scores</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>
            <Button mx="auto" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HighScores;
