'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/authContext';
import { findAllComments, registerComment } from '@/services/axios';
import toast from 'react-hot-toast';

interface CommentDto {
  idComment: string;
  idUser: string;
  idObject: string;
  createdAt: string;
  updateAt: string;
  description: string;
  user: {
    idUser: string;
    name: string;
    profilePicture: {
      path: string;
    };
  };
}

export const Comments = ({ idObject }: { idObject: string }) => {
  const { payload } = useAuthContext();
  const idUser = 'c57195cc-8283-4109-93e1-197f573bb6c2';
  // const [idUser, setIdUser] = useState();

  const [comments, setComments] = useState<CommentDto[]>([]);
  const [comment, setComment] = useState<string>('');

  const loadComments = async () => {
    const commentsFound: CommentDto[] = await findAllComments(idObject);
    setComments(commentsFound);
  };

  // const loadUser = async () => {
  //   if (payload) {
  //     setIdUser(payload.idUser ? payload.idUser : undefined);
  //   }
  // };

  useEffect(() => {
    loadComments();
    // loadUser();
  }, []);

  const handleComment = (event: any) => {
    setComment(event.target.value);
  };

  const handleSendComment = async (event: any) => {
    if (event.code == 'Enter') {
      event.preventDefault();
      if (!idObject) return;
      if (!comment) return;
      if (!idUser) return;

      try {
        const newComment = {
          idObject,
          idUser,
          comment,
        };

        const response = await registerComment(newComment);
        if (response.error) return toast.error(response.error);
        const newComments = comments;
        newComments.push(response);

        setComments(newComments);
        setComment('');
      } catch (err) {
        return console.log('ERROR: ' + err);
      }
    }
  };

  return (
    <div className="w-full p-2 sm:w-1/4">
      <textarea
        disabled={idUser ? false : false}
        name="comment-text"
        id="comment-text"
        className="bg-gray-100 w-full text-black p-2 "
        value={comment}
        onChange={handleComment}
        onKeyDownCapture={handleSendComment}
        placeholder={
          idUser
            ? 'Escreva um comentário!'
            : 'Você precisa fazer login para comentar'
        }
      ></textarea>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.idComment}
            className="bg-gray-300 p-2 text-black my-2"
          >
            <div className="flex mb-4 items-center justify-start">
              <img
                src={`http://api.raptorise.com.br${comment.user.profilePicture.path}`}
                className="rounded-full w-8 h-8"
              />

              <h1 className="text-black font-bold text-sm ms-4">
                {comment.user.name}
              </h1>
            </div>
            <p className="text-black text-sm">{comment.description}</p>
          </div>
        ))
      ) : (
        <div className="text-black">Nenhum comentário neste objeto</div>
      )}
    </div>
  );
};
