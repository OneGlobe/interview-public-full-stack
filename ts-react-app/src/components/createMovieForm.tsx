import React, { FormEventHandler } from 'react';
import {
  Button,
  Fieldset,
  Form,
  FormGroup,
  Label,
  TextInput,
  Textarea,
} from '@trussworks/react-uswds';

type CreateMovieFormProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
  setTitle: (title: string) => void;
  synopsis: string;
  setSynopsis: (synopsis: string) => void;
  loading: boolean;
};

const CreateMovieForm: React.FC<CreateMovieFormProps> = ({
  handleSubmit,
  title,
  setTitle,
  synopsis,
  setSynopsis,
  loading,
}) => {
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="maxw-full margin-x-auto margin-top-4 margin-bottom-4 padding-3 bg-white border border-base-lighter radius-md shadow-1"
      >
        <Fieldset legend="Add a movie" legendStyle="large">
          <FormGroup>
            <Label htmlFor="title">Movie Title</Label>
            <TextInput
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter movie title"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="synopsis">Synopsis</Label>
            <Textarea
              id="synopsis"
              name="synopsis"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Enter movie synopsis"
              required
            />
          </FormGroup>
        </Fieldset>

        <Button type="submit" disabled={loading}>
          Create Movie
        </Button>
      </Form>
    </>
  );
};

export default CreateMovieForm;
