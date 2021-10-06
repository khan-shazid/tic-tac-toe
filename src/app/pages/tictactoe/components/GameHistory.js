import { Flex, Text, Button, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';

export const GameHistory = ({previousGames, showGameDetails}) => {
  return (
    <Flex flex="1" border="1px" borderColor="gray.200" direction="column" maxH="800" overflow='scroll'>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>All game history</TableCaption>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Players</Th>
            <Th isNumeric>Played at</Th>
            <Th isNumeric>Actions</Th>
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
                <Td isNumeric><Button mr={5} onClick={() => showGameDetails(game)}>View</Button></Td>
              </Tr>
            )
          })
        }
        </Tbody>
      </Table>

    </Flex>
  )
}
