import { Text, Box } from '@chakra-ui/react';

export const ActivityLog = ({ activities }) => {
  return (
    <Box>
      {
        activities.length ?
        <Text align="center" fontWeight={800} p={1} color="blue.900">Activity Log</Text>
        : <></>
      }
      {
        activities.map((item, i) => {
          return (
            <Text align="center" fontWeight={500} p={1} color={i%2 === 1 ? `blue.300` : `gray.500`}>{`${item.player.name} has chosen row - ${item.row}, column - ${item.column}`}</Text>
          )
        })
      }
    </Box>
  )
}
