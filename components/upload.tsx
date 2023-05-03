import { useRouter } from 'next/router';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

interface IUploadForm extends HTMLFormElement {
  elements: IUploadFormControlsCollection;
}

interface IUploadFormControlsCollection extends HTMLFormControlsCollection {
  links: HTMLTextAreaElement;
  pdfs: HTMLInputElement;
}

export function Upload() {
  const linkInputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!uploading && fileInputRef.current) {
      fileInputRef.current.value = ``;
      setFiles([]);
    }
  }, [uploading]);

  const { push } = useRouter();

  async function handleSubmitAsync(event: FormEvent<IUploadForm>) {
    setError(null);
    setUploading(true);

    event.preventDefault();

    await fetch(`/api/upload`, {
      body: new FormData(event.currentTarget),
      method: `POST`,
    })
      .then(async response => {
        const text = await response.text();

        if (response.status !== 200) {
          throw new Error(text);
        }

        return text;
      })
      .then(addNamespaceToLocalStorage)
      .catch(error => setError(error.message))
      .finally(() => setUploading(false));

    push(`/`);
  }

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.currentTarget.files ?? []));
  }

  function addNamespaceToLocalStorage(namespace: string) {
    const namespaces = localStorage.getItem(`namespaces`);
    let namespacesJson: Record<string, string> = {};
    if (namespaces) {
      namespacesJson = JSON.parse(namespaces);
    }
    namespacesJson[namespace] = `Conversation #${Object.keys(namespacesJson).length + 1}`;
    localStorage.setItem(`namespaces`, JSON.stringify(namespacesJson));
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="h-full w-fit flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-stretch">
          {error && <p className="text-center text-red-500">{error}</p>}
          <form className="flex flex-col gap-12" onSubmit={handleSubmitAsync}>
            <fieldset className="flex flex-col items-stretch gap-6" disabled={uploading}>
              <div className="flex flex-col gap-2">
                <label className="text-center" htmlFor={linkInputId}>
                  Enter comma separated link(s) to a page
                </label>
                <textarea
                  className="shadow-md px-2.5 py-2 resize-none"
                  id={linkInputId}
                  name="links"
                  rows={5}
                />
              </div>
              <span className="text-center">OR</span>
              <div className="flex flex-col items-stretch gap-4">
                <button
                  className="bg-neutral-50 text-neutral-800 px-8 py-4 rounded-sm shadow-md disabled:opacity-50"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload PDF(s)
                </button>
                {files.length > 0 && (
                  <div>
                    <p>Uploaded PDF(s)</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(files).map((file, index) => (
                        <span key={index}>{file.name}</span>
                      ))}
                    </div>
                  </div>
                )}
                <input
                  accept=".pdf"
                  className="hidden"
                  disabled={uploading}
                  name="pdfs"
                  multiple={true}
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileInputChange}
                />
              </div>
            </fieldset>
            <button
              className="w-full bg-neutral-800 text-neutral-100 p-4 rounded-full shadow-md disabled:opacity-50"
              disabled={uploading}
              type="submit"
            >
              {`Submit${uploading ? `ting...` : ``}`}
            </button>
          </form>
        </div>
        {uploading && (
          <p>Uploading your content...</p>
        )}
      </div>
    </div>
  );
}
