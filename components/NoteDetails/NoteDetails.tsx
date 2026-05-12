'use client';
import css from './NoteDetails.module.css';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getSingleNote } from '@/lib/api';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });
  console.log('id:', id);
  console.log('data:', data);
  console.log('error:', error);
  return (
    <>
      {isSuccess && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data?.title}</h2>
            </div>
            <p className={css.tag}>{data?.tag}</p>
            <p className={css.content}>{data?.content}</p>
            <p className={css.date}>{data?.createdAt}</p>
          </div>
        </div>
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </>
  );
};

export default NoteDetailsClient;
