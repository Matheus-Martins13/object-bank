'use client';

import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { CollectionDto } from '@/dtos/collection.dto';
import { updateCollection } from '@/services/axios';

import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';

export const EditCollectionModal = ({
  collection,
  loadCollections,
}: {
  collection: CollectionDto;
  loadCollections: () => {};
}) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState<string>(collection.name);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleName = async (event: any) => {
    setName(event.target.value);
  };

  const handleSave = async () => {
    if (!name) return toast.error('Você não pode salvar a coleção sem um nome');
    try {
      const response = await updateCollection(collection.idCollection, name);

      if (response.error) return toast.error(response.message);
      toast.success('Coleção atualizada com sucesso');
      setTimeout(() => {
        loadCollections();
        setOpen(false);
      }, 2000);
    } catch (err) {
      console.log('ERR' + err);
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className="text-blue-400">
        <EditIcon color="primary" />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-black">Editando coleção '{collection.name}'</h1>

          <label htmlFor="collection-name" className="text-black mt-4 block">
            Nome da coleção:
          </label>
          <input
            type="text"
            name=""
            id="collection-name"
            value={name}
            onChange={handleName}
            placeholder="Nome da coleção"
            style={{ backgroundColor: '#333' }}
            className="w-full p-2 mt-2 text-white"
          />

          <button
            className="mt-9 p-2 text-white"
            style={{ backgroundColor: '#333' }}
            onClick={handleSave}
          >
            Salvar
          </button>
        </Box>
      </Modal>
    </div>
  );
};
