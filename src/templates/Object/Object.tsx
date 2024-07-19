'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ObjectDto } from '@/dtos/object.dto';
import { Loading } from '@/components/global-components';
import { Header } from '@/components/object-components/Header';
import { Comments } from '@/components/object-components';

export const Object = ({ idObject }: { idObject: any }) => {
  const router = useRouter();
  const [object, setObject] = useState<ObjectDto>();

  /**
   * Nessa tela, um QR Code poderá ser gerado para compartilhamento.
   * O QR Code será gerado utilizando a URL dessa mesma página.
   * Ao gerar o QR Code, um parâmetro será passado para ele, que indicará que este objeto é somente de visualização.
   * Esse parâmetro deverá ser extraído no componente pai deste.
   * Com o parâmetro extraído, haverá uma série de verificações.
   * Assim que o componente for montado, caso haja este parâmetro, o componente poderá ser somente visualizado
   * com as informações pertinentes a ele.
   * Para que a requisição seja efetuada com sucesso, a API deve estar configurada para ignorar o JWT vazio
   * na hora da validação, ao solicitar o objeto com id específico, caso um parâmetro de verificação
   * (gerado no QR Code) seja passado corretamente.
   */

  if (!idObject) router.push('/');

  const getObject = async () => {
    // se id inválido, retornar retornar usuário para tela 404

    setTimeout(() => {
      return setObject({
        idObject: 'hjasj1',
        name: 'Objeto 1',
        description: 'Decrição do objeto 1',
        objectPicture: {
          name: 'nome1',
          path: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
        },
        category: 'Categoria 1',
        subcategory: 'Subcategpria1',
        tags: [{ name: 'tag1' }],
      });
    }, 1000);
  };

  useEffect(() => {
    getObject();
  }, []);

  if (object) {
    return (
      <div
        id="object"
        className="min-w-full min-h-screen bg-primary-2 md:flex md:flex-col md:items-center"
      >
        <div id="container" className="w-3/4 mt-8 ms-8">
          <Header object={object} />

          <div id="object-picture" className="">
            <figure>
              <img src={object.objectPicture.path} alt="" className="w-full" />
              <figcaption>
                <span className="">Categoria:</span> {object.category} |
                Subcategoria: {object.subcategory} | Tags:{' '}
                {object.tags.map((tag) => (
                  <div key={`${tag}${Math.random()}`}>{tag.name}</div>
                ))}
              </figcaption>
            </figure>
          </div>

          <div id="object-description" className="mt-8">
            <p>{object.description}</p>
          </div>

          <Comments />
        </div>
      </div>
    );
  }

  return <Loading />;
};
