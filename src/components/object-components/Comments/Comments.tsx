'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/authContext';
import { registerComment } from '@/services/axios';

interface CommentDto {
  idComment: string;
  description: string;
  user: {
    idUser: string;
    name: string;
    profilePicture: {
      name: string;
      path: string;
    };
  };
}

export const Comments = () => {
  const { payload } = useAuthContext();
  const [idUser, setIdUser] = useState();

  const [comments, setComments] = useState<CommentDto[]>([]);
  const [comment, setComment] = useState<string | undefined>('');

  const loadComments = async () => {
    const commentsFound: CommentDto[] = [
      {
        idComment: 'asdjaosidaosidaois',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryds standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u',
        user: {
          idUser: 'asdkjalsdk',
          name: 'Matheus de Souza Martins',
          profilePicture: {
            name: 'profile-picture',
            path: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg',
          },
        },
      },
      {
        idComment: 'asdjaosidaosidsdasdasdas',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u',
        user: {
          idUser: 'asdkjasdfsdlsdk',
          name: 'Outra pessoa',
          profilePicture: {
            name: 'profile-picture',
            path: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg',
          },
        },
      },
    ];
    setComments(commentsFound);
  };

  const loadUser = async () => {
    if (payload) {
      setIdUser(payload.idUser ? payload.idUser : undefined);
    }
  };

  useEffect(() => {
    loadComments();
    loadUser();
  }, []);

  const handleComment = (event: any) => {
    setComment(event.target.value);
  };

  const handleSendComment = async (event: any) => {
    if (event.code == 'Enter') {
      event.preventDefault();
      if (!comment) return;
      // if (!idUser) return;

      try {
        console.log('passow');
        // const response = await registerComment(comment, idUser);
        // if (response.error) return toast.error(response.error);
        const newComments = comments;
        newComments.push({
          idComment: 'sdfsdfsdfsdfsd',
          description: comment,
          user: {
            idUser: 'asdasdasdasd',
            name: 'Pessoa comentante',
            profilePicture: {
              name: 'profile-picture',
              path: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg',
            },
          },
        });
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
      {comments.map((comment) => (
        <div
          key={comment.idComment}
          className="bg-gray-300 p-2 text-black my-2"
        >
          <div className="flex mb-4 items-center justify-start">
            <img
              src={comment.user.profilePicture.path}
              className="rounded-full w-8 h-8"
            />

            <h1 className="text-black font-bold text-sm ms-4">
              {comment.user.name}
            </h1>
          </div>
          <p className="text-black text-sm">{comment.description}</p>
        </div>
      ))}
    </div>
  );
};
