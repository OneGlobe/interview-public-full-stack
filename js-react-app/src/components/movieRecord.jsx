import React from 'react';
import {
  CollectionItem,
  CollectionHeading,
  CollectionDescription,
  CollectionMeta,
  CollectionMetaItem,
} from '@trussworks/react-uswds';

const MovieRecord = ({ movie }) => {
  return (
    <CollectionItem className="bg-white padding-3 border border-base-lighter radius-md shadow-1 margin-bottom-2 maxw-full">
      <CollectionHeading headingLevel="h3">{movie.title}</CollectionHeading>
      <CollectionDescription>{movie.synopsis}</CollectionDescription>
      <CollectionMeta aria-label="Movie Information">
        <CollectionMetaItem>
          Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
        </CollectionMetaItem>
      </CollectionMeta>
    </CollectionItem>
  );
};

export default MovieRecord;
