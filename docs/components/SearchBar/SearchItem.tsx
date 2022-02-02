import React from 'react';
import { useQuery } from '@sajari/react-hooks';
import { Box, Flex, Text } from '@sajari-ui/core';

interface Props {
  subText?: string;
  mainText: string;
  selected?: boolean;
  onSelected?: React.MouseEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const SearchItem = ({ subText, mainText, selected, onSelected, onClick }: Props) => {
  const { query } = useQuery();

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <Box
          as="span"
          textDecoration={selected ? 'underline' : undefined}
          textColor={selected ? undefined : 'text-blue-500'}
        >
          {part}
        </Box>
      ) : (
        part
      ),
    );
  };

  return (
    <Flex
      height="h-16"
      alignItems="items-center"
      cursor="cursor-pointer"
      borderRadius="rounded-xl"
      backgroundColor={selected ? 'bg-blue-500' : 'bg-gray-100'}
      textColor={selected ? 'text-white' : undefined}
      onMouseEnter={onSelected}
      onClick={onClick}
      ref={(ref) => {
        if (ref && selected) {
          ref.scrollIntoView({ block: 'nearest' });
        }
      }}
    >
      <Flex padding="p-5" alignItems="items-center" justifyContent="justify-center">
        {!subText ? (
          <svg strokeWidth="2px" viewBox="0 0 20 20" width={20} height={20} opacity={0.4}>
            <path
              d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4"
              stroke="currentColor"
              fill="none"
              fillRule="evenodd"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg strokeWidth="2px" viewBox="0 0 20 20" width={20} height={20} opacity={0.4}>
            <path
              d="M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z"
              stroke="currentColor"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Flex>
      <Box flex="flex-1">
        {subText && (
          <Text fontSize="text-xs" fontWeight="font-medium" opacity="opacity-75">
            {subText}
          </Text>
        )}
        <Text fontWeight="font-semibold">{getHighlightedText(mainText, query)}</Text>
      </Box>
      <Flex padding="p-5" alignItems="items-center" justifyContent="justify-center">
        <svg strokeWidth="2px" viewBox="0 0 20 20" width={16} height={16} opacity={0.5}>
          <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 3v4c0 2-2 4-4 4H2" />
            <path d="M8 17l-6-6 6-6" />
          </g>
        </svg>
      </Flex>
    </Flex>
  );
};

export default SearchItem;
