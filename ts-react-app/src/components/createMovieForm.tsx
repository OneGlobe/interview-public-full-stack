import React, { FormEventHandler } from 'react';
import { Button } from '@headlessui/react'

type CreateMovieFormProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
  setTitle: (title: string) => void;
  synopsis: string;
  setSynopsis: (synopsis: string) => void;
  loading: boolean;
}

const CreateMovieForm: React.FC<CreateMovieFormProps> = ({
  handleSubmit,
  title,
  setTitle,
  synopsis,
  setSynopsis,
  loading
}) => {
  return (
    <form onSubmit={handleSubmit} className="my-8 mx-auto bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700"
          >
            Movie Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400"
            placeholder="Enter movie title"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="synopsis"
            className="block text-sm font-medium text-slate-700"
          >
            Synopsis
          </label>
          <textarea
            id="synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 min-h-[100px]"
            placeholder="Enter movie synopsis"
            required
          />
        </div>

        <div className="flex gap-3 pt-2">

          <Button type="submit" disabled={loading}
            className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              'Create Movie'
            )}
          </Button>

        </div>
      </div>
    </form>
  );
};

export default CreateMovieForm;