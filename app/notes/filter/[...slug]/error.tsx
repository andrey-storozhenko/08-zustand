'use client';

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}

export default Error;