import { Text } from '@chakra-ui/react';

export const ActivityLog = ({ activityList }) => {
  return (
    <>
      {
        activityList.length ?
        <Text align="center" fontWeight={800} p={1} color="blue.900">Activity Log</Text>
        : <></>
      }
      {
        activityList.map((item) => {
          return (
            <Text align="center" fontWeight={500} p={1} color="blue.500">{`${item.player.name} has chosen row - ${item.row}, column - ${item.column}`}</Text>
          )
        })
      }
    </>
  )
}
