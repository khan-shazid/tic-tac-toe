import { Flex, Button, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import { BaseBorderColor } from '../../../constants';

export const GameHistory = ({previousGames, showGameDetails}) => {
  return (
    <Flex flex="1" border="1px" borderColor={BaseBorderColor()} direction="column" maxH="800" overflow='scroll'>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>All game history</TableCaption>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Players</Th>
            <Th>Played at</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
        {
          previousGames.map((game, i) => {
            return (
              <Tr key={`previousGames_${i}`}>
                <Td>Game {i + 1}</Td>
                <Td>{`${game.playerOne.name} VS ${game.playerTwo.name}`}</Td>
                <Td>{game.createdAt}</Td>
                <Td><Button mr={5} onClick={() => showGameDetails(game)} colorScheme="blue">View</Button></Td>
              </Tr>
            )
          })
        }
        </Tbody>
      </Table>

    </Flex>
  )
}
