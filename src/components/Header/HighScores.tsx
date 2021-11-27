import { useDisclosure } from '@chakra-ui/hooks';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import format from 'date-fns/format';
import { BsAwardFill } from 'react-icons/bs';

const ScoreRow: React.FC<{ score: number; name: string }> = ({
  score,
  name,
}) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Heading size="md">{name}</Heading>
      <Heading size="md">{format(score * 1000, 'm:ss')}</Heading>
    </Flex>
  );
};

const HighScores: React.FC<{ closeDrawer: () => void }> = ({ closeDrawer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        ml={4}
        variant="ghost"
        onClick={() => {
          onOpen();
          closeDrawer();
        }}
        aria-label="show high scores"
        icon={<BsAwardFill />}
        _focus={{ boxShadow: 'none', outline: '2px solid #ccc ' }}
        fontSize="inherit"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader my={4}>
            <Heading size="lg">High scores</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <ScoreRow name="Marija P" score={123} />
            <ScoreRow name="Trent Crimm" score={234} />
            <ScoreRow name="Clarence Thomas" score={345} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HighScores;
