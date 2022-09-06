import React, { useEffect, useMemo, useState } from 'react';
import router from 'next/router';
import { Flex, Grid, Icon, TextInput } from '@sajari-ui/core';
import { Modal, ModalBody, ModalHeader } from '@sajari/react-components';
import { useSearchContext } from '@sajari/react-hooks';
import SearchItem from './SearchItem';

const headingFilter = ['Editable Example', 'Suggestions'];

interface Props {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({ open, onClose }: Props) => {
  const { clear, search, searching, results = [] } = useSearchContext();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onClick = (url: string, e?: React.MouseEvent) => {
    if (e?.ctrlKey || e?.shiftKey || e?.metaKey || e?.button === 1) {
      window.open(url, '_blank');
    } else {
      router.push(url);
    }
    clear({ q: '' });
    onClose();
  };

  const extendedResult = useMemo(
    () =>
      results.flatMap(({ values }, resultIndex) => {
        const title = String(values.title).slice(0, String(values.title).indexOf(' |'));
        const headings = Array.from(values.headings);
        return [
          {
            key: String(resultIndex),
            mainText: title,
            url: String(values.url).replace('https://react.docs.sajari.com', ''),
          },
          ...headings
            .slice(headings.includes(title) ? headings.lastIndexOf(title) + 1 : 0)
            .filter((heading) => !headingFilter.includes(heading))
            .map((heading, headingIndex) => ({
              key: String(resultIndex + '_' + headingIndex),
              subText: title,
              mainText: heading,
              url: String(values.url + '#' + heading.replace(/[\s.]+/g, '-').toLocaleLowerCase()).replace(
                'https://react.docs.sajari.com',
                '',
              ),
            })),
        ];
      }),
    [results],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (true) {
      case e.key === 'ArrowUp': {
        e.preventDefault();
        setSelectedIndex(Math.max(selectedIndex - 1, 0));
        break;
      }
      case e.key === 'ArrowDown': {
        e.preventDefault();
        setSelectedIndex(Math.min(selectedIndex + 1, extendedResult.length - 1));
        break;
      }
      case e.key === 'Enter': {
        e.preventDefault();
        if (extendedResult[selectedIndex]) {
          onClick(extendedResult[selectedIndex].url);
        }
        break;
      }
      default:
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [searching, open]);

  return (
    <Modal
      open={open}
      onClose={() => {
        clear({ q: '' });
        onClose();
      }}
      center={false}
      size="2xl"
      animationDuration={100}
    >
      <ModalHeader styles={{ minHeight: 68 }}>
        <Flex width="w-full" alignItems="items-center">
          <Flex width="w-15" padding="pl-2" alignItems="items-center">
            <Icon name="search" size="lg" textColor="text-blue-500" />
          </Flex>
          <TextInput
            onChange={(e) => {
              const { value } = e.currentTarget;
              if (value.length > 1) {
                search(value);
              } else {
                clear({ q: '' });
              }
            }}
            onKeyDown={onKeyDown}
            placeholder="Search the docs"
            borderWidth="border-0"
            ringWidth="focus:ring-0"
            padding="px-0"
          />
        </Flex>
        {searching && <Icon name="spinner" margin="mr-7" />}
      </ModalHeader>

      {!searching && !!extendedResult.length && (
        <ModalBody>
          <Grid gap="gap-2">
            {extendedResult.map((each, index) => (
              <SearchItem
                {...each}
                selected={selectedIndex === index}
                onSelected={() => setSelectedIndex(index)}
                onClick={(e) => onClick(each.url, e)}
              />
            ))}
          </Grid>
        </ModalBody>
      )}
    </Modal>
  );
};

export default SearchModal;
