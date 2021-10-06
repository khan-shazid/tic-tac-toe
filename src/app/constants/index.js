import { useColorModeValue } from '@chakra-ui/react';

export const EMPTY_BOARD = [[0,0,0],[0,0,0],[0,0,0]];

export const BASE_URL = "https://www.google.com";
export const CACHED_GAME_HISTORY = 'gameHistoryList';
export const SESSIONED_ACTIVE_BOARD = 'activeBoard';
export const SESSIONED_ACTIVE_ACTIVITY = 'activeActivity';
export const SESSIONED_PLAYER_ONE = 'playerOneName';
export const SESSIONED_PLAYER_TWO = 'playerTwoName';

export const BaseBorderColor = () => useColorModeValue('green.100', 'green.900');
export const BASE_RED = 'red.500';
export const BASE_GREEN = 'green.500';
export const BASE_BLUE = 'blue.500';
export const BASE_GRAY = 'gray.500';
export const WHITE = 'white';
export const blue_300 = 'blue.300';
export const gray_300 = 'gray.300';
export const yellow_100 = 'yellow.100';

export const BASE_BORDER_WIDTH = '1px';
